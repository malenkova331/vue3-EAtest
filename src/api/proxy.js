// api/proxy.js
import axios from 'axios';

const API_BASE_URL = 'http://109.73.206.144:6969/api';
const API_KEY = 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie';

export default async function handler(req, res) {
    try {
        const { path, ...params } = req.query;
        
        const response = await axios.get(`${API_BASE_URL}/${path}`, {
        params: {
            key: process.env.API_KEY,
            ...params
        }
        });
        
        res.status(200).json(response.result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}