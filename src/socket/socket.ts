import { EventSocket } from "./EventSocket";

const socket = new EventSocket();

socket.on('tileClick', (game, { data }) => {
    const { id: tileId, type, url } = data;
    const tile = game.value.deck[tileId];
    tile.revealed = true;
    tile.type = type;
    tile.url = url
});

socket.on('match', (game, { data }) => {
    const { playerId, score } = data;
    game.value.players[playerId].points = score;
});
  
socket.on('noMatch', (game, { data }) => {
    const { tileId1, tileId2, nextPlayerId } = data;
    const tile1 = game.value.deck[tileId1];
    const tile2 = game.value.deck[tileId2];
    
    setTimeout(() => {
        tile1.revealed = false;
        tile2.revealed = false;
        game.value.activePlayer = nextPlayerId;
    }, 1500);

    /** 
     * unset types after unflip animation (.75s)
     * prevents image unloading before animation plays
     */
    setTimeout(() => {
        tile1.type = '';
        tile1.url = '';
        tile2.type = '';
        tile2.url = '';
    }, 2250);
});

socket.on('flashlight', () => {
    // !!! TODO: what happens when they turn on the flashlight? !!!
});

socket.on('flashlightUsed', (game, { message, data }) => {
    game.value.message = message;

    const { rowFirstIndex } = data;
    const { deck } = game.value;
    for(let i = 0; i < 7; i++){
        setTimeout(() => {
            deck[i + rowFirstIndex].illuminated = true;
        }, 75*i);
    }
});

socket.on('bearSpray', (game, { data }) => {
    const { playerId, nextPlayerId } = data;
    game.value.players[playerId].hasSpray = true;
    game.value.activePlayer = nextPlayerId;
});

socket.on('bearSprayUsed', (game, { data }) => {
    const { playerId } = data;
    game.value.players[playerId].hasSpray = false;
});

socket.on('reshuffled', (game, { data }) => {
    const { deck } = data;
    game.value.deck = deck;
});

socket.on('endGame', (game, { message }) => {
    game.value.endGameStatus = message;
});

socket.on('gameReset', (game, { data }) => {
    game.value = data;
})

socket.on('playerError', (game, { message }) => {
    game.value.message = message;

    setTimeout(() => {
        game.value.message = '';
    }, 3000);
});


const origin = import.meta.env.MODE === 'development' ? 'ws://localhost:8080' : location.origin.replace(/^http/, 'ws');
/**
 * Creates the WebSocket instance on the unique url of the new game
 * 
 * @param url - the relative url to establish the websocket connection
 * @returns a Promise that resolves into an open EventSocket
 */
export function initEventSocket(url:string):Promise<EventSocket> {
    const openSocket = new Promise<EventSocket>((resolve, reject) => {
        try {
            socket.onopen = () => resolve(socket);
            socket.connect(origin + url, ['json']);
        } catch (error: unknown) {
            if(error instanceof Error){
                console.log(error.stack);
                reject(error.message);
            } else {
                reject('Something went wrong');
            }
        }
    });

    return openSocket;
}
