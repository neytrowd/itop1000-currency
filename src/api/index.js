import axios from 'axios';
import {api_key, base_url} from "../constants/base_url";

const api = axios.create({
    baseURL: base_url,
    params: {
        apikey: api_key
    }
})

export default api;