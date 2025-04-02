<template>
    <div :style="{ height: height + 'px' }">
        <canvas :id="chartId"></canvas>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
    chartId: {
        type: String,
        required: true
    },
    labels: {
        type: Array,
        required: true
    },
    datasets: {
        type: Array,
        required: true
    },
    height: {
        type: Number,
        default: 400
    },
    options: {
        type: Object,
        default: () => ({})
    }
});

const chart = ref(null);

const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            },
            ticks: {
                font: {
                    size: 18,
                    weight: 'bold',
                    color: '#000000'
                }
            }
        },
        y: {
            grid: {
                display: true,
                color: '#000000',
                drawBorder: false
            },
            beginAtZero: true,
            ticks: {
                font: {
                    size: 18,
                    weight: 'bold',
                    color: '#000000'
                }
            }
        }
    }
};

const createChart = () => {
    const ctx = document.getElementById(props.chartId).getContext('2d');

    if (chart.value) {
        chart.value.destroy();
    }

    const mergedOptions = {
        ...defaultOptions,
        ...props.options
    };

    chart.value = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: props.labels,
            datasets: props.datasets
        },
        options: mergedOptions
    });
};

watch(() => [props.labels, props.datasets, props.options], () => {
    createChart();
}, { deep: true });

onMounted(() => {
    createChart();
});
</script>
