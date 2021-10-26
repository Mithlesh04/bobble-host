import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import "@fontsource/nunito";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const breakpoints = createBreakpoints({
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1250px",
});

const theme = extendTheme({
  breakpoints,
  config,

  fonts: {
    heading: "Nunito",
    body: "Nunito",
  },

  colors: {
    yellow: {
      100: "#FFBE17",
    },
    green: {
      100: "#45C79B",
    },
    red: {
      100: "#E8736F",
    },
    blue: {
      100: "#F5F7FB",
      200: "#E9EFFB",
      300: "#6A75CA",
     
    },
    gray: {
      100: "#D1D1D1",
      200:'#E5E5E5',
      300:"#C4C4C4"
    },
  },
});

export default theme;
