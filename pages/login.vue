<template>
    <v-main>
    <v-container>
        <v-form style="max-width:600px" class="mx-auto" v-model="valid" @submit.prevent="submit">
            <v-col>
                <v-text-field
                    type="email"
                    v-model="email"
                    :rules="rules.email"
                    label="email address"
                    required
                ></v-text-field>  
                <v-text-field
                    type="password"
                    v-model="password"
                    :rules="rules.password"
                    label="password"
                    required
                ></v-text-field>
                <v-btn type="submit" class="mx-auto" :disabled="!valid">{{ isLogin ? "Sign In" : "Sign Up" }}</v-btn>
                <div class="login-subtitle mx-auto" v-if="isLogin" @click="isLogin = !isLogin">
                    Create an account instead
                </div>
                <div class="login-subtitle mx-auto" v-else @click="isLogin = !isLogin">
                    Already have an account? Login Here.
                </div>
            </v-col>
        </v-form>  
    </v-container>
    </v-main>
</template>

<script setup>
definePageMeta({
    middleware: ['auth']
})

const user = useSupabaseUser();


const valid = ref(true);
const email = ref("");
const password = ref("");
const isLogin = ref(true);

const client = useSupabaseClient();

const submit = async () => {
    if (isLogin.value) {
        await signIn();
    } else {
        await signUp();
    }
}

const signIn = async () => {
    const { data, error } = await client.auth.signInWithPassword({
        email: email.value,
        password: password.value
    });

    if (error) {
        alert(error.message);
    }
}

const signUp = async () => {
    const { data, error } = await client.auth.signUp({
        email: email.value,
        password: password.value
    });
    if (error) {
        alert(error.message);
    }
}

const rules = {
    email: [(email) => {
        if (/.+@.+\..+/.test(email)) return true
        return "Enter a valid email."
    }],
    password: [(pass) => {
        if (pass.length > 7) return true;
        return "Min password length is 8 characters."
    }]
};

onMounted(() => {
    watchEffect(async () => {
        if (user.value) {
            navigateTo('/');
        }
    })
})

</script>

<style>
.login-subtitle {
    cursor: pointer;
    font-size: smaller;
    text-decoration: underline;
    margin: 8px;
}
</style>