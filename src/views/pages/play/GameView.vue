<script setup lang="ts">
import { useRouter } from "vue-router";
import { Question } from "../../../interfaces/question.interface";
import { Tag as Tagito } from "../../../interfaces/tag.interface";
import { Manager, Socket } from "socket.io-client";
import { Ref, ref, onMounted, onUpdated, computed } from "vue";
import Divider from "primevue/divider";
import Tag from "primevue/tag";
import { GamePlayer } from "../../../interfaces/gameplayer.interface";

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
    socket.emit("startGame", idJoinGame.value);
}

const players: Ref<string[]> = ref([]);

const gamePlayers: Ref<GamePlayer[]> = ref([]);

const waitingPlayers = ref(true);

const hasBegun = ref(false);

const idJoinGame = ref("");

onMounted(async () => {
    connectToServer();
    gamePlayers.value = [
        {
            player: {
                _id: "12345667",
                email: "prueba@asda.asd",
                nickname: "sergio",
                __v: 4,
            },
            points: 0,
            index: 0,
        },
        {
            player: {
                _id: "12345667",
                email: "prueba@asda.asd",
                nickname: "jaime",
                __v: 4,
            },
            points: 100,
            index: 1,
        },
        {
            player: {
                _id: "12345667",
                email: "prueba@asda.asd",
                nickname: "martin",
                __v: 4,
            },
            points: 50,
            index: 1,
        },
    ];
});

const gamePlayersSorted = computed(() => {
    return gamePlayers.value.sort((a, b) => {
        return b.points - a.points;
    });
});
</script>
<template>
    <div class="w-full mt-4 xl:p-6 sm:p-2 fadein">
        <div
            v-if="waitingPlayers"
            class="surface-card shadow-3 p-5 mb-5 mt-3 flex flex-column align-items-center"
        >
            <Button
                v-if="!hasBegun"
                class="scalein animation-duration-800 text-3xl"
                @click="begin"
                :label="$t('play.open_room')"
            ></Button>
            <div
                v-if="hasBegun"
                class="flex flex-column align-items-center w-full scalein animation-duration-300"
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
            <p class="text-3xl mb-5">{{ $t("play.ranking") }}</p>
            <div id="HEADERS" class="w-full text-center">
                <div class="flex flex-row justify-content-evenly mb-2">
                    <p class="text-xl mb-0 w-4">
                        {{ $t("play.player") }}
                    </p>
                    <p class="text-xl mb-0 w-4">
                        {{ $t("play.question") }}
                    </p>
                    <p class="text-xl mb-0 w-4">
                        {{ $t("play.points") }}
                    </p>
                </div>
                <div v-for="player in gamePlayersSorted" class="mb-2">
                    <div
                        class="flex flex-row justify-content-evenly bg-primary scalein animation-duration-1000"
                    >
                        <p class="text-xl mb-0 w-4">
                            {{ player.player.nickname }}
                        </p>
                        <p class="text-xl mb-0 w-4">
                            {{ player.index }} / {{ questions.length }}
                        </p>
                        <p class="text-xl mb-0 w-4">
                            {{ player.points }}
                        </p>
                    </div>
                    <hr class="mt-1 mb-0" />
                </div>
            </div>
        </div>
    </div>
</template>
<style>
p {
    margin: 0;
}
</style>
