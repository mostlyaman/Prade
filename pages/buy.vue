<template>
<v-main>
    <Nav />

    <v-row>
        <v-col cols="9">
            <v-container>
                <v-card>
                    <v-card-title class="text-h5">
                        Crypto Price Chart
                    </v-card-title>
                    <v-card-text>
                        <v-autocomplete :items="assets" v-model="coin_name" label="Coin Search"
                            hide-details="auto"></v-autocomplete>
                        <v-container>

                            <v-btn @click="chartmaker(coin_name)">Generate Chart</v-btn>

                            <v-dialog v-model="buy_dialog" width="auto">
                                <template v-slot:activator="{ props }">
                                    <v-btn color="primary" v-bind="props">
                                        Buy this Asset
                                    </v-btn>
                                </template>

                                <v-card>

                                    <v-card-actions>
                                        <v-btn color="primary" block @click="buy_dialog = false">Close Dialog</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-container>


                        <div class="chart-container">
                            <canvas id="myChart"></canvas>
                        </div>
                    </v-card-text>
                </v-card>
            </v-container>

        </v-col>
        <v-col cols="3">
            <v-container>
                <TopAssets />
            </v-container>
        </v-col>

    </v-row>
</v-main>
</template>

<script setup>
import { Chart, registerables } from "chart.js";

definePageMeta({
    middleware: ['auth']
})


const coin_name = ref("");
const chart = ref(null);
const user = useSupabaseUser();
const client = useSupabaseClient();
const assets = ref([]);
const buy_dialog = ref(false);

onMounted(async () => {
    Chart.register(...registerables);
    watchEffect(() => {
        if (!user.value) {
            navigateTo('/login');
        }
    })

    const { data: asset, error } = await client.from('assets').select('asset_id');
    if (error) {
        alert(error.message);
    }
    assets.value = asset.map((a) => a.asset_id);


})


const chartmaker = async (coin) => {
    fetch(
        `https://api.coingecko.com/api/v3/coins/${coin}/market_chart/range?vs_currency=usd&from=1672520400&to=${Date.now()}`
    )
        .then((response) => response.json())
        .then((data) => {
            const chartData = {
                labels: data.prices.map((price) =>
                    new Date(price[0]).toLocaleDateString()
                ),
                datasets: [
                    {
                        label: "Price in USD",
                        data: data.prices.map((price) => price[1]),
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        tension: 0.1,
                    },
                ],
            };

            const chartOptions = {
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: "Date",
                        },
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: "Price (USD)",
                        },
                    },
                },
            };

            if (chart.value) {
                chart.value.destroy();
            }

            const ctx = document.getElementById("myChart").getContext("2d");
            chart.value = new Chart(ctx, {
                type: "line",
                data: chartData,
                options: chartOptions,
            });
        });
}
</script>

<style scoped></style>