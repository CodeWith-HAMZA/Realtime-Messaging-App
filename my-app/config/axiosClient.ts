// axiosClient.ts
import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://api.example.com", // Your API base URL
    timeout: 2000, // Request timeout in milliseconds
    headers: {
        "Content-Type": "application/json",
        // Add other common headers here
    },
});

export default axiosClient;
