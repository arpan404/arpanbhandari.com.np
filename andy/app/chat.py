from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from uuid import uuid4
from app.database.models import Chat, User
from app.logger import log
from app.chatgpt import chatgpt

logger = log(
    logger_name="api_logger",
    log_file="api.log",
    log_dir="logs"
)


async def validate_chat_uid(json_data: dict):
    if not json_data.get("chat_uid"):
        logger.error("Chat UID missing in request")
        raise HTTPException(
            status_code=400,
            detail="Chat UID missing in request"
        )
    user = await User.get_or_none(email=json_data.get("user_details")["email"])
    if not user:
        logger.error("User not found")
        raise HTTPException(
            status_code=400,
            detail="User not found"
        )
    if json_data.get("chat_uid") not in user.assigned_chats:
        logger.error("Chat UID not assigned to user")
        raise HTTPException(
            status_code=400,
            detail="Chat UID not assigned to user"
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
        

    # try:
    #     previous_chat = await Chat.filter(uid=json_data.get("chat_uid"), email=json_data.get("user_details")["email"]).all()
    # except Exception as e:
    #     logger.error(f"Error fetching chat from database: {str(e)}")
    #     return JSONResponse(
    #         status_code=500,
    #         content={"message": "Internal server error"},
    #     )

    # print(previous_chat)
    # current_iteration = 0
    # while current_iteration < 10:
    #     current_iteration += 1
    #     pass
        user_message = {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": json_data.get("message")
                }
            ]
        }
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
            user = await User.create(
                name=name,
                email=email,
                assigned_chats=[new_uid]
            )
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
