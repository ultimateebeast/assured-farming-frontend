import React from "react";
import { useAuth } from "../context/AuthContext";
import { Alert } from "@mui/material";

/**
 * RoleGuard Component
 * Shows content only if user has the specified role
 *
 * Usage:
 * <RoleGuard role="farmer">
 *   <CreateListing />
 * </RoleGuard>
 */
export function RoleGuard({ children, role, fallback = null }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 24 }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return fallback || <Alert severity="warning">Please login first</Alert>;
  }

  if (role && user.role !== role) {
    return (
      fallback || (
        <Alert severity="error">
          This page is only for {role}s. You are logged in as a {user.role}.
        </Alert>
      )
    );
  }

  return children;
}
