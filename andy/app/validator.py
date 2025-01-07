from fastapi import HTTPException, Request
from app.logger import log
import re

logger = log(
    logger_name="api_logger",
    log_file="api.log",
    log_dir="logs"
)


def referrer_validator(request: Request):
    client_ip = request.client.host
    referrer = request.headers.get("referer")
    if referrer != "https://arpanbhandari.com.np":
        logger.warning(f"Forbidden access attempt from {
                       client_ip} with referrer: {referrer}")
        raise HTTPException(status_code=403, detail="Forbidden")


async def user_json_validator(request):
    client_ip = request.client.host
    try:
        json_data = await request.json()
    except ValueError as e:
        logger.error(f"Invalid JSON data received from {
                     request.client.host}: {str(e)}")
        raise HTTPException(
            status_code=400,
            detail="Invalid JSON data in request"
        )
    if not json_data:
        logger.error(f"Empty JSON data received from {
                     request.client.host}")
        raise HTTPException(
            status_code=400,
            detail="Empty JSON data in request"
        )
    user_details = json_data.get("user_details")
    if not user_details:
        logger.error(f"Empty user details received from {
                     request.client.host}")
        raise HTTPException(
            status_code=400,
            detail="User details missing in request"
        )
    if not user_details.get("name"):
        logger.error(f"Empty name received from {request.client.host}")
        raise HTTPException(
            status_code=400,
            detail="Name missing in user details"
        )
    name = user_details.get("name")
    if len(name.split()) > 4:
        logger.error(f"Name received from {
                     request.client.host} has more than 4 words")
        raise HTTPException(
            status_code=400,
            detail="Name must have at most 4 words"
        )
    if len(name) > 50:
        logger.error(f"Name received from {
                     request.client.host} has more than 50 characters")
        raise HTTPException(
            status_code=400,
            detail="Name must have at most 50 characters"
        )
    for word in name.split():
        if len(word) < 2:
            logger.error(f"Name received from {
                         request.client.host} has a word with less than 2 characters")
            raise HTTPException(
                status_code=400,
                detail="Name must have at least 2 characters"
            )
    if not user_details.get("email"):
        logger.error(f"Empty email received from {client_ip}")
        raise HTTPException(
            status_code=400,
            detail="Email missing in user details"
        )
    email = user_details.get("email")
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(pattern, email):
        logger.error(f"Invalid email received from {client_ip}")
        raise HTTPException(
            status_code=400,
            detail="Invalid email format"
        )
    return json_data


async def message_api_data_validaror(request: Request, json_data):
    client_ip = request.client.host

    if not json_data.get("chat_uid"):
        logger.error(f"Empty chat_uid received from {client_ip}")
        raise HTTPException(
            status_code=400,
            detail="ChatUID missing in request"
        )

    if not json_data.get("message"):
        logger.error(f"Empty message received from {client_ip}")
        raise HTTPException(
            status_code=400,
            detail="Message missing in request"
        )
    message = json_data.get("message")
    if len(message) > 500:
        logger.error(f"Message received from {
                     client_ip} has more than 500 characters")
        raise HTTPException(
            status_code=400,
            detail="Message must have at most 500 characters"
        )

    current_url = json_data.get("current_url")
    if not current_url:
        logger.error(f"Empty current_url received from {client_ip}")
        raise HTTPException(
            status_code=400,
            detail="CurrentURL missing in request"
        )
    if not current_url.startswith("https://arpanbhandari.com.np"):
        logger.error(f"Invalid current_url received from {client_ip}")
        raise HTTPException(
            status_code=400,
            detail="Invalid current_url"
        )
