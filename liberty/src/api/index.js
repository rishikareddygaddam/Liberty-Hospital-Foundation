import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});

const auth_token = localStorage.access_token;
http.defaults.headers.common["authorization"] = `Bearer ${auth_token}`;

export default http;
