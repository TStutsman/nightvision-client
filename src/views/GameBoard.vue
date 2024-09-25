<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import './../styles/base.css';
import { bearSpray, flashlight, reshuffle } from '@/actions/abilities';
import { flipTile, deilluminate, resetGame } from '@/actions/tiles';
import type { Game } from '@/models';
import Tile from '../components/Tile.vue';
import UserScore from '../components/UserScore.vue';
import Inventory from '../components/Inventory.vue';
import Ability from '../components/Ability.vue';
import EndGameView from './EndGameView.vue';

const props = defineProps<{
  gameId: number
}>()

const game:Ref<Game | null> = ref(null);

fetch(`/api/games/${props.gameId}`)
  .then(res => res.json())
  .then(data => game.value = data);
</script>

<template>
  <div class="board">
    <EndGameView v-if="game?.gameOver" @play-again="resetGame" :endGameState="game?.endGameStatus"/>
    
    <Tile 
      v-for="(tile, index) in game?.deck"
      :key="index" 
      :revealed="tile.revealed"
      :illuminated="tile.illuminated"
      @show-tile="flipTile(props.gameId, index)"
      @deilluminate="deilluminate(index)"
      >
      <template #icon>
        <!-- icons for cards go here once i make them -->
        <img src="" alt="">
        {{ tile.type }}
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
</style>
