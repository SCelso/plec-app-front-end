<script setup lang="ts">
import { onActivated, onMounted, onUnmounted, ref, type Ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import NavBar from "../../components/NavBar.vue";

import { useAuth } from "../../composables/useAuth";

const { getAccountData } = useAuth();

const logged: Ref<boolean> = ref(false);

const reloadKey = ref(0);

function loadUser() {
    getAccountData()
        .then((data) => {
            localStorage.setItem("user", JSON.stringify(data));
            logged.value = true;
            reloadKey.value++;
        })
        .catch((error) => {
            localStorage.clear();
            logged.value = false;
        });
}

onActivated(() => {
    loadUser();
});
onMounted(() => {
    console.log("Vuelve home");
    loadUser();
});
onUnmounted(() => {
    console.log("Cierre home");
});
</script>

<template>
    <NavBar :key="reloadKey" :logged="logged"></NavBar>
    <RouterView />
</template>
