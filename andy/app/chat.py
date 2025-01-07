from fastapi import Request, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse
from uuid import uuid4
from app.database.models import Chat, User
from app.logger import log
from app.chatgpt import chatgpt
from app.data import Data
from app.uid import validate_chat_uid
import json
logger = log(
    logger_name="api_logger",
    log_file="api.log",
    log_dir="logs"
)


async def save_chats_in_background(chat_uid, email, messages):
    for message in messages:
        await Chat.create(
            uid=chat_uid,
            email=email,
            chats=message
        )


async def chat(request: Request, json_data: dict, background_tasks: BackgroundTasks):
    try:
        await validate_chat_uid(json_data)
    except HTTPException as e:
        return JSONResponse(
            status_code=e.status_code,
            content={"message": e.detail},
        )
    except Exception as e:
        logger.error(
            f"Internal server error while validating chat uid: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={"message": "Internal server error"},
        )

    try:
        previous_chat = await Chat.filter(uid=json_data.get("chat_uid"), email=json_data.get("user_details")["email"]).order_by('-id').limit(12) or []
        previous_chat.reverse()
    except Exception as e:
        logger.error(f"Error fetching chat from database: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={"message": "Internal server error"}
        )
    try:
        if previous_chat:
            previous_chat = [
                chat.chats for chat in previous_chat
            ]
        messages = previous_chat or []
        messages.append({
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": json_data.get("message")
                }
            ]
        })
        message_to_save = [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": json_data.get("message")
                    }
                ]
            }
        ]
        max_iteration = 3
        while max_iteration > 0:
            response = await chatgpt(messages)
            print(response)
            if response:
                if response.choices[0].message.content:
                    logger.info(
                        f"ChatGPT response: {response.choices[0].message.content}")
                    background_tasks.add_task(
                        save_chats_in_background,
                        json_data.get("chat_uid"),
                        json_data.get("user_details")["email"],
                        message_to_save
                    )

                    return JSONResponse(
                        status_code=200,
                        content={
                            "message": response.choices[0].message.content},
                    )
                else:
                    logger.info("ChatGPT response: No content")
                    if response.choices[0].finish_reason == "tool_calls" and response.choices[0].message.tool_calls:
                        first_tool_call = response.choices[0].message.tool_calls[0]
                        messages.append(response.choices[0].message)
                        message_to_save.append(response.choices[0].message)
                        match first_tool_call.function.name:
                            case "get_projects":
                                data = await Data().get_projects()
                                function_message = {
                                    "role": "tool",
                                    "content": json.dumps(data),
                                    "tool_call_id": first_tool_call.id
                                }
                                messages.append(function_message)
                                message_to_save.append(function_message)
                                logger.info(f"Function message: {
                                            function_message}")

                            case "get_skills":
                                logger.info("Getting skills")
                                data = await Data().get_skills()
                                function_message = {
                                    "role": "tool",
                                    "content": [{
                                        "type": "text",
                                        "text": json.dumps(data)
                                    }],
                                    "tool_call_id": first_tool_call.id
                                }
                                messages.append(function_message)
                                message_to_save.append(function_message)

                            case "get_resume":
                                logger.info("Getting resume")
                                data = await Data().get_resume()
                                function_message = {
                                    "role": "tool",
                                    "content": json.dumps(data),
                                    "tool_call_id": first_tool_call.id
                                }
                                messages.append(function_message)
                                message_to_save.append(function_message)

                            case "get_writings":
                                logger.info("Getting writings")
                                data = await Data().get_all_writings()
                                function_message = {
                                    "role": "tool",
                                    "content": [{
                                        "type": "text",
                                        "text": json.dumps(data)
                                    }],
                                    "tool_call_id": first_tool_call.id
                                }
                                messages.append(function_message)
                                message_to_save.append(function_message)

                            case _:
                                return JSONResponse(
                                    status_code=400,
                                    content={
                                        "message": "Could not process the message"},
                                )

            max_iteration -= 1

        return JSONResponse(
            status_code=400,
            content={"message": "Could not process the message"},
        )

    except Exception as e:
        print(e)
        logger.error(f"Error processing chat: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={"message": "Internal server error"},
        )
