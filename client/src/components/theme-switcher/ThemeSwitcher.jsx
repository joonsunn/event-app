import { useTheme } from "@mui/material/styles";
import React, {
  ChangeEvent,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { Box, Button, Tooltip } from "@mui/material";
import { MaterialUISwitch } from "./styles";
import { MyThemeContext } from "../../theme/theme";

export function ThemeSwitcher() {
  const theme = useTheme();
  const { myTheme, setMyTheme } = useContext(MyThemeContext);
  const [checked, setChecked] = useState(theme.palette.mode === "dark");

  useLayoutEffect(() => {
    setChecked(theme.palette.mode === "dark");
  }, [theme.palette.mode]);

  const handleButtonToggleTheme = () => {
    // console.log(myThemeOptions);
    // console.log(myTheme.name);
    myTheme === "light" ? setMyTheme("dark") : setMyTheme("light");
  };

  const handletoggleTheme = (event, checked) => {
    if (checked) {
      setMyTheme("dark");
      // setChecked(true);
    } else {
      setMyTheme("light");
      // setChecked(false);
    }
    // checked
    //   ? setMyTheme({
    //       name: "Dark",
    //       theme: createTheme({ palette: myThemeOptions[1].theme.palette }),
    //     })
    //   : setMyTheme({
    //       name: "Light",
    //       theme: createTheme({ palette: myThemeOptions[0].theme.palette }),
    //     });
  };

  return (
    <Box>
      {/* <Button
        onClick={handleButtonToggleTheme}
        sx={{ textTransform: "unset" }}
        centerRipple
      >
        Toggle Theme
      </Button> */}
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
