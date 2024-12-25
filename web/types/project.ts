import Skill from '@/types/skill';

interface Project {
  name: string;
  uid: string;
  shortDescription: string;
  longDescription: string;
  thumbnail: {
    url: string;
  };
  technologieUsed: Array<{
    skill: Skill;
  }>;
  projectType: Array<{
    skill: Skill;
  }>;
  codeURL?: string;
  liveURL?: string;
  article?: {
    uid: string;
  };
}

export default Project;
