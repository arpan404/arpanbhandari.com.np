import { gql } from '@apollo/client';
import fetchGraphQL from '@/actions/fetchGraphQL';
import { cookies } from 'next/headers';

type MusicQueryResponse = {
  data: null | {
    music: {
      file: {
        url: string;
      };
    };
  };
};

const query = gql`
  query getMusic {
    music {
      file: audio {
        url
      }
    }
  }
`;
let lastFetchTime = 0;
const REFRESH_INTERVAL = 60 * 1000 * 60 * 24 * 7; // refresh every 1 week

export default async function getMusic() {
  const currentTime = Date.now();
  const shouldRefetch = currentTime - lastFetchTime > REFRESH_INTERVAL;
  const data = await fetchGraphQL<MusicQueryResponse>(
    query,
    shouldRefetch ? 'network-only' : 'cache-first'
  );
  const cookieStore = await cookies();
  if (cookieStore) {
    if (data.data && data.data.music) {
      cookieStore.set('music', data.data.music.file.url);
      return;
    }
    cookieStore.set('music', '');
  }
}
