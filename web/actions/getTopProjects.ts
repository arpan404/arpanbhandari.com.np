import { Project } from '@/lib/types';
import { gql } from '@apollo/client';
import fetchGraphQL from '@/actions/fetchGraphQL';

const query = gql`
  query getTopProjects {
    topProject {
      project {
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
            technologies_used {
              ... on ComponentProjectsTags {
                skill {
                  name: skillName
                  uid: skillUID
                }
              }
            }
            project_type {
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

type TopProjectsQueryResponse = {
  data?: {
    topProject: {
      project: Array<{
        project: Project;
      }>;
    };
  };
};

let lastFetchTime = 0;
const REFRESH_INTERVAL = 60 * 1000 * 60 * 60 * 2; // refresh every 2 hours

export default async function getTopProjects() {
  const currentTime = Date.now();
  const shouldRefetch = currentTime - lastFetchTime > REFRESH_INTERVAL;
  const data = await fetchGraphQL<TopProjectsQueryResponse>(
    query,
    shouldRefetch ? 'network-only' : 'cache-first'
  );
  return data;
}
