import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";

export default function Theme() {
  const fetcher = useFetcher();
  const [theme, setTheme] = useState(() => 
    typeof document !== 'undefined' 
      ? document.documentElement.getAttribute('data-theme') || 'light'
      : 'light'
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    fetcher.submit(
      { theme: newTheme },
      { method: "post" }
    );
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme) setTheme(currentTheme);
  }, []);

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {theme === 'light' ? '1' : '0'}
    </button>
  );
}
