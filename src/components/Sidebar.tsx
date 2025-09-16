import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    AlertIcon,
    CloseIcon,
    DashboardIcon,
    ProfileIcon,
    RecentIcon,
    SettingsIcon,
    VerifyIcon,
} from "../assets";

const links = [
    { to: "/dashboard", label: "Dashboard", icon: DashboardIcon },
    { to: "/verify", label: "Verify Certificates", icon: VerifyIcon },
    { to: "/recents", label: "Recents", icon: RecentIcon },
    { to: "/alerts", label: "Alerts", icon: AlertIcon },
    { to: "/settings", label: "Settings", icon: SettingsIcon },
    { to: "/profile", label: "Profile", icon: ProfileIcon },
];

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <aside
            className={`${isOpen ? "w-64" : "w-20"
                } bg-white h-full border-r border-gray-100 flex flex-col px-4 py-6 transition-all duration-300`}
        >
            {/* Header / Logo */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-header-gradient flex items-center justify-center text-white font-bold"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        WC
                    </div>
                    {isOpen && <div className="font-semibold text-teal1">Wecertify</div>}
                </div>

                {/* Toggle button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-500 hover:text-teal1"
                >
                    {isOpen ? <CloseIcon /> : ""}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1">
                {links.map((l) => {
                    const Icon = l.icon;
                    return (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 w-min-12 rounded-xl mb-2 text-sm transition-colors ${isActive
                                    ? "bg-teal1/10 text-teal1 font-medium"
                                    : "text-gray-600 hover:bg-gray-50"
                                } , ${isOpen ? "p-2" : "w-fit p-2"}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <span
                                        className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${isActive
                                            ? "bg-teal1 text-white"
                                            : "text-teal1 bg-transparent"
                                            }`}
                                    >
                                        <Icon color={isActive ? "white" : "#3ACCB7"} />
                                    </span>
                                    {isOpen && <span>{l.label}</span>}
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
};
