import { createTheme } from "@mui/material/styles";

// ============ COLOR PALETTE ============
export const colors = {
  // Primary
  primary: "#1976D2",
  primaryDark: "#1565C0",
  primaryLight: "#42A5F5",

  // Accent
  accent: "#FFA500", // Orange
  accentLight: "#FFB84D",
  accentDark: "#FF9500",

  // Status Colors
  success: "#4CAF50",
  successLight: "#81C784",
  warning: "#FFC107",
  error: "#F44336",
  info: "#2196F3",

  // Neutrals
  white: "#FFFFFF",
  black: "#000000",
  gray50: "#FAFAFA",
  gray100: "#F5F5F5",
  gray200: "#EEEEEE",
  gray300: "#E0E0E0",
  gray400: "#BDBDBD",
  gray500: "#9E9E9E",
  gray600: "#757575",
  gray700: "#616161",
  gray800: "#424242",
  gray900: "#212121",

  // Backgrounds
  bgLight: "#F8F9FA",
  bgDark: "#0F1419",
  bgCard: "#FFFFFF",

  // Text
  textPrimary: "#212121",
  textSecondary: "#757575",
  textLight: "#FFFFFF",
};

// ============ THEME CONFIGURATION ============
export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      dark: colors.primaryDark,
      light: colors.primaryLight,
      contrastText: colors.white,
    },
    secondary: {
      main: colors.accent,
      dark: colors.accentDark,
      light: colors.accentLight,
      contrastText: colors.white,
    },
    success: {
      main: colors.success,
      light: colors.successLight,
      contrastText: colors.white,
    },
    warning: {
      main: colors.warning,
      contrastText: colors.white,
    },
    error: {
      main: colors.error,
      contrastText: colors.white,
    },
    info: {
      main: colors.info,
      contrastText: colors.white,
    },
    background: {
      default: colors.bgLight,
      paper: colors.bgCard,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
  },
  typography: {
    fontFamily:
      '"Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      letterSpacing: "-0.015em",
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2.4rem",
      fontWeight: 700,
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 700,
      letterSpacing: "-0.005em",
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: "0.5px",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: "0.25px",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: "0.15px",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.57,
      letterSpacing: "0.1px",
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 600,
      textTransform: "capitalize",
      letterSpacing: "0.4px",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.66,
      letterSpacing: "0.4px",
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8, // Base spacing unit
  components: {
    // ============ BUTTON ============
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "capitalize",
          fontWeight: 600,
          fontSize: "0.95rem",
          padding: "10px 24px",
          transition: "all 0.3s ease",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            transform: "translateY(-2px)",
          },
          "&:active": {
            transform: "translateY(0px)",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          },
        },
        contained: {
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
          color: colors.white,
          "&:hover": {
            background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`,
          },
        },
        outlined: {
          borderColor: colors.gray300,
          color: colors.primary,
          "&:hover": {
            backgroundColor: "rgba(25, 118, 210, 0.04)",
            borderColor: colors.primary,
          },
        },
        text: {
          color: colors.primary,
          "&:hover": {
            backgroundColor: "rgba(25, 118, 210, 0.08)",
          },
        },
      },
    },
    // ============ CARD ============
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          border: `1px solid ${colors.gray200}`,
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
            borderColor: colors.primary,
          },
        },
      },
    },
    // ============ TEXT FIELD ============
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            transition: "all 0.3s ease",
            "& fieldset": {
              borderColor: colors.gray300,
              borderWidth: "1.5px",
            },
            "&:hover fieldset": {
              borderColor: colors.gray400,
            },
            "&.Mui-focused fieldset": {
              borderColor: colors.primary,
              borderWidth: "2px",
            },
          },
          "& .MuiOutlinedInput-input": {
            fontSize: "1rem",
            padding: "14px 16px",
            fontWeight: 400,
            "&::placeholder": {
              color: colors.gray500,
              opacity: 1,
            },
          },
        },
      },
    },
    // ============ CHIP ============
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          fontWeight: 500,
          fontSize: "0.85rem",
        },
        filled: {
          backgroundColor: colors.gray200,
          color: colors.textPrimary,
        },
      },
    },
    // ============ BADGE ============
    MuiBadge: {
      styleOverrides: {
        root: {
          "& .MuiBadge-badge": {
            backgroundColor: colors.error,
            color: colors.white,
            fontWeight: 600,
            fontSize: "0.75rem",
          },
        },
      },
    },
    // ============ ALERT ============
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          fontSize: "0.95rem",
          fontWeight: 500,
        },
        standardSuccess: {
          backgroundColor: "rgba(76, 175, 80, 0.1)",
          color: colors.success,
          border: `1px solid ${colors.success}`,
        },
        standardError: {
          backgroundColor: "rgba(244, 67, 54, 0.1)",
          color: colors.error,
          border: `1px solid ${colors.error}`,
        },
        standardWarning: {
          backgroundColor: "rgba(255, 193, 7, 0.1)",
          color: "#F57F17",
          border: `1px solid ${colors.warning}`,
        },
        standardInfo: {
          backgroundColor: "rgba(33, 150, 243, 0.1)",
          color: colors.info,
          border: `1px solid ${colors.info}`,
        },
      },
    },
    // ============ PAGINATION ============
    MuiPagination: {
      styleOverrides: {
        root: {
          "& .MuiPaginationItem-root": {
            borderRadius: "6px",
            fontSize: "0.9rem",
            fontWeight: 500,
          },
          "& .Mui-selected": {
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
          },
        },
      },
    },
    // ============ TABS ============
    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: `2px solid ${colors.gray200}`,
          "& .MuiTabs-indicator": {
            backgroundColor: colors.primary,
            height: "4px",
            borderRadius: "2px 2px 0 0",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          fontWeight: 600,
          fontSize: "0.95rem",
          color: colors.gray500,
          transition: "all 0.3s ease",
          "&:hover": {
            color: colors.primary,
          },
          "&.Mui-selected": {
            color: colors.primary,
          },
        },
      },
    },
    // ============ CHECKBOX ============
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: colors.gray400,
          "&.Mui-checked": {
            color: colors.primary,
          },
        },
      },
    },
    // ============ RADIO ============
    MuiRadio: {
      styleOverrides: {
        root: {
          color: colors.gray400,
          "&.Mui-checked": {
            color: colors.primary,
          },
        },
      },
    },
    // ============ SELECT ============
    MuiSelect: {
      styleOverrides: {
        root: {
          "& .MuiSelect-select": {
            fontSize: "1rem",
            padding: "14px 16px",
          },
        },
      },
    },
  },
});

// ============ SPACING CONSTANTS ============
export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "48px",
};

// ============ SHADOW CONSTANTS ============
export const shadows = {
  sm: "0 1px 3px rgba(0, 0, 0, 0.1)",
  md: "0 2px 8px rgba(0, 0, 0, 0.08)",
  lg: "0 4px 16px rgba(0, 0, 0, 0.12)",
  xl: "0 8px 32px rgba(0, 0, 0, 0.15)",
  hover: "0 8px 24px rgba(0, 0, 0, 0.12)",
};

// ============ GRADIENT CONSTANTS ============
export const gradients = {
  primary: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
  accent: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentDark} 100%)`,
  success: `linear-gradient(135deg, ${colors.success} 0%, #388E3C 100%)`,
  error: `linear-gradient(135deg, ${colors.error} 0%, #D32F2F 100%)`,
};

export default theme;
