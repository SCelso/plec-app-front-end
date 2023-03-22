import { createRouter, createWebHistory } from "vue-router";
import LoginViewVue from "../views/auth/LoginView.vue";
import PagesView from "../views/pages/PagesView.vue";
import HomeView from "../views/pages/home/HomeView.vue";
import PlayView from "../views/pages/play/PlayView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Login",
            component: () => LoginViewVue,
        },
        {
            path: "/home",
            component: PagesView,
            children: [
                {
                    path: "",
                    component: HomeView,
                },
                {
                    path: "play",
                    component: PlayView,
                },
            ],
        },
    ],
});

export default router;
