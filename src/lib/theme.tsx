import { theme as chakraTheme } from "@chakra-ui/react";

const fonts = { ...chakraTheme.fonts, mono: `'Menlo', monospace` };

// const breakpoints = ["40em", "52em", "64em"];

// const breakpoints = ["30em", "48em", "62em", "80em"];

const breakpoints = ["30em", "48em", "62em", "80em", "96em"];

const colors = {
  ...chakraTheme.colors,
  black: "#16161D",
  dark: "#222",
  fade_light: "rgba(255,255,255,0.3)"
};

const fontSizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "4rem"
};

const spaces = {
  sizes: {
    ...chakraTheme.space,
    full: "100%",
    "3xs": "14rem",
    "2xs": "16rem",
    xs: "20rem",
    sm: "24rem",
    md: "28rem",
    lg: "32rem",
    xl: "36rem",
    "2xl": "42rem",
    "3xl": "48rem",
    "4xl": "56rem",
    "5xl": "64rem",
    "6xl": "72rem"
  }
};

const theme = {
  ...chakraTheme,
  breakpoints,
  colors,
  fonts,
  fontSizes,
  spaces,
  styles: {
    global: {
      "html, body, #__next": {
        height: "100%"
      }
    }
  }
};

export default theme;
