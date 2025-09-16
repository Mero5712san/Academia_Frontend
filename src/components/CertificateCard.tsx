import React from "react";
import type { CertificateResult } from "../types";

export const CertificateCard = ({ item, onClick }: { item: CertificateResult; onClick?: () => void }) => {
    const color = item.status === "verified" ? "text-green-600" : item.status === "fraud" ? "text-red-600" : "text-gray-600";
    return (
        <div className="bg-white rounded-2xl p-4 shadow-soft cursor-pointer" onClick={onClick}>
            <div className="h-36 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">Thumbnail</div>
            <div className="mt-3 text-sm font-medium">{item.filename}</div>
            <div className="text-xs mt-1 flex items-center justify-between">
                <div className={color}>{item.status.toUpperCase()}</div>
                <div className="text-gray-400">{item.confidence ? `${item.confidence}%` : "--"}</div>
            </div>
        </div>
    );
}
