<script setup lang="ts">
import { Inventory, UserScore } from '.';
import type { Player } from '@/types';

const { player, activePlayer } = defineProps<{player:Player, activePlayer:number}>();

const playerColor = player.id == 1 ? 'blue' : 'red';
</script>

<template>
    
    <div class="player" :class="playerColor, {active:activePlayer ==  player.id}">
        <div v-if="player.id == 2" class="under-board"></div>
        <div class="score">
            <UserScore :turn="false" :player="player.id" :score="player.points"/>
            <Inventory :hasSpray="player.hasSpray"/>
        </div>
        <div v-if="player.id == 1" class="under-board"></div>
    </div>

</template>

<style scoped>
.player {
    display: flex;
    width: 50%;
    border-radius: 8px;
}

.score {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 40%;
}

.under-board {
    width: 60%;
}

.player.active.blue {
    background: linear-gradient(90deg, var(--player-1), var(--nv-c-darkgrey));
}

.player.active.red {
    background: linear-gradient(-90deg, var(--player-2), var(--nv-c-darkgrey));
}
</style>