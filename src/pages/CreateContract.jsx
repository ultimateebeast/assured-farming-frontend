// src/pages/CreateContract.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { listingsAPI } from "../api/endpoints";
import api from "../api/client";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import { FileText } from "lucide-react";

export default function CreateContract() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const prefilledListingId = searchParams.get("listing");

  const [listingId, setListingId] = useState(prefilledListingId || "");
  const [quantity, setQuantity] = useState("");
  const [proposedPrice, setProposedPrice] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: listingsData = [], isLoading } = useQuery({
    queryKey: ["listingsForContract"],
    queryFn: () => listingsAPI.getListings({ page_size: 200 }),
    select: (data) => data.results || data.items || data,
  });

  const getCropName = (item) =>
    item?.crop_name || item?.crop?.name || item?.crop?.title || item?.crop || "Crop";
  const getUnit = (item) => item?.unit || item?.listing_unit || "kg";

  const selectedListing = useMemo(() => {
    if (!listingId) return null;
    return listingsData.find((l) => l.id === parseInt(listingId));
  }, [listingId, listingsData]);

  useEffect(() => {
    if (!isLoading && listingsData.length > 0) {
      if (!listingId) {
        setListingId(listingsData[0].id);
      }
    }
  }, [isLoading, listingsData, listingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    // Validation
    if (!listingId) {
      setStatus({ type: "error", text: "Please select a listing" });
      return;
    }
    if (!quantity || parseFloat(quantity) <= 0) {
      setStatus({ type: "error", text: "Please enter valid quantity" });
      return;
    }
    if (!proposedPrice || parseFloat(proposedPrice) <= 0) {
      setStatus({ type: "error", text: "Please enter valid proposed price" });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        listing_id: parseInt(listingId),
        agreed_quantity: parseFloat(quantity),
        price_per_unit: parseFloat(proposedPrice),
        total_value: parseFloat(quantity) * parseFloat(proposedPrice),
        notes: notes || null,
      };

      const res = await api.post("/contracts/contracts/", payload);
      setStatus({ type: "success", text: "Contract created successfully!" });

      setTimeout(() => {
        const id = res.data?.id;
        navigate(`/contracts/${id || ""}`);
      }, 1000);
    } catch (err) {
      console.error("create contract error:", err);
      const server = err.response?.data;
      let errMsg = server?.detail || err.message || "Failed to create contract";
      if (server && typeof server === "object" && !server.detail) {
        // flatten field errors if present
        errMsg = Object.entries(server)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
          .join("; ");
      }
      setStatus({ type: "error", text: errMsg });
    } finally {
      setIsSubmitting(false);
    }
  };

  const maxQuantity =
    selectedListing?.quantity_available ?? selectedListing?.quantity ?? 0;
  const maxPrice = selectedListing?.price_floor ?? 0;

  return (
    <Box initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <FileText size={32} style={{ color: "#1976d2" }} />
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Make an Offer
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Create a contract to purchase from this listing
          </Typography>
        </Box>
      </Box>

      <Card sx={{ maxWidth: 600, mx: "auto" }}>
        <CardContent>
          {status && (
            <Alert severity={status.type} sx={{ mb: 2 }}>
              {status.text}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2.5}>
              {/* Listing Selection */}
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Select Listing *"
                  value={listingId}
                  onChange={(e) => setListingId(e.target.value)}
                  disabled={isLoading}
                  helperText={
                    isLoading
                      ? "Loading listings..."
                      : "Choose a listing to make an offer on"
                  }>
                  {listingsData.map((l) => (
                    <MenuItem key={l.id} value={l.id}>
                      Listing #{l.id} — {getCropName(l)} (
                      {(l.quantity_available ?? l.quantity ?? 0)} {getUnit(l)} available) @ ₹
                      {l.price_floor}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Listing Info Box */}
              {selectedListing && (
                <Grid item xs={12}>
                  <Card
                    sx={{
                      backgroundColor: "#f5f5f5",
                      border: "1px solid #e0e0e0",
                    }}>
                    <CardContent sx={{ py: 1.5 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="textSecondary">
                            Crop & Quantity Available
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {getCropName(selectedListing)} — {maxQuantity} {getUnit(selectedListing)}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="textSecondary">
                            Listing Price
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            ₹{maxPrice} / kg
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="textSecondary">
                            Harvest Date
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {selectedListing?.harvest_date
                              ? new Date(selectedListing.harvest_date).toLocaleDateString()
                              : "—"}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="textSecondary">
                            Quality
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {selectedListing.quality_grade || "Standard"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              )}

              {/* Quantity */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Quantity (kg) *"
                  type="number"
                  fullWidth
                  inputProps={{ step: "0.01", min: "0", max: maxQuantity }}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  helperText={
                    maxQuantity ? `Max available: ${maxQuantity} kg` : ""
                  }
                  error={
                    quantity &&
                    maxQuantity &&
                    parseFloat(quantity) > maxQuantity
                  }
                />
              </Grid>

              {/* Proposed Price */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Proposed Price (₹/kg) *"
                  type="number"
                  fullWidth
                  inputProps={{ step: "0.01", min: "0" }}
                  value={proposedPrice}
                  onChange={(e) => setProposedPrice(e.target.value)}
                  helperText={`Listing at ₹${maxPrice}/kg`}
                />
              </Grid>

              {/* Total Value */}
              {quantity && proposedPrice && (
                <Grid item xs={12}>
                  <Card sx={{ backgroundColor: "#e3f2fd" }}>
                    <CardContent sx={{ py: 1, px: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="textSecondary">
                            Total Value
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            ₹
                            {(
                              parseFloat(quantity) * parseFloat(proposedPrice)
                            ).toLocaleString("en-IN", {
                              maximumFractionDigits: 2,
                            })}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="textSecondary">
                            Price vs Listing
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              color:
                                parseFloat(proposedPrice) >= maxPrice
                                  ? "#4caf50"
                                  : "#ff9800",
                            }}>
                            {parseFloat(proposedPrice) >= maxPrice ? "+" : "-"}₹
                            {Math.abs(
                              parseFloat(proposedPrice) - maxPrice
                            ).toFixed(2)}
                            /kg
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              )}

              {/* Notes */}
              <Grid item xs={12}>
                <TextField
                  label="Additional Notes (optional)"
                  fullWidth
                  multiline
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="E.g., delivery timeline, special conditions, payment terms..."
                />
              </Grid>

              {/* Buttons */}
              <Grid item xs={12}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={
                      isSubmitting || !listingId || !quantity || !proposedPrice
                    }
                    sx={{ flex: 1 }}>
                    {isSubmitting ? (
                      <>
                        <CircularProgress size={20} sx={{ mr: 1 }} />{" "}
                        Creating...
                      </>
                    ) : (
                      "Make Offer"
                    )}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/marketplace")}
                    sx={{ flex: 1 }}>
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
