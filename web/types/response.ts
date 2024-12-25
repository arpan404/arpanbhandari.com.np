type MusicQueryResponse = {
  data: null | {
    music: {
      audio: {
        url: string;
      };
    };
  };
};

export type { MusicQueryResponse };
