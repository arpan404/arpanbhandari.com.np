from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from uuid import uuid4
from app.database.models import Chat, User
from app.logger import log
from app.chatgpt import chatgpt
import json
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
        previous_chat = await Chat.filter(uid=json_data.get("chat_uid"), email=json_data.get("user_details")["email"]).order_by('-id').limit(20) or []
        previous_chat.reverse()
    except Exception as e:
        logger.error(f"Error fetching chat from database: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={"message": "Internal server error"},
        )
    # previous_chat_json = [chat.to_dict() for chat in previous_chat]
    # print(previous_chat_json)
    try:
        if previous_chat:
            previous_chat = [
                chat.chats for chat in previous_chat
            ]
            print(previous_chat)
        return JSONResponse(
            status_code=200,
            content={"message": "Chat response"},
        )
    except Exception as e:
        logger.error(f"Error processing chat: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={"message": "Internal server error"},
        )
