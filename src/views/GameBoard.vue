<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { Ability, Tile, TitleBanner, Player } from '@/components';
import type { Game } from '@/types';
import type { Ref } from 'vue';
import { ref } from 'vue';
import type { EventSocket } from '../socket';
import './../styles/base.css';
import EndGameView from './EndGameView.vue';

const { newGame, socket } = defineProps<{newGame: Game, gameId:string, socket: EventSocket}>();
const emit = defineEmits(['leaveGame']);

const game:Ref<Game> = ref(newGame);
socket.attach(game);

/** This bit loads all the images for the game, so the browser can cache them */
newGame.images.forEach(src => {
  const image = new Image();
  image.src = src;
});

const deilluminate = (id: number) => game.value.deck[id].illuminated = false;

const { copy } = useClipboard();
</script>

<template>
  <TitleBanner :game-id="gameId" @leave-game="emit('leaveGame')" />
  <EndGameView v-if="game?.endGameStatus" @play-again="socket.emit('playAgain')" :endGameState="game?.endGameStatus"/>

  <div id="game">
    <div id="board">
      <div id="tiles">
        <Tile 
          v-for="(tile, index) in game?.deck"
          :key="index" 
          :revealed="tile.revealed"
          :illuminated="tile.illuminated"
          :type="tile.type"
          :url="tile.url"
          @tile-click="socket.emit('tileClick', {tileId: index})"
          @deilluminate="deilluminate(index)"
        />
      </div>
      <div class="errorMessage">{{game.message}}</div>
    </div>

    <div id="left-column">
      <div id="players">
        <Player :player="game?.players[1]" :is-active="game?.activePlayer === 1"/>
        <Player :player="game?.players[2]" :is-active="game?.activePlayer === 2"/>
      </div>
      
      <div id="game-code" v-if="gameId !== ''">
        <h2>Game Code</h2>
        <div>
          {{ gameId }}
          <svg @click="copy(gameId)" id="copy-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
            <path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"/>
          </svg>
        </div>
      </div>
    </div>

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
</template>

<style scoped>
#game {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-rows: 1fr;

  width: 100%;
}

#left-column {
  grid-column: 1;
  grid-row: 1;
  
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  padding: 20px 0;
}

#players {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

#game-code {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
}

#game-code > h2 {
  font-size: 1.5rem;
}

#copy-icon {
  height: 20px;
  margin-left: 10px;
}

#copy-icon:hover {
  color: #FFF;
}

#copy-icon:active {
  color: var(--color-text)
}

#board {
  grid-column: 2;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 5px;
}

#tiles{
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(3, 1fr);

  background-color: rgba(45, 12, 5, .6);

  border-radius: 8px;
  border: 1px solid var(--grey);
}

.errorMessage{
  display: flex;
  place-content: center;

  width: 100%;
  height: 14px;

  font-size: 14px;
  color: var(--yellow);
}

#abilities {
  grid-column: 3;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  gap: 8px;
  width: 100%;
}

@media screen and (min-width: 1280px) {
  #board {
    width: 62%;
    min-width: 875px;
  }
}
</style>
