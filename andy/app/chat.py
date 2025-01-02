from fastapi import Request
from fastapi.responses import JSONResponse


async def chat(request: Request):
    return JSONResponse(
        status_code=200,
        content={"message": "Hey there! Andy is busy serving the users."},
    )
    pass


async def chat_processor(system: str, user: str, ):
    pass
