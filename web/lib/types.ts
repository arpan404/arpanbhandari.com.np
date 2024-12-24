import { type BlocksContent } from '@strapi/blocks-react-renderer';

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
  longDescription: string;
  thumbnail: {
    url: string;
  };
  technologiesUsed: Array<Skill>;
  codeURL?: string;
  liveURL?: string;
  article?: {
    uid: string;
  };
};
