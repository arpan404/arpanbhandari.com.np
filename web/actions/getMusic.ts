'use server';
import { gql } from '@apollo/client';
import fetchGraphQL from '@/actions/fetchGraphQL';
import { MusicQueryResponse } from '@/types/response';

const query = gql`
  query {
    music {
      audio {
        url
      }
    }
  }
`;
/**
 * Fetches the background music from the API
 * @returns {Promise<MusicQueryResponse>}
 * */
const getMusic = async (): Promise<MusicQueryResponse> => {
  try {
    const data = await fetchGraphQL<MusicQueryResponse>(
      query,
      'bg-music',
      60 * 60 * 2 // 2 hours
    );
    if (data) {
      if (!data.music.audio) {
        return null;
      }
    }
    return data;
  } catch (e: unknown) {
    console.error(e);
    return null;
  }
};

export default getMusic;
