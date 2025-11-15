import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import {
  Box,
  Card,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Checkbox,
  FormControlLabel,
  Stack,
} from "@mui/material";
import { LogIn, ArrowRight } from "lucide-react";
import { FormField } from "../components/FormFields";
import { loginSchema } from "../schemas/validationSchemas";
import { authAPI } from "../api/endpoints";
import { useAuth } from "../context/AuthContext";
import { colors } from "../theme/theme";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: localStorage.getItem("remembered_username") || "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setError("");
      try {
        const result = await authAPI.login(values.username, values.password);
        localStorage.setItem("access_token", result.access);
        localStorage.setItem("refresh_token", result.refresh);

        if (rememberMe) {
          localStorage.setItem("remembered_username", values.username);
        } else {
          localStorage.removeItem("remembered_username");
        }

        await login(values.username, values.password);
        navigate("/dashboard");
      } catch (err) {
        setError(
          err.response?.data?.detail ||
            err.response?.data?.error ||
            "Invalid username or password"
        );
      }
    },
  });

  return (
    <div className={styles.loginContainer}>
      {/* Animated Background Blobs */}
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>
      <div className={styles.blob3}></div>

      {/* Main Card */}
      <Box>
        <Card
          sx={{
            maxWidth: 450,
            width: "100%",
            p: 4,
            backdropFilter: "blur(10px)",
            backgroundColor: colors.white,
            border: `1px solid ${colors.primary}15`,
            boxShadow: `0 20px 60px rgba(25, 118, 210, 0.1)`,
            borderRadius: "16px",
          }}>
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                fontSize: "48px",
                mb: 2,
              }}>
              🌾
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
              }}>
              Assured Farming
            </Typography>
            <Typography variant="body2" sx={{ color: colors.textSecondary }}>
              Welcome back! Sign in to your account
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert
              severity="error"
              onClose={() => setError("")}
              sx={{
                mb: 2,
                borderRadius: "12px",
                backgroundColor: `${colors.error}15`,
                color: colors.error,
                border: `1px solid ${colors.error}30`,
                "& .MuiAlert-icon": {
                  color: colors.error,
                },
              }}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={formik.handleSubmit}>
            <FormField
              label="Username"
              name="username"
              placeholder="Enter your username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && formik.errors.username}
              helperText={formik.touched.username && formik.errors.username}
              disabled={formik.isSubmitting}
            />

            <FormField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
              disabled={formik.isSubmitting}
            />

            {/* Remember Me & Forgot Password */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    size="small"
                    sx={{
                      color: colors.primary,
                      "&.Mui-checked": {
                        color: colors.primary,
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{ color: colors.textSecondary }}>
                    Remember me
                  </Typography>
                }
              />
              <Link
                to="/forgot-password"
                style={{
                  color: colors.primary,
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                }}>
                Forgot password?
              </Link>
            </Box>

            {/* Submit Button */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={formik.isSubmitting}
              endIcon={formik.isSubmitting ? undefined : <LogIn size={18} />}
              sx={{
                py: 1.5,
                fontSize: "16px",
                fontWeight: "600",
                textTransform: "none",
                borderRadius: "12px",
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                boxShadow: `0 8px 20px rgba(25, 118, 210, 0.3)`,
                transition: "all 0.3s ease",
                mb: 2,
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: `0 12px 28px rgba(25, 118, 210, 0.4)`,
                },
                "&:disabled": {
                  opacity: 0.7,
                },
              }}>
              {formik.isSubmitting ? (
                <CircularProgress size={20} sx={{ color: colors.white }} />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Divider */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              my: 2,
              opacity: 0.3,
            }}>
            <Box
              sx={{ flex: 1, height: "1px", backgroundColor: colors.border }}
            />
            <Typography variant="body2" sx={{ color: colors.textSecondary }}>
              OR
            </Typography>
            <Box
              sx={{ flex: 1, height: "1px", backgroundColor: colors.border }}
            />
          </Box>

          {/* Sign Up Link */}
          <Stack spacing={2}>
            <Typography
              variant="body2"
              sx={{ textAlign: "center", color: colors.textSecondary }}>
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: colors.primary,
                  textDecoration: "none",
                  fontWeight: "700",
                }}>
                Sign up here
              </Link>
            </Typography>
            <Button
              component={Link}
              to="/register"
              variant="outlined"
              fullWidth
              endIcon={<ArrowRight size={18} />}
              sx={{
                borderColor: colors.primary,
                color: colors.primary,
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: colors.primary,
                  color: colors.white,
                  borderColor: colors.primary,
                },
              }}>
              Create New Account
            </Button>
          </Stack>
        </Card>
      </Box>
    </div>
  );
}
