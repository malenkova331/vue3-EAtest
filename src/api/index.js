import axios from 'axios'


const API_BASE_URL = 'http://109.73.206.144:6969/api'
const API_KEY = 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie'
const today = new Date().toISOString().split('T')[0];
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    params: {
        key: API_KEY
    }
})
export default {
    getIncomes(params = {}) {
        return api.get('/incomes', {
            mode: "cors",
            params: {
                dateFrom: params.dateFrom || '2025-07-01',
                dateTo: params.dateTo || today,
                page: params.page || 1,
                ...params
            }
        })
    },
    getOrders(params = {}) {
        return api.get('/orders', {
            mode: "cors",
            params: {
                dateFrom: params.dateFrom || '2025-07-01',
                dateTo: params.dateTo || today,
                page: params.page || 1,
                ...params
            }
        })
    },
    getSales(params = {}) {
        return api.get('/sales', {
            mode: "cors",
            params: {
                dateFrom: params.dateFrom || '2025-07-01',
                dateTo: params.dateTo || today,
                page: params.page || 1,
                ...params
            }
        })
    },
    getStocks(params = {}) {
        return api.get('/stocks', {
            mode: "cors",
            params: {
                dateFrom: params.dateFrom || today,
                page: params.page || 1,
                ...params
            }
        })
    }
}