// src/pages/ListingDetail.jsx
import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Avatar,
  Chip,
  CircularProgress,
  Divider,
} from "@mui/material";
import { listingsAPI } from "../api/endpoints";
import { useQuery } from "@tanstack/react-query";
import { Calendar, MapPin, Leaf, Package, Phone, Mail } from "lucide-react";

export default function ListingDetail() {
  const { id } = useParams();

  const { data: listing, isLoading } = useQuery({
    queryKey: ["listing", id],
    queryFn: () => listingsAPI.getListing(id),
    enabled: !!id,
  });

  const { data: imagesData } = useQuery({
    queryKey: ["listingImages", id],
    queryFn: () => listingsAPI.getListingImages(id),
    enabled: !!id,
  });

  if (isLoading) {
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

  if (!listing) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Listing not found.
        </Typography>
      </Box>
    );
  }

  const images = imagesData?.results || imagesData || [];

  return (
    <Box sx={{ p: 2, maxWidth: 1400, mx: "auto" }}>
      <Grid container spacing={3}>
        {/* Main Listing Info */}
        <Grid item xs={12} md={8}>
          {/* Image Gallery */}
          <Card sx={{ mb: 3, overflow: "hidden" }}>
            {images.length > 0 ? (
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  overflowX: "auto",
                  p: 1,
                  backgroundColor: "#f5f5f5",
                  minHeight: 240,
                }}>
                {images.map((img, idx) => (
                  <Box
                    key={img.id || idx}
                    component="img"
                    src={img.url || img.file}
                    alt={`Listing ${idx + 1}`}
                    sx={{
                      height: 220,
                      borderRadius: 1,
                      objectFit: "cover",
                      minWidth: 220,
                    }}
                  />
                ))}
              </Box>
            ) : (
              <Box
                sx={{
                  height: 240,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f5f5f5",
                  fontSize: "3rem",
                }}>
                🌾
              </Box>
            )}
          </Card>

          {/* Listing Details Card */}
          <Card>
            <CardContent>
              {/* Header */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  mb: 2,
                }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    {listing.crop?.name || listing.crop || listing.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Listing #{listing.id}
                  </Typography>
                </Box>
                <Chip
                  label="Available"
                  color="success"
                  variant="outlined"
                  size="small"
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Key Details Grid */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: "center", p: 1 }}>
                    <Package
                      size={24}
                      style={{ color: "#1976d2", marginBottom: 8 }}
                    />
                    <Typography variant="caption" color="textSecondary">
                      Quantity
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {listing.quantity_available || listing.quantity} kg
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: "center", p: 1 }}>
                    <Leaf
                      size={24}
                      style={{ color: "#4caf50", marginBottom: 8 }}
                    />
                    <Typography variant="caption" color="textSecondary">
                      Price
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: "#d32f2f" }}>
                      ₹{listing.price_floor}/kg
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: "center", p: 1 }}>
                    <Calendar
                      size={24}
                      style={{ color: "#ff9800", marginBottom: 8 }}
                    />
                    <Typography variant="caption" color="textSecondary">
                      Harvest
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {new Date(listing.harvest_date).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: "center", p: 1 }}>
                    <Leaf
                      size={24}
                      style={{ color: "#9c27b0", marginBottom: 8 }}
                    />
                    <Typography variant="caption" color="textSecondary">
                      Quality
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {listing.quality_grade || "Standard"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              {/* Location */}
              <Box sx={{ display: "flex", alignItems: "start", gap: 2, mb: 2 }}>
                <MapPin size={20} style={{ color: "#1976d2", marginTop: 4 }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Location
                  </Typography>
                  <Typography variant="body2">{listing.location}</Typography>
                </Box>
              </Box>

              {/* Description if available */}
              {listing.description && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 1 }}>
                    Description
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {listing.description}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Seller Card & Action */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 2, position: "sticky", top: 20 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Seller Information
              </Typography>

              {/* Seller Avatar & Info */}
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    backgroundColor: "#1976d2",
                    fontSize: "1.5rem",
                  }}>
                  {(
                    listing.farmer?.first_name ||
                    listing.farmer?.username ||
                    "?"
                  )
                    .slice(0, 1)
                    .toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {listing.farmer?.first_name && listing.farmer?.last_name
                      ? `${listing.farmer.first_name} ${listing.farmer.last_name}`
                      : listing.farmer?.username || "Unknown Seller"}
                  </Typography>
                  <Chip
                    label={listing.farmer?.role || "Farmer"}
                    size="small"
                    variant="outlined"
                    sx={{ mt: 0.5 }}
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Contact Info */}
              <Box sx={{ mb: 2 }}>
                {listing.farmer?.phone && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      mb: 1,
                    }}>
                    <Phone size={18} style={{ color: "#1976d2" }} />
                    <Typography variant="body2">
                      {listing.farmer.phone}
                    </Typography>
                  </Box>
                )}
                {listing.farmer?.email && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Mail size={18} style={{ color: "#1976d2" }} />
                    <Typography variant="body2">
                      {listing.farmer.email}
                    </Typography>
                  </Box>
                )}
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Rating / Stats (if available) */}
              {listing.farmer?.rating && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="textSecondary">
                    Seller Rating
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 0.5,
                    }}>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      {listing.farmer.rating}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      / 5.0
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* Make Offer Button */}
              <Button
                component={RouterLink}
                to={`/create-contract?listing=${listing.id}`}
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 2, fontWeight: 600 }}>
                Make an Offer
              </Button>

              {/* Secondary Action */}
              <Button variant="outlined" fullWidth sx={{ mt: 1 }}>
                Contact Seller
              </Button>
            </CardContent>
          </Card>

          {/* Price Summary Card */}
          <Card sx={{ backgroundColor: "#f0f7ff" }}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
                Price Estimate
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="textSecondary">
                    Base Price
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    ₹{listing.price_floor}/kg
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="textSecondary">
                    1000 kg Cost
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    ₹{(listing.price_floor * 1000).toLocaleString("en-IN")}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
