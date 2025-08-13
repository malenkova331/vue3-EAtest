<template>
    <nav>
        <router-link to="/incomes">Доходы</router-link> |
        <router-link to="/orders">Заказы</router-link> |
        <router-link to="/sales">Продажи</router-link> |
        <router-link to="/stocks">Запасы</router-link>
    </nav>
</template>

<style scoped>
    nav {
        padding: 1rem;
        background: #f0f0f0;
        margin-bottom: 2rem;
    }
    nav a {
        margin: 0 0.5rem;
        color: #2c3e50;
        text-decoration: none;
    }
    nav a.router-link-exact-active {
        color: #42b983;
        font-weight: bold;
    }
</style>