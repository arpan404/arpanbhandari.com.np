import Project from '@/types/project';
import { gql } from '@apollo/client';
import fetchGraphQL from '@/actions/fetchGraphQL';
import { FeaturedProjectsQueryResponse } from '@/types/response';

const query = gql`
  query getFeaturedProjects {
    faturedProjects: featuredProject {
      projects {
        ... on ComponentProjectsProject {
          project {
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
              ... on ComponentProjectsTags {
                skill {
                  name: skillName
                  uid: skillUID
                  logo {
                    url
                  }
                }
              }
            }
            projectType: project_type {
              ... on ComponentProjectsTags {
                skill {
                  name: skillName
                  uid: skillUID
                }
              }
            }
          }
        }
      }
    }
  }
`;

const getFeaturedProjects =
  async (): Promise<FeaturedProjectsQueryResponse> => {
    try {
      const data = await fetchGraphQL<FeaturedProjectsQueryResponse>(
        query,
        'featured-projects',
        60 * 60 // 1 hour
      );
      if (data.data) {
        if (!data.data.featuredProjects) {
          data.data = null;
        }
      }
      return data;
    } catch (e: unknown) {
      console.error(e);
      return {
        data: null,
      };
    }
  };

export default getFeaturedProjects;
