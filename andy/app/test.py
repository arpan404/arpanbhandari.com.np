from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from uuid import uuid4
from app.database.models import Chat, User
from app.logger import log
from app.chatgpt import chatgpt
from app.uid import validate_chat_uid
logger = log(
    logger_name="api_logger",
    log_file="api.log",
    log_dir="logs"
)


async def chat(request: Request, json_data: dict):
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
        previous_chat = await Chat.filter(uid=json_data.get("chat_uid")).all()
    except Exception as e:
        logger.error(f"Error fetching chat from database: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={"message": "Internal server error"},
        )
    try:
        messages = []

        if previous_chat and len(previous_chat) > 0:
            messages = [chat for chat in previous_chat[-20:]]
        messages.append({"role": "user", "content": [
                        {"type": "text", "text": json_data.get("message")}]})

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
        max_iteration = 5
        while max_iteration > 0:
            response = await chatgpt(messages=messages)
            if response:
                if response.choices[0].message.content:
                    new_message = {
                        "role": response.choices[0].role,
                        "content": [
                            {
                                "type": "text",
                                "text": response.choices[0].message
                            }
                        ]
                    }
                    message_to_save.append(new_message)
                    await Chat.create(
                        uid=json_data.get("chat_uid"),
                        message=new_message
                    )
                response_message = {
                    "role": response.choices[0].role,

                    "content": [
                        {
                            "type": "text",
                            "text": response.choices[0].message
                        }
                    ]




                }
            max_iteration -= 1
        response = await chatgpt(messages=messages)
        print(response)
        return JSONResponse(
            status_code=200,
            content={"message": "Hey there! Andy is busy serving the users."},
        )
    except Exception as e:
        logger.error(f"Internal server error while processing chat: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={"message": "Internal server error"},
        )
