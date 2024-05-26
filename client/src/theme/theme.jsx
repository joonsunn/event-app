import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import React, { createContext, useState } from "react";
import lightThemePalette from "./palettes/lightThemePalette";
import darkThemePalette from "./palettes/darkThemePalette";
import GlobalStyles from "./GlobalStyles";
import ComponentsOverrides from "./overrides";

export const MyThemeContext = createContext({});

export default function MyThemeProvider({ children }) {
  const systemThemePreference = useMediaQuery("(prefers-color-scheme: dark)")
    ? "dark"
    : "light";
  const useSystemTheme = false;
  const [myTheme, setMyTheme] = useState(
    useSystemTheme ? systemThemePreference : "light"
  );

  const themeOptions = {
    light: lightThemePalette,
    dark: darkThemePalette,
  };
  const themePalette = {
    palette: themeOptions[myTheme],
  };

  // const theme = createTheme(themePalette);
  const theme = createTheme(themePalette);
  theme.components = ComponentsOverrides(theme);

  const globalStyles = <GlobalStyles />;

  return (
    <MyThemeContext.Provider value={{ myTheme, setMyTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {globalStyles}
        {children}
      </ThemeProvider>
    </MyThemeContext.Provider>
  );
}
