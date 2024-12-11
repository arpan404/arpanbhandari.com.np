import { addCookie, getCookie } from "./cookie";
import type { Theme } from "./types";

export function getCurrentTheme() {
  const theme = getCookie("theme");
  if (theme === "light" || theme === "dark") {
    return theme;
  }
  return "system";
}

export function setTheme(theme: Theme) {
  console.log("Hello");
  document.documentElement.setAttribute("data-theme", theme);
  addCookie("theme", theme);
}
