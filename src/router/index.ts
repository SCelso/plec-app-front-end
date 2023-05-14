import { createRouter, createWebHistory } from "vue-router";
import LoginViewVue from "../views/auth/LoginView.vue";
import PagesView from "../views/pages/PagesView.vue";
import HomeView from "../views/pages/home/HomeView.vue";
import PlayView from "../views/pages/play/PlayView.vue";
import GameView from "../views/pages/play/GameView.vue";
import CreationView from "../views/pages/questions/CreationView.vue";
import CreateQuestion from "../components/CreateQuestion.vue";
import CreateTag from "../components/CreateTag.vue";

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
                {
                    path: "play-game",
                    name: "PlayGame",
                    component: GameView,
                },
                {
                    path: "create",
                    name: "Create",
                    component: CreationView,
                    children: [
                        {
                            path: "question",
                            name: "CreateQuestion",
                            component: CreateQuestion,
                        },
                        {
                            path: "tag",
                            name: "CreateTag",
                            component: CreateTag,
                        },
                    ],
                },
            ],
        },
    ],
});

export default router;
