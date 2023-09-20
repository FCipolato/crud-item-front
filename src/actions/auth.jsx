import api from "../services/bff";

export async function loginUser(creates) {
    let { data } = await api.post("auth/login", creates);
    return data;
}

export function getStoredUser () {
    if (window.localStorage.getItem('user')) {
        return window.localStorage.getItem('user');
    }
    return '';
}