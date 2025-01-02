import aiohttp
from cachetools import TTLCache
import os
from bs4 import BeautifulSoup

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
                    print(response)
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

    async def get_skills(self):
        print(cache)
        if 'skills' in cache:
            return cache['skills']

        query = """
        query getSkills{
          skills {
            name: skillName
            type: skillType {
              name: skillType
            }
          }
        }
      """
        response = await self.__fetch_graphql(query)
        if not response:
            return []

        if not response['data']:
            return []

        if not response['data']['skills']:
            return []

        if len(response['data']['skills']) == 0:
            return []

        skills = response['data']['skills']

        for skill in skills:
            if not skill['type']:
                skill['type'] = ''
            else:
                skill['type'] = skill['type']['name']
        if not skills or len(skills) == 0:
            return []
        cache['skills'] = skills
        return skills

    async def get_all_writings(self):
        if 'all_writings' in cache:
            return cache['all_writings']

        query = """
        query getWritings{
          articles(sort: "createdAt:desc") {
            description
            uid
            title
            createdAt
            type: article_type {
              name: type
              uid
            }
          }
        }
        """
        response = await self.__fetch_graphql(query)
        print(response)
        if not response:
            return []

        if not response['data']:
            return []

        if not response['data']['articles'] or len(response['data']['articles']) == 0:
            return []

        writings = response['data']['articles']
        cache['all_writings'] = writings
        return writings

    async def get_a_writings(self, uid: str):
        cache_name = f'writings-${uid}'
        if cache_name in cache:
            return cache[cache_name]
        query = """
            query getWriting($uid: String!) {
                articles(filters: { uid: { eq: $uid } }) {
                    description
                    uid
                    title
                    body
                    createdAt
                }
            }
        """
        response = self.__fetch_graphql(query, {'uid': uid})
        if not response:
            return None
        if not response['data']:
            return None
        if not response['data']['articles']:
            return None
        if len(response['data']['articles']) == 0:
            return None

        if not response['data']['articles'][0]['body']:
            response['data']['articles'][0]['body'] = ''

        if response['data']['articles'][0]['body']:
            html_content = response['data']['articles'][0]['body']
            soup = BeautifulSoup(html_content, 'html.parser')
            response['data']['articles'][0]['body'] = soup.get_text()

        cache[cache_name] = response['data']['articles'][0]

        return cache[cache_name]
