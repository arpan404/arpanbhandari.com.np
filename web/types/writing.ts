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

interface ReadingTimeOptions {
   wordsPerMinute?: number;
   wordsPerMinuteForCode?: number;
   secondsPerImage?: number;
   customContentTypes?: {
      [selector: string]: (elements: NodeListOf<Element>) => number;
   };
}

export type { Writing, WritingCard, ReadingTimeOptions };
