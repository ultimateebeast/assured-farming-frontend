// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1e88e5" }, // blue
    secondary: { main: "#ffb300" }, // amber
    background: {
      default: "#f7fbff",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Inter, Roboto, Arial, sans-serif",
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 6px 18px rgba(20,30,60,0.08)",
        },
      },
    },
  },
});

export default theme;
