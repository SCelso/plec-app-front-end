<script setup lang="ts">
import type { Ref, unref } from "vue";
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Chip from "primevue/chip";
const isLoading: Ref<boolean> = ref(false);
const professorSearch: Ref<string> = ref("");
const tagSearch: Ref<string> = ref("");
const professors: Ref<string[]> = ref(["gola", "mielda"]);
</script>
<template>
    <div class="w-full mt-4 xl:p-6 sm:p-2 fadein">
        <div class="wrapper w-full flex justify-content-center">
            <ProgressSpinner v-show="isLoading" />
        </div>
        <!-- <div class="">
            <transition-group name="p-message" tag="div">
                <Message
                    v-for="(msg, idx) in errors"
                    severity="error"
                    :key="idx"
                    :closable="false"
                >
                    <span class="">{{ msg }}</span>
                </Message>
            </transition-group>
        </div> -->
        <h1 class="text-center text-5xl">Play Game</h1>
        <div
            class="surface-card shadow-3 p-5 mb-5 flex flex-column align-items-center"
        >
            <p class="text-3xl font-medium">{{ $t("play.professors") }}</p>
            <Dropdown
                v-model="professorSearch"
                editable
                :options="professors"
                :optionLabel="$t('play.professors')"
                :placeholder="$t('play.search_professor')"
                class="w-full mb-3"
            />
            <div
                class="w-full flex flex-row flex-wrap justify-content-start gap-3"
            >
                <Chip label="Antonio Otero" removable />
            </div>
            <p class="text-3xl font-medium">{{ $t("play.tags") }}</p>
            <span class="p-input-icon-left mb-3 w-full">
                <i class="pi pi-tags"></i>
                <InputText
                    v-model.trim="tagSearch"
                    id="email"
                    type="text"
                    class="w-full"
                    :placeholder="$t('play.search_tags')"
                />
            </span>
            <Button :label="$t('play.next')" class=""></Button>
        </div>
    </div>
</template>

<style scoped></style>
