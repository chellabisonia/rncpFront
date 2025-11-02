import React from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {isAuthenticated} from "../services/authService";

export default function RequireAuth() {
    const authed = isAuthenticated();
    const location = useLocation();

    // Si l'utilisateur n'est pas connecté → redirige vers /login
    return authed ? (
        <Outlet/>
    ) : (
        <Navigate to="/login" replace state={{from: location}}/>
    );
}