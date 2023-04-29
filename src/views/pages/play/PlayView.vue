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
const { getTags } = useTags();
const isLoading: Ref<boolean> = ref(false);

const professorsSelected: Ref<User[]> = ref([]);
let professors: Ref<User[]> = ref([]);

const tagsSelected: Ref<Tag[]> = ref([]);
const tags: Ref<Tag[]> = ref([]);

function professorRemoved(event: Event, professor: User) {
    professorsSelected.value = professorsSelected.value.filter((p) => {
        return p.name !== professor.name;
    });
    console.log(professorsSelected.value);
}
function setChipColors(event: MultiSelectChangeEvent) {
    setTimeout(() => {
        let tokens = document.getElementsByClassName("p-multiselect-token");
        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
            let letter = "#FFFFFF";
            let calculateColors = hexToRgb(tagsSelected.value[i].color);
            console.log(token);
            console.log(tags.value[i].color);

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

async function filterTags(event: MultiSelectFilterEvent) {
    tags.value = await getTags(event.value);
}

onMounted(async () => {
    professors.value = await getProfessors();
    tags.value = await getTags();
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
            />
            <p class="text-3xl font-medium">{{ $t("play.tags") }}</p>
            <MultiSelect
                filter
                v-model="tagsSelected"
                editable
                :options="tags"
                optionLabel="name"
                :placeholder="$t('play.search_tags')"
                class="w-full mb-3"
                :showToggleAll="false"
                display="chip"
                @filter="filterTags"
                @change="setChipColors"
            />
            <Button :label="$t('play.next')" class=""></Button>
        </div>
    </div>
    <div
        class="surface-card shadow-3 p-5 mb-5 flex flex-column align-items-center"
    >
        <span v-for="professor in professorsSelected">
            {{ professor.name }}
        </span>
        <span v-for="tag in tagsSelected">
            {{ tag.name }}
        </span>
    </div>
</template>

<style scoped></style>
