"use client";

// import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Darkmode() {
  function useDarkMode() {
    const [theme, setTheme] = useState(
      typeof window !== "undefined" ? localStorage.theme : "dark"
    );
    const colorTheme = theme === "dark" ? "light" : "dark";

    useEffect(() => {
      const root = window.document.documentElement;

      root.classList.remove(colorTheme);
      root.classList.add(theme);

      if (typeof window !== "undefined") {
        localStorage.setItem("theme", theme);
      }
    }, [theme, colorTheme]);

    return [colorTheme, setTheme];
  }

  const [colourTheme, setTheme] = useDarkMode();
  // const { theme, setTheme } = useTheme();

  //   function changeTheme(mode: string) {
  //     console.log("userPreference: " + userPreference);
  //     console.log("theme now: " + localStorage.getItem("theme"));
  //     console.log("Changing theme to " + mode);
  //     localStorage.setItem("theme", mode);
  //     setUserPreference(mode);
  //     console.log("theme after: " + localStorage.getItem("theme"));
  //   }

  //   //   const preferance: string = window.localStorage.getItem("theme");

  //   const [userPreference, setUserPreference] = useState(
  //     localStorage.getItem("theme")
  //   );

  return (
    <div className="w-fit">
      {colourTheme === "light" ? (
        <button onClick={() => setTheme("light")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
        </button>
      ) : (
        <button onClick={() => setTheme("dark")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
