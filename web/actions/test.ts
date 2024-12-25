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

const getMusic = async (): Promise<MusicQueryResponse> => {
  try {
    const data = await fetchGraphQL<MusicQueryResponse>(
      query,
      'bg-music',
      60 * 60 * 2 // 2 hours
    );
    if (data.data) {
      if (!data.data.music.audio) {
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

export default getMusic;
