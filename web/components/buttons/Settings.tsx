'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import {
  Monitor,
  SettingsIcon,
  Sun,
  Moon,
  Music,
  VolumeOffIcon,
} from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

import { Theme as ThemeType } from '@/lib/types';
import useTheme from '@/hooks/useTheme';
import useMusic from '@/hooks/useMusic';
import React from 'react';

export default function Settings() {
  const { currentTheme, changeTheme } = useTheme();
  const { music, toggleMusic } = useMusic();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full p-0 outline-none ring-0 cursor-pointer"
        >
          <SettingsIcon className="" />
          <span className="sr-only">Settings</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="py-2 px-2 w-fit relative">
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

                  <TooltipContent className="p-0 px-3 py-1">
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
                        (button.label === 'music-on' && music) ||
                        (button.label === 'music-off' && !music)
                          ? 'text-muted-foreground cursor-default'
                          : 'text-primary hover:bg-secondary cursor-pointer'
                      }`}
                      role="button"
                    >
                      {button.icon}
                      <span className="sr-only">{button.srOnly}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="p-0 px-3 py-1">
                    <p className="text-[0.65rem]">
                      {button.label === 'music-on' && music
                        ? 'Music is On'
                        : button.label === 'music-off' && !music
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
    </DropdownMenu>
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
