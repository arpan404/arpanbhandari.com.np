import aiohttp
from cachetools import TTLCache
import os
from bs4 import BeautifulSoup
from app.logger import log

cache = TTLCache(maxsize=20, ttl=3600)


class Data:
    """
    A class that handles fetching data from Strapi CMS
    methods:
    - get_projects: Fetches all the projects from the Strapi CMS
    - get_a_project: Fetches a single project from the Strapi CMS
    - get_skills: Fetches all the skills from the Strapi CMS
    - get_all_writings: Fetches all the writings from the Strapi CMS
    - get_a_writings: Fetches a single writing from the Strapi CMS
    - get_resume: Fetches the resume from the Strapi CMS
    """

    def __init__(self):
        self.host = os.getenv("STRAPI_HOST")
        self.__token = os.getenv("STRAPI_TOKEN")
        self.__endpoint = f"{self.host}/graphql"
        self.logger = log(
            logger_name="data_logger", log_file="data.log", log_dir="logs"
        )

    async def __fetch_graphql(self, query: str, variables=None):
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    url=self.__endpoint,
                    json={"query": query, "variables": variables or {}},
                    headers={
                        "Content-Type": "application/json",
                        "Authorization": f"Bearer {self.__token}",
                    },
                ) as response:
                    if response.status != 200:
                        self.logger.error(
                            f"Error fetching graphql endpoint: Response Status - {
                                response.status}"
                        )
                        return None
                    return await response.json()
        except Exception as e:
            self.logger.error(f"Error fetching graphql endpoint: {str(e)}")
            return None

    async def get_projects(self):
        # Check if projects are in cache
        if "projects" in cache:
            self.logger.info("Projects fetched from cache")
            return cache["projects"]
        query = """
        query getProjects{
          projects(sort: "completed_date:desc") {
            name
            uid
            shortDescription: short_description
            liveURL
            codeURL
            completed_date
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
        # fetch the projects
        response = await self.__fetch_graphql(query)

        # validate the response
        if not response:
            self.logger.error("Error fetching projects, response is None")
            return []
        if not response["data"]:
            self.logger.error("Error fetching projects, data is None")
            return []
        if not response["data"]["projects"]:
            self.logger.error("Error fetching projects, projects is None")
            return []
        if len(response["data"]["projects"]) == 0:
            self.logger.error("Error fetching projects, projects length is 0")
            return []
        projects = response["data"]["projects"]
        self.logger.info("Projects fetched from graphql endpoint, caching them")

        # clean the response
        for project in projects:
            if not project["technologiesUsed"] or len(project["technologiesUsed"]) == 0:
                project["technologiesUsed"] = []
            if not project["projectType"] or len(project["projectType"]) == 0:
                project["projectType"] = []
            project["technologiesUsed"] = [
                tech["skill"]["name"] for tech in project["technologiesUsed"]
            ]
            project["projectType"] = [
                projectType["skill"]["name"]
                for projectType in project["projectType"]
                if projectType and projectType["skill"]
            ]
        # cache the response
        cache["projects"] = projects
        return projects

    async def get_a_project(self, uid: str):
        # Check if project is in cache
        cache_name = f"project-${uid}"
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
        # fetch the projects
        response = await self.__fetch_graphql(query, {"uid": uid})

        # validate the response
        if not response:
            self.logger.error("Error fetching project, response is None")
            return None
        if not response["data"]:
            self.logger.error("Error fetching project, data is None")
            return None
        if not response["data"]["projects"]:
            self.logger.error("Error fetching project, projects is None")
            return None
        if len(response["data"]["projects"]) == 0:
            self.logger.error("Error fetching project, projects length is 0")
            return None

        # project detail will come as a array so taking first element
        project = response["data"]["projects"][0]

        self.logger.info("Project fetched from graphql endpoint, caching it")

        # clean the response
        if not project["technologiesUsed"] or len(project["technologiesUsed"]) == 0:
            project["technologiesUsed"] = []
        if not project["projectType"] or len(project["projectType"]) == 0:
            project["projectType"] = []
        project["technologiesUsed"] = [
            tech["skill"]["name"] for tech in project["technologiesUsed"]
        ]
        project["projectType"] = [
            projectType["skill"]["name"]
            for projectType in project["projectType"]
            if projectType and projectType["skill"]
        ]

        # cache the response
        cache[cache_name] = project
        return project

    async def get_skills(self):
        # Check if skills are in cache
        if "skills" in cache:
            self.logger.info("Skills fetched from cache")
            return cache["skills"]

        query = """
        query getSkills{
          skills {
            name: skillName
          }
        }
        """

        # fetch the skills
        response = await self.__fetch_graphql(query)

        # validate the response
        if not response:
            self.logger.error("Error fetching skills, response is None")
            return []

        if not response["data"]:
            self.logger.error("Error fetching skills, data is None")
            return []

        if not response["data"]["skills"]:
            self.logger.error("Error fetching skills, skills is None")
            return []

        if len(response["data"]["skills"]) == 0:
            self.logger.error("Error fetching skills, skills length is 0")
            return []

        skills = response["data"]["skills"]
        self.logger.info("Skills fetched from graphql endpoint, caching them")
        if not skills or len(skills) == 0:
            return []

        # clean and cache the response
        skills = [skill["name"] for skill in skills]
        cache["skills"] = skills
        return skills

    async def get_all_writings(self):
        # Check if writings are in cache
        if "all_writings" in cache:
            self.logger.info("Writings fetched from cache")
            return cache["all_writings"]

        query = """
        query getWritings{
          articles(sort: "createdAt:desc") {
            description
            uid
            title
          }
        }
        """
        # fetch the writings
        response = await self.__fetch_graphql(query)

        # validate the response
        if not response:
            self.logger.error("Error fetching writings, response is None")
            return []

        if not response["data"]:
            self.logger.error("Error fetching writings, data is None")
            return []

        if not response["data"]["articles"] or len(response["data"]["articles"]) == 0:
            self.logger.error("Error fetching writings, articles is None")
            return []

        # cache the response
        writings = response["data"]["articles"]
        self.logger.info("Writings fetched from graphql endpoint, caching them")
        cache["all_writings"] = writings
        return writings

    async def get_a_writings(self, uid: str):
        # check if writing is in cache
        cache_name = f"writings-${uid}"
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
        # fetch the writing
        response = await self.__fetch_graphql(query, {"uid": uid})

        # validate the response
        if not response:
            self.logger.error("Error fetching writing, response is None")
            return None
        if not response["data"]:
            self.logger.error("Error fetching writing, data is None")
            return None
        if not response["data"]["articles"]:
            self.logger.error("Error fetching writing, articles is None")
            return None
        if len(response["data"]["articles"]) == 0:
            self.logger.error("Error fetching writing, articles length is 0")
            return None

        if not response["data"]["articles"][0]["body"]:
            self.logger.error("Error fetching writing, body is None")
            response["data"]["articles"][0]["body"] = ""

        # get only the text from the html content
        if response["data"]["articles"][0]["body"]:
            html_content = response["data"]["articles"][0]["body"]
            soup = BeautifulSoup(html_content, "html.parser")
            response["data"]["articles"][0]["body"] = soup.get_text()

        self.logger.info("Writing fetched from graphql endpoint, caching it")

        # cache the response
        cache[cache_name] = response["data"]["articles"][0]
        return cache[cache_name]

    async def get_resume(self):
        # Check if resume is in cache
        if "resume" in cache:
            self.logger.info("Resume fetched from cache")
            return cache["resume"]

        query = """
        query getResume{
          resume {
            resume: file {
              url
            }
          }
        }
        """

        # fetch the resume
        response = await self.__fetch_graphql(query)

        # validate the response
        if not response:
            self.logger.error("Error fetching resume, response is None")
            return None
        if not response["data"]:
            self.logger.error("Error fetching resume, data is None")
            return None
        if not response["data"]["resume"]:
            self.logger.error("Error fetching resume, resume is None")
            return None
        if not response["data"]["resume"]["resume"]:
            self.logger.error("Error fetching resume, resume is None")
            return None
        if not response["data"]["resume"]["resume"]["url"]:
            self.logger.error("Error fetching resume, url is None")
            return None

        # get the resume url and cache it
        resume = os.getenv("STRAPI_HOST") + response["data"]["resume"]["resume"]["url"]
        self.logger.info("Resume fetched from graphql endpoint, caching it")
        cache["resume"] = resume
        return resume
