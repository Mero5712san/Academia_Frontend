import { Link } from "react-router-dom";
export const Topbar = () => {
    // logged-in user mock
    const user = { name: "Sana ma", avatar: "" };

    return (
        <header className="px-6 py-4 bg-gray-200 border-b border-gray-200">
            <div className="max-w-full mx-auto flex items-center justify-between">
                <div>

                </div>
                <div className="hidden md:block">
                    <input
                        placeholder="Type here..."
                        className="px-4 py-2 rounded-full border border-gray-200 bg-white text-sm w-64 outline-none"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <Link to="/profile" className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center text-sm text-white">
                            {user.name[0]}
                        </div>
                        <div className="text-sm">
                            <div className="text-sm font-medium">{user.name}</div>
                            <div className="text-xs text-gray-400">admin</div>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
}
