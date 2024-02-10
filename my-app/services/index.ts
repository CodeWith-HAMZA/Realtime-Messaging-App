// services/index.js
import axios from 'axios';

const BASE_URL = 'http://localhost:4000'; // Your server URL

const axiosInstance = axios.create({

    baseURL: BASE_URL,
    // You can add other custom configuration options here
});

export default axiosInstance;


// alright here's my server work, regarding chat app of expressjs, like controllers, routes, and the user.http, chat.http file, that includes information that what credentials are required to make a request