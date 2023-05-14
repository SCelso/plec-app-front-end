<script setup lang="ts">
import { PropType, Ref, onUpdated } from "vue";
import { ref, onMounted } from "vue";
import { Tag } from "../interfaces/tag.interface";
import { User } from "../interfaces/user.interface";
import { Question } from "../interfaces/question.interface";
import { useQuestions } from "../composables/useQuestions";
import MultiSelect, {
    MultiSelectChangeEvent,
    MultiSelectFilterEvent,
} from "primevue/multiselect";

const props = defineProps({
    professors: {
        type: Array as PropType<User[]>,
        required: true,
    },
    tags: {
        type: Array as PropType<Tag[]>,
        required: true,
    },
});

const { getQuestionsByProfessorAndTag } = useQuestions();
// define ref question array
const questions: Ref<Question[]> = ref([]);
const selectedQuestions: Ref<Question[]> = ref([]);

function loadQuestions() {
    questions.value = [];
    props.professors.forEach((professor) => {
        props.tags.forEach(async (tag) => {
            const newQuestions = await getQuestionsByProfessorAndTag(
                professor._id,
                tag._id
            );
            questions.value = [
                ...questions.value,
                ...newQuestions.filter(
                    (newQuestion) =>
                        !questions.value.some(
                            (question) => question._id === newQuestion._id
                        )
                ),
            ];
        });
    });
}

onMounted(() => {
    loadQuestions();
});
</script>

<template>
    <p class="text-3xl font-medium">{{ $t("play.questions") }}</p>
    <MultiSelect
        v-model="selectedQuestions"
        :options="questions"
        optionLabel="description"
        :placeholder="$t('play.select_questions')"
        :maxSelectedLabels="1"
        class="w-full mb-3"
    />
    <Button class="text-3xl" :label="$t('play.start')" @click=""></Button>
</template>
