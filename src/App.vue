<script setup lang="ts">
import GameBoard from './views/GameBoard.vue'
import GameHeading from './components/GameHeading.vue'
import { mountWebSocket } from "@/socket";
import { initNewGame } from './actions/newGame';

const game = initNewGame();

const socket = mountWebSocket(game.id);
</script>

<template>
  <header>
    <div class="wrapper">
      <!-- this will be the heading above the board -->
      <GameHeading />
    </div>
  </header>

  <main>
    <!-- this will be the game 'board' -->
    <Suspense>
      <GameBoard :gameId="game.id" :socket="socket"/>

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
