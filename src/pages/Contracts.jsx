// src/pages/Contracts.jsx
import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../api/client";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Chip,
  Avatar,
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  TrendingUp,
} from "lucide-react";

const STATUS_CONFIG = {
  pending: { color: "#ff9800", icon: Clock, label: "Pending" },
  negotiating: { color: "#2196f3", icon: Clock, label: "Negotiating" },
  accepted: { color: "#4caf50", icon: CheckCircle, label: "Accepted" },
  rejected: { color: "#f44336", icon: XCircle, label: "Rejected" },
  completed: { color: "#9c27b0", icon: CheckCircle, label: "Completed" },
};

const fetchContracts = async () => {
  const res = await api.get("/contracts/contracts/");
  return res.data.results || res.data || [];
};

export default function Contracts() {
  const [statusFilter, setStatusFilter] = useState("all");
  const { data: contracts = [], isLoading } = useQuery({
    queryKey: ["contracts"],
    queryFn: fetchContracts,
    refetchInterval: 30000,
  });

  const filteredContracts = useMemo(() => {
    if (statusFilter === "all") return contracts;
    return contracts.filter((c) => c.status === statusFilter);
  }, [contracts, statusFilter]);

  const stats = useMemo(() => {
    return {
      all: contracts.length,
      pending: contracts.filter((c) => c.status === "pending").length,
      negotiating: contracts.filter((c) => c.status === "negotiating").length,
      accepted: contracts.filter((c) => c.status === "accepted").length,
      rejected: contracts.filter((c) => c.status === "rejected").length,
      completed: contracts.filter((c) => c.status === "completed").length,
    };
  }, [contracts]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  const getStatusColor = (status) => STATUS_CONFIG[status]?.color || "#9e9e9e";
  const getStatusIcon = (status) => STATUS_CONFIG[status]?.icon || FileText;

  return (
    <Box>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <FileText size={32} style={{ color: "#1976d2" }} />
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Contracts
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Manage your marketplace contracts and negotiations
          </Typography>
        </Box>
      </Box>

      {/* Status Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={statusFilter}
          onChange={(e, v) => setStatusFilter(v)}
          sx={{ "& .MuiTab-root": { textTransform: "none", minWidth: 120 } }}>
          <Tab label={`All (${stats.all})`} value="all" />
          <Tab label={`Pending (${stats.pending})`} value="pending" />
          <Tab
            label={`Negotiating (${stats.negotiating})`}
            value="negotiating"
          />
          <Tab label={`Accepted (${stats.accepted})`} value="accepted" />
          <Tab label={`Rejected (${stats.rejected})`} value="rejected" />
          <Tab label={`Completed (${stats.completed})`} value="completed" />
        </Tabs>
      </Box>

      {filteredContracts.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 6,
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
          }}>
          <FileText size={48} style={{ color: "#ccc", marginBottom: 16 }} />
          <Typography variant="h6" color="textSecondary">
            No {statusFilter !== "all" ? statusFilter : ""} contracts yet
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Start by creating a listing or making an offer
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filteredContracts.map((contract) => {
            const StatusIcon = getStatusIcon(contract.status);
            return (
              <Grid item xs={12} md={6} key={contract.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: 4,
                      transform: "translateY(-4px)",
                    },
                    borderLeft: `4px solid ${getStatusColor(contract.status)}`,
                  }}>
                  <CardContent sx={{ flex: 1 }}>
                    {/* Header */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "start",
                        mb: 2,
                      }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Contract #{contract.id}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Created{" "}
                          {new Date(contract.created_at).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Chip
                        icon={<StatusIcon size={16} />}
                        label={
                          STATUS_CONFIG[contract.status]?.label ||
                          contract.status
                        }
                        size="small"
                        sx={{
                          backgroundColor: getStatusColor(contract.status),
                          color: "white",
                          fontWeight: 600,
                        }}
                      />
                    </Box>

                    {/* Details Grid */}
                    <Grid container spacing={1} sx={{ mb: 2 }}>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="textSecondary">
                          Listing
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          #{contract.listing?.id ?? contract.listing}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="textSecondary">
                          Quantity
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {contract.agreed_quantity || "—"} kg
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="textSecondary">
                          Price/Unit
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          ₹{contract.price_per_unit || "—"}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="textSecondary">
                          Total Value
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          ₹
                          {contract.agreed_quantity && contract.price_per_unit
                            ? (
                                contract.agreed_quantity *
                                contract.price_per_unit
                              ).toLocaleString("en-IN")
                            : "—"}
                        </Typography>
                      </Grid>
                    </Grid>

                    {/* Parties */}
                    <Box
                      sx={{
                        mb: 2,
                        p: 1.5,
                        backgroundColor: "#f9f9f9",
                        borderRadius: 1,
                      }}>
                      <Typography variant="caption" color="textSecondary">
                        COUNTERPARTY
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 0.5,
                        }}>
                        <Avatar
                          sx={{ width: 28, height: 28, fontSize: "0.75rem" }}>
                          {contract.buyer?.username?.[0]?.toUpperCase() || "B"}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {contract.buyer?.first_name
                              ? `${contract.buyer.first_name} ${contract.buyer.last_name}`.trim()
                              : contract.buyer?.username || "Unknown Buyer"}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {contract.buyer?.role || "Buyer"}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Action Button */}
                    <Button
                      component={RouterLink}
                      to={`/contracts/${contract.id}`}
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 1,
                        backgroundColor: getStatusColor(contract.status),
                        "&:hover": {
                          backgroundColor: getStatusColor(contract.status),
                          opacity: 0.9,
                        },
                      }}>
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
