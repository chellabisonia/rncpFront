import axios from "axios";

const api = axios.create({});

// Intercepteur : ajoute le token aux requêtes sortantes
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
