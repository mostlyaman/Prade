<template>
    <v-app-bar color="blue" app :elevation="2">
        <v-app-bar-title class="app-bar-title">📈 Prade Trading Platform</v-app-bar-title>
        <v-spacer />

        <v-btn v-if="selected_account"
            style="margin-right: 5vw;text-transform: capitalize;"
        >
        Account : {{ selected_account.acc_name }}

        <v-menu activator="parent">
            <v-list>
            <v-list-item 
                v-for="account in accounts"
                :key="account.id"
            >
                <v-list-item-title  @click="() => { change_account(account) }" style="font-size: smaller;cursor:pointer;">{{ account.acc_name }}</v-list-item-title>
            </v-list-item>
            </v-list>
        </v-menu>
        </v-btn>
        <v-progress-circular v-else-if="user"
            style="margin-right: 5vw;"
            indeterminate
            color="white"
        />

    </v-app-bar>
    <slot />
</template>

<script setup>

const accounts = useState('accounts', () => []);
const selected_account = useState('selected_account', () => null);



const user = useSupabaseUser();
const client = useSupabaseClient();

onMounted(() => {
    watchEffect(async () => {
        if (user.value) {
            const { data, error } = await client.from('account').select('id, acc_name').eq('user_id', user.value.id);
            if (error) {
                alert(error.message);
            } else {
                accounts.value = data;
                selected_account.value = data[0];
            }
        }
    })
})

const change_account = (account) => {
    selected_account.value = account;
}
</script>

<style scoped>
.app-bar-title {
    margin-left: 10vw;
    font-family: 'Poppins', 'Roboto', sans-serif;
    font-weight: 700;
}
</style>