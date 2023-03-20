"use client";

// import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import "@theme-toggles/react/css/Expand.css";
import { Expand } from "@theme-toggles/react";

export default function Darkmode() {
  const { theme, setTheme } = useTheme();
  const [mode, setMode] = useState<boolean>(false);

  return (
    <Expand
      duration={750}
      toggled={theme === "dark"}
      toggle={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-2xl"
    />
  );
}