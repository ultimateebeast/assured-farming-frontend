// src/pages/CreateListing.jsx
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Grid,
} from "@mui/material";
import { Plus, ArrowLeft } from "lucide-react";
import api from "../api/client";
import { listingsAPI } from "../api/endpoints";
import { useNavigate } from "react-router-dom";
import { colors } from "../theme/theme";

export default function CreateListing() {
  const [form, setForm] = useState({
    crop_id: "",
    quantity_available: "",
    price_floor: "",
    harvest_date: "",
    quality_grade: "standard",
    location: "",
  });
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cropsLoading, setCropsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch available crops
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await listingsAPI.getCrops();
         setCrops(res.results || res || []);
      } catch (err) {
        console.error("Failed to fetch crops:", err);
        setError("Failed to load crops");
      } finally {
        setCropsLoading(false);
      }
    };
    fetchCrops();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate form
    if (
      !form.crop_id ||
      !form.quantity_available ||
      !form.price_floor ||
      !form.harvest_date ||
      !form.location
    ) {
      setError("Please fill all required fields");
      setLoading(false);
      return;
    }

    try {
      // Build FormData to match backend expectations (supports file uploads later)
      const payload = new FormData();
      payload.append("crop_id", parseInt(form.crop_id));
      payload.append("quantity_available", parseFloat(form.quantity_available));
      payload.append("price_floor", parseFloat(form.price_floor));
      payload.append("harvest_date", form.harvest_date);
      payload.append("quality_grade", form.quality_grade);
      payload.append("location", form.location);

      await listingsAPI.createListing(payload);
      alert("Listing created successfully!");
      navigate("/marketplace");
    } catch (err) {
      // Prefer structured errors from DRF, but fall back to message/html
      console.error("create listing error:", err);
      const resp = err.response?.data;
      if (resp) {
        // If it's HTML (500 debug), show a short message and log full HTML
        if (typeof resp === "string") {
          console.error("Server HTML response:", resp);
          setError("Server error while creating listing (see console)");
        } else if (typeof resp === "object") {
          // Try to extract useful fields
          const first =
            resp.detail || resp.error || (Object.values(resp)[0] ?? null);
          setError(typeof first === "string" ? first : JSON.stringify(resp));
        } else {
          setError("Failed to create listing");
        }
      } else {
        setError(err.message || "Failed to create listing");
      }
    } finally {
      setLoading(false);
    }
  };

  if (cropsLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ maxWidth: 700, mx: "auto" }}>
        {/* Header */}
        <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            startIcon={<ArrowLeft size={20} />}
            onClick={() => navigate("/marketplace")}
            sx={{
              color: colors.primary,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: colors.primary + "15",
              },
            }}>
            Back
          </Button>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
              Create New Listing
            </Typography>
            <Typography variant="body2" sx={{ color: colors.textSecondary }}>
              Share your harvest with interested buyers
            </Typography>
          </Box>
        </Box>

        {/* Form Card */}
        <Card
          sx={{
            background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.bgLight} 100%)`,
            border: `1px solid ${colors.primary}20`,
            boxShadow: `0 8px 24px rgba(25, 118, 210, 0.08)`,
          }}>
          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert
                severity="error"
                onClose={() => setError("")}
                sx={{
                  mb: 3,
                  backgroundColor: `${colors.error}15`,
                  color: colors.error,
                  border: `1px solid ${colors.error}30`,
                }}>
                {error}
              </Alert>
            )}

            <form onSubmit={submit}>
              <Grid container spacing={2}>
                {/* Crop Selection */}
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Crop</InputLabel>
                    <Select
                      name="crop_id"
                      value={form.crop_id}
                      onChange={handleChange}
                      label="Crop"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": {
                            borderColor: colors.primary,
                          },
                        },
                      }}>
                      <MenuItem value="">Select a crop</MenuItem>
                      {crops.map((crop) => (
                        <MenuItem key={crop.id} value={crop.id}>
                          {crop.name} {crop.variety ? `(${crop.variety})` : ""}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Quantity */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Quantity Available"
                    name="quantity_available"
                    type="number"
                    fullWidth
                    value={form.quantity_available}
                    onChange={handleChange}
                    placeholder="e.g., 100"
                    required
                    inputProps={{ step: "0.01", min: "0" }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: colors.primary,
                        },
                      },
                    }}
                  />
                </Grid>

                {/* Price Floor */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Minimum Price (₹)"
                    name="price_floor"
                    type="number"
                    fullWidth
                    value={form.price_floor}
                    onChange={handleChange}
                    placeholder="e.g., 5000"
                    required
                    inputProps={{ step: "0.01", min: "0" }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: colors.primary,
                        },
                      },
                    }}
                  />
                </Grid>

                {/* Harvest Date */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Harvest Date"
                    name="harvest_date"
                    type="date"
                    fullWidth
                    value={form.harvest_date}
                    onChange={handleChange}
                    required
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: colors.primary,
                        },
                      },
                    }}
                  />
                </Grid>

                {/* Quality Grade */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Quality Grade</InputLabel>
                    <Select
                      name="quality_grade"
                      value={form.quality_grade}
                      onChange={handleChange}
                      label="Quality Grade"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": {
                            borderColor: colors.primary,
                          },
                        },
                      }}>
                      <MenuItem value="standard">Standard</MenuItem>
                      <MenuItem value="premium">Premium</MenuItem>
                      <MenuItem value="organic">Organic</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Location */}
                <Grid item xs={12}>
                  <TextField
                    label="Location"
                    name="location"
                    fullWidth
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g., Village, District, State"
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: colors.primary,
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>

              {/* Buttons */}
              <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate("/marketplace")}
                  sx={{
                    borderColor: colors.primary,
                    color: colors.primary,
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: colors.primary + "15",
                    },
                  }}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  endIcon={
                    loading ? (
                      <CircularProgress size={18} />
                    ) : (
                      <Plus size={18} />
                    )
                  }
                  sx={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: "1rem",
                    padding: "10px 24px",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: `0 8px 20px rgba(25, 118, 210, 0.3)`,
                    },
                  }}>
                  {loading ? "Creating..." : "Create Listing"}
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
