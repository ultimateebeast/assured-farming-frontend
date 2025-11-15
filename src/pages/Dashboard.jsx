import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  LinearProgress,
  Stack,
} from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { analyticsAPI, contractsAPI, listingsAPI } from "../api/endpoints";
import {
  LoadingSkeleton,
  StatusBadge,
  PriceDisplay,
} from "../components/FormFields";
import {
  TrendingUp,
  Activity,
  FileText,
  DollarSign,
  Shield,
} from "lucide-react";
import { colors } from "../theme/theme";
const safeColors = {
  primary: colors?.primary || "#1976D2",
  primaryDark: colors?.primaryDark || "#1565C0",
  accent: colors?.accent || "#FFA500",
  accentDark: colors?.accentDark || "#FF9500",
  success: colors?.success || "#4CAF50",
  warning: colors?.warning || "#FFC107",
  white: colors?.white || "#FFFFFF",
  textSecondary: colors?.textSecondary || "#757575",
};
import styles from "./Dashboard.module.css";

// Chart Colors - Theme integrated
const COLORS = [safeColors.primary, safeColors.accent, safeColors.success, safeColors.warning];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch dashboard stats
  const { data: stats, isLoading: statsLoading, error: statsError } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: () => analyticsAPI.getDashboardStats(),
    enabled: !!user,
    retry: 0,
  });

  // Fetch recent contracts
  const { data: contracts, isLoading: contractsLoading, error: contractsError } = useQuery({
    queryKey: ["recentContracts"],
    queryFn: () => contractsAPI.getContracts({ limit: 5 }),
    enabled: !!user,
    retry: 0,
  });

  // Fetch recent listings
  const { data: listings, isLoading: listingsLoading, error: listingsError } = useQuery({
    queryKey: ["recentListings"],
    queryFn: () => listingsAPI.getListings({ limit: 5 }),
    enabled: !!user,
    retry: 0,
  });

  // Fetch revenue data for charts (do not break page if it fails)
  useQuery({
    queryKey: ["revenueAnalytics"],
    queryFn: () => analyticsAPI.getRevenueAnalytics(),
    enabled: !!user,
    retry: 0,
  });

  const anyError = statsError || contractsError || listingsError;

  // Sample data for charts (in production, use real data from API)
  const chartData = [
    { month: "Jan", sales: 4000, revenue: 2400 },
    { month: "Feb", sales: 3000, revenue: 1398 },
    { month: "Mar", sales: 2000, revenue: 9800 },
    { month: "Apr", sales: 2780, revenue: 3908 },
    { month: "May", sales: 1890, revenue: 4800 },
    { month: "Jun", sales: 2390, revenue: 3800 },
  ];

  const pieData = [
    { name: "Active", value: stats?.active_contracts || 12 },
    { name: "Completed", value: stats?.completed_contracts || 8 },
    { name: "Pending", value: stats?.pending_contracts || 5 },
  ];

  if (anyError) {
    return (
      <Box sx={{ mt: 6, textAlign: "center" }}>
        <Typography color="error" variant="body1">
          Failed to load dashboard data.
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.dashboardContainer}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            background: `linear-gradient(135deg, ${safeColors.primary} 0%, ${safeColors.accent} 100%)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
          }}>
          Welcome back, {user?.first_name || user?.username}! 👋
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: safeColors.textSecondary,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}>
          <Activity size={18} color={safeColors.accent} />
          Here's your farming performance overview
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Total Revenue */}
        <Grid item xs={12} sm={6} md={3}>
          {statsLoading ? (
            <LoadingSkeleton type="card" />
          ) : (
            <Card
              sx={{
                background: `linear-gradient(135deg, ${safeColors.primary} 0%, ${safeColors.primaryDark} 100%)`,
                color: safeColors.white,
                borderRadius: "12px",
                boxShadow: `0 8px 24px rgba(25, 118, 210, 0.15)`,
                transition: "all 0.3s ease",
                border: `1px solid rgba(255, 255, 255, 0.1)`,
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: `0 12px 32px rgba(25, 118, 210, 0.25)`,
                },
              }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <DollarSign
                    size={32}
                    style={{
                      opacity: 0.8,
                      background: "rgba(255, 255, 255, 0.1)",
                      padding: 8,
                      borderRadius: 8,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{ fontSize: 13, opacity: 0.8, fontWeight: 500 }}
                      gutterBottom>
                      Total Revenue
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                      ₹{(stats?.total_revenue || 0).toLocaleString("en-IN")}
                    </Typography>
                    <Chip
                      label="↑ 12% from last month"
                      size="small"
                      sx={{
                        backgroundColor: "rgba(76, 175, 80, 0.2)",
                        color: safeColors.success,
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Active Listings */}
        <Grid item xs={12} sm={6} md={3}>
          {statsLoading ? (
            <LoadingSkeleton type="card" />
          ) : (
            <Card
              sx={{
                background: `linear-gradient(135deg, ${safeColors.accent} 0%, ${safeColors.accentDark} 100%)`,
                color: safeColors.white,
                borderRadius: "12px",
                boxShadow: `0 8px 24px rgba(255, 165, 0, 0.15)`,
                transition: "all 0.3s ease",
                border: `1px solid rgba(255, 255, 255, 0.1)`,
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: `0 12px 32px rgba(255, 165, 0, 0.25)`,
                },
              }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <FileText
                    size={32}
                    style={{
                      opacity: 0.8,
                      background: "rgba(255, 255, 255, 0.1)",
                      padding: 8,
                      borderRadius: 8,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{ fontSize: 13, opacity: 0.8, fontWeight: 500 }}
                      gutterBottom>
                      Active Listings
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                      {stats?.active_listings || 0}
                    </Typography>
                    <Chip
                      label="2 sold this month"
                      size="small"
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        color: safeColors.white,
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Active Contracts */}
        <Grid item xs={12} sm={6} md={3}>
          {statsLoading ? (
            <LoadingSkeleton type="card" />
          ) : (
            <Card
              sx={{
                background: `linear-gradient(135deg, ${safeColors.success} 0%, #45B393 100%)`,
                color: safeColors.white,
                borderRadius: "12px",
                boxShadow: `0 8px 24px rgba(76, 175, 80, 0.15)`,
                transition: "all 0.3s ease",
                border: `1px solid rgba(255, 255, 255, 0.1)`,
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: `0 12px 32px rgba(76, 175, 80, 0.25)`,
                },
              }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <TrendingUp
                    size={32}
                    style={{
                      opacity: 0.8,
                      background: "rgba(255, 255, 255, 0.1)",
                      padding: 8,
                      borderRadius: 8,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{ fontSize: 13, opacity: 0.8, fontWeight: 500 }}
                      gutterBottom>
                      Active Contracts
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                      {stats?.active_contracts || 0}
                    </Typography>
                    <Chip
                      label="View All"
                      size="small"
                      onClick={() => navigate("/contracts")}
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        color: safeColors.white,
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        cursor: "pointer",
                      }}
                    />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* KYC Status */}
        <Grid item xs={12} sm={6} md={3}>
          {statsLoading ? (
            <LoadingSkeleton type="card" />
          ) : (
            <Card
              sx={{
                background: `linear-gradient(135deg, ${safeColors.warning} 0%, #FFBA5C 100%)`,
                color: safeColors.white,
                borderRadius: "12px",
                boxShadow: `0 8px 24px rgba(255, 193, 7, 0.15)`,
                transition: "all 0.3s ease",
                border: `1px solid rgba(255, 255, 255, 0.1)`,
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: `0 12px 32px rgba(255, 193, 7, 0.25)`,
                },
              }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Shield
                    size={32}
                    style={{
                      opacity: 0.8,
                      background: "rgba(255, 255, 255, 0.1)",
                      padding: 8,
                      borderRadius: 8,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{ fontSize: 13, opacity: 0.8, fontWeight: 500 }}
                      gutterBottom>
                      KYC Status
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        textTransform: "capitalize",
                      }}>
                      {stats?.kyc_status || "Pending"}
                    </Typography>
                    {stats?.kyc_status !== "approved" && (
                      <Chip
                        label="Update Now"
                        size="small"
                        onClick={() => navigate("/kyc")}
                        sx={{
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          color: safeColors.white,
                          fontWeight: 600,
                          fontSize: "0.75rem",
                          cursor: "pointer",
                        }}
                      />
                    )}
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Revenue Chart */}
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              borderRadius: "16px",
              boxShadow: "0 5px 20px rgba(0, 0, 0, 0.08)",
            }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                📊 Revenue & Sales Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="month" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#667eea"
                    strokeWidth={2}
                    dot={{ fill: "#667eea", r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#764ba2"
                    strokeWidth={2}
                    dot={{ fill: "#764ba2", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: "16px",
              boxShadow: "0 5px 20px rgba(0, 0, 0, 0.08)",
            }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                📈 Contract Status
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Contracts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Card
            sx={{
              borderRadius: "16px",
              boxShadow: "0 5px 20px rgba(0, 0, 0, 0.08)",
            }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  📋 Recent Contracts
                </Typography>
                <Button
                  size="small"
                  sx={{ color: "#667eea", textTransform: "none" }}
                  onClick={() => navigate("/contracts")}>
                  View All →
                </Button>
              </Box>

              {contractsLoading ? (
                <LoadingSkeleton type="card" count={3} />
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                        <TableCell sx={{ fontWeight: "bold" }}>Crop</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Quantity
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Status
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {contracts?.results?.slice(0, 5).map((contract) => (
                        <TableRow key={contract.id} hover>
                          <TableCell>
                            {contract.listing?.crop?.name || "N/A"}
                          </TableCell>
                          <TableCell>
                            {contract.quantity} {contract.listing?.unit}
                          </TableCell>
                          <TableCell>
                            <PriceDisplay amount={contract.price_per_unit} />
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={contract.status} />
                          </TableCell>
                          <TableCell>
                            {new Date(contract.created_at).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Listings */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card
            sx={{
              borderRadius: "16px",
              boxShadow: "0 5px 20px rgba(0, 0, 0, 0.08)",
            }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  🌾 Your Recent Listings
                </Typography>
                <Button
                  size="small"
                  sx={{ color: "#667eea", textTransform: "none" }}
                  onClick={() => navigate("/marketplace")}>
                  View All →
                </Button>
              </Box>

              {listingsLoading ? (
                <LoadingSkeleton type="card" count={3} />
              ) : (
                <Grid container spacing={2}>
                  {listings?.results?.slice(0, 3).map((listing) => (
                    <Grid item xs={12} sm={6} md={4} key={listing.id}>
                      <Card
                        sx={{
                          borderRadius: "12px",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                          },
                        }}
                        onClick={() => navigate(`/listings/${listing.id}`)}>
                        <Box
                          sx={{
                            height: 150,
                            background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: "48px",
                          }}>
                          🌾
                        </Box>
                        <CardContent>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "600", mb: 1 }}
                            noWrap>
                            {listing.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "#666", mb: 1 }}>
                            {listing.quantity} {listing.unit}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}>
                            <PriceDisplay
                              amount={listing.price_per_unit}
                              size="large"
                            />
                            <StatusBadge status={listing.status} />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
