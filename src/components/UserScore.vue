<script setup lang="ts">
const props = defineProps<{
  score: number | undefined,
  player: number | undefined,
  turn: boolean | undefined
}>()

</script>

<template>
    <div class="score" :class="{myTurn:turn}">
      <h1>Player {{ player }}: {{ score }}</h1>
    </div>
</template>

<style scoped>
.score{
  display: flex;
  place-content: center;
  align-items: center;
  height: 70px;
  width: 200px;
  border-radius: 5px;
}
.score h1{
font-size: 2em;
}
.myTurn {
  border: 2px solid var(--nv-c-lightgrey);
}
</style>