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
  SpeakerIcon,
  VolumeOffIcon,
} from "lucide-react";
import { useState } from "react";
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
        <Button
          onClick={() => changeTheme("system")}
          variant="ghost"
          disabled={currentTheme === "system"}
          className={`h-8 w-8 rounded-full p-2`}
        >
          <Monitor />
        </Button>

        <Button
          onClick={() => changeTheme("light")}
          variant="ghost"
          disabled={currentTheme === "light"}
          className="h-8 w-8 rounded-full p-2"
        >
          <Sun />
        </Button>

        <Button
          onClick={() => changeTheme("dark")}
          variant="ghost"
          disabled={currentTheme === "dark"}
          className="h-8 w-8 rounded-full p-2"
        >
          <Moon />
        </Button>

        <Button
          variant="ghost"
          onClick={toggleMusic}
          disabled={music}
          className="h-8 w-8 rounded-full p-2"
        >
          <Music />
        </Button>
        <Button
          variant="ghost"
          onClick={toggleMusic}
          disabled={!music}
          className="h-8 w-8 rounded-full p-2"
        >
          <VolumeOffIcon />
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
