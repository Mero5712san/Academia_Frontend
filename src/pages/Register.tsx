import React, { useState } from "react";
import { Link } from "react-router-dom";
import institutionList from "./institute.json";
import { InputField } from "../components/inputField";
import { InputWithAction } from "../components/inputWithAction";

export const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // toggle visibility
  const [role, setRole] = useState("user");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [institution, setInstitution] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
    if (!passwordRegex.test(password)) {
      setError("Password must include A-Z, a-z, 0-9, and special characters.");
      return;
    }
    setSuccess("Form submitted successfully (no API connected).");
  };

  return (
    <div style={styles.page}>
      <div style={styles.containerWrapper}>
        <div style={styles.card}>
          <h2 style={styles.title}>Register</h2>

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* First Name */}
            <div>
              <label style={styles.label}>
                First Name <span style={styles.required}>*</span>
              </label>
              <InputWithAction
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            {/* Middle Name */}
            <div>
              <label style={styles.label}>Middle Name</label>
              <InputWithAction
                placeholder="Middle Name"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div>
              <label style={styles.label}>
                Last Name <span style={styles.required}>*</span>
              </label>
              <InputWithAction
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            {/* Email with Send OTP */}
            <div>
              <label style={styles.label}>
                Email <span style={styles.required}>*</span>
              </label>
              <InputWithAction
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                actionText="Send OTP"
                onAction={() => alert("OTP Sent!")}
                required
              />
            </div>

            {/* OTP with Verify */}
            <div>
              <label style={styles.label}>
                OTP <span style={styles.required}>*</span>
              </label>
              <InputWithAction
                placeholder="Enter OTP"
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
                actionText="Verify"
                onAction={() => alert("OTP Verified!")}
                required
              />
            </div>

            {/* Password with eye toggle */}
            <div style={{ position: "relative" }}>
              <label style={styles.label}>
                Password <span style={styles.required}>*</span>
              </label>
              <InputField
                type={showPassword ? "text" : "password"}
                placeholder="Password (A-Z, a-z, 0-9, special char)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingRight: "40px" }}
              />
              <div
                style={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  // Eye Open (showing password)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    width="20"
                    height="20"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  // Eye Closed (password hidden)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    width="20"
                    height="20"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3l18 18M9.879 9.879a3 3 0 014.242 4.242M12 5c4.477 0 8.268 2.943 9.542 7-0.383 1.223-1.024 2.33-1.867 3.264M2.458 12C3.732 7.943 7.523 5 12 5c.777 0 1.536.11 2.262.314"
                    />
                  </svg>
                )}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label style={styles.label}>
                Phone <span style={styles.required}>*</span>
              </label>
              <InputField
                type="tel"
                placeholder="+91 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            {/* Location */}
            <div>
              <label style={styles.label}>
                Location <span style={styles.required}>*</span>
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={styles.select}
              >
                <option value="">Select Location</option>
                <option value="India">India</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
              </select>
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
                <option value="institution">Institution</option>
                <option value="recruiter">Recruiter</option>
                <option value="scholarship">Scholarship</option>
              </select>
            </div>

            {/* Conditional fields */}
            {role === "institution" && (
              <div>
                <label style={styles.label}>
                  Institution <span style={styles.required}>*</span>
                </label>
                <select
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  style={styles.select}
                >
                  <option value="">Select Institution</option>
                  {institutionList.map((inst, idx) => (
                    <option key={idx} value={inst.name}>
                      {inst.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {role === "recruiter" && (
              <div>
                <label style={styles.label}>
                  Company <span style={styles.required}>*</span>
                </label>
                <InputField
                  placeholder="Company Name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
            )}

            {/* Messages */}
            {error && <p style={styles.error}>{error}</p>}
            {success && <p style={styles.success}>{success}</p>}

            <button type="submit" style={styles.submitButton}>
              Register
            </button>
          </form>

          <p style={styles.signInText}>
            Already have an account?{" "}
            <Link to="/login" style={styles.link}>
              Sign In
            </Link>
          </p>
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
    marginTop: "50px",
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
  required: { color: "red" },
  select: {
    width: "100%",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    fontSize: "15px",
    color: "#111827",
  },
  error: { color: "#dc2626", fontSize: "14px" },
  success: { color: "#16a34a", fontSize: "14px" },
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
  signInText: {
    textAlign: "center",
    marginTop: "18px",
    fontSize: "14px",
    color: "#374151",
  },
  link: { color: "#14b8a6", fontWeight: "500", textDecoration: "underline" },
  eyeIcon: {
    position: "absolute",
    right: "12px",
    top: "37px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
};
