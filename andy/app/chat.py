from fastapi import Request
from fastapi.responses import JSONResponse


async def chat(request: Request):
    current_iteration = 0
    while current_iteration < 10:
        current_iteration += 1
        pass

    return JSONResponse(
        status_code=200,
        content={"message": "Hey there! Andy is busy serving the users."},
    )


async def chat_processor(system: str, user: str, ):
    pass
