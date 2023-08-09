<script setup lang="ts">
const props = defineProps<{
  endGameState: string
}>()

</script>

<template>
    <div class="gameover">
        <h1>{{ endGameState }}</h1>
        <div @click="$emit('playAgain')" class="button playAgain">
            <h2>Play Again</h2>
        </div>
    </div>
</template>

<style scoped>
.gameover {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: 1fr;
  place-content: center;
  place-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 5;
  background: rgba(255,255,255,.10);
}
.gameover h1 {
  font-size: 4em;
}
.playAgain {
  background-color: var(--nv-c-darkgrey);
}

.button {
    display: flex;
    place-content: center;
    place-items: center;
    width: 250px;
    height: 70px;
    padding: 10px;
    background-color: var(--nv-c-grey);
    border-radius: 5px;
}
.button h3 {
    user-select: none;
    text-align: center;
}
@media (hover: hover) {
    .button:hover {
        background-color: var(--nv-c-lightgrey);
        color: var(--nv-c-grey);
        cursor: pointer;
    }
}
.button:active {
    background-color: var(--nv-v-darkgrey);
    color: var(--nv-c-lightgrey);
}
</style>