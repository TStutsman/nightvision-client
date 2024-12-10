<script setup lang="ts">
import type { Player } from '@/types';

const { player } = defineProps<{player:Player, isActive:boolean}>();

const playerColor = player.id == 1 ? 'blue' : 'red';
</script>

<template>
    
    <div class="player-wrapper" :class="playerColor, isActive ? 'active' : 'inactive'">
        <div v-if="player.id == 2" class="under-board"></div>

        <div class="player">
            <h1>Player {{ player.id }}</h1>

            <h2>Matches: {{ player.points }}</h2>
            <svg class="spray-icon" :style="{visibility: player.hasSpray ? 'visible' : 'hidden'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                <path d="M96 32l0 96 128 0 0-96c0-17.7-14.3-32-32-32L128 0C110.3 0 96 14.3 96 32zm0 128c-53 0-96 43-96 96L0 464c0 26.5 21.5 48 48 48l224 0c26.5 0 48-21.5 48-48l0-208c0-53-43-96-96-96L96 160zm64 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160zM384 48c0-1.4-1-3-2.2-3.6L352 32 339.6 2.2C339 1 337.4 0 336 0s-3 1-3.6 2.2L320 32 290.2 44.4C289 45 288 46.6 288 48c0 1.4 1 3 2.2 3.6L320 64l12.4 29.8C333 95 334.6 96 336 96s3-1 3.6-2.2L352 64l29.8-12.4C383 51 384 49.4 384 48zm76.4 45.8C461 95 462.6 96 464 96s3-1 3.6-2.2L480 64l29.8-12.4C511 51 512 49.4 512 48c0-1.4-1-3-2.2-3.6L480 32 467.6 2.2C467 1 465.4 0 464 0s-3 1-3.6 2.2L448 32 418.2 44.4C417 45 416 46.6 416 48c0 1.4 1 3 2.2 3.6L448 64l12.4 29.8zm7.2 100.4c-.6-1.2-2.2-2.2-3.6-2.2s-3 1-3.6 2.2L448 224l-29.8 12.4c-1.2 .6-2.2 2.2-2.2 3.6c0 1.4 1 3 2.2 3.6L448 256l12.4 29.8c.6 1.2 2.2 2.2 3.6 2.2s3-1 3.6-2.2L480 256l29.8-12.4c1.2-.6 2.2-2.2 2.2-3.6c0-1.4-1-3-2.2-3.6L480 224l-12.4-29.8zM448 144c0-1.4-1-3-2.2-3.6L416 128 403.6 98.2C403 97 401.4 96 400 96s-3 1-3.6 2.2L384 128l-29.8 12.4c-1.2 .6-2.2 2.2-2.2 3.6c0 1.4 1 3 2.2 3.6L384 160l12.4 29.8c.6 1.2 2.2 2.2 3.6 2.2s3-1 3.6-2.2L416 160l29.8-12.4c1.2-.6 2.2-2.2 2.2-3.6z"/>
            </svg>
        </div>

        <div v-if="player.id == 1" class="under-board"></div>
    </div>

</template>

<style scoped>
.player-wrapper {
    display: flex;

    width: 50%;
    padding: 100px 0;

    border-radius: 8px;
}

.player-wrapper.active.blue {
    background: linear-gradient(90deg, var(--player-1-light), 2%, var(--player-1), 80%, var(--nv-c-darkgrey));
}
.player-wrapper.inactive.blue {
    background: linear-gradient(90deg, var(--player-1), 2%, var(--player-1-dark), 80%, var(--nv-c-darkgrey));
}

.player-wrapper.active.red {
    background: linear-gradient(-90deg, var(--player-2-light), 2%, var(--player-2), 80%, var(--nv-c-darkgrey));
}
.player-wrapper.inactive.red {
    background: linear-gradient(-90deg, var(--player-2), 2%, var(--player-2-dark), 80%, var(--nv-c-darkgrey));
}

.player{
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 38%;

  border-radius: 5px;
}

.player h1{
    font-size: 2.5em;
    font-weight: 600;
}

.player h2 {
    font-size: 2em;
    font-weight: 400;
}

.spray-icon {
    margin-top: 10px;
    height: 2em;
}

.under-board {
    width: 62%;
}

@media screen and (min-width: 320px) and (max-width: 967px) {
    .player h1 {
        font-size: 1.25em;
    }
    .player h2 {
        font-size: 1em;
    }
}
</style>