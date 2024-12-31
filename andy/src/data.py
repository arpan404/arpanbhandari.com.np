import aiohttp
from cachetools import TTLCache
import os
import asyncio
cache = TTLCache(maxsize=20, ttl=3600)
from dotenv import load_dotenv

class Data:
    def __init__(self):
        load_dotenv()
        self.host = os.getenv("STRAPI_HOST")
        self.__token = os.getenv("STRAPI_TOKEN")
        self.__endpoint = f"{self.host}/graphql"

    async def __fetch_graphql(self, query:str, variables=None):
        async with aiohttp.ClientSession() as session:
            async with session.post(
                url=self.__endpoint,
                json={'query': query, 'variables': variables or {}}
                ,headers={
                    'Content-Type': 'application/json',
                    'Authorization': f'Bearer {self.__token}'
                }
            ) as response:
                if response.status != 200:
                    raise Exception(f"Query failed with status {response.status}: {await response.text()}")
                return await response.json()

    async def fetch_projects(self):
        if 'projects' in cache:
            return cache['projects']
        query = """
        query getProjects{
          projects(sort: "completed_date:desc") {
            name
            uid
            thumbnail {
              url
            }
            shortDescription: short_description
            longDescription: long_description
            liveURL
            codeURL
            article {
              uid
            }
            technologiesUsed: technologies_used {
              skill {
                name: skillName
                uid: skillUID
                logo {
                  url
                }
              }
            }
            projectType: project_type {
              skill {
                name: skillName
                uid: skillUID
              }
            }
          }
        }
        """
        response = await self.__fetch_graphql(query)
        # projects = response
        print(response)


a = Data()
asyncio.run(a.fetch_projects())
