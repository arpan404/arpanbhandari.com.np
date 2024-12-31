import requests
import aiohttp
class Data:
    def __init__(self):
        self.projects = []
        self.wrtings = []
        self.skills = []

    async def __fetch_graphql(self, endpoint:str, query:str, variables=None):
        async with aiohttp.ClientSession() as session:
            async with session.post(
                url=endpoint,
                json={'query': query, 'variables': variables or {}}
            ) as response:
                if response.status != 200:
                    raise Exception(f"Query failed with status {response.status}: {await response.text()}")
                return await response.json()

    async def fetch_projects(self):
        query = """
        query getTaggedProjects($skillUID: String) {
          projects(
            filters: {
              or: [
                { technologies_used: { skill: { skillUID: { eq: $skillUID } } } }
                { project_type: { skill: { skillUID: { eq: $skillUID } } } }
              ]
            }
            sort: "completed_date:desc"
          ) {
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
