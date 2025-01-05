from contextlib import asynccontextmanager
from pathlib import Path
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter
from slowapi.middleware import SlowAPIMiddleware
from slowapi.util import get_remote_address
from dotenv import load_dotenv
from app.database.config import close_db, init_db
from app.chat import chat, gen_uid
from app.logger import log
import app.validator as validator
from app.database.models import User, Chat

logger = log(
    logger_name="api_logger",
    log_file="api.log",
    log_dir="logs"
)

app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)
load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield
    await close_db()


app = FastAPI(lifespan=lifespan)

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
    await User.create(name="Andy", email="arpan1@gmail.com")
    return JSONResponse(
        status_code=200,
        content={"message": "Hey there! Andy is busy serving the users."},
    )


@app.post("/gen-uid")
@limiter.limit("5/minute")
async def gen_uid(request: Request):
    try:
        client_ip = request.client.host
        logger.info(f"UID generation endpoint accessed by {client_ip}")
        validator.referrer_validator(request)
        json_data = await validator.user_json_validator(request)
        response = await gen_uid(json_data)
        logger.info(
            f"Successfully processed UID generation request from {client_ip}")
        return response
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Internal server error for {
                     client_ip}: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="Internal server error"
        )


@app.post("/chat")
@limiter.limit("10/minute")
async def andy_chat(request: Request):
    client_ip = request.client.host
    logger.info(f"Chat endpoint accessed by {client_ip}")

    validator.referrer_validator(request)
    try:
        logger.info(f"Received chat request from {client_ip}")
        json_data = await validator.user_json_validator(request)
        await validator.message_api_data_validaror(request, json_data)
        response = await chat(request, json_data)
        logger.info(f"Successfully processed chat request from {client_ip}")
        return response

    except HTTPException as e:
        raise e

    except Exception as e:
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
