from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from uuid import uuid4
from app.database.models import Chat, User
from app.logger import log

logger = log(logger_name="api_uid_logger", log_file="api.log", log_dir="logs")


async def gen_uid(request: Request, json_data: dict):
    """
    Function to generate a unique identifier for a user
    :param request: FastAPI request object
    :param json_data: JSON data from the request
    :return: JSONResponse with the generated unique identifier
    """
    try:
        # chceck if user_details is present in the json data
        user_details = json_data.get("user_details")
        if not user_details:
            return JSONResponse(
                status_code=400,
                content={"message": "User details are required"},
            )

        email = user_details.get("email")
        name = user_details.get("name")

        # check if email and name is present in the user_details
        if not email or not name:
            return JSONResponse(
                status_code=400,
                content={"message": "Email and name are required"},
            )

        # create a new unique identifier
        new_uid = str(uuid4())
        logger.info(f"User details: {user_details}, ip: {request.client.host}")

        # create a new user if the email address and name is not already present in the database
        user = await User.get_or_none(email=email, name=name)

        # create a user and assign the new chat uid to the user
        if not user:
            user = await User.create(name=name, email=email, assigned_chats=[new_uid])
            logger.info(f"User created with email: {email}")
        else:
            current_uids = user.assigned_chats or []
            current_uids.append(new_uid)
            await user.update_from_dict({"assigned_chats": current_uids})
            await user.save()
            logger.info(f"UID added to user with email: {email}")

        logger.info(f"UID generated for {request.client.host}: {new_uid}")
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
