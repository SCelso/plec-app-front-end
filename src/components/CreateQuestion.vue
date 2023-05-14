<script setup lang="ts">
import { Ref, ref, onMounted, ComputedRef, computed } from "vue";
import Textarea from "primevue/textarea";
import { Question } from "../interfaces/question.interface";
import Rating from "primevue/rating";
import MultiSelect, {
    MultiSelectChangeEvent,
    MultiSelectFilterEvent,
} from "primevue/multiselect";
import { Tag } from "../interfaces/tag.interface";
import { useTags } from "../composables/useTag";

const { getAllTags } = useTags();

const question: Ref<Question> = ref({
    description: "",
    answers: [],
    tags: [],
    difficulty: 1,
});

const tagsSelected: Ref<Tag[]> = ref([]);
const tags: Ref<Tag[]> = ref([]);
const isLoading: Ref<boolean> = ref(false);

const isDisabled = computed(() => {
    return (
        question.value.description.length < 10 ||
        tagsSelected.value.length < 1 ||
        question.value.difficulty < 1 ||
        question.value.answers.length < 1
    );
});

onMounted(async () => {
    isLoading.value = true;
    tags.value = await getAllTags();
    isLoading.value = false;
});

function sendQuestion() {
    console.log(question.value);
}

function setChipColors(event: MultiSelectChangeEvent) {
    setTimeout(() => {
        let tokens = document
            .querySelector("#tags")!
            .querySelectorAll(".p-multiselect-token");
        if (tokens == null) return;
        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
            let letter = "#FFFFFF";
            let calculateColors = hexToRgb(tagsSelected.value[i].color);

            let red = calculateColors.r;
            let green = calculateColors.g;
            let blue = calculateColors.b;
            if (red * 0.299 + green * 0.587 + blue * 0.114 > 186)
                letter = "#000000";
            else letter = "#ffffff";
            token.setAttribute(
                "style",
                `background-color: #${tagsSelected.value[i].color};color: ${letter};`
            );
        }
    }, 10);
}
function hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : {
              r: 0,
              g: 0,
              b: 0,
          };
}
</script>
<template>
    <div class="wrapper w-full flex justify-content-center">
        <ProgressSpinner v-show="isLoading" />
    </div>
    <h1 class="text-center text-5xl">{{ $t("create.question") }}</h1>
    <div
        class="surface-card shadow-3 p-5 mb-5 flex flex-column align-items-center"
    >
        <p class="text-3xl font-medium">
            {{ $t("play.tags") }}
        </p>
        <MultiSelect
            filter
            id="tags"
            v-model="tagsSelected"
            editable
            :options="tags"
            optionLabel="name"
            :placeholder="$t('play.search_tags')"
            class="w-full mb-3"
            :showToggleAll="false"
            display="chip"
            @change="setChipColors"
        />
        <p class="text-3xl font-medium">
            {{ $t("create.question_description") }}
        </p>
        <Textarea
            class="w-full"
            v-model="question.description"
            rows="5"
            cols="30"
        />
        <p class="text-3xl font-medium">
            {{ $t("create.question_difficulty") }}
        </p>
        <Rating class="mb-5" v-model="question.difficulty" :cancel="false" />
        <p class="text-3xl font-medium">
            {{ $t("create.question_answers") }}
        </p>
        <p class="text-xl font-medium">TODO: depends on the type of question</p>
        <Button
            v-bind:disabled="isDisabled"
            @click="sendQuestion"
            :label="$t('create.create')"
            rounded
        ></Button>
    </div>
</template>
