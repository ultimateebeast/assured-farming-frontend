// src/pages/UploadKyc.jsx
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  MenuItem,
  Alert,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import api from "../api/client";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";

const DOCUMENT_TYPES = [
  { value: "aadhar", label: "Aadhar Card" },
  { value: "pan", label: "PAN Card" },
  { value: "driving_license", label: "Driving License" },
  { value: "passport", label: "Passport" },
  { value: "other", label: "Other Government ID" },
];

export default function UploadKyc() {
  const [file, setFile] = useState(null);
  const [documentType, setDocumentType] = useState("aadhar");
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setStatus({
        type: "error",
        text: "File size must be less than 5MB",
      });
      setFile(null);
      return;
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!validTypes.includes(selectedFile.type)) {
      setStatus({
        type: "error",
        text: "Only JPEG, PNG, and PDF files are allowed",
      });
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus({ type: "error", text: "Please select a file" });
      return;
    }
    if (!documentType) {
      setStatus({ type: "error", text: "Please select a document type" });
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    try {
      const fd = new FormData();
      fd.append("document", file);
      fd.append("document_type", documentType);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + Math.random() * 30, 90));
      }, 200);

      await api.post("/accounts/kyc/upload/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      setStatus({
        type: "success",
        text: "KYC document uploaded successfully!",
      });

      // Reset form
      setFile(null);
      setDocumentType("aadhar");
      setUploadProgress(0);

      setTimeout(() => setUploadProgress(0), 1500);
    } catch (err) {
      console.error("kyc upload error:", err);
      const errMsg = err.response?.data?.detail || "Upload failed";
      setStatus({ type: "error", text: errMsg });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <Upload size={32} style={{ color: "#1976d2" }} />
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Upload KYC Documents
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Verify your identity to unlock all marketplace features
          </Typography>
        </Box>
      </Box>

      <Card sx={{ maxWidth: 700, mx: "auto" }}>
        <CardContent>
          {status && (
            <Alert
              severity={status.type}
              icon={
                status.type === "success" ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )
              }
              sx={{ mb: 2 }}>
              {status.text}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            {/* Document Type Selection */}
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Document Type *
            </Typography>
            <TextField
              select
              fullWidth
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              sx={{ mb: 3 }}>
              {DOCUMENT_TYPES.map((doc) => (
                <MenuItem key={doc.value} value={doc.value}>
                  {doc.label}
                </MenuItem>
              ))}
            </TextField>

            {/* File Upload Input */}
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Select File *
            </Typography>
            <Box
              sx={{
                border: "2px dashed #1976d2",
                borderRadius: 2,
                padding: 3,
                textAlign: "center",
                backgroundColor: "#f5f5f5",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#e3f2fd",
                  borderColor: "#1565c0",
                },
              }}>
              <input
                type="file"
                id="file-input"
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png,.pdf"
                style={{ display: "none" }}
              />
              <label
                htmlFor="file-input"
                style={{ cursor: "pointer", display: "block" }}>
                {file ? (
                  <Box>
                    <CheckCircle
                      size={40}
                      style={{ color: "#4caf50", marginBottom: 8 }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {file.name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {(file.size / 1024).toFixed(2)} KB
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <Upload
                      size={40}
                      style={{ color: "#1976d2", marginBottom: 8 }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Click to select or drag and drop
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      JPEG, PNG, or PDF (Max 5MB)
                    </Typography>
                  </Box>
                )}
              </label>
            </Box>

            {/* Upload Progress */}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <Box sx={{ mt: 2 }}>
                <LinearProgress variant="determinate" value={uploadProgress} />
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ mt: 0.5 }}>
                  Uploading... {Math.round(uploadProgress)}%
                </Typography>
              </Box>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={!file || isLoading}
              sx={{ mt: 3 }}>
              {isLoading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} /> Uploading...
                </>
              ) : (
                "Upload Document"
              )}
            </Button>

            {/* Information */}
            <Box
              sx={{ mt: 3, p: 2, backgroundColor: "#f9f9f9", borderRadius: 1 }}>
              <Typography variant="caption" color="textSecondary">
                ✓ Your documents are encrypted and securely stored
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ display: "block", mt: 0.5 }}>
                ✓ Verification typically takes 24 hours
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ display: "block", mt: 0.5 }}>
                ✓ We comply with all data protection regulations
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
