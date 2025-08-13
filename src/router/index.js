import { createRouter, createWebHistory } from 'vue-router'
import IncomesView from '../views/incomesVue.vue'
import OrdersView from '../views/ordersVue.vue'
import SalesView from '../views/salesVue.vue'
import StocksView from '../views/stocksVue.vue'


const routes = [
    {
        path: '/incomes',
        name: 'incomes',
        component: IncomesView
    },
    {
        path: '/orders',
        name: 'orders',
        component: OrdersView
    },
    {
        path: '/sales',
        name: 'sales',
        component: SalesView
    },
    {
        path: '/stocks',
        name: 'stocks',
        component: StocksView
    },
    {
        path: '/',
        redirect: '/incomes'
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router