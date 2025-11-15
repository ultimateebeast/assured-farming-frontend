import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Stack,
  Badge,
  IconButton,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Menu as MenuIcon, X } from "lucide-react";
import { colors } from "../theme/theme";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate("/login");
  };

  const navLinks = [
    { label: "Browse", path: "/marketplace" },
    { label: "My Listings", path: "/listings" },
    { label: "Contracts", path: "/contracts" },
    { label: "Analytics", path: "/analytics" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar
        position="static"
        sx={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
          boxShadow: "0 4px 20px rgba(25, 118, 210, 0.15)",
          backdropFilter: "blur(8px)",
        }}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            padding: { xs: "8px 16px", sm: "8px 24px" },
            minHeight: { xs: 56, sm: 64 },
          }}>
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{
              color: "#fff",
              fontWeight: 800,
              letterSpacing: 0.2,
              cursor: "pointer",
              fontSize: { xs: "1.1rem", sm: "1.3rem" },
              display: "flex",
              alignItems: "center",
              gap: 1,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => navigate("/")}>
            🌾{" "}
            <span style={{ display: { xs: "none", sm: "inline" } }}>
              Assured Farming
            </span>
          </Typography>

          {/* Desktop Navigation */}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              filter: "none",
            }}>
            {navLinks.map((link) => (
              <Button
                key={link.path}
                color="inherit"
                onClick={() => navigate(link.path)}
                sx={{
                  color: "#fff",
                  textTransform: "none",
                  fontSize: "0.95rem",
                  fontWeight: isActive(link.path) ? 700 : 500,
                  position: "relative",
                  transition: "all 0.3s ease",
                  opacity: 1,
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 4,
                    left: 12,
                    right: 12,
                    height: isActive(link.path) ? 2 : 0,
                    backgroundColor: "#ffd27a",
                    transition: "height 0.3s ease",
                    borderRadius: 2,
                  },
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                  "&:hover::after": {
                    height: 2,
                  },
                }}>
                {link.label}
              </Button>
            ))}
          </Stack>

          {/* Right Side - Auth & User */}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}>
            {user ? (
              <>
                {/* User Dropdown */}
                <Box
                  onClick={handleMenuOpen}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    padding: "8px 12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: colors.accent,
                      fontWeight: 700,
                      fontSize: "0.9rem",
                    }}>
                    {user.first_name?.[0]?.toUpperCase() ||
                      user.email?.[0]?.toUpperCase() ||
                      "U"}
                  </Avatar>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {user.first_name || user.email?.split("@")[0]}
                  </Typography>
                </Box>

                {/* User Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}>
                  <MenuItem disabled>
                    <Typography variant="caption">{user.email}</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      navigate("/dashboard");
                    }}>
                    Dashboard
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      navigate("/kyc");
                    }}>
                    Upload KYC
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: "center" }}>
                      <LogOut size={18} />
                      <span>Logout</span>
                    </Stack>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={() => navigate("/login")}
                  sx={{
                    fontWeight: 500,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}>
                  Login
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate("/register")}
                  sx={{
                    backgroundColor: colors.accent,
                    color: colors.white,
                    fontWeight: 600,
                    padding: "8px 16px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: colors.accentDark,
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(255, 165, 0, 0.3)",
                    },
                  }}>
                  Sign Up
                </Button>
              </>
            )}
          </Stack>

          {/* Mobile Menu Button */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: "inherit" }}
            onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </IconButton>
        </Toolbar>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexDirection: "column",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            }}>
            {navLinks.map((link) => (
              <Button
                key={link.path}
                fullWidth
                color="inherit"
                onClick={() => {
                  navigate(link.path);
                  setMobileOpen(false);
                }}
                sx={{
                  textAlign: "left",
                  justifyContent: "flex-start",
                  padding: "12px 16px",
                  fontSize: "0.95rem",
                  backgroundColor: isActive(link.path)
                    ? "rgba(255, 255, 255, 0.1)"
                    : "transparent",
                  fontWeight: isActive(link.path) ? 600 : 500,
                  borderLeft: isActive(link.path)
                    ? `4px solid ${colors.accent}`
                    : "4px solid transparent",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                  },
                }}>
                {link.label}
              </Button>
            ))}
            <Box sx={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", p: 1 }}>
              {user ? (
                <Button
                  fullWidth
                  color="inherit"
                  onClick={handleLogout}
                  sx={{
                    justifyContent: "flex-start",
                    padding: "12px 16px",
                    fontSize: "0.95rem",
                  }}>
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    fullWidth
                    color="inherit"
                    onClick={() => {
                      navigate("/login");
                      setMobileOpen(false);
                    }}
                    sx={{
                      justifyContent: "flex-start",
                      padding: "12px 16px",
                      fontSize: "0.95rem",
                    }}>
                    Login
                  </Button>
                  <Button
                    fullWidth
                    onClick={() => {
                      navigate("/register");
                      setMobileOpen(false);
                    }}
                    sx={{
                      justifyContent: "flex-start",
                      padding: "12px 16px",
                      fontSize: "0.95rem",
                      backgroundColor: colors.accent,
                      color: colors.white,
                      mt: 1,
                      "&:hover": {
                        backgroundColor: colors.accentDark,
                      },
                    }}>
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
          </Box>
        )}
      </AppBar>
    </Box>
  );
}
