<script setup lang="ts">
import type { Ref, unref } from "vue";
import { ref, onMounted } from "vue";
import InputText from "primevue/inputtext";
import MultiSelect, {
    MultiSelectChangeEvent,
    MultiSelectFilterEvent,
} from "primevue/multiselect";
import Chip from "primevue/chip";
import { User } from "../../../interfaces/user.interface";
import { useProfessors } from "../../../composables/useProfessors";
import { Tag } from "../../../interfaces/tag.interface";
import { useTags } from "../../../composables/useTag";

const { getProfessors } = useProfessors();
const { getTags, joinTags } = useTags();
const isLoading: Ref<boolean> = ref(false);

const professorsSelected: Ref<User[]> = ref([]);
let professors: Ref<User[]> = ref([]);

const tagsSelected: Ref<Tag[]> = ref([]);
const tags: Ref<Tag[]> = ref([]);

function professorRemoved(event: Event, professor: User) {
    professorsSelected.value = professorsSelected.value.filter((p) => {
        return p.name !== professor.name;
    });
    searchTags();
    tagsSelected.value = [];
}

function professorSelected(event: MultiSelectChangeEvent) {
    searchTags();
}

function searchTags() {
    tags.value = [];
    tagsSelected.value = [];
    professorsSelected.value.forEach(async (professor) => {
        tags.value = joinTags(tags.value, await getTags(professor._id));
    });
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
async function filterProfessor(event: MultiSelectFilterEvent) {
    professors.value = await getProfessors(event.value);
}

onMounted(async () => {
    professors.value = await getProfessors();
});
</script>
<template>
    <div class="w-full mt-4 xl:p-6 sm:p-2 fadein">
        <div class="wrapper w-full flex justify-content-center">
            <ProgressSpinner v-show="isLoading" />
        </div>
        <h1 class="text-center text-5xl">Play Game</h1>
        <div
            class="surface-card shadow-3 p-5 mb-5 flex flex-column align-items-center"
        >
            <p class="text-3xl font-medium">{{ $t("play.professors") }}</p>
            <MultiSelect
                filter
                v-model="professorsSelected"
                editable
                :options="professors"
                optionLabel="name"
                :placeholder="$t('play.search_professor')"
                class="w-full mb-3"
                :showToggleAll="false"
                display="chip"
                @filter="filterProfessor"
                @change="professorSelected"
                @remove="professorRemoved"
            />

            <p class="text-3xl font-medium">{{ $t("play.tags") }}</p>
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

            <Button
                v-bind:disabled="
                    professorsSelected.length === 0 || tagsSelected.length === 0
                "
                :label="$t('play.next')"
                routerLink="['/routePath']"
            ></Button>
        </div>
    </div>
</template>

<style scoped></style>
