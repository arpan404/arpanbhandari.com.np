import re
from app.logger import log
from app.database.models import User
from fastapi import HTTPException, Request

logger = log(logger_name="api_logger", log_file="api.log", log_dir="logs")


def validate_origin(request: Request):
    """
    Function to validate the origin of the request
    - Only requests from the allowed origins are allowed
    - This function is invoked first while handling route to validate the origin
    """
    client_ip = request.client.host
    origin = request.headers.get("origin")

    valid_orgins = [
        "https://www.arpanbhandari.com.np",
        "http://localhost:3000",
    ]
    if origin not in valid_orgins:
        logger.warning(
            f"Forbidden access attempt from {client_ip} with origin: {origin}"
        )
        raise HTTPException(status_code=403, detail="Forbidden")


async def validate_json(request: Request):
    """
    Function to validate the JSON data received in the request
    - This function is invoked after the origin validation
    - It checks if the JSON data is valid and contains the required fields
    """
    client_ip = request.client.host
    try:
        json_data = await request.json()
    except ValueError as e:
        logger.error(
            f"Invalid JSON data received from {
                request.client.host}: {str(e)}"
        )
        raise HTTPException(status_code=400, detail="Invalid JSON data in request")
    if not json_data:
        logger.error(
            f"Empty JSON data received from {
                request.client.host}"
        )
        raise HTTPException(status_code=400, detail="Empty JSON data in request")
    user_details = json_data.get("user_details")
    if not user_details:
        logger.error(
            f"Empty user details received from {
                request.client.host}"
        )
        raise HTTPException(status_code=400, detail="User details missing in request")
    if not user_details.get("name"):
        logger.error(f"Empty name received from {request.client.host}")
        raise HTTPException(status_code=400, detail="Name missing in user details")
    name = user_details.get("name")
    if len(name.split()) > 4:
        logger.error(
            f"Name received from {
                request.client.host} has more than 4 words"
        )
        raise HTTPException(status_code=400, detail="Name must have at most 4 words")
    if len(name) > 50:
        logger.error(
            f"Name received from {
                request.client.host} has more than 50 characters"
        )
        raise HTTPException(
            status_code=400, detail="Name must have at most 50 characters"
        )
    for word in name.split():
        if len(word) < 2:
            logger.error(
                f"Name received from {
                    request.client.host} has a word with less than 2 characters"
            )
            raise HTTPException(
                status_code=400, detail="Name must have at least 2 characters"
            )
    if not user_details.get("email"):
        logger.error(f"Empty email received from {client_ip}")
        raise HTTPException(status_code=400, detail="Email missing in user details")
    email = user_details.get("email")
    pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    if not re.match(pattern, email):
        logger.error(f"Invalid email received from {client_ip}")
        raise HTTPException(status_code=400, detail="Invalid email format")
    return json_data


def validate_message(request: Request, json_data):
    """
    Function to validate the message received in the request
    - This function is invoked after the JSON validation
    - It checks if the message is present and has at most 1000 characters
    - It also checks if the chat_uid is present in the request
    """
    client_ip = request.client.host

    if not json_data.get("chat_uid"):
        logger.error(f"Empty chat_uid received from {client_ip}")
        raise HTTPException(status_code=400, detail="ChatUID missing in request")

    if not json_data.get("message"):
        logger.error(f"Empty message received from {client_ip}")
        raise HTTPException(status_code=400, detail="Message missing in request")
    message = json_data.get("message")
    if len(message) > 1000:
        logger.error(
            f"Message received from {
                client_ip} has more than 1000 characters"
        )
        raise HTTPException(
            status_code=400, detail="Message must have at most 1000 characters"
        )


async def validate_chat_uid(json_data: dict):
    """
    Function to validate the chat UID in the request
    - This function is used to check if the chat uid is assigned to the same user or not
    """
    if not json_data.get("chat_uid"):
        logger.error("Chat UID missing in request")
        raise HTTPException(status_code=400, detail="Chat UID missing in request")
    user = await User.get_or_none(
        email=json_data.get("user_details")["email"],
        name=json_data.get("user_details")["name"],
    )
    if not user:
        logger.error("User not found")
        raise HTTPException(status_code=400, detail="User not found")
    if json_data.get("chat_uid") not in user.assigned_chats:
        logger.error("Chat UID not assigned to user")
        raise HTTPException(status_code=400, detail="Chat UID not assigned to user")
