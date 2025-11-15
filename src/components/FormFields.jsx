import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
  Typography,
} from "@mui/material";

/**
 * Reusable FormField component for Formik forms
 * Supports text, email, password, number, date inputs
 */
export const FormField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  disabled = false,
  fullWidth = true,
  multiline = false,
  rows = 1,
  startAdornment,
  endAdornment,
  className,
  required = false,
}) => {
  return (
    <TextField
      fullWidth={fullWidth}
      label={label}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={!!error}
      helperText={error || helperText}
      disabled={disabled}
      multiline={multiline}
      rows={rows}
      InputProps={{
        startAdornment,
        endAdornment,
      }}
      className={className}
      variant="outlined"
      size="small"
      required={required}
      sx={{
        mb: 2,
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          transition: "all 0.3s ease",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          "&:hover fieldset": {
            borderColor: "#667eea",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#667eea",
            borderWidth: "2px",
          },
        },
        "& .MuiOutlinedInput-input": {
          py: 1.5,
        },
      }}
    />
  );
};

/**
 * SelectField component for dropdown selections
 */
export const SelectField = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options = [],
  error,
  helperText,
  disabled = false,
  required = false,
}) => {
  return (
    <FormControl fullWidth error={!!error} sx={{ mb: 2 }} size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        sx={{
          borderRadius: "12px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#e0e0e0",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#667eea",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#667eea",
            borderWidth: "2px",
          },
        }}>
        <MenuItem value="">
          <em>Select {label.toLowerCase()}</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

/**
 * FileUpload component for form file inputs
 */
export const FileUpload = ({
  label,
  name,
  accept = "image/*",
  error,
  helperText = "",
  disabled = false,
  required = false,
  onChange,
  multiple = false,
  maxSize = 5, // in MB
}) => {
  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file && maxSize) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSize) {
        alert(`File size must be less than ${maxSize}MB`);
        return;
      }
    }
    onChange && onChange(file);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <input
        type="file"
        name={name}
        accept={accept}
        onChange={handleChange}
        disabled={disabled}
        multiple={multiple}
        required={required}
        style={{ display: "none" }}
        id={`file-input-${name}`}
      />
      <label htmlFor={`file-input-${name}`}>
        <Box
          component="span"
          sx={{
            display: "inline-block",
            px: 3,
            py: 2,
            border: error ? "2px solid #f44336" : "2px dashed #667eea",
            borderRadius: "12px",
            cursor: disabled ? "not-allowed" : "pointer",
            backgroundColor: error ? "#ffebee" : "rgba(102, 126, 234, 0.05)",
            transition: "all 0.3s ease",
            width: "100%",
            textAlign: "center",
            opacity: disabled ? 0.5 : 1,
            "&:hover": disabled
              ? {}
              : {
                  borderColor: "#667eea",
                  backgroundColor: "rgba(102, 126, 234, 0.1)",
                },
          }}>
          <Typography
            variant="body2"
            sx={{ color: error ? "#f44336" : "#667eea" }}>
            {label || "Click to upload or drag and drop"}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#999", display: "block", mt: 0.5 }}>
            {helperText || `Max size: ${maxSize}MB`}
          </Typography>
        </Box>
      </label>
      {error && (
        <FormHelperText error sx={{ mt: 1 }}>
          {error}
        </FormHelperText>
      )}
    </Box>
  );
};

/**
 * StatusBadge component for displaying status
 */
export const StatusBadge = ({ status }) => {
  const statusConfig = {
    active: { bg: "#e8f5e9", color: "#2e7d32", label: "Active" },
    inactive: { bg: "#ffebee", color: "#c62828", label: "Inactive" },
    pending: { bg: "#fff3e0", color: "#e65100", label: "Pending" },
    approved: { bg: "#e3f2fd", color: "#0d47a1", label: "Approved" },
    rejected: { bg: "#ffebee", color: "#c62828", label: "Rejected" },
    completed: { bg: "#e8f5e9", color: "#2e7d32", label: "Completed" },
    failed: { bg: "#ffebee", color: "#c62828", label: "Failed" },
    negotiating: { bg: "#f3e5f5", color: "#6a1b9a", label: "Negotiating" },
  };

  const config = statusConfig[status] || statusConfig.default;

  return (
    <Box
      sx={{
        display: "inline-block",
        px: 1.5,
        py: 0.5,
        backgroundColor: config.bg,
        color: config.color,
        borderRadius: "20px",
        fontSize: "0.75rem",
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
      }}>
      {config.label}
    </Box>
  );
};

/**
 * RatingStars component for displaying ratings
 */
export const RatingStars = ({ rating = 0, count = 0, size = "small" }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box sx={{ display: "flex", color: "#ffa500" }}>
        {stars.map((star) => (
          <span
            key={star}
            style={{ fontSize: size === "large" ? "24px" : "16px" }}>
            {star <= Math.round(rating) ? "★" : "☆"}
          </span>
        ))}
      </Box>
      <Typography variant="body2" sx={{ color: "#666" }}>
        {rating.toFixed(1)} ({count} {count === 1 ? "review" : "reviews"})
      </Typography>
    </Box>
  );
};

/**
 * PriceDisplay component for formatted price display
 */
export const PriceDisplay = ({
  amount = 0,
  currency = "₹",
  size = "body1",
  variant = "default",
}) => {
  const formattedPrice = new Intl.NumberFormat("en-IN").format(amount);

  const sizeConfig = {
    small: { fontSize: "14px" },
    body1: { fontSize: "16px" },
    large: { fontSize: "24px", fontWeight: "bold" },
  };

  const variantConfig = {
    default: { color: "#333" },
    success: { color: "#2e7d32" },
    warning: { color: "#e65100" },
    error: { color: "#c62828" },
  };

  return (
    <Typography
      sx={{
        ...sizeConfig[size],
        ...variantConfig[variant],
        fontWeight: variant === "success" ? "600" : "500",
      }}>
      {currency} {formattedPrice}
    </Typography>
  );
};

/**
 * LoadingSkeleton component for loading states
 */
export const LoadingSkeleton = ({ type = "card", count = 1 }) => {
  if (type === "card") {
    return (
      <Box sx={{ mb: 2 }}>
        {Array.from({ length: count }).map((_, i) => (
          <Box
            key={i}
            sx={{
              mb: 2,
              p: 2,
              borderRadius: "12px",
              backgroundColor: "#f0f0f0",
              animation: "pulse 1.5s ease-in-out infinite",
              "@keyframes pulse": {
                "0%, 100%": { opacity: 1 },
                "50%": { opacity: 0.5 },
              },
              height: "200px",
            }}
          />
        ))}
      </Box>
    );
  }

  if (type === "text") {
    return (
      <Box
        sx={{
          height: "16px",
          backgroundColor: "#f0f0f0",
          borderRadius: "4px",
          mb: 1,
          animation: "pulse 1.5s ease-in-out infinite",
          "@keyframes pulse": {
            "0%, 100%": { opacity: 1 },
            "50%": { opacity: 0.5 },
          },
        }}
      />
    );
  }

  return null;
};

export default {
  FormField,
  SelectField,
  FileUpload,
  StatusBadge,
  RatingStars,
  PriceDisplay,
  LoadingSkeleton,
};
