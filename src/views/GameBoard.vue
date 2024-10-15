<script setup lang="ts">
import { bearSpray, flashlight, reshuffle } from '@/actions/abilities';
import { deilluminate, resetGame } from '@/actions/tiles';
import { Ability, Inventory, Tile, UserScore } from '@/components';
import EndGameView from './EndGameView.vue';
import type { Game } from '@/models';
import { mountWebSocket } from '@/socket';
import type { Ref } from 'vue';
import { ref } from 'vue';
import './../styles/base.css';
import { watch } from 'vue';

const { gameId } = defineProps<{
  gameId: number
}>();

const socket = await mountWebSocket(gameId);

const r = await fetch(`/api/games/${gameId}`);
const data = await r.json();
const game:Ref<Game> = ref(data);

function emitFlipTile(index: number) {
  socket.emit('flipTile', { tileId: index });
}

socket.on('flipTile', ({ tileId, type }) => {
  const tile = game.value.deck[tileId];
  tile.revealed = true;
  tile.type = type;

});

socket.on('noMatch', ({ tileId }) => [

]);
</script>

<template>
  <div class="board">
    <EndGameView v-if="game?.gameOver" @play-again="resetGame" :endGameState="game?.endGameStatus"/>
    
    <Tile 
      v-for="(tile, index) in game?.deck"
      :key="index" 
      :revealed="tile.revealed"
      :illuminated="tile.illuminated"
      @show-tile="emitFlipTile(index)"
      @deilluminate="deilluminate(index)"
      >
      <template #icon>
        <!-- icons for cards go here once i make them -->
        <img 
          v-bind:src="'https://nmls-pictures-bucket.s3.us-east-2.amazonaws.com/rainier_' + tile.type.toLowerCase() + '.jpg'" 
          v-bind:alt="tile.type"
          class="tile-img"
        />
      </template>
      <template #description>
        {{ tile.type }}
      </template>
    </Tile>
  </div>

  <div class="bearWarning" :class="{hidden:!game?.bearSpotted, unhidden:game?.bearSpotted}">BEAR SPOTTED</div>

  <div class="abilities">
    <Ability @flashlight="flashlight" ability="flashlight">
      <template #name>FLASHLIGHT</template>
      <template #description>
        CHECK ONE ROW FOR BEARS
      </template>
    </Ability>
    <Ability @bearSpray="bearSpray" ability="bearSpray">
      <template #name>BEAR SPRAY</template>
      <template #description>
        PROTECTS FROM BEAR (LIMIT ONE AT A TIME)
      </template>
    </Ability>
    <Ability @shuffle="reshuffle" ability="shuffle">
      <template #name>SHUFFLE</template>
      <template #description>
        SHUFFLE THE DECK
      </template>
    </Ability>
  </div>

  <div class="scoreboard">
    <Inventory :hasSpray="game?.players[0].hasSpray"/>
    <UserScore :turn="game?.activePlayer == 0" :player="1" :score="game?.players[0].points"/>
    <UserScore :turn="game?.activePlayer == 1" :player="2" :score="game?.players[1].points"/>
    <Inventory :hasSpray="game?.players[1].hasSpray"/>
  </div>
</template>

<style scoped>
.board{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 5px;
  width: 80%;
  margin: 10px auto 0;
}

.bearWarning{
  display: flex;
  place-content: center;
  width: 100%;
  color: var(--nv-c-green);
}
.hidden {
  visibility: hidden;
}
.unhidden {
  visibility: visible;
}

.abilities {
  display: flex;
  place-content: center;
  margin-top: 1rem;
  width: 100%;
  gap: 100px;
}
.scoreboard {
  display: flex;
  place-content: center;
  margin-top: 1rem;
  width: 100%;
  gap: 20px;
}

.tile-img {
  position: absolute;
  top:0;
  z-index: -1;

  height: 150px;
  width: 105px;

  opacity: 0.8;
  border-radius: var(--tile-b-rad);
}
</style>
