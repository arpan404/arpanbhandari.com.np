import { gql } from '@apollo/client';
import fetchGraphQL from '@/actions/fetchGraphQL';
import { ProjectsQueryResponse } from '@/types/response';

const tagQuery = gql`
  query getTaggedProjects($skillUID: String) {
    projects(
      filters: {
        or: [
          { technologies_used: { skill: { skillUID: { eq: $skillUID } } } }
          { project_type: { skill: { skillUID: { eq: $skillUID } } } }
        ]
      }
      sort: "createdAt:desc"
    ) {
      name
      uid
      thumbnail {
        url
      }
      shortDescription: short_description
      longDescription: long_description
      liveURL
      codeURL
      article {
        uid
      }
      technologiesUsed: technologies_used {
        skill {
          name: skillName
          uid: skillUID
          logo {
            url
          }
        }
      }
      projectType: project_type {
        skill {
          name: skillName
          uid: skillUID
        }
      }
    }
  }
`;

const query = gql`
  query getTaggedProjects($skillUID: String) {
    projects(sort: "createdAt:desc") {
      name
      uid
      thumbnail {
        url
      }
      shortDescription: short_description
      longDescription: long_description
      liveURL
      codeURL
      article {
        uid
      }
      technologiesUsed: technologies_used {
        skill {
          name: skillName
          uid: skillUID
          logo {
            url
          }
        }
      }
      projectType: project_type {
        skill {
          name: skillName
          uid: skillUID
        }
      }
    }
  }
`;
