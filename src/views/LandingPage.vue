<script setup lang="ts">
import type { Ref } from 'vue';
import { ref } from 'vue';
import { TitleBanner } from '@/components';

const emit = defineEmits(['joinGame']);

const showIdInput:Ref<boolean> = ref(false);
const inputValue:Ref<string> = ref('');

const toggleGameInput = () => showIdInput.value = !showIdInput.value;

const newGame = () => emit('joinGame');
const joinGame = () => {
    if(inputValue.value.match(/[^A-Za-z]/g)) {
        //show an error
        console.log('Room code must be alphabetical characters')
        return;
    }
    if(inputValue.value.length !== 6) {
        //show an error
        console.log('Room code must be 6 characters in length')
        return;
    }
    emit('joinGame', inputValue.value.toUpperCase());
}
</script>

<template>
    <div id="landing-page">
        <header>
            <h1 id="title">Watch out for bears!</h1>
        </header>

        <div id="button-section" v-if="!showIdInput">
            <button class="landing" @click="newGame">New Game</button>
            <button class="landing" @click="toggleGameInput">Join Game</button>
        </div>
        <div id="input-section" v-if="showIdInput">
            <button class="landing back" @click="toggleGameInput">Back</button>
            <input type="text" v-model="inputValue" placeholder="ex: XXXXXX">
            <button class="landing" @click="joinGame">Go</button>
        </div>
    </div>
</template>

<style scoped>
#landing-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    gap: 100px;
}

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
  font-weight: 200;

  padding: 10px;

  color: var(--white);
}

#button-section {
    display: flex;
    place-items: center;
    gap: 50px;

    margin-top: 5rem;
}

button.landing {
    width: 250px;
    height: 70px;
    padding: 10px;

    font-size: 2em;
    font-weight: 800;

    background-color: var(--green);
    transition: background-color .3s ease-out;
}

button.landing:hover {
    background-color: var(--lightgreen);
}

button.back {
    width: 90px;
    background-color: var(--grey);
}

button.back:hover {
    background-color: var(--lightgrey);
}

#input-section {
    display: flex;
    place-items: center;
    gap: 10px;
}

input {
    height: 70px;
    width: 250px;
    padding: 10px;

    font-size: 2em;
    color: var(--grey);

    background-color: var(--white);
    border-radius: 5px;
    border: none;
}

@media screen and (min-width: 320px) and (max-width: 967px) {
    .landing {
        gap: 50px;
    }
}
</style>