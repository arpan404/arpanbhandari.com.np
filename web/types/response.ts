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

export type { MusicQueryResponse, ResumeQueryResponse };
