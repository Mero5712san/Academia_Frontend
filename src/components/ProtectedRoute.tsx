import type { JSX } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    children: JSX.Element;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const token = localStorage.getItem("token"); // check if logged in
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

type PublicRouteProps = {
    children: JSX.Element;
};

export const PublicRoute = ({ children }: PublicRouteProps) => {
    const token = localStorage.getItem("token"); // check if logged in
    if (token) {
        return <Navigate to="/dashboard" replace />;
    }
    return children;
};
