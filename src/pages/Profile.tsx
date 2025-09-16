import React from "react";

export default function Profile() {
    const user = {
        name: "Esthera Jackson",
        email: "esthera@example.com",
        mobile: "+1 123 1234 123",
        location: "United States",
    };

    return (
        <div>
            <div className="rounded-2xl header-gradient p-6 mb-6 text-white">
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-2xl">{user.name[0]}</div>
                    <div>
                        <div className="text-lg font-semibold">{user.name}</div>
                        <div className="text-sm opacity-90">{user.email}</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-soft">
                    <h4 className="font-semibold mb-3">Profile Information</h4>
                    <div className="text-sm text-gray-600 space-y-2">
                        <div><span className="text-gray-400">Full Name: </span>{user.name}</div>
                        <div><span className="text-gray-400">Mobile: </span>{user.mobile}</div>
                        <div><span className="text-gray-400">Email: </span>{user.email}</div>
                        <div><span className="text-gray-400">Location: </span>{user.location}</div>
                    </div>
                </div>

                <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-soft">
                    <h4 className="font-semibold mb-3">Account Settings</h4>
                    <div className="text-sm text-gray-600">Here go account related settings and actions (change password, connected accounts etc.)</div>
                </div>
            </div>
        </div>
    );
}
