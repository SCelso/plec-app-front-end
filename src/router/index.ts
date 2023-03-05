import { createRouter, createWebHistory } from "vue-router";
import LoginViewVue from "../views/auth/LoginView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Login",
            component: () => LoginViewVue,
        },
    ],
});

export default router;
