import api from "./api";

//inscription
export async function register(payload) {
    try {
        const response = await api.post("/api/register", payload, {
            headers: {"Content-Type": "application/json"},
        });
        return response.data ?? null;
    } catch (error) {
        let message = "Erreur lors de l'inscription.";
        if (error.response?.data?.message) {
            message = error.response.data.message;
        }
        throw new Error(message);
    }
}

//connexion
export async function login(payload) {
    // payload contient{ username, password }
    const {data} = await api.post("/api/login", payload, {
        headers: {"Content-Type": "application/json"},
    });

    // Ton backend renvoie { token: "..." }
    const token = data.token;
    if (!token) {
        throw new Error("Token JWT manquant dans la réponse.");
    }
    //enregistre le token dans le local storage en clè valeur
    localStorage.setItem("auth_token", token);
    return token;
}

//supprime le token (déconnexion)
export function logout() {
    localStorage.removeItem("auth_token");
}

//réccupère le token depuis le navigateur
export function getToken() {
    return localStorage.getItem("auth_token");
}

//permet de savoir si l'utilisateur est connecté
export function isAuthenticated() {
    return Boolean(getToken());
}
