import { tiles, whoseTurn, userSpray, flippedTiles } from './GameState'
import { shuffle } from './shuffle'

export function bearSpray() {
    if(flippedTiles.value.length > 0) return; // can't buy spray if they've flipped a tile already this turn

    if(!userSpray.value[whoseTurn.value]){ // if they don't already have spray
        userSpray.value[whoseTurn.value] = true; // give them bear spray
        whoseTurn.value = whoseTurn.value == 0 ? 1 : 0; // end their turn
    }
}

export const flashlight = (id: number) => {
    let lower = 0; // the range values for the row
    let upper = 7;
    switch( id/7 ){ // set the range based on the selected tile
        case 1:
            lower = 7;
            upper = 14;
            console.log("second row");
            break;
        case 2:
            lower = 14;
            upper = 21;
            console.log("third row");
            break;
        default:
            break;
    }

    let bearFound = false;
    for(let i = lower; i < upper; i++){ // check all the tiles in the row for a bear
        setTimeout(() => {tiles.value[i].illuminated = true;}, 50*(i%7))
        if(tiles.value[i].type == 'Bear'){
            bearFound = true;
        }
    }

    return bearFound;
}

export function reshuffle() {
    shuffle(tiles.value);
}