import Project from '@/types/project';

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

export type {
  MusicQueryResponse,
  ResumeQueryResponse,
  FeaturedProjectsQueryResponse,
};
