"use client"; // Mark this file as a client component

import { ThemeProvider } from "@material-tailwind/react";

export default function ThemeProviderWrapper({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
