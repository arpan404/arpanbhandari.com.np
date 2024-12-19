import { useState } from 'react';

/**
 *
 * @returns music , toggleMusic
 * - music: determines if music should play or not
 * - toggleMusic: toggles the music state
 */
export default function useMusic() {
  const [music, setMusic] = useState<boolean>(false);
  const toggleMusic = () => {
    setMusic(!music);
  };
  return { music, toggleMusic };
}
