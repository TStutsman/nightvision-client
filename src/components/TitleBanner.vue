<script setup lang="ts">
const emit = defineEmits(['leaveGame']);
const { gameId } = defineProps<{
  gameId: string
}>();
</script>

<template>
  <header>
    <h1 id="title">Watch out for bears!</h1>
    <button id="exit-btn" v-if="gameId !== ''" class="btn-small" @click="emit('leaveGame')">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
    </button>
  </header>
</template>

<style scoped>
header {
  position: relative;
  display: flex;
  justify-content: center;
  
  width: 100%;
  z-index: 2;
  
  line-height: 1;
}

#title {
  font-size: 3em;
  font-weight: 600;
  color: var(--white);
}

#exit-btn {
  position: absolute;
  top: 1em;
  right: 1em;

  height: 30px;
  width: 30px;

  background-color: rgb(160, 29, 29) ;
}

#exit-btn svg {
  height: 15px;
  width: 15px;
  fill: var(--white);;
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
