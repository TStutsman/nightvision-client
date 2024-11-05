<script setup lang="ts">
import type { Ref } from 'vue';
import { ref } from 'vue';
import GameHeading from './components/GameHeading.vue';
import GameBoard from './views/GameBoard.vue';
import LandingPage from './views/LandingPage.vue';

const gameId:Ref<number> = ref(-1);

async function connect():Promise<void> {
  const res = await fetch('/api/session/connect');
  const data = await res.json();
  gameId.value = +data.gameId;
}
connect();

async function enterNewGame():Promise<void> {
  const res = await fetch('/api/games/new');
  const data = await res.json();
  gameId.value = +data.gameId;
}

function joinGame(id:number):void {
  gameId.value = id;
}

</script>

<template>
  <header>
    <div class="wrapper">
      <GameHeading />
    </div>
  </header>

  <main>
    <LandingPage v-if="gameId === -1" @newGame="enterNewGame" @joinGame="joinGame"/>
    <!-- this will be the game 'board' -->
    <Suspense v-if="gameId !== -1">
      <GameBoard :gameId="gameId"/>

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
