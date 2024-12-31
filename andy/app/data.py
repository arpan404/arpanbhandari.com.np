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
                    return await response.json()
        except Exception as e:
            return None

    async def get_projects(self):
        if 'projects' in cache:
            return cache['projects']
        query = """
        query getProjects{
          projects(sort: "completed_date:desc") {
            name
            uid
            shortDescription: short_description
            longDescription: long_description
            liveURL
            codeURL
            technologiesUsed: technologies_used {
              skill {
                name: skillName
              }
            }
            projectType: project_type {
              skill {
                name: skillName
              }
            }
          }
        }
        """
        response = await self.__fetch_graphql(query)
        if not response:
            return []
        if not response['data']:
            return []
        if not response['data']['projects']:
            return []
        if len(response['data']['projects']) == 0:
            return []
        projects = response['data']['projects']

        for project in projects:
            if not project['technologiesUsed'] or len(project['technologiesUsed']) == 0:
                project['technologiesUsed'] = []
            if not project['projectType'] or len(project['projectType']) == 0:
                project['projectType'] = []
            project['technologiesUsed'] = [tech['skill']['name']
                                           for tech in project['technologiesUsed']]
            print(project['projectType'])
            project['projectType'] = [projectType['skill']['name']
                                      for projectType in project['projectType'] if projectType and projectType['skill']]
        cache['projects'] = projects
        return projects


    # async def get_skills(self):
      