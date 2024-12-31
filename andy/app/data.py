from dotenv import load_dotenv
import aiohttp
from cachetools import TTLCache
import os
cache = TTLCache(maxsize=20, ttl=3600)


class Data:
    def __init__(self):
        self.host = os.getenv("STRAPI_HOST")
        self.__token = os.getenv("STRAPI_TOKEN")
        self.__endpoint = f"{self.host}/graphql"

    async def __fetch_graphql(self, query: str, variables=None):
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    url=self.__endpoint,
                    json={'query': query, 'variables': variables or {}}, headers={
                        'Content-Type': 'application/json',
                        'Authorization': f'Bearer {self.__token}'
                    }
                ) as response:
                    if response.status != 200:
                        return None
                    a = await response.json()
                    print(a)
                    return None
        except Exception as e:
            return None

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
        if response:
            cache['projects'] = response
        
        # projects = response
        return response
