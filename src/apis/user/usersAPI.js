// services/authService.js or api/auth.js

import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://yourapi.com/api", 
    withCredentials: true, 
    headers: {
        "Content-Type": "application/json",
    },
});


export const registerAPI = async (userData) => {
    try {
        const response = await apiClient.post("/register", {
            email: userData.email,
            password: userData.password,
            username: userData.username,
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || "Registration failed");
        } else {
            throw new Error("Network error or server unavailable");
        }
    }
};
