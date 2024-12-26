import Project from '@/types/project';
import Skill from './skill';

type MusicQueryResponse = {
  data: null | {
    music: {
      audio: null | {
        url: string;
      };
    };
  };
};

type ResumeQueryResponse = {
  data: null | {
    resume: {
      file: null | {
        url: string;
      };
    };
  };
};

type FeaturedProjectsQueryResponse = {
  data: null | {
    featuredProjects: null | {
      projects: Array<{
        project: Project;
      }>;
    };
  };
};

type FeaturedSkillsQueryResponse = {
  data: null | {
    featuredSkills: null | {
      skills: Array<{
        skill: Omit<Skill, 'logo'>;
      }>;
    };
  };
};

export type {
  MusicQueryResponse,
  ResumeQueryResponse,
  FeaturedProjectsQueryResponse,
  FeaturedSkillsQueryResponse,
};
