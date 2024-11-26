<script setup lang="ts">
import { Ability, TitleBanner, Inventory, Tile, UserScore } from '@/components';
import type { EventSocket } from '../socket';
import type { Game } from '@/types';
import type { Ref } from 'vue';
import { ref } from 'vue';
import './../styles/base.css';
import EndGameView from './EndGameView.vue';
import Player from '@/components/Player.vue';

const { newGame, socket } = defineProps<{newGame: Game, gameId:string, socket: EventSocket}>();
const emit = defineEmits(['leaveGame']);

const game:Ref<Game> = ref(newGame);
socket.attach(game);

const deilluminate = (id: number) => game.value.deck[id].illuminated = false;
</script>

<template>
  <TitleBanner :game-id="gameId" @leave-game="emit('leaveGame')" />
  <EndGameView v-if="game?.gameOver" @play-again="socket.emit('playAgain')" :endGameState="game?.endGameStatus"/>

  <div id="game">
    <div id="board">
      <div id="tiles">
        
        <Tile 
          v-for="(tile, index) in game?.deck"
          :key="index" 
          :revealed="tile.revealed"
          :illuminated="tile.illuminated"
          :type="tile.type"
          @tile-click="socket.emit('tileClick', {tileId: index})"
          @deilluminate="deilluminate(index)"
          />
      </div>

      <div class="errorMessage" :class="{hidden:!game?.message?.length, unhidden:game?.message?.length}">{{game.message}}</div>

      <div id="abilities">
        <Ability 
        name="flashlight"
        text='FLASHLIGHT'
        description='CHECK ONE ROW FOR BEARS'
        @flashlight="socket.emit('flashlight')" 
        />
        <Ability 
        name="bearSpray"
        text='BEAR SPRAY'
        description='PROTECTS FROM BEAR (LIMIT ONE AT A TIME)'
        @bearSpray="socket.emit('bearSpray')" 
        />
        <Ability 
        name="reshuffle"
        text='SHUFFLE'
        description='SHUFFLE THE DECK'
        @reshuffle="socket.emit('reshuffle')" 
        />
      </div>
    </div>

    <div id="players">
      <Player :player="game?.players[1]" :activePlayer="game?.activePlayer"/>
      <Player :player="game?.players[2]" :activePlayer="game?.activePlayer"/>
    </div>
  </div>
</template>

<style scoped>
#game {
  width: 100%;
}


#board {
  display: flex;
  flex-direction: column;
  align-items: center;
  
  box-sizing: border-box;
  margin: 5px 20% 0;
  padding: 5px;
  min-width: 50%;

  background-color: var(--nv-c-darkgrey);

  border-radius: 8px;
}

#tiles{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 5px;
}

.errorMessage{
  display: flex;
  place-content: center;
  width: 100%;
  color: var(--nv-c-green);
}

#abilities {
  display: flex;
  place-content: center;
  margin-top: 1rem;
  width: 100%;
  gap: 100px;
}

#players {
  position: absolute;
  bottom: 0;
  z-index: -1;
  height: 90%;
  width: 100%;

  display: flex;
}
</style>
