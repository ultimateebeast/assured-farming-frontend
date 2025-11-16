// src/pages/Analytics.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../api/client";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Button,
  Divider,
} from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, Download, Calendar } from "lucide-react";

const fetchMetric = async (url) => {
  try {
    const r = await api.get(url);
    return r.data;
  } catch (e) {
    console.error('analytics fetch failed', url, e);
    return null; // treat as empty
  }
};

export default function Analytics() {
  const { data: revenue, isLoading: rLoading } = useQuery({
    queryKey: ["analytics", "farmer-revenue"],
    queryFn: () => fetchMetric("/analytics/farmer-revenue/"),
    retry: 0,
  });
  const { data: acceptance, isLoading: aLoading } = useQuery({
    queryKey: ["analytics", "acceptance"],
    queryFn: () => fetchMetric("/analytics/acceptance-rate/"),
    retry: 0,
  });
  const { data: avgDelivery, isLoading: dLoading } = useQuery({
    queryKey: ["analytics", "avg-delivery-time"],
    queryFn: () => fetchMetric("/analytics/avg-delivery-time/"),
    retry: 0,
  });

  const loading = rLoading || aLoading || dLoading;

  // normalize / fallback shapes
  const revenueSeries = Array.isArray(revenue)
    ? revenue
    : revenue?.series || [];
  const avgDeliverySeries = Array.isArray(avgDelivery)
    ? avgDelivery
    : avgDelivery?.series || [];

  const pieData = [
    { name: "Accepted", value: acceptance?.accepted || 0 },
    { name: "Rejected", value: acceptance?.rejected || 0 },
  ];
  const COLORS = ["#4caf50", "#ff9800"];

  // Calculate totals
  const totalRevenue = revenueSeries.reduce(
    (sum, item) => sum + (item.value || 0),
    0
  );
  const totalContracts =
    (acceptance?.accepted || 0) + (acceptance?.rejected || 0);
  const acceptanceRate =
    totalContracts > 0
      ? (((acceptance?.accepted || 0) / totalContracts) * 100).toFixed(1)
      : 0;

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}>
        <CircularProgress />
      </Box>
    );
  }

  // Determine if we have any data to show
  const hasRevenue = Array.isArray(revenueSeries) && revenueSeries.length > 0;
  const hasAcceptance = (acceptance?.accepted || 0) + (acceptance?.rejected || 0) > 0;
  const hasDelivery = Array.isArray(avgDeliverySeries) && avgDeliverySeries.length > 0;
  const hasAny = hasRevenue || hasAcceptance || hasDelivery;

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TrendingUp size={32} style={{ color: "#1976d2" }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Analytics & Reports
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Track your marketplace performance and earnings
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            startIcon={<Calendar size={18} />}
            variant="outlined"
            size="small">
            Last 30 Days
          </Button>
          <Button
            startIcon={<Download size={18} />}
            variant="outlined"
            size="small"
            disabled={!hasAny}
          >
            Export
          </Button>
        </Box>
      </Box>

      {/* Stat Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Revenue
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                ₹{totalRevenue.toLocaleString("en-IN")}
              </Typography>
              <Typography variant="caption" sx={{ color: "#4caf50" }}>
                ↑ 12% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Contracts
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                {totalContracts}
              </Typography>
              <Typography variant="caption" sx={{ color: "#2196f3" }}>
                {acceptance?.accepted || 0} accepted
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Acceptance Rate
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                {acceptanceRate}%
              </Typography>
              <Typography variant="caption" sx={{ color: "#4caf50" }}>
                ↑ 5% improvement
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Avg Delivery
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                {avgDeliverySeries?.[0]?.value || "—"} days
              </Typography>
              <Typography variant="caption" sx={{ color: "#ff9800" }}>
                Within target
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Charts */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Revenue Trend
              </Typography>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart
                  data={revenueSeries}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <XAxis
                    dataKey="name"
                    stroke="#9e9e9e"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis stroke="#9e9e9e" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      borderRadius: 8,
                      border: "none",
                      color: "white",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#1976d2"
                    strokeWidth={2}
                    dot={{ fill: "#1976d2", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Acceptance Rate
              </Typography>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={4}>
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <Box sx={{ mt: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}>
                  <Typography variant="body2">Accepted</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {acceptance?.accepted ?? "—"}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2">Rejected</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {acceptance?.rejected ?? "—"}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Delivery Performance (Days)
              </Typography>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart
                  data={avgDeliverySeries}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <XAxis
                    dataKey="name"
                    stroke="#9e9e9e"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis stroke="#9e9e9e" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      borderRadius: 8,
                      border: "none",
                      color: "white",
                    }}
                  />
                  <Bar dataKey="value" fill="#ff9800" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
