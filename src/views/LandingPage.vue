<script setup lang="ts">
import type { Ref } from 'vue';
import { ref } from 'vue';
import { TitleBanner } from '@/components';

const emit = defineEmits(['joinGame']);

const showIdInput:Ref<boolean> = ref(false);
const inputValue:Ref<string> = ref('');

const showGameInput = () => showIdInput.value = true;

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
    <div class="landing">
        <TitleBanner gameId=''/>

        <div id="button-section">
            <button class="btn-landing" @click="newGame">New Game</button>
            <button class="btn-landing" @click="showGameInput">Join Game</button>
        </div>
        <div id="input-section" v-if="showIdInput">
            <input type="text" v-model="inputValue">
            <button class="btn-landing" @click="joinGame">Go</button>
        </div>
    </div>
</template>

<style scoped>
.landing {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    gap: 100px;
}

#button-section {
    display: flex;
    place-items: center;
    gap: 50px;

    margin-top: 5rem;
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
    color: var(--nv-c-grey);

    background-color: var(--nv-c-lightgrey);
    border-radius: 5px;
    border: none;
}

@media screen and (min-width: 320px) and (max-width: 967px) {
    .landing {
        gap: 50px;
    }
}
</style>