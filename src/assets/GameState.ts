import { ref } from 'vue';
import animals from './animals'
import { checkForMatch } from './checkForMatch'
import { flashlight } from './abilities';
import { shuffle } from './shuffle';

export const whoseTurn = ref(0);
export const usersPoints = ref([0,0]);
export const userSpray = ref([false, false]);

export const flashlightOn = ref(false);
export const bearSpotted = ref(false);
export const gameOver = ref(false);
export const endGameState = ref("");

export const tiles = ref(animals.map((e,i) => { return {type: e, revealed: false, illuminated: false}}));
const numTilesPaired = ref(0);

type FlippedTile = {type: string, id: number};
export const flippedTiles = ref(new Array<FlippedTile>());

export const flipTile = (id:number) => {
  if(flashlightOn.value){
    bearSpotted.value = flashlight(id);
    // Turn off flashlight
    flashlightOn.value = false;
    // Update whose turn it is
    whoseTurn.value = whoseTurn.value == 0 ? 1 : 0;
    return;
  }
  
  if(flippedTiles.value.length > 1) return; // Already two tiles flipped
  if(tiles.value[id].revealed == true) return; // Can't select paired tiles or the same tile
  tiles.value[id].revealed = true;
  const {type} = tiles.value[id];

  // check if the tile was a bear
  if(type == 'Bear'){
    if(userSpray.value[whoseTurn.value]){
      userSpray.value[whoseTurn.value] = false; // use spray if they have it
    } else {
      let winner = whoseTurn.value == 0 ? 2 : 1;
      endGameState.value = `Player ${winner} Wins`;
      gameOver.value = true; // end the game if bear and no spray
    }
  }

  flippedTiles.value.push({type, id});

  if(flippedTiles.value.length > 1){ // Check to see if two tiles are flipped
    if(checkForMatch(flippedTiles.value)){
      // The tiles stay flipped, the user gets a point
      usersPoints.value[whoseTurn.value]++;
      // Empty flipped tiles array
      flippedTiles.value.pop();
      flippedTiles.value.pop();
      // Update number of paired tiles
      numTilesPaired.value += 2;
    } else {
      // The tiles get flipped back upside down
      setTimeout(() => {
        tiles.value[flippedTiles.value[0].id].revealed = false;
        tiles.value[flippedTiles.value[1].id].revealed = false;
        flippedTiles.value.pop();
        flippedTiles.value.pop();
      }, 1750);
    }

    // Check for end of game
    if(numTilesPaired.value > 19){
      let winner = usersPoints.value[0] > usersPoints.value[1]
      ? 1
      : usersPoints.value[0] !== usersPoints.value[1]
      ? 2
      : 0

      if(winner == 0){
        endGameState.value = "It's a tie";
      } else {
        endGameState.value = `Player ${winner} Wins!`
      }
      gameOver.value = true;
    }

    // Update whose turn it is
    whoseTurn.value = whoseTurn.value == 0 ? 1 : 0;
  }
}

export function deilluminate(id:number) {
  tiles.value[id].illuminated = false;
}

export const resetGame = () => {
  // Flip all the tiles over
  tiles.value.forEach((e) => e.revealed = false);
  // And shuffle them
  shuffle(tiles.value);
  // Take away bear sprays and spotted warning
  userSpray.value.forEach((e) => e = false);
  bearSpotted.value = false
  // Make it player 1's turn and reset points
  whoseTurn.value = 0;
  usersPoints.value.forEach((e) => e = 0);
  // And reset gameOver and endGameState
  endGameState.value = "";
  gameOver.value = false;
}