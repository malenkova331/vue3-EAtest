import axios from 'axios';

const today = new Date().toISOString().split('T')[0];
const api = axios.create({
    baseURL: '/api/proxy',
    timeout: 10000,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
});

const apiService = {
    async makeRequest(endpoint, params = {}) {
        try {
        const response = await api.get('', {
            params: {
            path: endpoint,
            ...params
            }
        });
        console.log(response.result)
        return response.result;
        } catch (error) {
        console.error(`API ${endpoint} error:`, error);
        throw error;
        }
    },

    getIncomes(params = {}) {
        return this.makeRequest('incomes', {
        dateFrom: params.dateFrom || '2025-07-01',
        dateTo: params.dateTo || today,
        page: params.page || 1,
        ...params
        });
    },

    getOrders(params = {}) {
        return this.makeRequest('orders', {
        dateFrom: params.dateFrom || '2025-07-01',
        dateTo: params.dateTo || today,
        page: params.page || 1,
        ...params
        });
    },

    getSales(params = {}) {
        return this.makeRequest('sales', {
        dateFrom: params.dateFrom || '2025-07-01',
        dateTo: params.dateTo || today,
        page: params.page || 1,
        ...params
        });
    },

    getStocks(params = {}) {
        return this.makeRequest('stocks', {
        dateFrom: params.dateFrom || today,
        page: params.page || 1,
        ...params
        });
    }
};

export default apiService;