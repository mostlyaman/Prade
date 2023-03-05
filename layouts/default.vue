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
                <v-list-item-title  @click="() => { change_account(account) }" style="font-size: smaller;cursor:pointer;text-align: center;">{{ account.acc_name }}</v-list-item-title>
            </v-list-item>
            <v-dialog v-model="manage_accounts_dialog">
                <template v-slot:activator="{ props }">

                <v-list-item>
                    <v-btn style="text-transform: capitalize;text-decoration: underline;" v-bind="props">Manage Accounts</v-btn>
                </v-list-item>
                </template>

                <v-card class="mx-auto" min-width="500px">
                    <v-card-title style="margin-top: 10px">
                        Your Accounts
                    </v-card-title>
                    <v-list>
                        <v-list-item v-for="(account, index) in accounts" :key="account.id">
                            <v-list-item-title>{{ (index + 1).toString() + '. ' + account.acc_name }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                    <v-form style="padding-left: 10px; padding-right: 10px;">

                        <v-text-field
                            
                            type="text"
                            v-model="new_account_name"
                            :rules="[(text) => text.length > 0 ? true : 'Please enter a new account name.']"
                            label="New Account Name"
                            required
                        >
                        </v-text-field>
                        <v-btn @click="create_new_account" variant='flat' style="text-transform: capitalize;" color="blue" :disabled="!new_account_name.length">
                            Create New Account
                        </v-btn>
                    </v-form>

                    <v-card-actions>
                    <v-btn color="error" class="mx-auto" @click="manage_accounts_dialog = false">Close</v-btn>
                    </v-card-actions>
                </v-card>

            </v-dialog>
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

const manage_accounts_dialog = ref(false);
const new_account_name = ref("");

const user = useSupabaseUser();
const client = useSupabaseClient();

onMounted(() => {
    watchEffect(async () => {
        if (user.value) {
            await update_accounts();
        } else {
            accounts.value = [];
            selected_account.value = null;
        }
    })
})

const update_accounts = async () => {
    const { data, error } = await client.from('account').select('id, acc_name').eq('user_id', user.value.id);
    if (error) {
        alert(error.message);
    } else {
        accounts.value = data;
        selected_account.value = data[0];
    }
}

const change_account = (account) => {
    selected_account.value = account;
}

const create_new_account = async () => {
    const { data: acc_id, error } = await client.from('account').insert({ user_id: user.value.id, acc_name: new_account_name.value }).select('id');
    const { error1 } = await client.from('worth').insert({ value: 0, acc_id: acc_id[0].id });
    if (error || error1) {
        alert(`${error.message}\n${error1.message}`);
    } else {
        await update_accounts();
    }

}
</script>

<style scoped>
.app-bar-title {
    margin-left: 10vw;
    font-family: 'Poppins', 'Roboto', sans-serif;
    font-weight: 700;
}
</style>