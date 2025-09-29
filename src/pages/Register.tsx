import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

export const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user"); // role state
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const data = await registerUser(name, email, password, role);
            console.log("Registration success:", data);

            setSuccess("Registration successful! Redirecting to login...");

            // Save token if backend returns one
            if (data.access_token) {
                if (rememberMe) {
                    localStorage.setItem("token", data.access_token);
                } else {
                    sessionStorage.setItem("token", data.access_token);
                }
            }

            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                <h2 className="text-center text-xl font-semibold">Register With</h2>

                {/* Social Login Buttons */}
                <div className="flex justify-center gap-4 mt-6">
                    <button className="p-3 border rounded-xl hover:bg-gray-100">
                        <i className="fab fa-facebook"></i>
                    </button>
                    <button className="p-3 border rounded-xl hover:bg-gray-100">
                        <i className="fab fa-apple"></i>
                    </button>
                    <button className="p-3 border rounded-xl hover:bg-gray-100">
                        <i className="fab fa-google"></i>
                    </button>
                </div>

                <p className="text-center text-gray-500 mt-4">or</p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <input
                        type="text"
                        placeholder="Your full name"
                        className="w-full px-4 py-2 border rounded-lg"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full px-4 py-2 border rounded-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Your password"
                        className="w-full px-4 py-2 border rounded-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {/* Role selector */}
                    <select
                        className="w-full px-4 py-2 border rounded-lg"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <span>Remember me</span>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {success && <p className="text-green-500 text-sm">{success}</p>}

                    <button
                        type="submit"
                        className="w-full bg-teal-400 text-white py-2 rounded-lg hover:bg-teal-500"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center mt-4 text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-teal-500 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};
