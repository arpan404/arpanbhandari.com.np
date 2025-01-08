import { gql } from '@apollo/client';
import fetchGraphQL from '@/actions/fetchGraphQL';
import { FeaturedSkillsQueryResponse } from '@/types/response';

const query = gql`
   query getFeaturedSkills {
      featuredSkills: featureSkill {
         skills {
            skill {
               name: skillName
               uid: skillUID
            }
         }
      }
   }
`;

/**
 * Fetches the featured skills from the API
 * @returns {Promise<FeaturedSkillsQueryResponse>}
 */
const getFeaturedSkills = async (): Promise<FeaturedSkillsQueryResponse> => {
   try {
      const data = await fetchGraphQL<FeaturedSkillsQueryResponse>(
         query,
         'featured-skills',
         60 * 60 * 24 // 24 hours
      );

      if (data) {
         if (!data.featuredSkills) {
            return null;
         }
         if (
            !data.featuredSkills.skills ||
            data.featuredSkills.skills.length === 0
         ) {
            return null;
         }
      }
      return data;
   } catch (e: unknown) {
      console.error(e);
      return null;
   }
};

export default getFeaturedSkills;
