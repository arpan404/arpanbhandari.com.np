import client from '@/config/graphql';
import { gql } from '@apollo/client';

export default async function getSpecializedSkills() {
  try {
    const a = await client.query({
      query: gql`
        query GetSpecializations {
          specializations {
            skill {
              logo {
                url
              }
              name: skillName
              uid: skillUID
              type: skillType {
                name: skillType
                uid: skillTypeUID
              }
            }
          }
        }
      `,
    });
    console.log(a);
  } catch (e) {
    console.log(e);
  }
}
