<template>
    <v-card block>
        <v-card-title class="title">Trending Assets
            <v-icon icon="mdi-finance"></v-icon>

        </v-card-title>
        <v-list lines="one" v-if="!pending && assets">
            <v-list-item
                v-for="item in assets.coins"
                :key="item.item.id"
                style="margin-top: 10px"
            >
            <template v-slot:prepend>
                <v-avatar :image="item.item.small"></v-avatar>
            </template>

            <v-list-item-title>{{ item.item.name }}</v-list-item-title>
            </v-list-item>
        </v-list>

    </v-card>
</template>

<script setup>

const { pending, data: assets } = useLazyFetch(`https://api.coingecko.com/api/v3/search/trending`)

</script>


<style scoped>
.title {
    font-family: 'Poppins', 'Roboto', sans-serif;
    font-weight: 700;
    margin-left: 10px;
}
</style>