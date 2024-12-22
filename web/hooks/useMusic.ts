import { getCookie } from '@/lib/cookie';
import { useEffect, useState } from 'react';

/**
 * Custom hook to manage music playing state.
 *
 * @returns {Object} An object containing:
 * - `musicPlaying` (boolean): Indicates if music is currently playing.
 * - `toggleMusic` (function): Function to toggle the music playing state.
 * - `currentMusic` (string | null): The current music track.
 * - `setCurrentMusic` (function): Function to set the current music track.
 */
export default function useMusic() {
  const [musicPlaying, setMusicPlaying] = useState<boolean>(false);
  const [currentMusic, setCurrentMusic] = useState<string | null>(null);

  const toggleMusic = () => {
    setMusicPlaying(prev => !prev);
  };
  useEffect(() => {
    const music = getCookie('music');
    if (music) {
      setCurrentMusic(music);
    }
  }, []);

  return { musicPlaying, toggleMusic, currentMusic };
}
