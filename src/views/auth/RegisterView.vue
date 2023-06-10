<script setup lang="ts">
import { ref, warn, type Ref, computed } from "vue";
import { RouterLink, useRouter } from "vue-router";

import Message from "primevue/message";
import { User } from "../../interfaces/user.interface";
import { useAuth } from "../../composables/useAuth";
import { LoginResponse } from "../../interfaces/responses/login.response";
import { ErrorResponse } from "../../interfaces/responses/error.response";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";
import i18n from "../../i18n/index";

const isLoading: Ref<boolean> = ref(false);
const user: Ref<User> = ref({
    email: "",
    password: "",
});
const errors: Ref<string[]> = ref([]);
const { createUser } = useAuth();

const router = useRouter();

const repeatPassword = ref("");

const invalidRegister = computed(() => {
    return (
        user.value.email!.length < 3 ||
        user.value.password!.length < 6 ||
        repeatPassword.value.length < 6 ||
        !passwordMatch() ||
        !passwordValid()
    );
});

function passwordMatch(): boolean {
    return user.value.password === repeatPassword.value;
}

function passwordValid(): boolean {
    // Check password has at least a number, a lowercase letter and an uppercase letter
    const passwordRegex =
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    return passwordRegex.test(user.value.password!);
}

function signUp(event: Event) {
    createUser(isLoading, user)
        .then((data: LoginResponse) => {
            errors.value = [];
            Swal.fire({
                title: i18n.global.t("register.success"),
                text: i18n.global.t("register.success_message"),
                icon: "success",
                confirmButtonText: "Ok",
            }).then(() => {
                router.push({ path: "/", replace: true });
            });
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
                <div class="text-900 text-3xl font-medium mb-1">PlecApp</div>
                <div class="text-2xl font-medium mb-3 text-primary">
                    {{ $t("register.register_title") }}
                </div>
                <span class="text-600 font-medium line-height-3">{{
                    $t("register.have_account")
                }}</span>
                <RouterLink class="no-underline" to="/">
                    <a
                        class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
                        >{{ $t("register.login") }}</a
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
                <label for="name" class="block text-900 font-medium mb-2">{{
                    $t("register.name")
                }}</label>
                <InputText
                    v-model.trim="user.name"
                    id="name"
                    type="text"
                    class="w-full mb-3"
                />

                <label for="password" class="block text-900 font-medium mb-2">{{
                    $t("password")
                }}</label>
                <div class="mb-3">
                    <InputText
                        v-model="user.password"
                        id="password"
                        type="password"
                        class="w-full"
                        :class="{
                            'border-red-500':
                                user.password!.length > 0 &&
                                !passwordValid(),
                        }"
                    />
                    <small
                        for="password"
                        v-if="!passwordValid() && user.password!.length > 0"
                        id="passwordsmall"
                        class="text-red-500"
                        >{{ $t("register.password_requirements") }}</small
                    >
                </div>

                <label
                    for="repeatPassword"
                    class="block text-900 font-medium mb-2"
                    >{{ $t("register.password_confirmation") }}</label
                >

                <div class="mb-5">
                    <InputText
                        v-model="repeatPassword"
                        id="repeatPassword"
                        type="password"
                        class="w-full"
                        :class="{
                            'border-red-500':
                                repeatPassword.length > 0 &&
                                repeatPassword != user.password,
                        }"
                    />
                    <small
                        v-if="
                            repeatPassword.length > 0 &&
                            repeatPassword != user.password
                        "
                        for="repeatPassword"
                        id="repeatPasswordsmall"
                        class="text-red-500"
                        >{{ $t("register.password_not_match") }}</small
                    >
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
                    @click="signUp"
                    :disabled="invalidRegister"
                    :label="$t('register.register')"
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
