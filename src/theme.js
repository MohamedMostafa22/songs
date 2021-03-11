import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#313131",
      contrastText: "#bdbdbd",
    },
    secondary: {
      main: "#5844AF",
    },
    text: {
      primary: "#bdbdbd",
      secondary: "#777777",
    },
    common: {
      red: "#E05959",
      darkGrey: "#222222",
      lighGrey: "#777777",
    },
  },
});

export default theme;
