import { useEffect, useState } from "react";
import { getCurrentTheme, setTheme } from "~/helpers/theme";
import type { Theme as ThemeType } from "~/helpers/types";

export default function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>("system");

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

  return { currentTheme, changeTheme };
}
