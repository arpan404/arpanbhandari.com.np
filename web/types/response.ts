import Project from '@/types/project';
import Skill from './skill';

type MusicQueryResponse = null | {
  music: {
    audio: null | {
      url: string;
    };
  };
};

type ResumeQueryResponse = null | {
  resume: {
    file: null | {
      url: string;
    };
  };
};

type FeaturedProjectsQueryResponse = null | {
  featuredProjects: null | {
    projects: Array<{
      project: Project;
    }>;
  };
};

type ProjectsQueryResponse = null | {
  prohects: Array<Project>;
};

type FeaturedSkillsQueryResponse = null | {
  featuredSkills: null | {
    skills: Array<{
      skill: Pick<Skill, 'name' | 'uid'>;
    }>;
  };
};

export type {
  MusicQueryResponse,
  ResumeQueryResponse,
  FeaturedProjectsQueryResponse,
  FeaturedSkillsQueryResponse,
  ProjectsQueryResponse,
};
