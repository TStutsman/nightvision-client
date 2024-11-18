<script setup lang="ts">
import type { Ref } from 'vue';
import type { Game } from '@/models';
import { ref } from 'vue';
import GameHeading from './components/GameHeading.vue';
import GameBoard from './views/GameBoard.vue';
import LandingPage from './views/LandingPage.vue';

const gameId:Ref<string> = ref('');
const game:Ref<Game | null> = ref(null);

async function connect():Promise<void> {
  const res = await fetch('/api/session/connect');
  const data = await res.json();
  gameId.value = data.gameId;
}
connect();

async function enterNewGame():Promise<void> {
  const res = await fetch('/api/games/new');
  const data = await res.json();
  game.value = data.game;
  gameId.value = data.gameId;
}

async function joinGame(id:string):Promise<void> {
  const res = await fetch(`/api/games/${id}`);
  const data = await res.json();
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
    <!-- this will be the game 'board' -->
    <Suspense v-if="gameId !== '' && game">
      <GameBoard :gameId="gameId" :new-game="game"/>

      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </main>
</template>

<style scoped>
header {
  line-height: 1;
}
</style>
