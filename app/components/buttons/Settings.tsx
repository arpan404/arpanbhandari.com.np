import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  Monitor,
  SettingsIcon,
  Sun,
  Moon,
  Music,
  VolumeOffIcon,
} from "lucide-react";
import { useState } from "react";
import type { Theme as ThemeType } from "~/helpers/types";
import useTheme from "~/hooks/useTheme";

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
          className="rounded-full p-0 outline-none ring-0"
        >
          <SettingsIcon className="" />
          <span className="sr-only">Settings</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="py-3 px-2 w-60 relative">
        {themeButtons.map((button) => (
          <Button
            key={button.label}
            onClick={() => changeTheme(button.label)}
            variant="ghost"
            disabled={currentTheme === button.label}
            className={`h-8 w-8 rounded-full p-2`}
          >
            {button.icon}
            <span className="sr-only">{button.srOnly}</span>
          </Button>
        ))}

        {musicButtons.map((button) => (
          <Button
            key={button.label}
            variant="ghost"
            onClick={toggleMusic}
            disabled={music}
            className="h-8 w-8 rounded-full p-2"
          >
            {button.icon}
            <span className="sr-only">{button.srOnly}</span>
          </Button>
        ))}
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
    label: "system",
    srOnly: "Use System Theme",
  },
  {
    icon: <Sun />,
    label: "light",
    srOnly: "Use Light Theme",
  },
  {
    icon: <Moon />,
    label: "dark",
    srOnly: "Use Dark Theme",
  },
];

const musicButtons: Array<{
  icon: React.ReactNode;
  label: string;
  srOnly: string;
}> = [
  {
    icon: <Music />,
    label: "music-on",
    srOnly: "Turn Music On",
  },
  {
    icon: <VolumeOffIcon />,
    label: "music-off",
    srOnly: "Turn Music Off",
  },
];
