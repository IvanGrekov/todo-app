import axios from 'axios';

const SERVER_NAME = process.env.REACT_APP_SERVER_NAME || 'http://localhost';
const SERVER_PORT = process.env.REACT_APP_SERVER_PORT || 4001;
const SERVER_URL = `${SERVER_NAME}:${SERVER_PORT}`;

const API = axios.create({
    baseURL: `${SERVER_URL}/todos`,
});

export default API;
