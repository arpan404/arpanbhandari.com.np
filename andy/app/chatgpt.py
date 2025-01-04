from openai import AsyncOpenAI
import os
from app.logger import log

api_key = os.get("OPENAI_API")

logger = log(
    logger_name="chatgpt_logger",
    log_file="chatgpt.log",
    log_dir="logs"
)


async def chatgpt(system: str, user: str) -> str:
    client = AsyncOpenAI(api_key)
    try:
        response = await client.chat.completions(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system},
                {"role": "user", "content": user},
            ],
            temperature=0.5,
            max_tokens=300,
        )
        logger.info(f"ChatGPT response: {response.choices[0].message}")
        return response.choices[0].message
    except Exception as e:
        logger.error(f"ChatGPT error: {str(e)}")
        return "null"
