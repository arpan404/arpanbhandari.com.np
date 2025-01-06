import aiohttp
from cachetools import TTLCache
import os
from bs4 import BeautifulSoup
from app.logger import log

cache = TTLCache(maxsize=20, ttl=3600)

class Data:
    def __init__(self):
        self.host = os.getenv("STRAPI_HOST")
        self.__token = os.getenv("STRAPI_TOKEN")
        self.__endpoint = f"{self.host}/graphql"
        self.logger = log(
            logger_name="data_logger",
            log_file="data.log",
            log_dir="logs"
        )

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
                        self.logger.error(
                            f"Error fetching graphql endpoint: Response Status - {response.status}")
                        return None
                    return await response.json()
        except Exception as e:
            self.logger.error(f"Error fetching graphql endpoint: {str(e)}")
            return None

    async def get_projects(self):
        if 'projects' in cache:
            self.logger.info("Projects fetched from cache")
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
            self.logger.error("Error fetching projects, response is None")
            return []
        if not response['data']:
            self.logger.error("Error fetching projects, data is None")
            return []
        if not response['data']['projects']:
            self.logger.error("Error fetching projects, projects is None")
            return []
        if len(response['data']['projects']) == 0:
            self.logger.error("Error fetching projects, projects length is 0")
            return []
        projects = response['data']['projects']
        self.logger.info(
            "Projects fetched from graphql endpoint, caching them")

        for project in projects:
            if not project['technologiesUsed'] or len(project['technologiesUsed']) == 0:
                project['technologiesUsed'] = []
            if not project['projectType'] or len(project['projectType']) == 0:
                project['projectType'] = []
            project['technologiesUsed'] = [tech['skill']['name']
                                           for tech in project['technologiesUsed']]
            project['projectType'] = [projectType['skill']['name']
                                      for projectType in project['projectType'] if projectType and projectType['skill']]
        cache['projects'] = projects
        return projects
    
    async def get_a_project(self, uid: str):
        cache_name = f'project-${uid}'
        if cache_name in cache:
            self.logger.info("Project fetched from cache")
            return cache[cache_name]
        query = """
            query getProject($uid: String!) {
                projects(filters: { uid: { eq: $uid } }) {
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
        response = await self.__fetch_graphql(query, {'uid': uid})
        if not response:
            self.logger.error("Error fetching project, response is None")
            return None
        if not response['data']:
            self.logger.error("Error fetching project, data is None")
            return None
        if not response['data']['projects']:
            self.logger.error("Error fetching project, projects is None")
            return None
        if len(response['data']['projects']) == 0:
            self.logger.error("Error fetching project, projects length is 0")
            return None
        project = response['data']['projects'][0]
        self.logger.info(
            "Project fetched from graphql endpoint, caching it")
        if not project['technologiesUsed'] or len(project['technologiesUsed']) == 0:
            project['technologiesUsed'] = []
        if not project['projectType'] or len(project['projectType']) == 0:
            project['projectType'] = []
        project['technologiesUsed'] = [tech['skill']['name']
                                       for tech in project['technologiesUsed']]
        project['projectType'] = [projectType['skill']['name']
                                  for projectType in project['projectType'] if projectType and projectType['skill']]
        cache[cache_name] = project
        return project     

    async def get_skills(self):
        if 'skills' in cache:
            self.logger.info("Skills fetched from cache")
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
            self.logger.error("Error fetching skills, response is None")
            return []

        if not response['data']:
            self.logger.error("Error fetching skills, data is None")
            return []

        if not response['data']['skills']:
            self.logger.error("Error fetching skills, skills is None")
            return []

        if len(response['data']['skills']) == 0:
            self.logger.error("Error fetching skills, skills length is 0")
            return []

        skills = response['data']['skills']
        self.logger.info("Skills fetched from graphql endpoint, caching them")

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
            self.logger.info("Writings fetched from cache")
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
        if not response:
            self.logger.error("Error fetching writings, response is None")
            return []

        if not response['data']:
            self.logger.error("Error fetching writings, data is None")
            return []

        if not response['data']['articles'] or len(response['data']['articles']) == 0:
            self.logger.error("Error fetching writings, articles is None")
            return []

        writings = response['data']['articles']
        self.logger.info(
            "Writings fetched from graphql endpoint, caching them")
        cache['all_writings'] = writings
        return writings

    async def get_a_writings(self, uid: str):
        cache_name = f'writings-${uid}'
        if cache_name in cache:
            self.logger.info("Writing fetched from cache")
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
        response = await self.__fetch_graphql(query, {'uid': uid})
        if not response:
            self.logger.error("Error fetching writing, response is None")
            return None
        if not response['data']:
            self.logger.error("Error fetching writing, data is None")
            return None
        if not response['data']['articles']:
            self.logger.error("Error fetching writing, articles is None")
            return None
        if len(response['data']['articles']) == 0:
            self.logger.error("Error fetching writing, articles length is 0")
            return None

        if not response['data']['articles'][0]['body']:
            self.logger.error("Error fetching writing, body is None")
            response['data']['articles'][0]['body'] = ''

        if response['data']['articles'][0]['body']:
            html_content = response['data']['articles'][0]['body']
            soup = BeautifulSoup(html_content, 'html.parser')
            response['data']['articles'][0]['body'] = soup.get_text()

        self.logger.info(
            "Writing fetched from graphql endpoint, caching it")
        cache[cache_name] = response['data']['articles'][0]

        return cache[cache_name]
