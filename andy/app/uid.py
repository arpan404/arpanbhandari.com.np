from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from uuid import uuid4
from app.database.models import Chat, User
from app.logger import log
from app.chatgpt import chatgpt

logger = log(logger_name="api_uid_logger", log_file="api.log", log_dir="logs")


async def gen_uid(request: Request, json_data: dict):
    try:
        user_details = json_data.get("user_details")
        if not user_details:
            return JSONResponse(
                status_code=400,
                content={"message": "User details are required"},
            )

        email = user_details.get("email")
        name = user_details.get("name")

        if not email or not name:
            return JSONResponse(
                status_code=400,
                content={"message": "Email and name are required"},
            )

        new_uid = str(uuid4())
        logger.info(f"User details: {user_details}")

        user = await User.get_or_none(email=email)

        if not user:
            user = await User.create(name=name, email=email, assigned_chats=[new_uid])
            logger.info(f"User created with email: {email}")
        else:
            current_uids = user.assigned_chats or []
            current_uids.append(new_uid)
            await user.update_from_dict({"assigned_chats": current_uids})
            await user.save()
            logger.info(f"UID added to user with email: {email}")

        logger.info(f"UID generated: {new_uid}")
        return JSONResponse(
            status_code=200,
            content={"uid": new_uid},
        )
    except Exception as e:
        logger.error(f"Internal server error while generating uid: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={"message": "Internal server error"},
        )


async def validate_chat_uid(json_data: dict):
    if not json_data.get("chat_uid"):
        logger.error("Chat UID missing in request")
        raise HTTPException(status_code=400, detail="Chat UID missing in request")
    user = await User.get_or_none(email=json_data.get("user_details")["email"])
    if not user:
        logger.error("User not found")
        raise HTTPException(status_code=400, detail="User not found")
    if json_data.get("chat_uid") not in user.assigned_chats:
        logger.error("Chat UID not assigned to user")
        raise HTTPException(status_code=400, detail="Chat UID not assigned to user")
