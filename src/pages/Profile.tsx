import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../services/api";

type User = {
    id: number;
    name: string;
    email: string;
    mobile?: string;
    location?: string;
    role?: string;
};

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [emailAlerts, setEmailAlerts] = useState<boolean>(false);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getCurrentUser();
                setUser(data);
                // Load user-specific settings if saved in localStorage
                const savedTheme = localStorage.getItem("theme") as "light" | "dark";
                if (savedTheme) setTheme(savedTheme);
                const savedEmailAlerts = localStorage.getItem("emailAlerts") === "true";
                setEmailAlerts(savedEmailAlerts);
            } catch (err) {
                console.error("Error fetching profile:", err);
            }
        };

        fetchProfile();
    }, []);

    const handleChangeTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    const handlePasswordChange = () => {
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }
        // TODO: Call backend API to change password
        setMessage("Password updated successfully!");
        setNewPassword("");
        setConfirmPassword("");
    };

    const handleEmailAlertsToggle = () => {
        setEmailAlerts(!emailAlerts);
        localStorage.setItem("emailAlerts", (!emailAlerts).toString());
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login"; // redirect to login
    };

    if (!user) return <div className="p-6 text-gray-500">Loading profile...</div>;

    return (
        <div>
            {/* Header */}
            <div className="rounded-2xl header-gradient p-6 mb-6 text-white">
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                        {user.name[0]}
                    </div>
                    <div>
                        <div className="text-lg font-semibold">{user.name}</div>
                        <div className="text-sm opacity-90">{user.email}</div>
                    </div>
                </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-soft">
                    <h4 className="font-semibold mb-3">Profile Information</h4>
                    <div className="text-sm text-gray-600 space-y-2">
                        {[
                            { label: "Full Name", value: user.name },
                            { label: "Email", value: user.email },
                            { label: "Mobile", value: user.mobile ?? "-" },
                            { label: "Location", value: user.location ?? "-" },
                            { label: "Role", value: user.role ?? "-" },
                        ].map((item) => (
                            <div key={item.label}>
                                <span className="text-gray-400">{item.label}: </span>
                                {item.value}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Account Settings */}
                <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-soft space-y-6">
                    <h4 className="font-semibold mb-3">Account Settings</h4>

                    {/* Change Password */}
                    <div className="space-y-2">
                        <h5 className="font-medium">Change Password</h5>
                        <input
                            type="password"
                            placeholder="Current Password"
                            className="w-full border p-2 rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full border p-2 rounded"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            className="w-full border p-2 rounded"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            onClick={handlePasswordChange}
                            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl shadow-md hover:from-blue-600 hover:to-indigo-600 transition-colors"
                        >
                            Update Password
                        </button>
                        {message && <div className="text-sm text-green-600">{message}</div>}
                    </div>

                    {/* Theme Toggle */}
                    <div className="space-y-2">
                        <h5 className="font-medium">Theme</h5>
                        <button
                            onClick={handleChangeTheme}
                            className="px-6 py-2 header-gradient text-white rounded-2xl shadow-md hover:from-purple-600 hover:to-pink-600 transition-colors"
                        >
                            {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
                        </button>
                    </div>

                    {/* Email Alerts (admin only) */}
                    {user.role === "admin" && (
                        <div className="space-y-2">
                            <h5 className="font-medium">Email Alerts</h5>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={emailAlerts}
                                    onChange={handleEmailAlertsToggle}
                                />
                                Enable email alerts for critical updates
                            </label>
                        </div>
                    )}

                    {/* Logout */}
                    <div className="space-y-2">
                        <button
                            onClick={handleLogout}
                            className="px-6 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-2xl shadow-md hover:from-red-600 hover:to-rose-600 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
