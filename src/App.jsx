import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import theme, { colors } from "./theme/theme";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Listings from "./pages/Listings";
import ListingDetail from "./pages/ListingDetail";
import CreateListing from "./pages/CreateListing";
import Contracts from "./pages/Contracts";
import ContractDetail from "./pages/ContractDetail";
import UploadKyc from "./pages/UploadKyc";
import Dashboard from "./pages/Dashboard";
import CreateContract from "./pages/CreateContract";
import Analytics from "./pages/Analytics";
import { useAuth } from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: 10 }}>
        <span>Loading...</span>
      </Box>
    );
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: colors.bgLight,
        }}>
        <NavBar />
        <Container
          component="main"
          sx={{
            mt: 4,
            mb: 6,
            flex: 1,
            py: 4,
          }}>
          <ErrorBoundary>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/create-contract"
              element={
                <PrivateRoute>
                  <CreateContract />
                </PrivateRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <PrivateRoute>
                  <Analytics />
                </PrivateRoute>
              }
            />

            {/* Protected */}
            <Route
              path="/marketplace"
              element={
                <PrivateRoute>
                  <Listings />
                </PrivateRoute>
              }
            />
            <Route
              path="/listings/:id"
              element={
                <PrivateRoute>
                  <ListingDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-listing"
              element={
                <PrivateRoute>
                  <CreateListing />
                </PrivateRoute>
              }
            />

            <Route
              path="/contracts"
              element={
                <PrivateRoute>
                  <Contracts />
                </PrivateRoute>
              }
            />
            <Route
              path="/contracts/:id"
              element={
                <PrivateRoute>
                  <ContractDetail />
                </PrivateRoute>
              }
            />

            <Route
              path="/kyc"
              element={
                <PrivateRoute>
                  <UploadKyc />
                </PrivateRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {/* fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </ErrorBoundary>
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
