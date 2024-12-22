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
const REFRESH_INTERVAL = 2 * 60 * 1000 * 60; // to refresh every 2 hours

export default async function getResume() {
  const currentTime = Date.now();
  const shouldRefetch = currentTime - lastFetchTime > REFRESH_INTERVAL;
  const data = await fetchGraphQL<ResumeQueryResponse>(
    query,
    shouldRefetch ? 'network-only' : 'network-only'
  );
  return data;
}
