<template>
<v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
    <v-list-item :prepend-avatar="`https://ui-avatars.com/api/?name=${user && user.email[0]}`" nav>
        <v-list-item-title style="font-size: 15px;">{{ user && user.email }}</v-list-item-title>
        <template v-slot:append>
            <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
        </template>
    </v-list-item>
    <v-divider />
    <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" @click="navigateTo('/')"></v-list-item>
        <v-list-item prepend-icon="mdi-currency-usd" title="Buy Assets" @click="navigateTo('/buy')"></v-list-item>
        <v-list-item prepend-icon="mdi-logout" title="Log Out" @click="signout"></v-list-item>
    </v-list>
</v-navigation-drawer>
</template>

<script setup>
const rail = ref(true);
const drawer = ref(true);
const user = useSupabaseUser();
const client = useSupabaseClient();
const accounts = useState('accounts');
const selected_account = useState('selected_account');


const signout = async () => {
    const { error } = await client.auth.signOut();
    if (error) {
        alert(error.message);
    } else {
        accounts.value = [];
        selected_account.value = null;
    }
}
</script>