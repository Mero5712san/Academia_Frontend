import React from "react";
import { StatCard } from "../components";
import { EmergencyIcon, FailedIcon, SuccessIcon, PendingIcon } from "../assets";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    AreaChart,
    Area,
} from "recharts";

export default function Dashboard() {
    // placeholder stats (replace with real data)
    const stats = [
        {
            title: "Certificates scanned",
            value: 12345,
            icon: <SuccessIcon color="white" />,
        },
        {
            title: "Frauds detected",
            value: 157,
            icon: <FailedIcon color="white" />,
        },
        { title: "Alerts", value: 29, icon: <EmergencyIcon color="white" /> },
        { title: "Pending", value: 8, icon: <PendingIcon color="white" /> },
    ];

    // Dummy data for bar chart
    const barData = [
        { month: "Jan", scanned: 400, frauds: 24 },
        { month: "Feb", scanned: 300, frauds: 13 },
        { month: "Mar", scanned: 500, frauds: 35 },
        { month: "Apr", scanned: 700, frauds: 20 },
        { month: "May", scanned: 600, frauds: 15 },
    ];

    // Dummy data for area chart
    const areaData = [
        { month: "Jan", verified: 200, fraud: 20, pending: 10 },
        { month: "Feb", verified: 300, fraud: 25, pending: 15 },
        { month: "Mar", verified: 400, fraud: 30, pending: 20 },
        { month: "Apr", verified: 350, fraud: 22, pending: 18 },
        { month: "May", verified: 500, fraud: 28, pending: 12 },
    ];

    // Background classes (alternate)
    const bgClasses = [
        "bg-gradient-to-r from-cyan-400 to-blue-500 text-white", // aqua gradient
        "bg-blue-100 text-blue-900", // pale blue
    ];

    return (
        <div>
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                {stats.map((s, idx) => (
                    <StatCard
                        key={s.title}
                        title={s.title}
                        value={s.value}
                        icon={s.icon}
                        className={`${bgClasses[idx % 2]} rounded-2xl shadow-md`}
                    />
                ))}
            </div>

            {/* Charts Section */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Bar Chart */}
                <div className="col-span-2 bg-white rounded-2xl p-6 shadow-soft">
                    <div className="text-sm text-gray-500">Scans & Frauds Over Time</div>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={barData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="scanned" fill="#34d399" name="Scanned" />
                            <Bar dataKey="frauds" fill="#f87171" name="Frauds" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Area Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-soft">
                    <div className="text-sm text-gray-500">Certificate Status</div>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={areaData}>
                            <defs>
                                <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.6} />
                                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorFraud" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.6} />
                                    <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.6} />
                                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />

                            <Area
                                type="monotone"
                                dataKey="verified"
                                stroke="#34d399"
                                fillOpacity={1}
                                fill="url(#colorVerified)"
                                name="Verified"
                            />
                            <Area
                                type="monotone"
                                dataKey="fraud"
                                stroke="#f87171"
                                fillOpacity={1}
                                fill="url(#colorFraud)"
                                name="Fraud"
                            />
                            <Area
                                type="monotone"
                                dataKey="pending"
                                stroke="#fbbf24"
                                fillOpacity={1}
                                fill="url(#colorPending)"
                                name="Pending"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
