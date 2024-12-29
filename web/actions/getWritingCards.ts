'use server';
import { gql } from '@apollo/client';
import fetchGraphQL from '@/actions/fetchGraphQL';
import { WritingCardsQueryResponse } from '@/types/response';

const query = gql`
  query getAllWritings {
    articles(sort: "createdAt:desc") {
      description
      title
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

const specificQuery = gql`
  query getSpecificWritings($type: String) {
    articles(
      sort: "createdAt:desc"
      filters: { article_type: { uid: { eq: $type } } }
    ) {
      description
      title
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

const getWritings = async (
  type?: string
): Promise<WritingCardsQueryResponse> => {
  try {
    if (type && type !== 'all') {
      const data = await fetchGraphQL<WritingCardsQueryResponse>(
        specificQuery,
        `writings-${type}`,
        60 * 60, // 1 hour
        { type: type }
      );
      if (data) {
        if (!data.articles || data.articles.length === 0) {
          return null;
        }
      }
      return data;
    }
    const data = await fetchGraphQL<WritingCardsQueryResponse>(
      query,
      'writings-all',
      60 * 60 // 1 hour
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

export default getWritings;
