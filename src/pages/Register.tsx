import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import institutionList from "./institute.json";
import { InputField } from "../components/InputFeild";
import { InputWithAction } from "../components/InputWithction";
import { EyesOpenIcon } from "../assets/EyesOpenIcon";
import { EyesCloseIcon } from "../assets/EyesCloseIcon";
import { registerUser } from "../services/api";

export const RegisterPage = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [emailOtp, setEmailOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("user");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [institution, setInstitution] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
        if (!passwordRegex.test(password)) {
            setError("Password must include A-Z, a-z, 0-9, and special characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            // API only needs name, email, password, role
            const name = `${firstName} ${lastName}`;
            const res = await registerUser(name, email, password, role);

            if (res.access_token) {
                localStorage.setItem("token", res.access_token);
            }

            setSuccess("Registration successful!");
            setTimeout(() => {
                navigate("/login");
            }, 1200);
        } catch (err: any) {
            setError(err.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <div className="flex flex-grow justify-center items-start py-4">
                <div className="bg-white shadow-lg rounded-2xl p-4 w-full max-w-lg">
                    <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
                        Register
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {/* First + Last Name */}
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <InputWithAction
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name <span className="text-red-500">*</span>
                                </label>
                                <InputWithAction
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password + Confirm Password */}
                        <div className="flex gap-3">
                            <div className="flex-1 relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <InputField
                                    type={showPassword ? "text" : "password"}
                                    placeholder="********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div
                                    className="absolute right-3 top-9 cursor-pointer text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyesOpenIcon /> : <EyesCloseIcon />}
                                </div>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm <span className="text-red-500">*</span>
                                </label>
                                <InputField
                                    type={showPassword ? "text" : "password"}
                                    placeholder="********"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email <span className="text-red-500">*</span>
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

                        {/* OTP */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                OTP <span className="text-red-500">*</span>
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

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone <span className="text-red-500">*</span>
                            </label>
                            <InputField
                                type="tel"
                                placeholder="+91 9876543210"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>

                        {/* Location + Role */}
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Location <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500"
                                >
                                    <option value="">Select Location</option>
                                    <option value="India">India</option>
                                    <option value="US">United States</option>
                                    <option value="UK">United Kingdom</option>
                                </select>
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Role <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                    <option value="institution">Institution</option>
                                    <option value="recruiter">Recruiter</option>
                                    <option value="scholarship">Scholarship</option>
                                </select>
                            </div>
                        </div>

                        {/* Institution or Company */}
                        {role === "institution" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Institution <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={institution}
                                    onChange={(e) => setInstitution(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500"
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Company <span className="text-red-500">*</span>
                                </label>
                                <InputField
                                    placeholder="Company Name"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                />
                            </div>
                        )}

                        {/* Errors / Success */}
                        {error && <p className="text-red-600 text-sm">{error}</p>}
                        {success && <p className="text-green-600 text-sm">{success}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition"
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>

                    <p className="text-center mt-5 text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-teal-600 font-medium hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
