import os
import json
import requests
from fastapi.responses import JSONResponse
from fastapi import Request, HTTPException, BackgroundTasks

from app.data import Data
from app.logger import log
from app.chatgpt import chatgpt
from app.database.models import Chat
from app.uid import validate_chat_uid

logger = log(logger_name="api_logger", log_file="api.log", log_dir="logs")


async def save_chats_in_background(chat_uid, email, messages):
    for message in messages:
        await Chat.create(uid=chat_uid, email=email, chats=message)


async def send_message_to_developer(subject, message, name, email, ip):
    try:
        api_url = os.getenv("STRAPI_HOST") + "/api/contacts"
        token = os.getenv("STRAPI_TOKEN")
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        }
        data = {
            "data": {
                "name": name,
                "email": email,
                "subject": subject,
                "message": message,
                "user_details": ip,
            }
        }
        response = requests.post(
            api_url,
            headers=headers,
            json=data,
        )
        if response.status_code >= 200 and response.status_code < 300:
            logger.info("Message sent to developer with details: %s", data)
            return True
        else:
            logger.error(
                f"Error sending message to developer: {
                    response.status_code} {response.text}"
            )
            return False
    except Exception as e:
        logger.error(f"Error sending message to developer: {str(e)}")
        return False


async def chat(request: Request, json_data: dict, background_tasks: BackgroundTasks):
    try:
        await validate_chat_uid(json_data)
    except HTTPException as e:
        return JSONResponse(
            status_code=e.status_code,
            content={"message": e.detail},
        )
    except Exception as e:
        logger.error(f"Internal server error while validating chat uid: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={"message": "Internal server error"},
        )

    try:
        previous_chat = (
            await Chat.filter(
                uid=json_data.get("chat_uid"),
                email=json_data.get("user_details")["email"],
            )
            .order_by("-id")
            .limit(12)
            or []
        )
        previous_chat.reverse()
    except Exception as e:
        logger.error(f"Error fetching chat from database: {str(e)}")
        return JSONResponse(
            status_code=500, content={"message": "Internal server error"}
        )
    try:
        if previous_chat:
            previous_chat = [chat.chats for chat in previous_chat]
            if previous_chat[0]["role"] == "tool":
                previous_chat.pop(0)

        messages = previous_chat or []
        messages.append(
            {
                "role": "user",
                "content": [{"type": "text", "text": json_data.get("message")}],
            }
        )
        message_to_save = [
            {
                "role": "user",
                "content": [{"type": "text", "text": json_data.get("message")}],
            }
        ]
        max_iteration = 3
        while max_iteration > 0:
            response = await chatgpt(
                messages, user_details=json_data.get("user_details")
            )
            if response:
                if response.choices[0].message.content:
                    logger.info(
                        f"ChatGPT response: {response.choices[0].message.content}"
                    )
                    background_tasks.add_task(
                        save_chats_in_background,
                        json_data.get("chat_uid"),
                        json_data.get("user_details")["email"],
                        message_to_save,
                    )

                    return JSONResponse(
                        status_code=200,
                        content={"message": response.choices[0].message.content},
                    )
                else:
                    logger.info("ChatGPT response: No content")
                    if (
                        response.choices[0].finish_reason == "tool_calls"
                        and response.choices[0].message.tool_calls
                    ):
                        first_tool_call = response.choices[0].message.tool_calls[0]
                        messages.append(response.choices[0].message)
                        message_to_save.append(response.choices[0].message)
                        match first_tool_call.function.name:
                            case "get_projects":
                                data = await Data().get_projects()
                                function_message = {
                                    "role": "tool",
                                    "content": json.dumps(data),
                                    "tool_call_id": first_tool_call.id,
                                }
                                messages.append(function_message)
                                message_to_save.append(function_message)
                                logger.info(
                                    f"Function message: {
                                            function_message}"
                                )

                            case "get_skills":
                                logger.info("Getting skills")
                                data = await Data().get_skills()
                                function_message = {
                                    "role": "tool",
                                    "content": [
                                        {"type": "text", "text": json.dumps(data)}
                                    ],
                                    "tool_call_id": first_tool_call.id,
                                }
                                messages.append(function_message)
                                message_to_save.append(function_message)

                            case "get_resume":
                                logger.info("Getting resume")
                                data = await Data().get_resume()
                                function_message = {
                                    "role": "tool",
                                    "content": json.dumps(data),
                                    "tool_call_id": first_tool_call.id,
                                }
                                messages.append(function_message)
                                message_to_save.append(function_message)

                            case "get_writings":
                                logger.info("Getting writings")
                                data = await Data().get_all_writings()
                                function_message = {
                                    "role": "tool",
                                    "content": [
                                        {"type": "text", "text": json.dumps(data)}
                                    ],
                                    "tool_call_id": first_tool_call.id,
                                }
                                messages.append(function_message)
                                message_to_save.append(function_message)

                            case "get_a_writings":
                                logger.info("Getting a writing")
                                arguments = json.loads(
                                    first_tool_call.function.arguments
                                )
                                uid = arguments.get("uid")

                                data = await Data().get_a_writings(uid=uid)
                                function_message = {
                                    "role": "tool",
                                    "content": [
                                        {"type": "text", "text": json.dumps(data)}
                                    ],
                                    "tool_call_id": first_tool_call.id,
                                }
                                messages.append(function_message)
                                message_to_save.append(function_message)

                            case "get_a_project":
                                logger.info("Getting a project")
                                arguments = json.loads(
                                    first_tool_call.function.arguments
                                )
                                uid = arguments.get("uid")

                                data = await Data().get_a_project(uid=uid)
                                function_message = {
                                    "role": "tool",
                                    "content": [
                                        {"type": "text", "text": json.dumps(data)}
                                    ],
                                    "tool_call_id": first_tool_call.id,
                                }
                                messages.append(function_message)
                                message_to_save.append(function_message)

                            case "schedule_meeting":
                                logger.info("Scheduling a meeting")
                                arguments = json.loads(
                                    first_tool_call.function.arguments
                                )
                                meeting_message = arguments.get("topic")
                                meeting_status = await send_message_to_developer(
                                    name=json_data.get("user_details")["name"],
                                    email=json_data.get("user_details")["email"],
                                    message="Appointment requested for a meeting",
                                    subject="#Meeting: " + meeting_message,
                                    ip=request.client.host,
                                )
                                if meeting_status:
                                    function_message = {
                                        "role": "tool",
                                        "content": [
                                            {
                                                "type": "text",
                                                "text": "Meeting scheduled successfully. You will be contacted soon.",
                                            }
                                        ],
                                        "tool_call_id": first_tool_call.id,
                                    }
                                else:
                                    function_message = {
                                        "role": "tool",
                                        "content": [
                                            {
                                                "type": "text",
                                                "text": "Error scheduling meeting. Please try again.",
                                            }
                                        ],
                                        "tool_call_id": first_tool_call.id,
                                    }
                                messages.append(function_message)
                                message_to_save.append(function_message)

                            case "send_message":
                                logger.info("Scheduling a meeting")
                                arguments = json.loads(
                                    first_tool_call.function.arguments
                                )
                                s_message = arguments.get("message")
                                s_subject = arguments.get("subject")
                                s_status = await send_message_to_developer(
                                    name=json_data.get("user_details")["name"],
                                    email=json_data.get("user_details")["email"],
                                    message=s_message,
                                    subject=s_subject,
                                    ip=request.client.host,
                                )
                                if s_status:
                                    function_message = {
                                        "role": "tool",
                                        "content": [
                                            {
                                                "type": "text",
                                                "text": "Message sent successfully. You will be contacted soon.",
                                            }
                                        ],
                                        "tool_call_id": first_tool_call.id,
                                    }
                                else:
                                    function_message = {
                                        "role": "tool",
                                        "content": [
                                            {
                                                "type": "text",
                                                "text": "Error sending message. Please try again.",
                                            }
                                        ],
                                        "tool_call_id": first_tool_call.id,
                                    }
                                messages.append(function_message)
                                message_to_save.append(function_message)

                            case _:
                                message_to_save.append(
                                    {
                                        "role": "assistant",
                                        "content": [
                                            {
                                                "type": "text",
                                                "text": "I am unsure of what you are asking. Ask me something else.",
                                            }
                                        ],
                                    }
                                )
                                background_tasks.add_task(
                                    save_chats_in_background,
                                    json_data.get("chat_uid"),
                                    json_data.get("user_details")["email"],
                                    message_to_save,
                                )
                                return JSONResponse(
                                    status_code=200,
                                    content={
                                        "message": "I am unsure of what you are asking. Ask me something else."
                                    },
                                )

            max_iteration -= 1

        message_to_save.append(
            {
                "role": "assistant",
                "content": [
                    {
                        "type": "text",
                        "text": "I am unsure of what you are asking. Ask me something else.",
                    }
                ],
            }
        )
        background_tasks.add_task(
            save_chats_in_background,
            json_data.get("chat_uid"),
            json_data.get("user_details")["email"],
            message_to_save,
        )
        return JSONResponse(
            status_code=200,
            content={
                "message": "I am unsure of what you are asking. Ask me something else."
            },
        )

    except Exception as e:
        print(e)
        logger.error(f"Error processing chat: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={"message": "Internal server error"},
        )
