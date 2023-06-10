<script setup lang="ts">
import { Ref, ref, onMounted, ComputedRef, computed } from "vue";
import Textarea from "primevue/textarea";
import { Question } from "../interfaces/question.interface";
import Rating from "primevue/rating";
import MultiSelect, {
    MultiSelectChangeEvent,
    MultiSelectFilterEvent,
} from "primevue/multiselect";
import RadioButton from "primevue/radiobutton";
import Checkbox from "primevue/checkbox";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import { Tag } from "../interfaces/tag.interface";
import { useTags } from "../composables/useTag";
import { useQuestions } from "../composables/useQuestions";
import i18n from "../i18n/index";
import Swal from "sweetalert2";

const { getAllTags } = useTags();
const {
    createSimpleSelectionQuestion,
    createMultipleSelectionQuestion,
    createTrueFalseQuestion,
} = useQuestions();

const question: Ref<Question> = ref({
    description: "",
    answers: [],
    tags: [],
    difficulty: 1,
});

let indexComponent = ref(0);

const tagsSelected: Ref<Tag[]> = ref([]);
const tags: Ref<Tag[]> = ref([]);
const isLoading: Ref<boolean> = ref(false);

const isDisabled = computed(() => {
    return (
        question.value.description.length < 5 ||
        tagsSelected.value.length < 1 ||
        question.value.difficulty < 1 ||
        question.value.answers.length < 2 ||
        question.value.answers.length > 4 ||
        question.value.answers.some((answer) => answer.text.length < 2) ||
        !question.value.answers.some((answer) => answer.val === 1)
    );
});

const isAddDisabled = computed(() => {
    return (
        question.value.answers.length > 3 ||
        question.value.answers.some((answer) => answer.text.length < 2)
    );
});

onMounted(async () => {
    isLoading.value = true;
    tags.value = await getAllTags();
    isLoading.value = false;
});

function sendQuestion() {
    if (indexComponent.value === 0) {
        createMultipleSelectionQuestion(
            question.value,
            tagsSelected.value
        ).then(
            manageQuestionCreateResponseOk,
            manageQuestionCreateResponseError
        );
    } else if (indexComponent.value === 1) {
        createSimpleSelectionQuestion(question.value, tagsSelected.value).then(
            manageQuestionCreateResponseOk,
            manageQuestionCreateResponseError
        );
    } else if (indexComponent.value === 2) {
        createTrueFalseQuestion(question.value, tagsSelected.value).then(
            manageQuestionCreateResponseOk,
            manageQuestionCreateResponseError
        );
    }
    question.value = {
        description: "",
        answers: [],
        tags: [],
        difficulty: 1,
    };
    tagsSelected.value = [];
}

function manageQuestionCreateResponseOk() {
    Swal.fire({
        title: i18n.global.t("create.question_created"),
        icon: "success",
        confirmButtonText: i18n.global.t("create.ok"),
    });
}

function manageQuestionCreateResponseError(error: string) {
    Swal.fire({
        title: i18n.global.t("create.question_not_created"),
        icon: "error",
        confirmButtonText: i18n.global.t("create.ok"),
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

const radioButtonVal = ref(0);

function changeFormatAnswers(index: number) {
    indexComponent.value = index;

    question.value.answers = [];
    if (index === 2) {
        question.value.answers = [
            {
                text: i18n.global.t("create.true"),
                val: 1,
            },
            {
                text: i18n.global.t("create.false"),
                val: 0,
            },
        ];
    }
}

function setCorrectAnswerSimpleSelection() {
    question.value.answers.forEach((answer) => {
        answer.val = 0;
    });
    question.value.answers[radioButtonVal.value].val = 1;
}

function addAnswer() {
    question.value.answers.push({
        text: "",
        val: 0,
    });
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
        <TabView @update:activeIndex="changeFormatAnswers" :activeIndex="0">
            <TabPanel :header="$t('create.multiple_selection')">
                <div>
                    <Button
                        type="button"
                        :label="$t('create.add_answer')"
                        icon="pi pi-plus"
                        @click="addAnswer"
                        v-bind:disabled="isAddDisabled"
                        class="mb-3"
                    />
                </div>
                <div
                    v-for="(answer, index) in question.answers"
                    :key="index"
                    class="flex flex-column align-items-center"
                >
                    <div class="flex flex-row align-items-baseline gap-2">
                        <InputText
                            :minlength="2"
                            class="mb-2"
                            v-model="question.answers[index].text"
                        />
                        <Checkbox
                            v-model="question.answers[index].val"
                            binary
                            :trueValue="1"
                            :falseValue="0"
                        />
                    </div>
                </div>
            </TabPanel>
            <TabPanel :header="$t('create.simple_selection')">
                <div>
                    <Button
                        type="button"
                        :label="$t('create.add_answer')"
                        icon="pi pi-plus"
                        @click="addAnswer"
                        v-bind:disabled="isAddDisabled"
                        class="mb-3"
                    />
                </div>
                <div
                    v-for="(answer, index) in question.answers"
                    :key="index"
                    class="flex flex-column align-items-center"
                >
                    <div class="flex flex-row align-items-baseline gap-2">
                        <InputText
                            :minlength="2"
                            class="mb-2"
                            v-model="question.answers[index].text"
                        />
                        <RadioButton
                            v-model="radioButtonVal"
                            name="correct"
                            :value="index"
                            @change="setCorrectAnswerSimpleSelection"
                        />
                    </div>
                </div>
            </TabPanel>
            <TabPanel :header="$t('create.true_false')">
                <div
                    v-for="(answer, index) in question.answers"
                    :key="index"
                    class="flex flex-column align-items-center"
                >
                    <div class="flex flex-row align-items-baseline gap-2">
                        <InputText
                            readonly
                            class="mb-2"
                            v-model="question.answers[index].text"
                        />
                        <RadioButton
                            v-model="radioButtonVal"
                            name="correct"
                            :value="index"
                            @change="setCorrectAnswerSimpleSelection()"
                        />
                    </div>
                </div>
            </TabPanel>
        </TabView>
        <Button
            v-bind:disabled="isDisabled"
            @click="sendQuestion"
            :label="$t('create.create')"
            rounded
        ></Button>
    </div>
</template>
