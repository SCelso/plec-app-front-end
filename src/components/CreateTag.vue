<script setup lang="ts">
import { ref, Ref, computed } from "vue";
import ColorPicker from "primevue/colorpicker";
import { Tag } from "../interfaces/tag.interface";
import { useTags } from "../composables/useTag";
import Swal from "sweetalert2";
import i18n from "../i18n/index";

const { createTag } = useTags();
const tag: Ref<Tag> = ref({
    name: "",
    color: "000",
});

const isLoading: Ref<boolean> = ref(false);

function sendTag() {
    createTag(isLoading, tag.value)
        .then(() => {
            Swal.fire({
                text: "Tag created successfully!",
                icon: "success",
                confirmButtonText: "Ok",
            }).then(() => {
                tag.value = {
                    name: "",
                    color: "000",
                };
            });
        })
        .catch(() => {
            Swal.fire({
                title: i18n.global.t("error.error"),
                text: i18n.global.t("error.creating_tag"),
                icon: "error",
                confirmButtonText: "Ok",
            });
        });
}

const isDisabled = computed(() => {
    return tag.value.name.length < 3 || tag.value.color.length < 6;
});
</script>
<template>
    <h1 class="text-center text-5xl">{{ $t("create.tag") }}</h1>
    <div
        class="surface-card shadow-3 p-5 mb-5 flex flex-column align-items-center"
    >
        <p class="text-3xl font-medium">{{ $t("create.tag_name") }}</p>
        <InputText
            maxlength="10"
            class="w-full"
            type="text"
            v-model="tag.name"
        />

        <p class="text-3xl font-medium">{{ $t("create.tag_color") }}</p>
        <div class="flex flex-row align-items-baseline gap-1">
            <InputText maxlength="6" type="text" v-model="tag.color" />
            <ColorPicker
                inputId="cp-hex"
                format="hex"
                class="mb-5"
                v-model="tag.color"
            />
        </div>
        <Button
            class="mb-5"
            v-bind:disabled="isDisabled"
            :label="$t('create.create')"
            @click="sendTag"
        ></Button>
        <div class="wrapper w-full flex justify-content-center">
            <ProgressSpinner v-show="isLoading" />
        </div>
    </div>
</template>
