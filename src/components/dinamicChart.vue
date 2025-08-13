<script setup>
    import { ref, computed, watch } from 'vue';
    import { BarChart, PieChart, LineChart } from 'vue-chart-3';
    import { Chart, registerables } from 'chart.js';

    Chart.register(...registerables);

    const props = defineProps({
        data: {
            type: Array,
            required: true
        },
        availableFields: {
            type: Array,
            required: true
        }
    });

    const selectedField = ref(props.availableFields[0]);
    const chartType = ref('bar');

    const chartData = computed(() => ({
        labels: props.data.map(item => item.date),
        datasets: [{
            label: selectedField.value,
            data: props.data.map(item => item[selectedField.value]),
            backgroundColor: [
                '#4ade80', '#60a5fa', '#fbbf24', '#f87171', 
                '#a78bfa', '#34d399', '#f472b6', '#38bdf8'
            ],
            borderColor: '#fff',
            borderWidth: 1
        }]
    }));

    const chartOptions = ref({
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                    return `${selectedField.value}: ${context.raw}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    });

    const chartComponents = {
        bar: BarChart,
        line: LineChart,
        pie: PieChart
    };

    const CurrentChart = computed(() => chartComponents[chartType.value]);
</script>

<template>
    <div class="bg-white p-4 rounded-lg shadow">
        <div class="flex flex-wrap gap-4 mb-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Выберите поле:</label>
                <select 
                v-model="selectedField"
                class="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 border focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                <option 
                    v-for="field in availableFields" 
                    :key="field" 
                    :value="field"
                >
                    {{ field }}
                </option>
                </select>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Тип графика:</label>
                <select 
                v-model="chartType"
                class="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 border focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="bar">Столбчатая</option>
                </select>
            </div>
        </div>

        <div class="chart-container">
            <component 
                :is="CurrentChart" 
                :chartData="chartData" 
                :options="chartOptions"
                class="max-h-[400px]"
            />
        </div>
    </div>
</template>

<style scoped>
.chart-container {
    position: relative;
    height: 400px;
    width: 100%;
}
</style>