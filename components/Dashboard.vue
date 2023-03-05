<template>
<v-card>
    <v-card-title>
        Hi, Your estimated Net worth is US$ {{ money }}
    </v-card-title>
    <v-container>

    <v-dialog v-model="add_money_dialog" width="auto">
        <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props">
                Add Money
            </v-btn>
        </template>

        <v-card>
            <v-container>

            <v-text-field
                type="number"
                label="Enter Amount"
                :rules="[(value) => value > 0 ? true : 'Enter valid amount']"
                v-model="add_amount"
            >
            </v-text-field>
            <v-btn
                @click="add_money"
                :disabled="add_amount <= 0"
            >
            Add Money
            </v-btn>
        </v-container>

            <v-card-actions>
                <v-btn color="primary" block @click="add_money_dialog = false">Close Dialog</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>

</v-card>
</template>

<script setup>

const selected_account = useState('selected_account');
const client = useSupabaseClient();

const add_money_dialog = ref(false);
const add_amount = ref(0);
const money = ref(0);

const transanctions = ref([]);

onMounted(async () => {
    await load_money();
    await load_transactions();
})

const load_money = async () => {
    const { data, error } = await client.from('account').select('money').eq('id', selected_account.value.id).limit(1).single();
    if (error) alert(error.message)
    money.value = data.money;
}

const add_money = async () => {
    await load_money();
    const { error } = await client.from('account').update({ money: parseInt(money.value) + parseInt(add_amount.value) }).eq('id', selected_account.value.id);
    if (error) alert(error.message);
    await load_money();
    add_money_dialog.value = false;
}

const load_transactions = async () => {
    const { data, error } = await client.from('transaction').select('asset_id, quantity, type').eq('acc_id', selected_account.value.id);
    if (error) {
        alert(error.message)
    } else {
        transanctions.value = data;
    }
}
</script>