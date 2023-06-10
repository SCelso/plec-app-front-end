<script setup lang="ts">
import { useRouter } from "vue-router";
import { Question } from "../../../interfaces/question.interface";
import { Tag as Tagito } from "../../../interfaces/tag.interface";
import { Manager, Socket } from "socket.io-client";
import { Ref, ref, onMounted } from "vue";
import Divider from "primevue/divider";
import Tag from "primevue/tag";

const router = useRouter();

const questions = JSON.parse(
    router.currentRoute.value.query.questions?.toString() || "[]"
) as Question[];

const tags = JSON.parse(
    router.currentRoute.value.query.tags?.toString() || "[]"
) as Tagito[];

const questionsIds = questions.map((question) => question._id);

const tagsIds = tags.map((tag) => tag._id);

let socket: Socket;

function connectToServer() {
    const token = localStorage.getItem("access");
    const manager = new Manager(
        "http://localhost:3000/socket.io/socket.io.js",
        {
            extraHeaders: {
                authentication: token!,
            },
        }
    );
    socket?.removeAllListeners();
    socket = manager.socket("/");
    addListeners();
}

function addListeners() {
    socket.on("idGame", (idGame: { idGame: string }) => {
        idJoinGame.value = idGame.idGame;
    });
    socket.on("connect", () => {
        console.log("connected");
    });
    socket.on("players-updated", (clients: string[]) => {
        players.value = clients;
        console.log(players.value);
    });
}

function begin() {
    socket.emit("message-from-professor", {
        questions: questionsIds,
        tags: tagsIds,
    });
    hasBegun.value = true;
}

function startGame() {
    waitingPlayers.value = false;
    socket.emit("startGame");
}

const players: Ref<string[]> = ref([]);

const waitingPlayers = ref(true);

const hasBegun = ref(false);

const idJoinGame = ref("");

onMounted(async () => {
    connectToServer();
});
</script>
<template>
    <div class="w-full mt-4 xl:p-6 sm:p-2 fadein">
        <!-- <h1 class="text-center text-5xl">{{ $t("play.play") }}</h1> -->

        <div
            v-if="waitingPlayers"
            class="surface-card shadow-3 p-5 mb-5 mt-3 flex flex-column align-items-center"
        >
            <Button
                v-if="!hasBegun"
                @click="begin"
                :label="$t('play.open_room')"
            ></Button>
            <div
                v-if="hasBegun"
                class="flex flex-column align-items-center w-full"
            >
                <p class="text-3xl mb-4">
                    {{ $t("play.code") }}
                    <Tag :value="idJoinGame" class="text-4xl"></Tag>
                </p>
                <div class="surface-50 shadow-3 p-4 mb-3 flex flex-column">
                    <p class="text-3xl mb-1 text-primary mb-3">
                        {{ $t("play.players") }}
                    </p>
                    <div v-for="player in players" class="mb-2">
                        <p class="text-xl w-full mb-0 text-center">
                            {{ player }}
                        </p>
                        <hr class="mt-1 mb-0" />
                    </div>
                </div>
                <Button
                    @click="startGame"
                    :label="$t('play.start_game')"
                    class="mb-3"
                ></Button>
            </div>
        </div>
        <div
            v-if="!waitingPlayers && hasBegun"
            class="surface-card shadow-3 p-5 mb-5 flex flex-column align-items-center"
        >
            <p class="text-3xl">{{ $t("play.ranking") }}</p>
        </div>
    </div>
</template>
<style>
p {
    margin: 0;
}
</style>
