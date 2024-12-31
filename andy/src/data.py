# import requests
# import aiohttp
# class Data:
#     def __init__(self):
#         self.projects = []
#         self.wrtings = []
#         self.skills = []

#     async def fetch_graphql(self, endpoint:str, query:str, variables=None):
#         async with aiohttp.ClientSession() as session:
#             async with session.post(
#                 url=endpoint,
#                 json={'query': query, 'variables': variables or {}}
#             ) as response:
#                 if response.status != 200:
#                     raise Exception(f"Query failed with status {response.status}: {await response.text()}")
#                 return await response.json()
