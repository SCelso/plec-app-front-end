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
let questions: Question[] = [];

onMounted(async () => {});
onUpdated(async () => {
    questions = [];
    // for each professor search all questions by each tag and join them in questions array
    props.professors.forEach(async (professor) => {
        props.tags.forEach(async (tag) => {
            questions = questions.concat(
                await getQuestionsByProfessorAndTag(professor._id, tag._id)
            );
        });
    });
});
</script>

<template>
    <div v-for="question in questions" :key="question._id">
        <p>{{ question.description }}</p>
        <p>{{ question.professor }}</p>
        <p>{{ question.tags }}</p>
    </div>
</template>
