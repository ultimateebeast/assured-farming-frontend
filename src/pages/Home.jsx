// src/pages/Home.jsx
import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ArrowRight, Zap, Shield, TrendingUp } from "lucide-react";
import AnimatedCard from "../components/AnimatedCard";
import api from "../api/client";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { colors } from "../theme/theme";

export default function Home() {
  const { user } = useAuth();

  // React Query v5: pass a single options object
  const {
    data: listingsData,
    isLoading: listingsLoading,
    error: listingsError,
  } = useQuery({
    queryKey: ["home", "listings"],
    queryFn: async () => {
      const res = await api.get("/marketplace/listings/");
      return res.data.results || res.data;
    },
    staleTime: 1000 * 60 * 2,
  });

  const {
    data: contractsData,
    isLoading: contractsLoading,
    error: contractsError,
  } = useQuery({
    queryKey: ["home", "contracts"],
    queryFn: async () => {
      const res = await api.get("/contracts/contracts/");
      return res.data.results || res.data;
    },
    staleTime: 1000 * 60 * 2,
  });

  // loading / error short-circuit
  const loading = listingsLoading || contractsLoading;
  const error = listingsError || contractsError;

  const listingsCount = Array.isArray(listingsData)
    ? listingsData.length
    : listingsData?.count ?? "—";
  const contractsCount = Array.isArray(contractsData)
    ? contractsData.length
    : contractsData?.count ?? "—";

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">Failed to load dashboard data.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${colors.primary}15 0%, ${colors.accent}15 100%)`,
          borderRadius: "16px",
          p: { xs: 3, sm: 4 },
          mb: 4,
          border: `1px solid ${colors.primary}30`,
        }}>
        <Stack spacing={2}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            }}>
            Welcome{" "}
            {user ? user.first_name || user.username : "to Assured Farming"} 🌾
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: colors.textSecondary,
              fontWeight: 500,
              fontSize: { xs: "0.95rem", sm: "1.1rem" },
            }}>
            Buy and sell reliably — create contracts, upload KYC, and track
            transactions.
          </Typography>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          {/* Quick Actions Card */}
          <Card
            sx={{
              mb: 3,
              background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.bgLight} 100%)`,
              border: `1px solid ${colors.primary}20`,
              boxShadow: `0 8px 24px rgba(25, 118, 210, 0.08)`,
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: `0 12px 32px rgba(25, 118, 210, 0.12)`,
                transform: "translateY(-2px)",
              },
            }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: colors.primary,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}>
                <Zap size={20} color={colors.accent} />
                Quick Actions
              </Typography>
              <Grid container spacing={1.5}>
                {[
                  { to: "/marketplace", label: "Browse Listings", icon: "📋" },
                  {
                    to: "/create-listing",
                    label: "Create Listing",
                    icon: "➕",
                  },
                  { to: "/create-contract", label: "New Contract", icon: "📝" },
                  { to: "/contracts", label: "My Contracts", icon: "📄" },
                  { to: "/kyc", label: "Upload KYC", icon: "📋" },
                  { to: "/analytics", label: "Analytics", icon: "📊" },
                ].map((action) => (
                  <Grid item xs={12} sm={6} md={4} key={action.to}>
                    <Button
                      component={RouterLink}
                      to={action.to}
                      fullWidth
                      variant="outlined"
                      sx={{
                        padding: "12px 16px",
                        borderColor: colors.primary,
                        color: colors.primary,
                        fontWeight: 600,
                        transition: "all 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        "&:hover": {
                          backgroundColor: colors.primary,
                          color: colors.white,
                          borderColor: colors.primary,
                          transform: "translateX(2px)",
                        },
                      }}>
                      <span>{action.icon}</span>
                      {action.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* How it Works Card */}
          <AnimatedCard
            title="How it works"
            content="Create a listing or accept one. Negotiate price proposals, sign contracts and use escrow for safe payments. Upload KYC to enable payouts."
          />
        </Grid>

        <Grid item xs={12} md={5}>
          {/* Summary Stats Card */}
          <Card
            sx={{
              mb: 3,
              background: `linear-gradient(135deg, ${colors.primary}08 0%, ${colors.primary}04 100%)`,
              border: `1px solid ${colors.primary}20`,
              boxShadow: `0 4px 12px rgba(25, 118, 210, 0.08)`,
            }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: colors.primary,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}>
                <TrendingUp size={20} color={colors.accent} />
                Summary
              </Typography>
              <Stack spacing={2}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px",
                    backgroundColor: colors.white,
                    borderRadius: "8px",
                    border: `1px solid ${colors.primary}20`,
                  }}>
                  <Typography
                    sx={{ color: colors.textSecondary, fontWeight: 500 }}>
                    Active Listings
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: colors.primary,
                      fontSize: "1.2rem",
                    }}>
                    {listingsCount}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px",
                    backgroundColor: colors.white,
                    borderRadius: "8px",
                    border: `1px solid ${colors.primary}20`,
                  }}>
                  <Typography
                    sx={{ color: colors.textSecondary, fontWeight: 500 }}>
                    Contracts
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: colors.accent,
                      fontSize: "1.2rem",
                    }}>
                    {contractsCount}
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: colors.textSecondary,
                    backgroundColor: colors.bgLight,
                    padding: "8px 12px",
                    borderRadius: "6px",
                    display: "block",
                  }}>
                  💡 Pro tip: Keep KYC up-to-date to speed up escrow releases.
                </Typography>
              </Stack>
            </CardContent>
          </Card>

          {/* Get Started Card */}
          <Card
            sx={{
              background: `linear-gradient(135deg, ${colors.accent}12 0%, ${colors.accent}06 100%)`,
              border: `1px solid ${colors.accent}30`,
              boxShadow: `0 4px 12px rgba(255, 165, 0, 0.08)`,
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: `0 8px 20px rgba(255, 165, 0, 0.12)`,
              },
            }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: colors.primary,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}>
                <Shield size={20} color={colors.accent} />
                Get Started
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 2, color: colors.textSecondary }}>
                If you're new, register an account and upload KYC documents.
                Then create a listing or browse existing ones.
              </Typography>

              <Stack direction="row" spacing={1}>
                {!user ? (
                  <>
                    <Button
                      component={RouterLink}
                      to="/register"
                      variant="contained"
                      sx={{
                        backgroundColor: colors.accent,
                        color: colors.white,
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: colors.accentDark,
                          transform: "translateY(-2px)",
                        },
                      }}
                      endIcon={<ArrowRight size={18} />}>
                      Register
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/login"
                      variant="outlined"
                      sx={{
                        borderColor: colors.primary,
                        color: colors.primary,
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: colors.primary,
                          color: colors.white,
                        },
                      }}>
                      Login
                    </Button>
                  </>
                ) : (
                  <Button
                    component={RouterLink}
                    to="/dashboard"
                    variant="contained"
                    fullWidth
                    sx={{
                      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                      color: colors.white,
                      fontWeight: 600,
                      padding: "12px",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: `0 8px 16px rgba(25, 118, 210, 0.3)`,
                      },
                    }}
                    endIcon={<ArrowRight size={18} />}>
                    Open Dashboard
                  </Button>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
