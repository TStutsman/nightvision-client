<script setup lang="ts">
import { useClipboard } from '@vueuse/core';

const { gameId } = defineProps<{
  gameId: string
}>();

const { copy } = useClipboard();
</script>

<template>
  <div class="header">
    <div id="game-code">
      <h2 v-if="gameId !== ''">Game Code: {{ gameId }}</h2>
      <svg @click="copy(gameId)" id="copy-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
        <path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"/>
      </svg>
    </div>
    <h1 class="green">NIGHT VISION</h1>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

.header {
  display: flex;
  justify-content: center;
  width: 100%;
}

#game-code {
  position: absolute;
  top: 1em;
  left: 1em;

  display: flex;
}

#copy-icon {
  height: 20px;
  margin-left: 5px;
}

#copy-icon:hover {
  color: #FFF;
}

#copy-icon:active {
  color: var(--color-text)
}

.green {
  color: var(--nv-c-green);
}
</style>
