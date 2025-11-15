// src/components/Footer.jsx
import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { colors } from "../theme/theme";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Browse Listings", href: "/marketplace" },
    { label: "My Dashboard", href: "/dashboard" },
    { label: "My Contracts", href: "/contracts" },
    { label: "Analytics", href: "/analytics" },
  ];

  const companyLinks = [
    { label: "About Us", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ];

  const supportLinks = [
    { label: "Help Center", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Report Issue", href: "#" },
    { label: "Feedback", href: "#" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: colors.primary,
        color: colors.white,
        pt: 6,
        pb: 3,
        mt: "auto",
      }}>
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* About Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 2,
                }}>
                🌾 Assured Farming
              </Typography>
              <Typography
                variant="body2"
                sx={{ opacity: 0.9, lineHeight: 1.7 }}>
                Connecting farmers directly with buyers for fair prices and
                reliable transactions.
              </Typography>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 700, mb: 2, opacity: 0.95 }}>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  sx={{
                    color: colors.white,
                    opacity: 0.8,
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      opacity: 1,
                      pl: 1,
                    },
                  }}>
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Company */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 700, mb: 2, opacity: 0.95 }}>
              Company
            </Typography>
            <Stack spacing={1}>
              {companyLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  sx={{
                    color: colors.white,
                    opacity: 0.8,
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      opacity: 1,
                      pl: 1,
                    },
                  }}>
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Support */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 700, mb: 2, opacity: 0.95 }}>
              Support
            </Typography>
            <Stack spacing={1}>
              {supportLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  sx={{
                    color: colors.white,
                    opacity: 0.8,
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      opacity: 1,
                      pl: 1,
                    },
                  }}>
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, opacity: 0.3, borderColor: colors.white }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}>
          {/* Copyright */}
          <Typography variant="caption" sx={{ opacity: 0.85 }}>
            © {currentYear} Assured Farming. All rights reserved.
          </Typography>

          {/* Social Links */}
          <Stack direction="row" spacing={1}>
            <IconButton
              href="#"
              sx={{
                color: colors.white,
                opacity: 0.7,
                transition: "all 0.3s ease",
                "&:hover": {
                  opacity: 1,
                  transform: "translateY(-2px)",
                },
              }}
              size="small">
              <Facebook size={20} />
            </IconButton>
            <IconButton
              href="#"
              sx={{
                color: colors.white,
                opacity: 0.7,
                transition: "all 0.3s ease",
                "&:hover": {
                  opacity: 1,
                  transform: "translateY(-2px)",
                },
              }}
              size="small">
              <Twitter size={20} />
            </IconButton>
            <IconButton
              href="#"
              sx={{
                color: colors.white,
                opacity: 0.7,
                transition: "all 0.3s ease",
                "&:hover": {
                  opacity: 1,
                  transform: "translateY(-2px)",
                },
              }}
              size="small">
              <Linkedin size={20} />
            </IconButton>
            <IconButton
              href="#"
              sx={{
                color: colors.white,
                opacity: 0.7,
                transition: "all 0.3s ease",
                "&:hover": {
                  opacity: 1,
                  transform: "translateY(-2px)",
                },
              }}
              size="small">
              <Mail size={20} />
            </IconButton>
          </Stack>

          {/* Additional Info */}
          <Stack
            direction="row"
            spacing={2}
            sx={{
              width: { xs: "100%", md: "auto" },
              justifyContent: { xs: "center", md: "flex-end" },
            }}>
            <Link
              href="#"
              sx={{
                color: colors.white,
                opacity: 0.7,
                textDecoration: "none",
                fontSize: "0.85rem",
                transition: "all 0.3s ease",
                "&:hover": {
                  opacity: 1,
                },
              }}>
              Privacy
            </Link>
            <Typography variant="caption" sx={{ opacity: 0.5 }}>
              •
            </Typography>
            <Link
              href="#"
              sx={{
                color: colors.white,
                opacity: 0.7,
                textDecoration: "none",
                fontSize: "0.85rem",
                transition: "all 0.3s ease",
                "&:hover": {
                  opacity: 1,
                },
              }}>
              Terms
            </Link>
            <Typography variant="caption" sx={{ opacity: 0.5 }}>
              •
            </Typography>
            <Link
              href="#"
              sx={{
                color: colors.white,
                opacity: 0.7,
                textDecoration: "none",
                fontSize: "0.85rem",
                transition: "all 0.3s ease",
                "&:hover": {
                  opacity: 1,
                },
              }}>
              Settings
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
