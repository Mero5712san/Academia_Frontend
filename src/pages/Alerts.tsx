import React, { useEffect, useState } from "react";
import { getAlerts } from "../services/api";

interface Alert {
    id?: number;
    certificate_id?: string | number;
    reason?: string;
    result?: string;
    created_at?: string;
    user_id?: number | null;
}

const Alerts: React.FC = () => {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const data = await getAlerts();
                setAlerts(data);
            } catch (err: any) {
                setError(err.message || "Failed to fetch alerts");
            } finally {
                setLoading(false);
            }
        };

        fetchAlerts();
    }, []);

    if (loading)
        return <p className="text-center text-gray-500">Loading alerts...</p>;
    if (error)
        return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Alerts</h2>

            {alerts.length === 0 ? (
                <p className="text-gray-500">No alerts found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {alerts.map((alert, index) => {
                        // set color based on result
                        const resultColor =
                            alert.result?.toLowerCase() === "fraud"
                                ? "text-red-600 bg-red-50"
                                : "text-green-600 bg-green-50";

                        return (
                            <div
                                key={alert.id ?? index}
                                className="p-4 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition cursor-pointer"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-semibold text-lg">
                                        Certificate ID:{" "}
                                        {alert.certificate_id ?? "Unknown"}
                                    </h3>
                                    <span
                                        className={`px-2 py-1 rounded-full text-sm font-medium ${resultColor}`}
                                    >
                                        {alert.result ?? "-"}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">
                                    Reason: {alert.reason ?? "-"}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {alert.created_at
                                        ? new Date(alert.created_at).toLocaleString()
                                        : "No timestamp"}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Alerts;
