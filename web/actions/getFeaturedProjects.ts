import { gql } from '@apollo/client';
import fetchGraphQL from '@/actions/fetchGraphQL';
import { FeaturedProjectsQueryResponse } from '@/types/response';

const query = gql`
   query getFeaturedProjects {
      featuredProjects: featuredProject {
         projects {
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
      }
   }
`;

/**
 * Fetches the featured projects from the API
 * @returns {Promise<FeaturedProjectsQueryResponse>}
 */
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
