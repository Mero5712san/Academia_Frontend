import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../services/api";

type User = {
    id: number;
    name: string;
    email: string;
    role?: string;
};

export const Topbar = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getCurrentUser();
                setUser(data);
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };

        fetchUser();
    }, []);

    return (
        <header className="px-6 py-4 bg-gray-200 border-b border-gray-200">
            <div className="max-w-full mx-auto flex items-center justify-between">
                <div></div>

                <div className="hidden md:block">
                    <input
                        placeholder="Type here..."
                        name = "search"
                        className="px-4 py-2 rounded-full border border-gray-200 bg-white text-sm w-64 outline-none"
                    />
                </div>

                <div className="flex items-center gap-3">
                    {user ? (
                        <Link to="/profile" className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center text-sm text-white">
                                {user.name[0]}
                            </div>
                            <div className="text-sm">
                                <div className="text-sm font-medium">{user.name}</div>
                                <div className="text-xs text-gray-400">{user.role ?? "-"}</div>
                            </div>
                        </Link>
                    ) : (
                        <div className="text-sm text-gray-500">Loading...</div>
                    )}
                </div>
            </div>
        </header>
    );
};
