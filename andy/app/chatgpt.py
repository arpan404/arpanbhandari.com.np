from openai import AsyncOpenAI
import os

api_key = os.get("OPENAI_API")


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
        return response.choices[0].message
    except Exception as e:
        print(e)
        return "null"
