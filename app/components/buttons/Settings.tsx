import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSeparator,
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
import { useEffect, useState } from "react";
import { getCurrentTheme, setTheme } from "~/helpers/theme";
import type { Theme as ThemeType } from "~/helpers/types";

export default function Settings() {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>("system");
  const [music, setMusic] = useState<boolean>(false);

  useEffect(() => {
    setCurrentTheme(getCurrentTheme());

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = () => {
      const newTheme = mediaQuery.matches ? "dark" : "light";
      setTheme(newTheme);
    };

    if (currentTheme === "system") {
      mediaQuery.addEventListener("change", handleThemeChange);
    } else {
      mediaQuery.removeEventListener("change", handleThemeChange);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, [currentTheme]);

  const changeTheme = (theme: ThemeType) => {
    setTheme(theme);
    setCurrentTheme(theme);
  };

  const toggleMusic = () => {
    setMusic(!music);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="active:rotate-45 active:scale-125 transition-transform"
        >
          <SettingsIcon className="h-[1.5rem] w-[1.5rem] active:translate-y-0.5" />
          <span className="sr-only">Settings</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="py-3 px-2">
        <div className="flex items-center justify-center w-full">
          <span className="text-xs">Theme</span>
        </div>
        <DropdownMenuGroup className="space-x-2 hover:bg-transparent">
          <Button
            onClick={() => changeTheme("system")}
            variant="ghost"
            disabled={currentTheme === "system"}
            className={``}
          >
            <Monitor />
          </Button>

          <Button
            onClick={() => changeTheme("light")}
            variant="ghost"
            disabled={currentTheme === "light"}
          >
            <Sun />
          </Button>

          <Button
            onClick={() => changeTheme("dark")}
            variant="ghost"
            disabled={currentTheme === "dark"}
          >
            <Moon />
          </Button>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <div className="flex items-center justify-center w-full">
          <span className="text-xs">Music</span>
        </div>
        <DropdownMenuGroup className="space-x-2 hover:bg-transparent">
          <Button variant="ghost" onClick={toggleMusic} disabled={music}>
            <Music />
          </Button>
          <Button variant="ghost" onClick={toggleMusic} disabled={!music}>
            <VolumeOffIcon />
          </Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
