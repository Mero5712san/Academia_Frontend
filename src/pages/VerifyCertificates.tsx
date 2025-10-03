import React, { useState } from "react";
import { UploadBox } from "../components";
import type { CertificateResult } from "../types";
import { Dialog } from "@headlessui/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function VerifyCertificates() {
    const [result, setResult] = useState<CertificateResult | null>(null);
    const [openModal, setOpenModal] = useState(false);

    function handleResult(r: CertificateResult) {
        setResult(r);
    }

    // Pick confidence
    const confidence = result?.confidence ?? 0;

    // Progress color logic
    let pathColor = "red"; // red default
    if (confidence >= 75) pathColor = "green"; // aqua
    else if (confidence >= 50) pathColor = "orange"; // orange

    const show = (val: string | number | boolean | undefined) =>
        val !== undefined && val !== null && val !== "" ? val : "-";

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

                {/* Two-card layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Upload card */}
                    <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-center">
                        <h3 className="text-lg font-semibold mb-4">Upload</h3>
                        <UploadBox onResult={handleResult} />
                    </div>

                    {/* Progress card */}
                    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-between">
                        <h3 className="text-lg font-semibold mb-4">Confidence</h3>
                        <div className="w-40 h-40 mb-4">
                            <CircularProgressbar
                                value={confidence}
                                text={`${confidence || 0}%`}
                                styles={buildStyles({
                                    textColor: "#374151",
                                    pathColor,
                                    trailColor: "#e5e7eb",
                                })}
                            />
                        </div>
                        <button
                            onClick={() => setOpenModal(true)}
                            className="self-end text-sm text-blue-600 hover:underline"
                        >
                            View Details
                        </button>
                    </div>
                </div>

                {/* Modal for details */}
                <Dialog
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    className="fixed inset-0 z-50 flex items-center justify-center"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-black/40" />
                    <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-6 relative z-10">
                        <Dialog.Title className="text-xl font-semibold mb-4">
                            Certificate Details
                        </Dialog.Title>

                        {result ? (
                            <div className="grid grid-cols-2 gap-4 text-sm max-h-[60vh] overflow-y-auto">
                                <div><span className="font-medium">File:</span> {show(result.filename)}</div>
                                <div><span className="font-medium">Uploaded:</span> {result.uploadedAt ? new Date(result.uploadedAt).toLocaleString() : "-"}</div>
                                <div><span className="font-medium">Student Name:</span> {show(result.studentName)}</div>
                                <div><span className="font-medium">Course:</span> {show(result.course)}</div>
                                <div><span className="font-medium">Year of Passing:</span> {show(result.yearOfPass)}</div>
                                <div><span className="font-medium">Institution:</span> {show(result.institution)}</div>
                                <div><span className="font-medium">Certificate ID:</span> {show(result.certificateId)}</div>
                                <div><span className="font-medium">Status:</span> {show(result.finalStatus)}</div>
                                <div><span className="font-medium">File Hash:</span> {result.hash ? result.hash.slice(0, 16) + "..." : "-"}</div>
                                <div><span className="font-medium">Confidence:</span> {show(result.confidence)}%</div>
                                <div><span className="font-medium">Valid Format:</span> {show(result.validFormat)}</div>
                                <div><span className="font-medium">Has QR Code:</span> {show(result.hasQr)}</div>
                                <div><span className="font-medium">QR Content:</span> {Array.isArray(result.qrContent) && result.qrContent.length ? result.qrContent.join(", ") : "-"}</div>
                                <div><span className="font-medium">Logo Verified:</span> {show(result.logoVerified)}</div>
                                <div><span className="font-medium">Layout Verified:</span> {show(result.layoutVerified)}</div>
                                <div><span className="font-medium">Duplicate Check:</span> {show(result.duplicateCheck)}</div>
                                <div><span className="font-medium">Hash Match:</span> {show(result.hashMatch)}</div>
                            </div>
                        ) : (
                            <p className="text-gray-500">No certificate uploaded yet.</p>
                        )}

                        <div className="mt-6 text-right">
                            <button
                                onClick={() => setOpenModal(false)}
                                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
    );
}
