import openai
import os
from app.logger import log
from typing import List
from fastapi import HTTPException

openai.api_key = os.getenv("OPENAI_API_KEY")

logger = log(
    logger_name="chatgpt_logger",
    log_file="chatgpt.log",
    log_dir="logs"
)

SYSTEM_PROMPT = {
    "role": "system",
    "content": [
        {
            "type": "text",
            "text": "Name: Andy\nDescription: An AI assistant . You are integrated into developer's portfolio website. Designed to assist visitors know about the developer and his work.\nYou must responds to user in friendly way in concise manners in markdown format. Respond just like a real human. Provide only necessary information like if someone ask about project, tell him about it in paragraphs rather than points. Feel free to use different chatting type. \nOnly responds to queries related to Andy and the developer and his works. For example, if someone asked to write code, or paraphrase sentence, don't do it. Kindly refuse to perform or answer any queries which are not related to portfolio website and its content.\n\nDeveloper Details:\n- Name: Arpan Bhandari\n- About: A student and experienced developer passionate about experimenting with technologies and continuously learning.\n- Portfolio: https://arpanbhandari.com.np\n- Email: arpanworkmail7@gmail.com\n- Education: Pursuing a B.Sc. in Computer Science at the University of Southern Mississippi\n\nSocials:\n- GitHub: @arpan404\n- LinkedIn: @arpan404\n- Twitter: @arpanbhandari01\n- Instagram: @the_d3vs\n\nNote: If writings uid is provided, it's link should be https://arpanbhandari.com.np/writings/{uid}\nIf you need uid of any writings or projects, you must use the tool to fetch all the data."
        }
    ]
}


async def chatgpt(messages: List) -> str:
    try:
        client = openai.AsyncOpenAI()
        logger.info(f"ChatGPT request: {messages}")
        response = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                SYSTEM_PROMPT, *[message for message in messages]
            ],
            response_format={
                "type": "text"
            },
            tools=[
                {
                    "type": "function",
                    "function": {
                        "name": "get_projects",
                        "strict": False,
                        "parameters": {
                            "type": "object",
                            "required": [],
                            "properties": {}
                        },
                        "description": "Returns all the projects that Arpan has worked on in json format"
                    }
                },
                {
                    "type": "function",
                    "function": {
                        "name": "get_skills",
                        "strict": False,
                        "parameters": {
                            "type": "object",
                            "required": [],
                            "properties": {}
                        },
                        "description": "Returns all the skills in tech Arpan has"
                    }
                },
                {
                    "type": "function",
                    "function": {
                        "name": "get_resume",
                        "strict": False,
                        "parameters": {
                            "type": "object",
                            "required": [],
                            "properties": {}
                        },
                        "description": "Returns the url of resume of Arpan if found otherwise returns null"
                    }
                },
                {
                    "type": "function",
                    "function": {
                        "name": "get_writings",
                        "strict": False,
                        "parameters": {
                            "type": "object",
                            "required": [],
                            "properties": {}
                        },
                        "description": "Returns the list of articles/writings written by Arpan"
                    }
                },
                {
                    "type": "function",
                    "function": {
                        "name": "get_a_writings",
                        "strict": True,
                        "parameters": {
                            "type": "object",
                            "required": [
                                "symbol"
                            ],
                            "properties": {
                                "symbol": {
                                    "type": "string",
                                    "description": "uid of the writings"
                                }
                            },
                            "additionalProperties": False
                        },
                        "description": "Get the detail of a certain uid"
                    }
                },
                {
                    "type": "function",
                    "function": {
                        "name": "send_message",
                        "description": "User can send message to the developer via this",
                        "parameters": {
                            "type": "object",
                            "properties": {
                                "subject": {
                                    "type": "string",
                                    "description": "Topic user want to discuss about with the developer"
                                },
                                "message": {
                                    "type": "string",
                                    "description": "Message user want to send to the developer"
                                }
                            },
                            "required": [
                                "subject",
                                "message"
                            ]
                        },
                        "strict": False
                    }
                },
                {
                    "type": "function",
                    "function": {
                        "name": "schedule_meeting",
                        "description": "User can schedule a meeting with the developer. User will be contacted by the developer once the meeting is schedule. User will get the details about meeting through mail.",
                        "parameters": {
                            "type": "object",
                            "properties": {
                                "topic": {
                                    "type": "string",
                                    "description": "What user want to discuss about in meeting"
                                }
                            },
                            "required": []
                        },
                        "strict": False
                    }
                }
            ],
            temperature=0.8,
            max_completion_tokens=500,
            top_p=1,
            frequency_penalty=0.3,
            presence_penalty=0.25
        )
        logger.info(f"ChatGPT response: {response}")
        return response
    except Exception as e:
        logger.error(f"ChatGPT error: {str(e)}")
        raise e
