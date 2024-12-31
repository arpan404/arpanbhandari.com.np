from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse

app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)

@app.get("/")
async def read_root():
    return JSONResponse(
        status_code=200,
        content={"message": "Hey there! Andy is busy serving the users."}
    )

@app.exception_handler(404)
async def custom_http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=404,
        content={"message": "Not Found. Broken URL."}
    )
