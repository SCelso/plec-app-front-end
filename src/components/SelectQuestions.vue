<script setup lang="ts">
import { PropType, Ref, onUpdated } from "vue";
import { ref, onMounted } from "vue";
import { Tag } from "../interfaces/tag.interface";
import { User } from "../interfaces/user.interface";
import { Question } from "../interfaces/question.interface";
import { useQuestions } from "../composables/useQuestions";

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
    <h1>Pruebita</h1>
    <div v-for="question in questions" :key="question._id">
        <p>{{ question.description }} {{ question._id }}</p>
        <p>{{ question.professor }}</p>
        <p>{{ question.tags }}</p>
    </div>
</template>
