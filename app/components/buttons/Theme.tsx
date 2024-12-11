import { useEffect, useState } from "react";
import { getCurrentTheme, setTheme } from "~/helpers/theme";
import type { Theme } from "~/helpers/types";

export default function Theme() {
  const [currentTheme, setCurrentTheme] = useState<Theme>("system");
  useEffect(() => {
    setCurrentTheme(getCurrentTheme());
  }, []);
  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setCurrentTheme(newTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {currentTheme === "light" ? "1" : "0"}
    </button>
  );
}
