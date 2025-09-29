import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputField } from "../components/inputField";
import { InputWithAction } from "../components/inputWithAction";

export const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* Handle Login */
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !password) {
      setError("Please fill all required fields.");
      return;
    }

    // Mock login success
    setSuccess("Login successful!");
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  /* Send OTP */
  const handleSendOtp = () => {
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    setError("");
    setSuccess("OTP sent to your email.");
    setOtpSent(true);
  };

  /* Verify OTP */
  const handleVerifyOtp = () => {
    if (!otp) {
      setError("Please enter OTP.");
      return;
    }
    setError("");
    setSuccess("OTP verified. You can now reset your password.");
  };

  /* Reset Password */
  const handleResetPassword = () => {
    if (!password) {
      setError("Please enter your new password.");
      return;
    }
    setError("");
    setSuccess("Password reset successful!");
    setTimeout(() => {
      setShowForgot(false);
      setEmail("");
      setOtp("");
      setOtpSent(false);
    }, 1000);
  };

  return (
    <div style={styles.page}>
      <div style={styles.containerWrapper}>
        <div style={styles.card}>
          <h2 style={styles.title}>Login</h2>

          {!showForgot ? (
            <form onSubmit={handleLogin} style={styles.form}>
              {/* Username */}
              <div>
                <label style={styles.label}>
                  Username <span style={styles.required}>*</span>
                </label>
                <InputWithAction
                                  placeholder="Enter Username"
                                  value={username}
                                  onChange={(e) => setUsername(e.target.value)}
                                  required actionText={undefined} onAction={undefined}                />
              </div>

              {/* Password */}
              <div>
                <label style={styles.label}>
                  Password <span style={styles.required}>*</span>
                </label>
                <InputWithAction
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Role */}
              <div>
                <label style={styles.label}>
                  Role <span style={styles.required}>*</span>
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={styles.select}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Error & Success */}
              {error && <p style={styles.error}>{error}</p>}
              {success && <p style={styles.success}>{success}</p>}

              {/* Buttons */}
              <button type="submit" style={styles.submitButton}>
                Login
              </button>

              <p style={styles.linkText}>
                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  style={styles.linkBtn}
                >
                  Forgot Password?
                </button>
              </p>

              <p style={styles.signInText}>
                Don’t have an account?{" "}
                <Link to="/register" style={styles.link}>
                  Register
                </Link>
              </p>
            </form>
          ) : (
            <div style={styles.form}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>
                Reset Password
              </h3>

              {/* Email */}
              <div>
                <label style={styles.label}>
                  Email <span style={styles.required}>*</span>
                </label>
                <InputWithAction
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  actionText={otpSent ? "Resend OTP" : "Send OTP"}
                  onAction={handleSendOtp}
                  required
                />
              </div>

              {/* OTP */}
              {otpSent && (
                <div>
                  <label style={styles.label}>
                    Enter OTP <span style={styles.required}>*</span>
                  </label>
                  <InputWithAction
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    actionText="Verify"
                    onAction={handleVerifyOtp}
                    required
                  />
                </div>
              )}

              {/* New Password */}
              {otpSent && otp && (
                <div>
                  <label style={styles.label}>
                    New Password <span style={styles.required}>*</span>
                  </label>
                  <InputWithAction
                    type="password"
                    placeholder="Enter New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              )}

              {/* Reset Button */}
              {otpSent && otp && (
                <button
                  type="button"
                  style={styles.submitButton}
                  onClick={handleResetPassword}
                >
                  Reset Password
                </button>
              )}

              <p style={styles.linkText}>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgot(false);
                    setEmail("");
                    setOtp("");
                    setOtpSent(false);
                    setError("");
                    setSuccess("");
                  }}
                  style={styles.linkBtn}
                >
                  Back to Login
                </button>
              </p>

              {/* Error & Success */}
              {error && <p style={styles.error}>{error}</p>}
              {success && <p style={styles.success}>{success}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ✅ Styles */
const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    background: "#f9fafb",
  },
  containerWrapper: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  card: {
    borderRadius: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    padding: "40px",
    width: "100%",
    maxWidth: "520px",
    marginTop: "60px",
    background: "#fff",
  },
  title: {
    textAlign: "center",
    fontSize: "22px",
    fontWeight: "600",
    color: "#111827",
  },
  form: {
    marginTop: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#111827",
  },
  required: {
    color: "red",
  },
  select: {
    width: "100%",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    fontSize: "15px",
    color: "#111827",
  },
  error: {
    color: "#dc2626",
    fontSize: "14px",
  },
  success: {
    color: "#16a34a",
    fontSize: "14px",
  },
  submitButton: {
    padding: "12px",
    backgroundColor: "#14b8a6",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
  },
  linkText: {
    textAlign: "center",
    fontSize: "14px",
  },
  linkBtn: {
    background: "none",
    border: "none",
    color: "#2563eb",
    cursor: "pointer",
    fontSize: "14px",
    textDecoration: "underline",
  },
  signInText: {
    textAlign: "center",
    marginTop: "10px",
    fontSize: "14px",
    color: "#374151",
  },
  link: {
    color: "#14b8a6",
    fontWeight: "500",
    textDecoration: "underline",
  },
};
