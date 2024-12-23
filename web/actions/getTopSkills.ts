import { gql } from '@apollo/client';
import fetchGraphQL from '@/actions/fetchGraphQL';
interface TopSkill {
  skill: {
    name: string;
    uid: string;
    type?: {
      name: string;
      uid: string;
    };
  };
}

type TopSkillsQueryResponse = {
  data?: {
    topSkill?: {
      skills: TopSkill[];
    };
  };
};
const query = gql`
  query getTopSkills {
    topSkill {
      skills: skill_details {
        ... on ComponentProjectsTags {
          skill {
            name: skillName
            uid: skillUID
            type: skillType {
              name: skillType
              uid: skillTypeUID
            }
          }
        }
      }
    }
  }
`;

let lastFetchTime = 0;
const REFRESH_INTERVAL = 60 * 1000 * 60 * 60 * 2; // refresh every 2 hours

export default async function getTopSkills() {
  const currentTime = Date.now();
  const shouldRefetch = currentTime - lastFetchTime > REFRESH_INTERVAL;
  const data = await fetchGraphQL<TopSkillsQueryResponse>(
    query,
    shouldRefetch ? 'network-only' : 'cache-first'
  );
  return data;
}
