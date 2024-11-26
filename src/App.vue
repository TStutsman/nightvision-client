<script setup lang="ts">
import type { Game } from '@/types';
import type { Ref } from 'vue';
import { ref } from 'vue';
import TitleBanner from './components/TitleBanner.vue';
import { EventSocket, initEventSocket } from './socket';
import GameBoard from './views/GameBoard.vue';
import LandingPage from './views/LandingPage.vue';

const gameId:Ref<string> = ref('');
const game:Ref<Game | null> = ref(null);
const socket:Ref<EventSocket | null> = ref(null);

async function connect():Promise<void> {
  const res = await fetch('/api/session/connect');
  const data = await res.json();
  if(data.gameId !== ''){
    await joinGame(data.gameId);
  }
}

connect();

async function joinGame(id?:string):Promise<void> {
  const res = await fetch(`/api/games/${id || "new"}`);
  const data = await res.json();
  socket.value = await initEventSocket(`/api/games/${data.gameId}`);
  game.value = data.game;
  gameId.value = data.gameId;
}

async function leaveGame():Promise<void> {
  const res = await fetch('/api/games/leave');
  if(res.status < 300){
    gameId.value = '';
  }
}
</script>

<template>
  <LandingPage v-if="gameId === ''" @joinGame="joinGame"/>
  <GameBoard v-if="gameId && game && socket" :new-game="game" :socket="socket" :gameId="gameId" @leave-game="leaveGame"/>

  <div v-if="gameId && (!game || !socket)">
    Loading...
  </div>
</template>

<style scoped>
header {
  line-height: 1;
}
</style>
