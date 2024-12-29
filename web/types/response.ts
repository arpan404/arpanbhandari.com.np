import Project from '@/types/project';
import Skill from '@/types/skill';
import { Writing, WritingCard } from '@/types/writing';

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
  projects: Array<Project>;
};

type WritingCardsQueryResponse = null | {
  articles: Array<WritingCard>;
};

type WritingQueryResponse = null | {
  articles: Array<Writing>;
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
  WritingCardsQueryResponse,
  WritingQueryResponse,
  ProjectsQueryResponse,
};
