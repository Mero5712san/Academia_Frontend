import React from "react";
import { StatCard } from "../components";
import { EmergencyIcon, FailedIcon, SuccessIcon, PendingIcon } from "../assets";

export default function Dashboard() {
    // placeholder stats (replace with real data)
    const stats = [
        { title: "Certificates scanned", value: 12345, icon: <SuccessIcon color="white" /> },
        { title: "Frauds detected", value: 157, icon: <FailedIcon color="white" /> },
        { title: "Alerts", value: 29, icon: <EmergencyIcon color="white" /> },
        { title: "Pending", value: 8, icon: <PendingIcon color="white" /> },
    ];

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                {stats.map((s) => (
                    <StatCard key={s.title} title={s.title} value={s.value} icon={s.icon} />
                ))}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2 bg-white rounded-2xl p-6 shadow-soft"> {/* placeholder chart/card */}
                    <div className="text-sm text-gray-500">Trend</div>
                    <div className="h-40 rounded-md bg-gray-50 mt-4" />
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-soft">
                    <div className="text-sm text-gray-500">Recent Activity</div>
                    <ul className="mt-4 text-sm text-gray-600 space-y-3">
                        <li>Certificate ABC-123 scanned — Verified</li>
                        <li>Certificate XY-987 scanned — Fraud</li>
                        <li>New alert: suspicious watermark</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
