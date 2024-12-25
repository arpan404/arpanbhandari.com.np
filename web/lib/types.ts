export type Theme = 'light' | 'dark' | 'system';

export type Skill = {
  name: string;
  logo?: {
    url: string;
  };
  uid: string;
  type: {
    name: string;
    uid: string;
  };
};

export type Project = {
  name: string;
  uid: string;
  shortDescription: string;
  longDescription: string;
  thumbnail: {
    url: string;
  };
  technologiesUsed: Array<{
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
};
