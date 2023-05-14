<script setup lang="ts">
import Sidebar from "primevue/sidebar";
import { ref } from "vue";
import Menu from "primevue/menu";
import Menubar from "primevue/menubar";
import type { MenuItem } from "primevue/menuitem";
import i18n from "../../../i18n";
import router from "../../../router";
import { RouterView } from "vue-router";

const visible = ref(false);

const items = ref<MenuItem[]>([
    {
        label: `${i18n.global.t("create.question")}`,
        icon: "pi pi-fw pi-question-circle",
        command: () => {
            router.push({ path: "/home/create/question" });
        },
    },
    {
        label: `${i18n.global.t("create.tag")}`,
        icon: "pi pi-fw pi-tags",
        command: () => {
            router.push({ path: "/home/create/tag" });
        },
    },
]);
</script>
<template>
    <Sidebar v-model:visible="visible" close-icon="pi pi-arrow-left">
        <Menu :model="items" class="w-full" />
    </Sidebar>
    <div class="">
        <Button
            class="mt-1"
            rounded
            icon="pi pi-arrow-right"
            @click="visible = true"
        />
        <div class="w-full xl:p-6 xl:pt-2 sm:p-2 fadein">
            <RouterView />
        </div>
    </div>
</template>
<style></style>
