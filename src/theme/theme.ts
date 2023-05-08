import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#a3cf34",
    },
    secondary: {
      main: "#3a424d",
    },
    info: {
      main: "#dde0e9",
    },
  },
});
theme = responsiveFontSizes(theme);
export default theme;
