<script setup lang="ts">
import { Ability, Inventory, Tile, UserScore } from '@/components';
import type { EventSocket } from '@/socket/EventSocket';
import { addActionHandlers } from '@/socket/socket';
import type { Game } from '@/types';
import type { Ref } from 'vue';
import { ref } from 'vue';
import './../styles/base.css';
import EndGameView from './EndGameView.vue';

const { newGame, socket } = defineProps<{
  newGame: Game, socket: EventSocket
}>();

const game:Ref<Game> = ref(newGame);

function deilluminate(id: number) {
  game.value.deck[id].illuminated = false;
}

addActionHandlers(socket, game);
</script>

<template>
  <div class="board">
    <EndGameView v-if="game?.gameOver" @play-again="socket.emit('playAgain')" :endGameState="game?.endGameStatus"/>
    
    <Tile 
      v-for="(tile, index) in game?.deck"
      :key="index" 
      :revealed="tile.revealed"
      :illuminated="tile.illuminated"
      @tile-click="socket.emit('tileClick', {tileId: index})"
      @deilluminate="deilluminate(index)"
      >
      <template #icon>
        <img 
          v-bind:src="tile.type ? 'https://nmls-pictures-bucket.s3.us-east-2.amazonaws.com/rainier_' + tile.type.toLowerCase() + '.jpg' : ''" 
          v-bind:alt="tile.type"
          class="tile-img"
        />
      </template>
      <template #description>
        {{ tile.type }}
      </template>
    </Tile>
  </div>

  <div class="bearWarning" :class="{hidden:!game?.message?.length, unhidden:game?.message?.length}">{{game.message}}</div>

  <div class="abilities">
    <Ability @flashlight="socket.emit('flashlight')" ability="flashlight">
      <template #name>FLASHLIGHT</template>
      <template #description>
        CHECK ONE ROW FOR BEARS
      </template>
    </Ability>
    <Ability @bearSpray="socket.emit('bearSpray')" ability="bearSpray">
      <template #name>BEAR SPRAY</template>
      <template #description>
        PROTECTS FROM BEAR (LIMIT ONE AT A TIME)
      </template>
    </Ability>
    <Ability @shuffle="socket.emit('reshuffle')" ability="shuffle">
      <template #name>SHUFFLE</template>
      <template #description>
        SHUFFLE THE DECK
      </template>
    </Ability>
  </div>

  <div class="scoreboard">
    <Inventory :hasSpray="game?.players[1].hasSpray"/>
    <UserScore :turn="game?.activePlayer == 1" :player="1" :score="game?.players[1].points"/>
    <UserScore :turn="game?.activePlayer == 2" :player="2" :score="game?.players[2].points"/>
    <Inventory :hasSpray="game?.players[2].hasSpray"/>
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
