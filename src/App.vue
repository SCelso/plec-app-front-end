<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
    <div class="container">
        <img src="/vite.svg" class="logo" alt="Vite logo" />

        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />

        <Button label="Submit" />
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
