import axios from 'axios';

const API_BASE_URL = "https://109.73.206.144:6969/api/$1"; 

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { path, ...params } = req.query;
        
        if (!path) {
            return res.status(400).json({ error: 'Missing path parameter' });
        }

        const response = await axios.get(`${API_BASE_URL}/${path}`, {
            params: {
                key: process.env.API_KEY, 
                ...params
            },
            timeout: 10000,
            headers: {
                'X-Forwarded-Proto': 'https' 
            }
        });

        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
        console.log(response.result)
        return res.status(200).json(response.result);
    } catch (error) {
        console.error('Proxy error:', error);
        return res.status(500).json({ 
            error: 'Failed to fetch data',
            details: error.response?.data || error.message 
        });
    }
}