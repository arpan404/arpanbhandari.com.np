interface ReadingTimeOptions {
  wordsPerMinute?: number;
  wordsPerMinuteForCode?: number;
  secondsPerImage?: number;
  customContentTypes?: {
    [selector: string]: (elements: NodeListOf<Element>) => number;
  };
}

export default function getReadingTime(
  htmlString: string,
  options: ReadingTimeOptions = {}
): number {
  const defaultOptions: Required<
    Omit<ReadingTimeOptions, 'customContentTypes'>
  > &
    Pick<ReadingTimeOptions, 'customContentTypes'> = {
    wordsPerMinute: 180,
    wordsPerMinuteForCode: 80,
    secondsPerImage: 12,
    customContentTypes: {},
  };

  const settings = { ...defaultOptions, ...options };

  // Create a temporary DOM element to parse HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  function processContent(): number {
    let totalTime = 0;

    // Process regular text
    const textContent = doc.body.textContent?.replace(/\s+/g, ' ').trim() || '';
    const wordCount = textContent.split(' ').length;
    totalTime += wordCount / settings.wordsPerMinute;

    // Process code blocks
    const codeBlocks = doc.querySelectorAll('pre, code');
    codeBlocks.forEach(block => {
      const codeWordCount = block.textContent?.split(/\s+/).length || 0;
      totalTime += codeWordCount / settings.wordsPerMinuteForCode;
    });

    // Process images
    const images = doc.querySelectorAll('img');
    totalTime += (images.length * settings.secondsPerImage) / 60;

    // Process custom content types
    if (settings.customContentTypes) {
      Object.entries(settings.customContentTypes).forEach(
        ([selector, processor]) => {
          const elements = doc.querySelectorAll(selector);
          totalTime += processor(elements);
        }
      );
    }

    return Math.ceil(totalTime);
  }

  return processContent();
}
