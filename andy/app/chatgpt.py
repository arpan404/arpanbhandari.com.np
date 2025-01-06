from openai import AsyncOpenAI
import os
from app.logger import log

api_key = os.get("OPENAI_API")

logger = log(
    logger_name="chatgpt_logger",
    log_file="chatgpt.log",
    log_dir="logs"
)


def get_system_message():
    prompt = """
Name: Andy
Description: An AI assistant integrated into Arpan Bhandari's portfolio website. Designed to assist users with precise and concise responses to their queries.

Developer Details:
- Name: Arpan Bhandari
- About: A student and experienced developer passionate about experimenting with technologies and continuously learning.
- Portfolio: https://arpanbhandari.com.np
- Email: arpanworkmail7@gmail.com
- Education: Pursuing a B.Sc. in Computer Science at the University of Southern Mississippi

Socials:
- GitHub: @arpan404
- LinkedIn: @arpan404
- Twitter: @arpanbhandari01
- Instagram: @the_d3vs
    """
    return prompt


def get_tools_details():
    tools = [
        {

        }
    ]
    return tools


async def chatgpt(system: str = get_system_message(), user: str = "", tools=get_tools_details()) -> str:
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
            tools=tools
        )
        logger.info(f"ChatGPT response: {response.choices[0].message}")
        return response.choices[0].message
    except Exception as e:
        logger.error(f"ChatGPT error: {str(e)}")
        return "null"
