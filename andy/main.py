from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter
from slowapi.middleware import SlowAPIMiddleware
from slowapi.util import get_remote_address
from dotenv import load_dotenv

# Initialize FastAPI app
app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)
load_dotenv()
# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://arpanbhandari.com.np"],  # Replace with your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Limiter setup
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

# Add SlowAPI middleware for rate limiting
app.add_middleware(SlowAPIMiddleware)

# Custom route with rate limiting
@app.get("/")
@limiter.limit("5/minute")
async def read_root(request: Request):  # Add 'request' parameter
    return JSONResponse(
        status_code=200,
        content={"message": "Hey there! Andy is busy serving the users."},
    )


# Custom handler for rate limit exceeded
@app.exception_handler(429)
async def rate_limit_exceeded_handler(request: Request, exc):
    return JSONResponse(
        status_code=429,
        content={"message": "Too many requests. Please try again later."},
    )

# Custom 404 handler
@app.exception_handler(404)
async def custom_404_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=404,
        content={"message": "Not Found. Broken URL."},
    )
