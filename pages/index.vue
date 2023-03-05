<template>
    <v-main>
        <Nav />

        <v-row>
            <v-col cols="9">
                <v-container>
                    <Dashboard />
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
definePageMeta({
    middleware: ['auth']
})



const user = useSupabaseUser();



onMounted(() => {
    watchEffect(() => {
        if (!user.value) {
            navigateTo('/login');
        }
    })
})



</script>