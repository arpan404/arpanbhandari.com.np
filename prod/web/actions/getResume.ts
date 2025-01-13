'use server';
import { gql } from '@apollo/client';
import fetchGraphQL from '@/actions/fetchGraphQL';
import { ResumeQueryResponse } from '@/types/response';

const query = gql`
   query {
      resume {
         file {
            url
         }
      }
   }
`;

/**
 * Fetches the resume from the API
 * @returns {Promise<ResumeQueryResponse>}
 * */
const getResume = async (): Promise<ResumeQueryResponse> => {
   try {
      const data = await fetchGraphQL<ResumeQueryResponse>(
         query,
         'resume',
         60 * 60 * 2 // 2 hours
      );

      if (data) {
         if (!data.resume.file) {
            return null;
         }
      }
      return data;
   } catch (e: unknown) {
      console.error(e);
      return null;
   }
};

export default getResume;
