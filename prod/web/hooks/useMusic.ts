import { useEffect, useState } from 'react';

import fetchNextAPI from '@/actions/fetchNextAPI';
import { addCookie, getCookie } from '@/lib/cookie';
import { MusicQueryResponse } from '@/types/response';

/**
 * - musicPlaying: Indictaes if the music is playing or not
 * - toggleMusic: Toggles the music playing state
 * - currentMusic: Url of current music that is playing
 * - setCurrentMusic: Sets the url of the current music
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
         const data = await fetchNextAPI<MusicQueryResponse>(
            `/api/music?token=${process.env.NEXT_PUBLIC_INTERNAL_API_TOKEN}`,
            7200 * 2
         );
         const musicCookie = getCookie('musicPlaying');
         if (musicCookie === null) {
            setMusicPlaying(true);
         } else if (musicCookie === 'true') {
            setMusicPlaying(true);
         } else {
            setMusicPlaying(false);
         }
         if (data) {
            setCurrentMusic(data.music.audio!.url);
         } else {
            setCurrentMusic(null);
         }
      };
      getMusicData();
   }, []);

   return { musicPlaying, toggleMusic, currentMusic, setCurrentMusic };
}
