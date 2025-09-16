import React, { useState } from "react";

export default function Settings() {
    const [dark, setDark] = useState(false);
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Settings</h2>

            <div className="bg-white rounded-2xl p-6 shadow-soft max-w-2xl">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="font-medium">Dark mode</div>
                        <div className="text-xs text-gray-400">Toggle theme</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={dark} onChange={() => setDark(!dark)} />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-tealPrimary peer-checked:shadow-sm"></div>
                    </label>
                </div>

                <div className="mt-6">
                    <div className="text-sm text-gray-500">Preferences</div>
                    <div className="mt-3 space-y-3">
                        <label className="flex items-center gap-3">
                            <input type="checkbox" />
                            <span className="text-sm">Email me alerts</span>
                        </label>
                        <label className="flex items-center gap-3">
                            <input type="checkbox" />
                            <span className="text-sm">Auto-scan on upload</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
