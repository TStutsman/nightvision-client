<script setup lang="ts">
const { gameId } = defineProps<{
  gameId: string
}>();
</script>

<template>
  <div class="header">
    <h2 v-if="gameId !== ''" id="game-code">Game Code: {{ gameId }}</h2>
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
}

.green {
  color: var(--nv-c-green);
}
</style>
