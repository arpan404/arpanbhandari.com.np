import { gql } from '@apollo/client';
import { FeaturedSkillsQueryResponse } from '@/types/response';
import fetchGraphQL from '@/actions/fetchGraphQL';

const query = gql`
  query getFeaturedSkills {
    faturedSkills: featuredSkill {
      skills {
        ... on ComponentProjectsTags {
          skill {
            name: skillName
            uid: skillUID
            type: skillType {
              name: skillType
              uid: skillTypeUID
            }
          }
        }
      }
    }
  }
`;

const getFeaturedSkills = async (): Promise<FeaturedSkillsQueryResponse> => {
  try {
    const data = await fetchGraphQL<FeaturedSkillsQueryResponse>(
      query,
      'featured-skills',
      60 * 60 * 24 // 1 day
    );

    if (data.data) {
      if (!data.data.featuredSkills) {
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

export default getFeaturedSkills;