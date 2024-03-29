<script setup lang="ts">
import { ref, warn, type Ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

import Message from "primevue/message";
import { User } from "../../interfaces/user.interface";
import { useAuth } from "../../composables/useAuth";
import { LoginResponse } from "../../interfaces/responses/login.response";
import { ErrorResponse } from "../../interfaces/responses/error.response";

const isLoading: Ref<boolean> = ref(false);
const user: Ref<User> = ref({
    email: "",
    password: "",
});
const errors: Ref<string[]> = ref([]);
const { logIn } = useAuth();

const router = useRouter();

function signIn(event: Event) {
    console.log("signIn");
    console.log(user.value);

    logIn(isLoading, user)
        .then((data: LoginResponse) => {
            errors.value = [];
            router.push({ path: "/home", replace: true });
        })
        .catch((error: ErrorResponse) => {
            if (Array.isArray(error.message)) {
                errors.value = error.message;
            } else {
                errors.value.push(error.message);
            }
        });
}
</script>

<template>
    <div class="wrapper">
        <div
            class="surface-card p-4 shadow-2 border-round w-full lg:w-6 flip animation-duration-500"
        >
            <div class="text-center mb-5">
                <img
                    src="../../assets/app-logo.png"
                    alt="Image"
                    height="200"
                    class="mb-3"
                />
                <div class="text-900 text-4xl font-medium mb-1">PlecApp</div>
                <div class="text-2xl font-medium mb-3 text-primary">
                    {{ $t("login.login_title") }}
                </div>
                <span class="text-600 font-medium line-height-3">{{
                    $t("login.dont_have_account")
                }}</span>
                <RouterLink class="no-underline" to="/register">
                    <a
                        class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
                        >{{ $t("login.create_account") }}</a
                    >
                </RouterLink>
            </div>

            <div>
                <label for="email" class="block text-900 font-medium mb-2">{{
                    $t("email")
                }}</label>
                <InputText
                    v-model.trim="user.email"
                    id="email"
                    type="text"
                    class="w-full mb-3"
                />

                <label for="password" class="block text-900 font-medium mb-2">{{
                    $t("password")
                }}</label>
                <InputText
                    v-model="user.password"
                    id="password"
                    type="password"
                    class="w-full mb-5"
                />

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
                    :label="$t('login.login')"
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
