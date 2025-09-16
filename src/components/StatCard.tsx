import React from "react";

export const StatCard = ({ title, value, subtitle, icon }: { title: string; value: string | number; subtitle?: string, icon?: React.ReactNode }) => {
    return (
        <div className="bg-white rounded-2xl p-4 px-5 shadow-soft flex items-center justify-between">
            <div>
                <div className="text-xs text-gray-400">{title}</div>
                <div className="text-2xl font-semibold mt-3">{value}</div>
                {subtitle && <div className="text-xs text-gray-400 mt-2">{subtitle}</div>}
            </div>
            <div className="text-3xl bg-teal1 p-2 rounded-md">
                {icon}
            </div>
        </div>
    );
}
