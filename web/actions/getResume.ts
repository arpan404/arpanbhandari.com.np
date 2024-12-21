import { gql } from '@apollo/client';
import fetchGraphQL from '@/actions/fetchGraphQL';
import exp from 'constants';

interface Resume {
  resume: {
    url: string;
  };
}

type ResumeQueryResponse = {
  data: null | {
    resume: Resume;
  };
};

const query = gql`
  query getResume {
    resume {
      resume {
        url
      }
    }
  }
`;
let lastFetchTime = 0;
const REFRESH_INTERVAL = 60 * 60 * 1000 * 60 * 1; // to refresh every 1 hour

export default async function getResume() {
  const currentTime = Date.now();
  const shouldRefetch = currentTime - lastFetchTime > REFRESH_INTERVAL;
  const data = await fetchGraphQL<ResumeQueryResponse>(
    query,
    shouldRefetch ? 'network-only' : 'network-only'
  );
  return data;
}
