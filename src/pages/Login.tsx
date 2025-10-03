// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputWithAction } from "../components/InputWithction";
import { loginUser } from "../services/api";

export const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!email || !password) {
            setError("Please fill all required fields.");
            return;
        }

        try {
            const res = await loginUser(email, password);
            // Save token in localStorage
            if (res?.access_token) {
                localStorage.setItem("token", res.access_token);
                setSuccess("Login successful!");
                setTimeout(() => {
                    navigate("/dashboard");
                }, 800);
            } else {
                setError("Invalid response from server.");
            }
        } catch (err: any) {
            setError(err.message || "Login failed");
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.containerWrapper}>
                <div style={styles.card}>
                    <h2 style={styles.title}>Login</h2>
                    <form onSubmit={handleLogin} style={styles.form}>
                        {/* Email */}
                        <div>
                            <label style={styles.label}>
                                Email <span style={styles.required}>*</span>
                            </label>
                            <InputWithAction
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
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

                        {/* Submit Button */}
                        <button type="submit" style={styles.submitButton}>
                            Login
                        </button>

                        <p style={styles.signInText}>
                            Don’t have an account?{" "}
                            <Link to="/register" style={styles.link}>
                                Register
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

/* ✅ Reuse your styles */
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
