<script setup lang="ts">
import { ref, warn, type Ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

import Message from "primevue/message";
import { User } from "../../interfaces/user.interface";

// import type { LoginResponse } from "../../interfaces/responses/login-response.interface";
// import type { ErrorResponse } from "../../interfaces/responses/error-response.interface";
// import { useAuth } from "../../composables/useAuth";

const isLoading: Ref<boolean> = ref(false);
const user: Ref<User> = ref({
    email: "",
    password: "",
});
const errors: Ref<string[]> = ref([]);
// const { logIn } = useAuth();

const router = useRouter();

function signIn(event: Event) {
    console.log("signIn");
    console.log(user.value);

    // logIn(isLoading, user)
    //     .then((data: LoginResponse) => {
    //         errors.value = [];
    //         router.push({ path: "/home", replace: true });
    //     })
    //     .catch((error: ErrorResponse) => {
    //         if (Array.isArray(error.message)) {
    //             errors.value = error.message;
    //         } else {
    //             errors.value.push(error.message);
    //         }
    //     });
}
</script>

<template>
    <div class="wrapper">
        <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
            <div class="text-center mb-5">
                <img
                    src="../../assets/images/viewvitLogo.png"
                    alt="Image"
                    height="200"
                    class="mb-3"
                />
                <div class="text-900 text-3xl font-medium mb-3">
                    Welcome Back
                </div>
                <span class="text-600 font-medium line-height-3"
                    >Don't have an account?</span
                >
                <RouterLink class="no-underline" to="/register">
                    <a
                        class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
                        >Create one!</a
                    >
                </RouterLink>
            </div>

            <div>
                <label for="email" class="block text-900 font-medium mb-2"
                    >Email</label
                >
                <InputText
                    v-model.trim="user.email"
                    id="email"
                    type="text"
                    class="w-full mb-3"
                />

                <label for="password" class="block text-900 font-medium mb-2"
                    >Password</label
                >
                <InputText
                    v-model="user.password"
                    id="password"
                    type="password"
                    class="w-full mb-3"
                />

                <div
                    class="flex align-items-center justify-content-between mb-5"
                >
                    <a
                        class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
                        >Forgot password?</a
                    >
                    <RouterLink class="no-underline" to="/home">
                        <a class="font-medium ml-2 text-blue-500 cursor-pointer"
                            >Go to Home</a
                        >
                    </RouterLink>
                </div>

                <transition-group name="p-message" tag="div">
                    <Message
                        v-for="(msg, idx) in errors"
                        severity="error"
                        :key="idx"
                        :closable="false"
                    >
                        <span class="text-sm">{{ msg }}</span>
                    </Message>
                </transition-group>

                <Button
                    @click="signIn"
                    label="Sign In"
                    icon="pi pi-user"
                    class="w-full"
                ></Button>
            </div>

            <div class="wrapper w-full">
                <ProgressSpinner v-show="isLoading" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    padding: 10px 0 0 0;
}
</style>
