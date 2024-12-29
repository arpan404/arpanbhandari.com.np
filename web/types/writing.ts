interface Writing {
  title: string;
  uid: string;
  description: string;
  thumbnail: {
    url: string;
  };
  createdAt: string;
  updatedAt: string;
  type: {
    name: string;
    uid: string;
  };
  body: string;
}

type WritingCard = Omit<Writing, 'body'>;

export type { Writing, WritingCard };
