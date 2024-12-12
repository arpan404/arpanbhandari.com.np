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
import { useState } from 'react';
import type { Theme as ThemeType } from '~/lib/types';
import useTheme from '~/hooks/useTheme';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

export default function Settings() {
  const { currentTheme, changeTheme } = useTheme();
  const [music, setMusic] = useState<boolean>(false);

  const toggleMusic = () => {
    setMusic(!music);
  };

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
                    <Button
                      onClick={() => changeTheme(button.label)}
                      variant="ghost"
                      disabled={currentTheme === button.label}
                      className={`h-8 w-8 rounded-full p-2 cursor-pointer`}
                    >
                      {button.icon}
                      <span className="sr-only">{button.srOnly}</span>
                    </Button>
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
                    <Button
                      key={button.label}
                      variant="ghost"
                      onClick={toggleMusic}
                      disabled={
                        (button.label === 'music-on' && music) ||
                        (button.label === 'music-off' && !music)
                      }
                      className="h-8 w-8 rounded-full p-2 cursor-pointer"
                    >
                      {button.icon}
                      <span className="sr-only">{button.srOnly}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="p-0 px-3 py-1">
                    <p className="text-[0.65rem]">
                      {button.label === 'music-on' && music
                        ? 'Volume is On'
                        : button.label === 'music-off' && !music
                        ? 'Volume is Off'
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
    icon: <Monitor />,
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
    srOnly: 'Turn Volume On',
  },
  {
    icon: <VolumeOffIcon />,
    label: 'music-off',
    srOnly: 'Turn Volume Off',
  },
];
