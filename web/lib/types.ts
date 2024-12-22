export type Theme = 'light' | 'dark' | 'system';

export type Skill = {
  name: string;
  icon: string;
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
  detailedDescription: string;
  thumnail: string;
  technologiesUsed: Array<Skill>;
  codeURL: string | null;
  liveURL: string | null;
};
