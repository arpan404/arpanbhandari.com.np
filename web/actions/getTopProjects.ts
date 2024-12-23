import { gql } from "@apollo/client";

const query = gql`
query getTopProjects {
  topProject {
    project{
      ...on ComponentProjectsProject{
        project {
          name
          uid
          thumbnail {
            url
          }
          short_description
          detailed_description
          liveURL
          codeURL
          technologies_used{
            ...on ComponentProjectsTags{
              skill {
                skillName
                skillUID
              }
            }
          }
          project_type{
            ...on ComponentProjectsTags{
              skill {
                skillName
                skillUID
              }
            }
          }
        }
      }
    }
  } 
}
`