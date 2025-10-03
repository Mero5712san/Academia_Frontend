import React, { useEffect, useState } from "react";
import { fetchRecent } from "../services/api";
import type { CertificateResult } from "../types";

export default function Recents() {
    const [items, setItems] = useState<CertificateResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<CertificateResult | null>(null); // modal state

    useEffect(() => {
        fetchRecent().then((rows) => {
            setItems(rows);
            setLoading(false);
        });
    }, []);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Recents</h2>

            {loading ? (
                <div className="bg-white rounded-2xl p-6 shadow-soft">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {items.map((it) => (
                        <div
                            key={it.id}
                            className="bg-white rounded-2xl shadow p-4 cursor-pointer hover:shadow-lg transition"
                            onClick={() => setSelected(it)}
                        >
                            {/* Certificate Image */}
                            <img
                                src={`http://localhost:8000/${it.file_path.replace("\\", "/")}`}
                                alt={it.certificate_id ?? "Certificate"}
                            />
                            {/* Status */}
                            <div
                                className={`text-sm font-medium ${it.status === "verified"
                                        ? "text-green-600"
                                        : it.status === "fraud"
                                            ? "text-red-600"
                                            : "text-gray-600"
                                    }`}
                            >
                                {it.status == "fraud" ? "Fake" : it.status == "verified" ? "Verified" : "Pending"}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {selected && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-lg">
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                            onClick={() => setSelected(null)}
                        >
                            ✕
                        </button>
                        <h3 className="text-lg font-semibold mb-4">Certificate Details</h3>
                        <img
                            src={`http://localhost:8000/${selected.file_path}`}
                            alt={selected.certificate_id || "Certificate"}
                            className="w-full h-64 object-cover rounded-lg mb-4"
                        />
                        <div className="space-y-2 text-sm text-gray-700">
                            <div><span className="font-medium">Certificate ID:</span> {selected.certificate_id ?? "-"}</div>
                            <div><span className="font-medium">Student Name:</span> {selected.student_name ?? "-"}</div>
                            <div><span className="font-medium">Course:</span> {selected.course ?? "-"}</div>
                            <div><span className="font-medium">Institution:</span> {selected.institution ?? "-"}</div>
                            <div><span className="font-medium">Year of Passing:</span> {selected.year_of_pass ?? "-"}</div>
                            <div><span className="font-medium">Hash:</span> {selected.hash ?? "-"}</div>
                            <div><span className="font-medium">Status:</span> {selected.status.toUpperCase()}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
