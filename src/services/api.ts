// src/services/api.js
const API_BASE_URL = "http://127.0.0.1:8000";
import type { CertificateResult } from "../types";

// Login API
export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Login failed");
        }

        return await response.json();
    } catch (error) {
        console.error("Login error:", error.message);
        throw error;
    }
};

// Register API

export const registerUser = async (name, email, password, role = "user") => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
            },
            body: JSON.stringify({ name, email, password, role }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Registration failed");
        }

        return await response.json();
    } catch (error) {
        console.error("Register error:", error.message);
        throw error;
    }
};


// Upload certificate for verification
export const uploadCertificate = async (file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`${API_BASE_URL}/certificates/verify`, {
            method: "POST",
            headers: {
                accept: "application/json",
            },
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Verification failed");
        }

        return await response.json();
    } catch (error) {
        console.error("Certificate verification error:", error.message);
        throw error;
    }
};


export async function getAlerts() {
    try {
        const token = localStorage.getItem("token"); // or however you stored it after login

        const res = await fetch("http://127.0.0.1:8000/alerts/", {
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error(`Error fetching alerts: ${res.status}`);
        }

        return await res.json();
    } catch (err) {
        console.error("Failed to fetch alerts:", err);
        throw err;
    }
}


// Real API call
export async function fetchRecent(): Promise<CertificateResult[]> {
    const res = await fetch(`${API_BASE_URL}/certificates/recents?limit=10`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) throw new Error("Failed to fetch recents");
    return res.json();
}