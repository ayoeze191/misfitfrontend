import axios from "axios";


const baseUrl = process.env.NODE_ENV === "developement node"?"http://127.0.0.1:8000/":"https://misfit.onrender.com"
export const instance = axios.create({baseURL:baseUrl})