import axios from 'axios';

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:4001';

const API = axios.create({
    baseURL: `${SERVER_URL}/todos`,
});

export default API;
