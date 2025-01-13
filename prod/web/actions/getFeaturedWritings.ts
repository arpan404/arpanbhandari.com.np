'use server';
import { gql } from '@apollo/client';
import fetchGraphQL from '@/actions/fetchGraphQL';
import { WritingCardsQueryResponse } from '@/types/response';

const query = gql`
   query getFeaturedWritings {
      articles(sort: "createdAt:desc", pagination: { limit: 7 }) {
         description
         uid
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
/**
 * Fetches the featured writings from the API
 * @returns {Promise<WritingCardsQueryResponse>}
 * */

const getFeaturedWritings = async (): Promise<WritingCardsQueryResponse> => {
   try {
      const data = await fetchGraphQL<WritingCardsQueryResponse>(
         query,
         'writings-featured',
         60 * 60 * 3 // 3 hour
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

export default getFeaturedWritings;
