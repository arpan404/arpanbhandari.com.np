'use client';
import { useEffect, useRef } from 'react';
import { SettingsIcon } from 'lucide-react';
import ReactAudioPlayer from 'react-audio-player';

import useMusic from '@/hooks/useMusic';
import useTheme from '@/hooks/useTheme';

import {
   DropdownMenu,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import SettingDropDownContent from '@/components/modals/SettingDropDownContent';

export default function Settings() {
   const { currentTheme, changeTheme } = useTheme();
   const { musicPlaying, toggleMusic, currentMusic } = useMusic();
   const backgroundMusicRef = useRef<ReactAudioPlayer>(null);
   useEffect(() => {
      const handleUserInteraction = () => {
         if (musicPlaying) {
            backgroundMusicRef.current?.audioEl.current?.play();
         } else {
            backgroundMusicRef.current?.audioEl.current?.pause();
         }
      };

      window.addEventListener('click', handleUserInteraction);
      window.addEventListener('keydown', handleUserInteraction);

      return () => {
         window.removeEventListener('click', handleUserInteraction);
         window.removeEventListener('keydown', handleUserInteraction);
      };
   }, [musicPlaying]);

   return (
      <div>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full p-0 outline-none ring-0 cursor-pointer scale-110"
               >
                  <SettingsIcon className="" size={40} />
                  <span className="sr-only">Settings</span>
               </Button>
            </DropdownMenuTrigger>

            <SettingDropDownContent
               changeTheme={changeTheme}
               musicPlaying={musicPlaying}
               currentTheme={currentTheme}
               toggleMusic={toggleMusic}
            />
         </DropdownMenu>
         <div>
            {currentMusic && (
               <ReactAudioPlayer
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${currentMusic}`}
                  autoPlay={false}
                  preload="metadata"
                  controls={false}
                  volume={0.05}
                  loop={true}
                  className="opacity-0"
                  ref={backgroundMusicRef}
               />
            )}
         </div>
      </div>
   );
}
