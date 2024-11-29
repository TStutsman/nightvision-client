<script setup lang="ts">
const props = defineProps<{
  endGameState: string
}>()

</script>

<template>
    <div class="gameover">
        <h2>{{ endGameState }}</h2>
        <button @click="$emit('playAgain')" class="btn-large playAgain">Play Again</button>
    </div>
</template>

<style scoped>
.gameover {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  z-index: 1;
  background: rgba(255,255,255,.10);
}

.gameover h2 {
  font-size: 4em;
}
</style>