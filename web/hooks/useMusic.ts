import getMusic from '@/actions/getMusic';
import { addCookie, getCookie } from '@/lib/cookie';
import { useEffect, useState } from 'react';

/**
 * Custom hook to manage music playback state.
 *
 * @returns {Object} An object containing:
 * - `musicPlaying` (boolean): Indicates whether music is currently playing.
 * - `toggleMusic` (function): Function to toggle the music playback state.
 * - `currentMusic` (string | null): The URL of the current music file.
 * - `setCurrentMusic` (function): Function to set the current music URL.
 */

export default function useMusic() {
  const [musicPlaying, setMusicPlaying] = useState<boolean>(false);
  const [currentMusic, setCurrentMusic] = useState<string | null>(null);

  const toggleMusic = () => {
    setMusicPlaying(prev => !prev);
    addCookie('musicPlaying', musicPlaying ? 'false' : 'true');
  };

  useEffect(() => {
    const getMusicData = async () => {
      const data = await getMusic();
      const musicCookie = getCookie('musicPlaying');
      if (musicCookie === null) {
        setMusicPlaying(true);
      } else if (musicCookie === 'true') {
        setMusicPlaying(true);
      } else {
        setMusicPlaying(false);
      }
      if (data.data) {
        setCurrentMusic(data.data.music.file.url);
      } else {
        setCurrentMusic(null);
      }
    };
    getMusicData();
  }, []);

  return { musicPlaying, toggleMusic, currentMusic, setCurrentMusic };
}
