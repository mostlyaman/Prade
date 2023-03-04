<template>
    <v-app-bar color="blue" app :elevation="2">
        <v-app-bar-title class="app-bar-title">📈 Prade Trading Platform</v-app-bar-title>
    </v-app-bar>
    <slot />
</template>

<style scoped>
.app-bar-title {
    margin-left: 10vw;
    font-family: 'Poppins', 'Roboto', sans-serif;
    font-weight: 700;
}
</style>