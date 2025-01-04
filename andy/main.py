from pathlib import Path
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter
from slowapi.middleware import SlowAPIMiddleware
from slowapi.util import get_remote_address
from dotenv import load_dotenv
import re
from app.chat import chat
from app.logger import log

logger = log(
    logger_name="api_logger",
    log_file="api.log",
    log_dir="logs"
)

app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)
load_dotenv()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://arpanbhandari.com.np"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)


@app.get("/")
@limiter.limit("10/minute")
async def read_root(request: Request):
    client_ip = request.client.host
    logger.info(f"Root endpoint accessed by {client_ip}")
    return JSONResponse(
        status_code=200,
        content={"message": "Hey there! Andy is busy serving the users."},
    )


@app.post("/chat")
@limiter.limit("10/minute")
async def andy_chat(request: Request):
    client_ip = request.client.host
    logger.info(f"Chat endpoint accessed by {client_ip}")

    referrer = request.headers.get("referer")
    if referrer != "https://arpanbhandari.com.np":
        logger.warning(f"Forbidden access attempt from {
                       client_ip} with referrer: {referrer}")
        raise HTTPException(status_code=403, detail="Forbidden")

    try:
        try:
            json_data = await request.json()
        except ValueError as e:
            logger.error(f"Invalid JSON data received from {
                         client_ip}: {str(e)}")
            raise HTTPException(
                status_code=400,
                detail="Invalid JSON data in request"
            )

        logger.info(f"Received chat request from {client_ip}")

        if not json_data:
            logger.error(f"Empty JSON data received from {client_ip}")
            raise HTTPException(
                status_code=400,
                detail="Empty JSON data in request"
            )

        user_details = json_data.get("user_details")
        if not user_details:
            logger.error(f"Empty user details received from {client_ip}")
            raise HTTPException(
                status_code=400,
                detail="User details missing in request"
            )

        if not user_details.get("name"):
            logger.error(f"Empty name received from {client_ip}")
            raise HTTPException(
                status_code=400,
                detail="Name missing in user details"
            )
        name = user_details.get("name")
        if len(name.split()) > 4:
            logger.error(f"Name received from {
                         client_ip} has more than 4 words")
            raise HTTPException(
                status_code=400,
                detail="Name must have at most 4 words"
            )
        if len(name) > 50:
            logger.error(f"Name received from {
                         client_ip} has more than 50 characters")
            raise HTTPException(
                status_code=400,
                detail="Name must have at most 50 characters"
            )
        for word in name.split():
            if len(word) < 2:
                logger.error(f"Name received from {
                             client_ip} has a word with less than 2 characters")
                raise HTTPException(
                    status_code=400,
                    detail="Each word in name must have at least 2 characters"
                )

        if not user_details.get("email"):
            logger.error(f"Empty email received from {client_ip}")
            raise HTTPException(
                status_code=400,
                detail="Email missing in user details"
            )
        email = user_details.get("email")
        # validate email use regex or email-validator
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(pattern, email):
            logger.error(f"Invalid email received from {client_ip}")
            raise HTTPException(
                status_code=400,
                detail="Invalid email format"
            )
        message = json_data.get("message")
        if not message or len(message) == 0:
            logger.error(f"Empty message received from {client_ip}")
            raise HTTPException(
                status_code=400,
                detail="Message missing in request"
            )
        if len(message) > 500:
            logger.error(f"Message received from {
                         client_ip} has more than 500 characters")
            raise HTTPException(
                status_code=400,
                detail="Message must have at most 500 characters"
            )
        message_uid = json_data.get("message_uid")
        if not message_uid or len(message_uid) == 0:
            logger.error(f"Empty messageUID received from {client_ip}")
            raise HTTPException(
                status_code=400,
                detail="MessageUID missing in request"
            )

        current_url = json_data.get("current_url")
        if not current_url:
            logger.error(f"Empty current_url received from {client_ip}")
            raise HTTPException(
                status_code=400,
                detail="CurrentURL missing in request"
            )

        response = await chat(request, json_data)
        logger.info(f"Successfully processed chat request from {client_ip}")

        return response

    except HTTPException as e:
        # Directly raise HTTPException if caught
        raise e

    except Exception as e:
        # Handle unexpected server errors
        logger.error(f"Internal server error for {
                     client_ip}: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="Internal server error"
        )


@app.exception_handler(403)
async def forbidden_handler(request: Request, exc: HTTPException):
    logger.warning(f"403 Forbidden access from {request.client.host}")
    return JSONResponse(
        status_code=403,
        content={
            "message": "Forbidden. You don't have permission to access this resource."
        },
    )


@app.exception_handler(429)
async def rate_limit_exceeded_handler(request: Request, exc):
    logger.warning(f"Rate limit exceeded for {request.client.host}")
    return JSONResponse(
        status_code=429,
        content={"message": "Too many requests. Please try again later."},
    )


@app.exception_handler(404)
async def custom_404_handler(request: Request, exc: HTTPException):
    logger.warning(f"404 Not Found: {request.url} accessed by {
                   request.client.host}")
    return JSONResponse(
        status_code=404,
        content={"message": "Not Found. Broken URL."},
    )


@app.exception_handler(500)
async def internal_server_error_handler(request: Request, exc):
    logger.error(f"500 Internal Server Error for {request.client.host}")
    return JSONResponse(
        status_code=500,
        content={"message": "Internal Server Error. Please try again later."},
    )


@app.exception_handler(405)
async def method_not_allowed_handler(request: Request, exc: HTTPException):
    logger.warning(f"405 Method Not Allowed: {request.method} at {
                   request.url} accessed by {request.client.host}")
    return JSONResponse(
        status_code=405,
        content={"message": "Method Not Allowed. Please check the request method."},
    )
