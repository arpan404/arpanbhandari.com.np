from slowapi import Limiter
from dotenv import load_dotenv
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
from slowapi.util import get_remote_address
from slowapi.middleware import SlowAPIMiddleware
from fastapi.middleware.cors import CORSMiddleware
from fastapi import BackgroundTasks, FastAPI, HTTPException, Request

from app.chat import chat
from app.logger import log
from app.uid import gen_uid as generate_uid
from app.database.config import close_db, init_db
from app.validation import validate_origin, validate_json, validate_message

logger = log(logger_name="api_logger", log_file="api.log", log_dir="logs")

app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)
load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield
    await close_db()


app = FastAPI(lifespan=lifespan, docs_url=None, redoc_url=None, openapi_url=None)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://www.arpanbhandari.com.np", "http://localhost:3000"],
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


@app.post("/gen-uid")
@limiter.limit("5/minute")
async def gen_uid(request: Request):
    try:
        client_ip = request.client.host
        logger.info(f"UID generation endpoint accessed by {client_ip}")
        validate_origin(request)
        json_data = await validate_json(request)
        return await generate_uid(request, json_data)
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(
            f"Internal server error for {
                client_ip}: {str(e)}",
            exc_info=True,
        )
        raise HTTPException(status_code=500, detail="Internal server error")


@app.post("/chat")
@limiter.limit("10/minute")
@limiter.limit("200/day")
async def andy_chat(request: Request, background_tasks: BackgroundTasks):
    client_ip = request.client.host
    logger.info(f"Chat endpoint accessed by {client_ip}")

    validate_origin(request)
    try:
        logger.info(f"Received chat request from {client_ip}")
        json_data = await validate_json(request)
        validate_message(request, json_data)
        response = await chat(request, json_data, background_tasks)
        logger.info(f"Successfully processed chat request from {client_ip}")
        return response

    except HTTPException as e:
        raise e

    except Exception as e:
        logger.error(
            f"Internal server error for {
                client_ip}: {str(e)}",
            exc_info=True,
        )
        raise HTTPException(status_code=500, detail="Internal server error")


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
    logger.warning(
        f"404 Not Found: {request.url} accessed by {
            request.client.host}"
    )
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
    logger.warning(
        f"405 Method Not Allowed: {request.method} at {
            request.url} accessed by {request.client.host}"
    )
    return JSONResponse(
        status_code=405,
        content={"message": "Method Not Allowed. Please check the request method."},
    )
