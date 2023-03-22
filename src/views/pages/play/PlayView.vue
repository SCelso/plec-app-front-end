<script setup lang="ts">
import type { Ref, unref } from "vue";
import { ref, onMounted } from "vue";
import InputText from "primevue/inputtext";
import MultiSelect, { MultiSelectFilterEvent } from "primevue/multiselect";
import Chip from "primevue/chip";
import { User } from "../../../interfaces/user.interface";
import { useProfessors } from "../../../composables/useProfessors";

const { getProfessors } = useProfessors();
const isLoading: Ref<boolean> = ref(false);
const professorsSelected: Ref<User[]> = ref([]);
const tagSearch: Ref<string> = ref("");
let professors: Ref<User[]> = ref([]);
function selectProfessor(event: Event) {
    console.log(professorsSelected.value);
}
function professorRemoved(event: Event, professor: User) {
    professorsSelected.value = professorsSelected.value.filter((p) => {
        return p.name !== professor.name;
    });
    console.log(professorsSelected.value);
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
                @change="selectProfessor"
                :showToggleAll="false"
                display="chip"
                @filter="filterProfessor"
            />
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
    <div
        class="surface-card shadow-3 p-5 mb-5 flex flex-column align-items-center"
    >
        <span v-for="professor in professorsSelected">
            {{ professor.name }}
        </span>
    </div>
</template>

<style scoped></style>
