import React from 'react';
import { Monitor, Sun, Moon, Music, VolumeOffIcon } from 'lucide-react';

import { Theme as ThemeType } from '@/types/theme';
import { DropdownMenuContent } from '@/components/ui/dropdown-menu';
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from '@/components/ui/tooltip';

export default function SettingDropDownContent({
   changeTheme,
   currentTheme,
   toggleMusic,
   musicPlaying,
}: {
   changeTheme: (theme: ThemeType) => void;
   currentTheme: ThemeType;
   toggleMusic: () => void;
   musicPlaying: boolean;
}) {
   return (
      <DropdownMenuContent className="py-1 px-2 w-fit relative rounded-full">
         <div className="flex items-center gap-1">
            <div className="">
               {themeButtons.map(button => (
                  <TooltipProvider key={button.label}>
                     <Tooltip>
                        <TooltipTrigger>
                           <div
                              onClick={() => changeTheme(button.label)}
                              className={`h-8 w-8 rounded-full flex justify-center items-center p-2 ${
                                 currentTheme === button.label
                                    ? 'text-muted-foreground cursor-default'
                                    : 'text-primary hover:bg-secondary cursor-pointer'
                              }`}
                              role="button"
                           >
                              {button.icon}
                              <span className="sr-only">{button.srOnly}</span>
                           </div>
                        </TooltipTrigger>

                        <TooltipContent className="p-0 px-3 py-1 z-[100] rounded-full">
                           <p className="text-[0.65rem]">
                              {currentTheme === button.label
                                 ? 'Current Theme'
                                 : button.srOnly}
                           </p>
                        </TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
               ))}
            </div>
            <div className="divider-vertical border border-secondary h-6 mx-1"></div>
            <div>
               {musicButtons.map(button => (
                  <TooltipProvider key={button.label}>
                     <Tooltip>
                        <TooltipTrigger>
                           <div
                              onClick={() => toggleMusic()}
                              className={`h-8 w-8 rounded-full flex justify-center items-center p-2 ${
                                 (button.label === 'music-on' &&
                                    musicPlaying) ||
                                 (button.label === 'music-off' && !musicPlaying)
                                    ? 'text-muted-foreground cursor-default'
                                    : 'text-primary hover:bg-secondary cursor-pointer'
                              }`}
                              role="button"
                           >
                              {button.icon}
                              <span className="sr-only">{button.srOnly}</span>
                           </div>
                        </TooltipTrigger>
                        <TooltipContent className="p-0 px-3 py-1 z-[100] rounded-full">
                           <p className="text-[0.65rem]">
                              {button.label === 'music-on' && musicPlaying
                                 ? 'Music is On'
                                 : button.label === 'music-off' && !musicPlaying
                                   ? 'Music is Off'
                                   : button.srOnly}
                           </p>
                        </TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
               ))}
            </div>
         </div>
      </DropdownMenuContent>
   );
}

const themeButtons: Array<{
   icon: React.ReactNode;
   label: ThemeType;
   srOnly: string;
}> = [
   {
      icon: <Monitor className="" />,
      label: 'system',
      srOnly: 'Use System Theme',
   },
   {
      icon: <Sun />,
      label: 'light',
      srOnly: 'Use Light Theme',
   },
   {
      icon: <Moon />,
      label: 'dark',
      srOnly: 'Use Dark Theme',
   },
];

const musicButtons: Array<{
   icon: React.ReactNode;
   label: string;
   srOnly: string;
}> = [
   {
      icon: <Music />,
      label: 'music-on',
      srOnly: 'Turn Music On',
   },
   {
      icon: <VolumeOffIcon />,
      label: 'music-off',
      srOnly: 'Turn Music Off',
   },
];
