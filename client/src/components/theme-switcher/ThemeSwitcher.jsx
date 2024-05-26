import { useTheme } from "@mui/material/styles";
import React, { useContext, useLayoutEffect, useState } from "react";
import { Box, Tooltip } from "@mui/material";
import { MaterialUISwitch } from "./styles";
import { MyThemeContext } from "../../theme/theme";

export function ThemeSwitcher() {
  const theme = useTheme();
  const { myTheme, setMyTheme } = useContext(MyThemeContext);
  const [checked, setChecked] = useState(theme.palette.mode === "dark");

  useLayoutEffect(() => {
    setChecked(theme.palette.mode === "dark");
  }, [theme.palette.mode]);

  const handletoggleTheme = (event, checked) => {
    if (checked) {
      setMyTheme("dark");
    } else {
      setMyTheme("light");
    }
  };

  return (
    <Box>
      <Tooltip
        title={`Switch to ${
          theme.palette.mode === "light" ? "dark" : "light"
        } theme`}
      >
        <MaterialUISwitch
          onChange={handletoggleTheme}
          checked={checked}
        />
      </Tooltip>
    </Box>
  );
}
