<template>
    <v-card>
        <v-card-title>Trending Assets</v-card-title>

    </v-card>
</template>

<script setup>

const { pending, data: assets } = useLazyFetch(`https://api.coingecko.com/api/v3/search/trending`)
</script>
