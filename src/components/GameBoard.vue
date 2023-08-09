<script setup lang="ts">
import './../assets/base.css';
import Tile from './Tile.vue';
import UserScore from './UserScore.vue'
import Inventory from './Inventory.vue'
import Ability from './Ability.vue'
import GameOver from './GameOver.vue'
import { bearSpray, reshuffle } from './../assets/abilities'
import { flipTile, deilluminate, resetGame, tiles, usersPoints, gameOver, userSpray, flashlightOn, bearSpotted, whoseTurn, endGameState } from '@/assets/GameState';

const turnOnFlashlight = () => {
  flashlightOn.value = true;
}
</script>

<template>
  <div class="board">
    <GameOver v-if="gameOver" @play-again="resetGame" :endGameState="endGameState"/>
    
    <Tile 
      v-for="(tile, index) in tiles" 
      :key="index" 
      :revealed="tile.revealed"
      :illuminated="tile.illuminated"
      @show-tile="flipTile(index)"
      @deilluminate="deilluminate(index)"
      >
      <template #icon>
        <!-- icons for cards go here once i make them -->
      </template>
      <template #description>
        {{ tile.type }}
      </template>
    </Tile>
  </div>

  <div class="bearWarning" :class="{hidden:!bearSpotted, unhidden:bearSpotted}">BEAR SPOTTED</div>

  <div class="abilities">
    <Ability @flashlight="turnOnFlashlight" ability="flashlight">
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
    <Inventory :hasSpray="userSpray[0]"/>
    <UserScore :turn="whoseTurn == 0" :player="1" :score="usersPoints[0]"/>
    <UserScore :turn="whoseTurn == 1" :player="2" :score="usersPoints[1]"/>
    <Inventory :hasSpray="userSpray[1]"/>
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
