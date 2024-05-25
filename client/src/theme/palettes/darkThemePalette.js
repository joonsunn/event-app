const PRIMARY = {
  100: "#7289da",
  200: "#8395de",
  300: "#94a2e3",
  400: "#a4afe7",
  500: "#b3bceb",
  600: "#c2c9ef",
};

const DARK = {
  100: "#23272a",
  200: "#383b3e",
  300: "#4d5153",
  400: "#64676a",
  500: "#7c7f81",
  600: "#959799",
};

const darkThemePalette = {
  mode: "dark",
  // primary: {
  //   main: PRIMARY[300],
  //   light: PRIMARY[500],
  //   dark: PRIMARY[100],
  //   contrastText: DARK[100],
  // },
  primary: {
    main: "#485696",
    light: "#e7e7e7",
  },
  secondary: {
    main: "#fc7a1e",
    light: "#f9c784",
    dark: "#f24c00",
  },
  background: {
    paper: DARK[200],
    default: DARK[100],
  },
};

export default darkThemePalette;
