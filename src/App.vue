<script setup lang="ts">
import { ref } from 'vue';
import GameBoard from './components/GameBoard.vue'
import GameHeading from './components/GameHeading.vue'

const gameId = ref<number>(0)

fetch('/api/games/new')
  .then(res => res.json())
  .then(data => gameId.value = data)
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
    <GameBoard :game-id="gameId"/>
  </main>
</template>

<style scoped>
header {
  line-height: 1;
}
</style>
