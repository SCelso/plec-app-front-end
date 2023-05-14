<script setup lang="ts">
import { PropType } from "vue";
import { Tag } from "../../../interfaces/tag.interface";
import { User } from "../../../interfaces/user.interface";
import { Question } from "../../../interfaces/question.interface";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();

const questions = JSON.parse(
    router.currentRoute.value.query.questions?.toString() || "[]"
) as Question[];

const tags = JSON.parse(
    router.currentRoute.value.query.tags?.toString() || "[]"
) as Tag[];
</script>
<template>
    <div class="w-full mt-4 xl:p-6 sm:p-2 fadein">
        <h1 class="text-center text-5xl">{{ $t("play.play") }}</h1>
        <div
            class="surface-card shadow-3 p-5 mb-5 flex flex-column align-items-center"
        >
            <p class="text-3xl font-medium">{{ $t("play.professors") }}</p>
        </div>
    </div>
</template>
<style></style>
