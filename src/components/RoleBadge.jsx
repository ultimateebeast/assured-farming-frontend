import React from "react";
import { useAuth } from "../context/AuthContext";
import { Box } from "@mui/material";

/**
 * Display user role badge with color coding
 *
 * Usage:
 * <RoleBadge />
 * <RoleBadge size="small" />
 */
export default function RoleBadge({ size = "medium" }) {
  const { user } = useAuth();

  if (!user) return null;

  const roleColors = {
    farmer: { bg: "#4caf50", text: "white" },
    buyer: { bg: "#2196f3", text: "white" },
    admin: { bg: "#ff9800", text: "white" },
  };

  const sizes = {
    small: { px: 1, py: 0.25, fontSize: "11px" },
    medium: { px: 1.5, py: 0.5, fontSize: "12px" },
    large: { px: 2, py: 0.75, fontSize: "14px" },
  };

  const colors = roleColors[user.role] || roleColors.farmer;
  const sizeStyle = sizes[size] || sizes.medium;

  return (
    <Box
      sx={{
        display: "inline-block",
        ...sizeStyle,
        borderRadius: "20px",
        backgroundColor: colors.bg,
        color: colors.text,
        fontWeight: "600",
        textTransform: "capitalize",
      }}>
      {user.role}
    </Box>
  );
}
