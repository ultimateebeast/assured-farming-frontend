import React, { useState } from "react";
import axios from "axios";
import api from "../api/client";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirm: "",
    phone: "",
    role: "farmer",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validate form
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.phone
    ) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.password_confirm) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    try {
      // Use centralized API client to ensure correct baseURL and headers
      const response = await api.post("/accounts/register/", formData, {
        headers: { "Content-Type": "application/json" },
      });

      // Store JWT tokens if backend returns them (our RegisterTokenView does)
      if (response.data?.access && response.data?.refresh) {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
      }

      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      if (err.response?.data) {
        // Format error messages from Django
        const errors = err.response.data;
        let errorMsg = "";
        Object.keys(errors).forEach((key) => {
          if (Array.isArray(errors[key])) {
            errorMsg += `${key}: ${errors[key][0]}\n`;
          } else {
            errorMsg += `${key}: ${errors[key]}\n`;
          }
        });
        setError(errorMsg || "Registration failed");
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Animated Background */}
      <div className={styles.background}>
        <div className={styles.blob1}></div>
        <div className={styles.blob2}></div>
        <div className={styles.blob3}></div>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        <div className={styles.card}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.logo}>🌾</div>
            <h1 className={styles.title}>Assured Farming</h1>
            <p className={styles.subtitle}>
              Join the revolution in contract farming
            </p>
          </div>

          {/* Alerts */}
          {error && (
            <div className={`${styles.alert} ${styles.alertError}`}>
              <span className={styles.alertIcon}>⚠️</span>
              <div>
                {error
                  .split("\n")
                  .map((line, idx) =>
                    line ? <div key={idx}>{line}</div> : null
                  )}
              </div>
            </div>
          )}

          {success && (
            <div className={`${styles.alert} ${styles.alertSuccess}`}>
              <span className={styles.alertIcon}>✓</span>
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Username */}
            <div
              className={`${styles.formGroup} ${
                focusedField === "username" ? styles.focused : ""
              }`}>
              <label htmlFor="username" className={styles.label}>
                👤 Username
              </label>
              <input
                type="text"
                className={styles.input}
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onFocus={() => handleFocus("username")}
                onBlur={handleBlur}
                placeholder="Choose a unique username"
                required
              />
              <div className={styles.inputBorder}></div>
            </div>

            {/* Email */}
            <div
              className={`${styles.formGroup} ${
                focusedField === "email" ? styles.focused : ""
              }`}>
              <label htmlFor="email" className={styles.label}>
                ✉️ Email
              </label>
              <input
                type="email"
                className={styles.input}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus("email")}
                onBlur={handleBlur}
                placeholder="your@email.com"
                required
              />
              <div className={styles.inputBorder}></div>
            </div>

            {/* Phone */}
            <div
              className={`${styles.formGroup} ${
                focusedField === "phone" ? styles.focused : ""
              }`}>
              <label htmlFor="phone" className={styles.label}>
                📱 Phone Number
              </label>
              <input
                type="tel"
                className={styles.input}
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => handleFocus("phone")}
                onBlur={handleBlur}
                placeholder="+91 98765 43210"
                required
              />
              <div className={styles.inputBorder}></div>
            </div>

            {/* Role */}
            <div
              className={`${styles.formGroup} ${
                focusedField === "role" ? styles.focused : ""
              }`}>
              <label htmlFor="role" className={styles.label}>
                👨‍🌾 Role
              </label>
              <select
                className={styles.select}
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                onFocus={() => handleFocus("role")}
                onBlur={handleBlur}>
                <option value="farmer">🚜 Farmer</option>
                <option value="buyer">🏢 Buyer</option>
              </select>
              <div className={styles.inputBorder}></div>
            </div>

            {/* Password */}
            <div
              className={`${styles.formGroup} ${
                focusedField === "password" ? styles.focused : ""
              }`}>
              <label htmlFor="password" className={styles.label}>
                🔐 Password
              </label>
              <input
                type="password"
                className={styles.input}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => handleFocus("password")}
                onBlur={handleBlur}
                placeholder="Minimum 8 characters"
                required
                minLength="8"
              />
              <div className={styles.inputBorder}></div>
              <div className={styles.passwordHint}>
                {formData.password.length > 0 && (
                  <span
                    className={
                      formData.password.length >= 8
                        ? styles.passwordStrong
                        : styles.passwordWeak
                    }>
                    {formData.password.length >= 8 ? "✓ Strong" : "✗ Too short"}
                  </span>
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <div
              className={`${styles.formGroup} ${
                focusedField === "password_confirm" ? styles.focused : ""
              }`}>
              <label htmlFor="password_confirm" className={styles.label}>
                🔒 Confirm Password
              </label>
              <input
                type="password"
                className={styles.input}
                id="password_confirm"
                name="password_confirm"
                value={formData.password_confirm}
                onChange={handleChange}
                onFocus={() => handleFocus("password_confirm")}
                onBlur={handleBlur}
                placeholder="Re-enter your password"
                required
                minLength="8"
              />
              <div className={styles.inputBorder}></div>
              {formData.password_confirm && (
                <div className={styles.passwordHint}>
                  {formData.password === formData.password_confirm ? (
                    <span className={styles.passwordMatch}>
                      ✓ Passwords match
                    </span>
                  ) : (
                    <span className={styles.passwordMismatch}>
                      ✗ Passwords don't match
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`${styles.button} ${loading ? styles.loading : ""}`}
              disabled={loading}>
              <span className={styles.buttonText}>
                {loading ? (
                  <>
                    <span className={styles.spinner}></span>
                    Registering...
                  </>
                ) : (
                  <>Create Account</>
                )}
              </span>
            </button>
          </form>

          {/* Footer */}
          <div className={styles.footer}>
            <p>
              Already have an account?{" "}
              <a href="/login" className={styles.link}>
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
