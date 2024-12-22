<script setup lang="ts">
import { useClipboard } from '@vueuse/core';

const emit = defineEmits(['leaveGame']);
const { gameId } = defineProps<{
  gameId: string
}>();

const { copy } = useClipboard();
</script>

<template>
  <header>
    <div id="game-code" v-if="gameId !== ''">
      <h2>Game Code: {{ gameId }}</h2>
      <svg @click="copy(gameId)" id="copy-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
        <path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"/>
      </svg>
    </div>

    <h1 id="title">Night Vision</h1>

    <div id="exit-btn" v-if="gameId !== ''">
      <button class="btn-small" @click="emit('leaveGame')">Exit Game</button>
    </div>
  </header>
</template>

<style scoped>
header {
  position: relative;
  display: flex;
  justify-content: center;

  width: 100%;
  z-index: 2;
}

#title {
  font-size: 3em;
  font-weight: 600;
  color: var(--nv-c-lightgrey);
}

#game-code {
  position: absolute;
  top: 1em;
  left: 1em;

  display: flex;
  align-items: center;
}

#copy-icon {
  height: 20px;
  margin-left: 10px;
}

#copy-icon:hover {
  color: #FFF;
}

#copy-icon:active {
  color: var(--color-text)
}

#exit-btn {
  position: absolute;
  top: 1em;
  right: 1em;
}

.green {
  color: var(--nv-c-green);
}

@media screen and (min-width: 320px) and (max-width: 967px) {
  #title {
    font-size: 1.5rem;
  }

  #game-code {
    top: .5em;
    font-size: .7rem;
  }

  #exit-btn {
    top: .5em;
  }
}
</style>
