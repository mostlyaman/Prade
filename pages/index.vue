<template>
    <v-main>
        <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
            <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" nav>
                <v-list-item-title style="font-size: 15px;">John Doe</v-list-item-title>
                <template v-slot:append>
                    <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
                </template>
            </v-list-item>
            <v-divider />
            <v-list density="compact" nav>
                <v-list-item prepend-icon="mdi-home-city" title="Home"></v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-container>
            <TopAssets />
        </v-container>
    </v-main>
</template>

<script setup>
const rail = ref(true);
const drawer = ref(true);
</script>