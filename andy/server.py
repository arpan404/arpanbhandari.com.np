import uvicorn

if __name__ == "__main__":
    uvicorn.run(
        "main:app",  # Replace 'main' with your Python file name if different
        host="localhost",  # Makes the server accessible externally
        port=8080,  # Specify your desired port
        reload=True  # Enable auto-reload for development
    )
