<script setup>
    import { ref, computed, onMounted } from 'vue'
    import api from '../api'
    import {sortData, filterData, toggleFilter, toggleSort, filterOptions, sortOptions} from '../utils/dataHelpers.js'
    const apiData = ref([])
    const loading = ref(false)
    const error = ref(null)
    const currentPage = ref(1)
    const itemsPerPage = 50

    //загрузка данных из api
    const fetchData = async () => {
        loading.value = true
        error.value = null
        try {
            const response = await api.getSales()
            apiData.value = response.data.data
            console.log(apiData.value)
        } catch (err) {
            error.value = `Ошибка загрузки: ${err.message}`
            console.error('API Error:', err)
        } finally {
            loading.value = false
        }
    }

    //пагинация
    const totalPages = computed(() => Math.ceil(apiData.value.length / itemsPerPage))
    console.log(sortOptions.value.field, sortOptions.value.direction)

    const paginatedData = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage;
        let dataToPaginate = [];
        
        if (filterOptions.value.status && filterOptions.value.field) {
            dataToPaginate =sortData(filterData(apiData.value, filterOptions.value.field, filterOptions.value.fieldName, filterOptions.value.status), sortOptions.value.field, sortOptions.value.direction);
        } else {
            dataToPaginate = sortData(apiData.value, sortOptions.value.field, sortOptions.value.direction);
        }
        
        return dataToPaginate.slice(start, start + itemsPerPage);
    });


    onMounted(fetchData)
</script>

<template>
    <div class="controls">
        <div class="filter-group">
            <label>Склад:</label>
            <input 
                v-model="filterOptions.field" 
                type="text" 
                placeholder="Название склада"
            >
            <button
                @click="toggleFilter('warehouse')"
                class="findButton"
                :class="{ active: filterOptions.status }"
            >
                {{ filterOptions.status ? 'Сбросить фильтр' : 'Найти склад' }}
            </button>
        </div>
        <div class="filter-group">
            <label>ID поступления:</label>
            <input 
                v-model="filterOptions.field" 
                type="text" 
                placeholder="ID поступления"
            >
            <button
                @click="toggleFilter('income_id')"
                class="findButton"
                :class="{ active: filterOptions.status }"
            >
                {{ filterOptions.status ? 'Сбросить фильтр' : 'Найти поступление' }}
            </button>
        </div>
        <div class="filter-group">
            <label>ID:</label>
            <input 
                v-model="filterOptions.field" 
                type="text" 
                placeholder="ID"
            >
            <button
                @click="toggleFilter('nm_id')"
                class="findButton"
                :class="{ active: filterOptions.status }"
            >
                {{ filterOptions.status ? 'Сбросить фильтр' : 'Найти по ID' }}
            </button>
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th>
                    ID
                </th>
                <th>
                    ID поступления
                </th>
                <th>
                    ID продажи
                </th>
                <th @click="toggleSort('date')">
                    Дата
                    <span v-if="sortOptions.field === 'date'">
                        {{ sortOptions.direction === 'asc' ? '↑' : '↓' }}
                    </span>
                </th>
                <th>
                    Скидка
                </th>
                <th>
                    Цена со скидкой
                </th>
                <th>
                    К оплате
                </th>
                <th>
                    Склад
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="loading">
                <td colspan="5">Загрузка данных...</td>
            </tr>
            <tr v-else-if="paginatedData.length === 0">
                <td colspan="5">Нет данных по заданным фильтрам</td>
            </tr>
            <tr v-else v-for="item in paginatedData" :key="item.id">
                <td>{{ item.nm_id }}</td>
                <td>{{ item.income_id }}</td>
                <td>{{ item.sale_id }}</td>
                <td>{{ new Date(item.date).toLocaleDateString() }}</td>
                <td>{{ item.discount_percent }} %</td>
                <td>{{ item.price_with_disc }} ₽</td>
                <td>{{ item.for_pay }} ₽</td>
                <td>{{ item.warehouse_name }}</td>
            </tr>
        </tbody>
    </table>

    <div class="pagination">
        <button 
        v-for="page in totalPages" 
        :key="page"
        @click="currentPage = page"
        :class="{ active: currentPage === page }"
        >
        {{ page }}
        </button>
    </div>
</template>
