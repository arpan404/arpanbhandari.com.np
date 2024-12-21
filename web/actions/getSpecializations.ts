import { gql } from '@apollo/client';
import fetchGraphQL from '@/actions/fetchGraphQL';

interface Specialization {
  skill: {
    logo: {
      url: string;
    };
    name: string;
    uid: string;
    type: {
      name: string;
      uid: string;
    };
  };
}

type SpecializationQueryResponse = {
  data: null | {
    specializations: Specialization[];
  };
};

const query = gql`
  query getSpecializations {
    specializations {
      skill {
        logo {
          url
        }
        name: skillName
        uid: skillUID
        type: skillType {
          name: skillType
          uid: skillTypeUID
        }
      }
    }
  }
`;
let lastFetchTime = 0;
const REFRESH_INTERVAL = 60 * 1000 * 60;

export default async function getSpecializations() {
  const currentTime = Date.now();
  const shouldRefetch = currentTime - lastFetchTime > REFRESH_INTERVAL;
  const data = await fetchGraphQL<SpecializationQueryResponse>(
    query,
    shouldRefetch ? 'network-only' : 'cache-first'
  );
  return data;
}
