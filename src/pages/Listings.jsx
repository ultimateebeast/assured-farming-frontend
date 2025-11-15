import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack,
  CircularProgress,
} from "@mui/material";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedCard from "../components/AnimatedCard";
import { listingsAPI } from "../api/endpoints";
import { useQuery } from "@tanstack/react-query";
import { colors } from "../theme/theme";

export default function Listings() {
  const [search, setSearch] = useState("");
  const [crop, setCrop] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data: cropsData } = useQuery({
    queryKey: ["crops"],
    queryFn: () => listingsAPI.getCrops(),
  });

  const { data: listingsData, isLoading } = useQuery({
    queryKey: ["listings", search, crop, minPrice, maxPrice, page],
    queryFn: () =>
      listingsAPI.getListings({
        search: search || undefined,
        crop: crop || undefined,
        price_min: minPrice || undefined,
        price_max: maxPrice || undefined,
        page,
        page_size: pageSize,
      }),
    keepPreviousData: true,
  });

  const listings =
    listingsData?.results || listingsData?.items || listingsData || [];
  const total =
    listingsData?.count ||
    listingsData?.total ||
    (Array.isArray(listings) ? listings.length : 0);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}>
          Marketplace Listings
        </Typography>
        <Typography variant="body1" sx={{ color: colors.textSecondary }}>
          Browse and discover quality products from trusted farmers
        </Typography>
      </Box>

      {/* Filters Card */}
      <Card
        sx={{
          mb: 4,
          background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.bgLight} 100%)`,
          border: `1px solid ${colors.primary}20`,
          boxShadow: `0 4px 12px rgba(25, 118, 210, 0.08)`,
        }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                color: colors.primary,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}>
              <Filter size={18} />
              Filter Listings
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  size="small"
                  label="Search"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <Search size={18} style={{ marginRight: 8 }} />
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: colors.primary,
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Crop</InputLabel>
                  <Select
                    value={crop}
                    label="Crop"
                    onChange={(e) => setCrop(e.target.value)}>
                    <MenuItem value="">All crops</MenuItem>
                    {cropsData?.results?.map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        {c.name} {c.variety ? `(${c.variety})` : ""}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  size="small"
                  label="Min Price"
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="₹0"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  size="small"
                  label="Max Price"
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="₹10000"
                />
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={() => {
                  setSearch("");
                  setCrop("");
                  setMinPrice("");
                  setMaxPrice("");
                  setPage(1);
                }}
                sx={{
                  borderColor: colors.textSecondary,
                  color: colors.textSecondary,
                  "&:hover": {
                    borderColor: colors.primary,
                    color: colors.primary,
                  },
                }}>
                Clear
              </Button>
              <Button
                variant="contained"
                onClick={() => setPage(1)}
                sx={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                  fontWeight: 600,
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 8px 16px rgba(25, 118, 210, 0.3)`,
                  },
                }}>
                Apply Filters
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Active Filters */}
      {(search || crop || minPrice || maxPrice) && (
        <Box sx={{ mb: 3, display: "flex", gap: 1, flexWrap: "wrap" }}>
          {search && (
            <Chip
              label={`Search: ${search}`}
              onDelete={() => setSearch("")}
              sx={{ backgroundColor: colors.primary, color: colors.white }}
            />
          )}
          {crop && (
            <Chip
              label={`Crop: ${
                cropsData?.results?.find((c) => c.id == crop)?.name
              }`}
              onDelete={() => setCrop("")}
              sx={{ backgroundColor: colors.accent, color: colors.white }}
            />
          )}
          {minPrice && (
            <Chip
              label={`Min: ₹${minPrice}`}
              onDelete={() => setMinPrice("")}
              sx={{ backgroundColor: colors.primary, color: colors.white }}
            />
          )}
          {maxPrice && (
            <Chip
              label={`Max: ₹${maxPrice}`}
              onDelete={() => setMaxPrice("")}
              sx={{ backgroundColor: colors.primary, color: colors.white }}
            />
          )}
        </Box>
      )}

      {/* Listings Grid */}
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : listings.length === 0 ? (
        <Card
          sx={{
            py: 8,
            textAlign: "center",
            background: `linear-gradient(135deg, ${colors.bgLight} 0%, ${colors.white} 100%)`,
            border: `1px solid ${colors.primary}20`,
          }}>
          <Typography variant="h6" sx={{ color: colors.textSecondary, mb: 1 }}>
            No listings found
          </Typography>
          <Typography variant="body2" sx={{ color: colors.textSecondary }}>
            Try adjusting your filters
          </Typography>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {listings.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Box>
                <AnimatedCard
                  title={`${item.crop?.name || item.crop_name} ${
                    item.crop?.variety ? `(${item.crop.variety})` : ""
                  }`}
                  content={`Price: ₹${
                    item.price_floor ?? item.price_per_unit
                  } | Quantity: ${
                    item.quantity_available ?? item.available_quantity
                  }`}
                  to={`/listings/${item.id}`}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      {listings.length > 0 && (
        <Card
          sx={{
            mt: 4,
            background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.bgLight} 100%)`,
            border: `1px solid ${colors.primary}20`,
          }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <Button
                startIcon={<ChevronLeft size={18} />}
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                sx={{
                  color: colors.primary,
                  "&:hover": {
                    backgroundColor: colors.primary + "15",
                  },
                  "&:disabled": {
                    opacity: 0.5,
                  },
                }}>
                Previous
              </Button>

              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: colors.primary }}>
                  Page {page}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: colors.textSecondary }}>
                  {total} results found
                </Typography>
              </Box>

              <Button
                endIcon={<ChevronRight size={18} />}
                disabled={listings.length < pageSize}
                onClick={() => setPage((p) => p + 1)}
                sx={{
                  color: colors.primary,
                  "&:hover": {
                    backgroundColor: colors.primary + "15",
                  },
                  "&:disabled": {
                    opacity: 0.5,
                  },
                }}>
                Next
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
