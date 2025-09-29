// src/pages/Alerts.tsx
import React, { useEffect, useState } from "react";
import { getAlerts } from "../services/api";

interface Alert {
    id?: number;
    title?: string;
    message?: string;
    timestamp?: string;
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

    if (loading) {
        return <p className="text-center text-gray-500">Loading alerts...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Alerts</h2>
            {alerts.length === 0 ? (
                <p className="text-gray-500">No alerts found.</p>
            ) : (
                <ul className="space-y-2">
                    {alerts.map((alert, index) => (
                        <li
                            key={alert.id ?? index}
                            className="p-4 border rounded-lg bg-gray-50 shadow-sm"
                        >
                            <p className="font-medium">{alert.title || "Untitled Alert"}</p>
                            <p className="text-sm text-gray-600">{alert.message || ""}</p>
                            <p className="text-xs text-gray-400">
                                {alert.timestamp
                                    ? new Date(alert.timestamp).toLocaleString()
                                    : "No timestamp"}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Alerts;
