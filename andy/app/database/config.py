import os
from dotenv import load_dotenv
from tortoise import Tortoise

load_dotenv()

DATABASE_CONFIG = {
    "connections": {
        "default": f"postgres://{os.getenv('DATABASE_USERNAME')}:{os.getenv('DATABASE_PASSWORD')}@{os.getenv('DATABASE_HOST')}:{os.getenv('DATABASE_PORT')}/{os.getenv('DATABASE_NAME') or ''}"
    },
    "apps": {
        "models": {
            "models": ["app.database.models"],
            "default_connection": "default",
        }
    },
}


async def init_db():
    await Tortoise.init(config=DATABASE_CONFIG)
    await Tortoise.generate_schemas()


async def close_db():
    await Tortoise.close_connections()
