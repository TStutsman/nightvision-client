<script setup lang="ts">
import type { Ref } from 'vue';
import type { Game } from '@/types';
import { ref } from 'vue';
import GameHeading from './components/GameHeading.vue';
import GameBoard from './views/GameBoard.vue';
import LandingPage from './views/LandingPage.vue';
import type { EventSocket } from './socket/EventSocket';
import { mountEventSocket } from './socket/socket';

const gameId:Ref<string> = ref('');
const game:Ref<Game | null> = ref(null);
const socket:Ref<EventSocket | null> = ref(null);

async function connect():Promise<void> {
  const res = await fetch('/api/session/connect');
  const data = await res.json();
  if(data.gameId !== ''){
    await joinGame(data.gameId);
  }
  gameId.value = data.gameId;
}
connect();

async function enterNewGame():Promise<void> {
  const res = await fetch('/api/games/new');
  const data = await res.json();
  socket.value = await mountEventSocket(`/api/games/${data.gameId}`);
  game.value = data.game;
  gameId.value = data.gameId;
}

async function joinGame(id:string):Promise<void> {
  const res = await fetch(`/api/games/${id}`);
  const data = await res.json();
  socket.value = await mountEventSocket(`/api/games/${id}`);
  game.value = data;
  gameId.value = id;
}

async function leaveGame():Promise<void> {
  const res = await fetch('/api/games/leave');
  await res.json();
  gameId.value = '';
}

</script>

<template>
  <header>
    <div class="wrapper">
      <GameHeading :gameId="gameId" @leaveGame="leaveGame"/>
    </div>
  </header>

  <main>
    <LandingPage v-if="gameId === ''" @newGame="enterNewGame" @joinGame="joinGame"/>
    <GameBoard v-if="!!gameId.length && game && socket" :new-game="game" :socket="socket"/>

    <div v-if="gameId && (!game || !socket)">
      Loading...
    </div>
  </main>
</template>

<style scoped>
header {
  line-height: 1;
}
</style>
