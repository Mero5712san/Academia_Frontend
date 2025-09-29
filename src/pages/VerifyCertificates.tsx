import React, { useState } from "react";
import { UploadBox } from "../components";
import type { CertificateResult } from "../types";

export default function VerifyCertificates() {
    const [results, setResults] = useState<CertificateResult[]>([]);

    function handleResult(r: CertificateResult) {
        setResults((prev) => [r, ...prev]);
    }

    // Helper to show value or "-"
    const show = (val: any) => (val !== undefined && val !== null && val !== "" ? val : "-");

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Verify Certificates</h2>
                    <p className="text-sm text-gray-500">
                        Upload a certificate to scan it for authenticity
                    </p>
                </div>

                {/* Upload Section */}
                <UploadBox onResult={handleResult} />

                {/* Results Section */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Results</h3>

                    {results.length === 0 ? (
                        <div className="bg-white rounded-xl p-6 shadow text-gray-500">
                            No results yet — upload a file to start.
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {results.map((r) => (
                                <div
                                    key={r.id}
                                    className="bg-white rounded-xl shadow p-6 space-y-6"
                                >
                                    {/* Basic Info */}
                                    <div>
                                        <h4 className="text-lg font-semibold mb-3">Basic Information</h4>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div><span className="font-medium">File:</span> {show(r.filename)}</div>
                                            <div><span className="font-medium">Uploaded:</span> {r.uploadedAt ? new Date(r.uploadedAt).toLocaleString() : "-"}</div>
                                            <div><span className="font-medium">Student Name:</span> {show(r.studentName)}</div>
                                            <div><span className="font-medium">Course:</span> {show(r.course)}</div>
                                            <div><span className="font-medium">Year of Passing:</span> {show(r.yearOfPass)}</div>
                                            <div><span className="font-medium">Institution:</span> {show(r.institution)}</div>
                                            <div><span className="font-medium">Certificate ID:</span> {show(r.certificateId)}</div>
                                            <div>
                                                <span className="font-medium">Status:</span>{" "}
                                                <span
                                                    className={
                                                        r.status === "verified"
                                                            ? "text-green-600"
                                                            : r.status === "fraud"
                                                                ? "text-red-600"
                                                                : "text-gray-600"
                                                    }
                                                >
                                                    {show(r.finalStatus?.toUpperCase())}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* File & Security */}
                                    <div>
                                        <h4 className="text-lg font-semibold mb-3">File & Security</h4>
                                        <div className="space-y-2 text-sm">
                                            <div><span className="font-medium">File Hash:</span> {r.hash ? r.hash.slice(0, 16) + "..." : "-"}</div>
                                            <div><span className="font-medium">Confidence:</span> {show(r.confidence) + (r.confidence ? "%" : "")}</div>
                                        </div>
                                    </div>

                                    {/* Verification (placeholder for future fields) */}
                                    <div>
                                        <h4 className="text-lg font-semibold mb-3">Verification Details</h4>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div><span className="font-medium">Valid Format:</span> {show(r.validFormat)}</div>
                                            <div><span className="font-medium">Has QR Code:</span> {show(r.hasQr)}</div>
                                            <div><span className="font-medium">QR Content:</span> {Array.isArray(r.qrContent) && r.qrContent.length ? r.qrContent.join(", ") : "-"}</div>
                                            <div><span className="font-medium">Logo Verified:</span> {show(r.logoVerified)}</div>
                                            <div><span className="font-medium">Layout Verified:</span> {show(r.layoutVerified)}</div>
                                            <div><span className="font-medium">Duplicate Check:</span> {show(r.duplicateCheck)}</div>
                                            <div><span className="font-medium">Hash Match:</span> {show(r.hashMatch)}</div>
                                            <div><span className="font-medium">Final Status:</span> {show(r.finalStatus)}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
