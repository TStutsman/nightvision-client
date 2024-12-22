<script setup lang="ts">
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
</script>

<template>
  <TitleBanner :game-id="gameId" @leave-game="emit('leaveGame')" />
  <EndGameView v-if="game?.endGameStatus" @play-again="socket.emit('playAgain')" :endGameState="game?.endGameStatus"/>

  <div id="game">
    <div id="board" :class="'player' + game.activePlayer.toString()">
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
      <Player :player="game?.players[1]" :is-active="game?.activePlayer === 1"/>
      <Player :player="game?.players[2]" :is-active="game?.activePlayer === 2"/>
    </div>
  </div>
</template>

<style scoped>
#game {
  display: flex;
  place-content: center;

  width: 100%;
}

#board {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 5px;
  width: 62%;
  min-width: 875px;

  background-color: rgba(22, 24, 23, .8);

  border-radius: 8px;
  border: 1px ridge var(--nv-c-darkgrey);
}

#board.player1{
  border: 1px ridge var(--player-1-dark);
  border-left: 1px ridge #49a4e5;
  border-right: 1px ridge var(--player-2-dark);
}

#board.player2{
  border: 1px ridge #290911;
  border-left: 1px ridge var(--player-1-dark);
  border-right: 1px ridge #ee506d;
}

#tiles{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}

.errorMessage{
  display: flex;
  place-content: center;

  width: 100%;
  height: 14px;

  font-size: 14px;
  color: var(--nv-c-green);
}

#abilities {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 1rem;
  padding: 0 14px 4px;
  width: 100%;
}

#players {
  position: absolute;
  
  bottom: 2px;
  top: 2px;
  left: 5px;
  right: 5px;
  z-index: -1;
  
  display: flex;
}

@media screen and (max-width: 1280px) {
  #board {
    width: 40%;
    min-width: 460px;
  }

  #abilities {
    margin-top: 0;
    padding: 0 7px 2px;
  }
}
</style>
