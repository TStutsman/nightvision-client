<script setup lang="ts">
import type { Ref } from 'vue';
import { ref } from 'vue';


const props = defineProps<{
  endGameState: string
}>();

const playerColor:Ref<string> = ref('p1-color')

playerColor.value = props.endGameState.includes('Player 1') ? 'p1-color' : 'p2-color';

</script>

<template>
    <div class="gameover" :class="playerColor">
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
}

.p1-color {
  background: radial-gradient(rgb(79, 120, 181), rgba(84, 84, 84, 0.2) 50%);
}

.p2-color {
  background: radial-gradient(rgb(189, 92, 92), rgba(84, 84, 84, 0.2) 50%);
}

.gameover h2 {
  font-size: 4em;
}
</style>