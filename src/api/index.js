import axios from 'axios';

const today = new Date().toISOString().split('T')[0];
const api = axios.create({
    baseURL: 'http://109.73.206.144:6969/api',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    params: {
        key: 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie'
    }
});

export default {
    getIncomes(params = {}) {
        return api.get('', {
            params: {
                path: 'incomes',
                dateFrom: params.dateFrom || '2025-07-01',
                dateTo: params.dateTo || today,
                page: params.page || 1,
                ...params
            }
        })
    },
    getOrders(params = {}) {
        return api.get('', {
            params: {
                path: 'orders',
                dateFrom: params.dateFrom || '2025-07-01',
                dateTo: params.dateTo || today,
                page: params.page || 1,
                ...params
            }
        })
    },
    getSales(params = {}) {
        return api.get('', {
            params: {
                path: 'sales',
                dateFrom: params.dateFrom || '2025-07-01',
                dateTo: params.dateTo || today,
                page: params.page || 1,
                ...params
            }
        })
    },
    getStocks(params = {}) {
        return api.get('', {
            params: {
                path: 'stocks',
                dateFrom: params.dateFrom || today,
                page: params.page || 1,
                ...params
            }
        })
    }
}