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
        60 * 60 * 3 // 3 hours
      );
      if (data) {
        if (!data.featuredProjects) {
          return null;
        }
      }
      return data;
    } catch (e: unknown) {
      console.error(e);
      return null;
    }
  };

export default getFeaturedProjects;
