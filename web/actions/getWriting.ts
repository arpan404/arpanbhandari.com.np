import { gql } from '@apollo/client';
import fetchGraphQL from '@/actions/fetchGraphQL';
import { WritingQueryResponse } from '@/types/response';

const query = gql`
  query getWriting($uid: String!) {
    articles(filters: { uid: { eq: $uid } }) {
      description
      uid
      title
      body
      thumbnail {
        url
      }
      createdAt
      updatedAt
      type: article_type {
        name: type
        uid
      }
    }
  }
`;
/**
 * Fetches the writing from the API
 * @param {string} uid
 * @returns {Promise<WritingQueryResponse>}
 */
const getWriting = async (uid: string): Promise<WritingQueryResponse> => {
  try {
    const data = await fetchGraphQL<WritingQueryResponse>(
      query,
      `writing-single-${uid}`,
      60 * 60 * 3, // 3 hour
      { uid: uid }
    );

    if (data) {
      if (!data.articles || data.articles.length === 0) {
        return null;
      }
    }
    return data;
  } catch (e: unknown) {
    console.error(e);
    return null;
  }
};

export default getWriting;
