<script setup lang="ts">
import GameBoard from './components/GameBoard.vue'
import GameHeading from './components/GameHeading.vue'
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
    <GameBoard />
  </main>
</template>

<style scoped>
header {
  line-height: 1;
}
</style>
