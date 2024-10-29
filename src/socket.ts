import type { Game } from "./models";
import type { Ref } from 'vue';
import { VueSocket } from "./VueSocket";

/**
 * Creates the WebSocket instance on the unique url of the new game
 * 
 * @param gameId - the id of the game to use for the socket url
 * @returns a Promise that resolves into an open VueSocket
 */
export function mountWebSocket(gameId:number):Promise<VueSocket> {
    const openSocket = new Promise<VueSocket>((resolve, reject) => {
        try {
            const socket = new VueSocket(`ws://localhost:8080/api/games/${gameId}`);
            socket.onopen = () => resolve(socket);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });

    return openSocket;
}

/**
 * Adds handlers for all websocket event broadcasts
 * 
 * Updates the game state directly, causing rerender of necessary components
 */
export function addActionHandlers(socket: VueSocket, game: Ref<Game>):void {
    socket.on('tileClick', ({ data }) => {
        const { id: tileId, type } = data;
        const tile = game.value.deck[tileId];
        tile.revealed = true;
        tile.type = type;
    });

    socket.on('match', ({ data }) => {
        const { playerId, score } = data;
        game.value.players[playerId].points = score;
    });
      
    socket.on('noMatch', ({ data }) => {
        const { tileId1, tileId2, nextPlayerId } = data;
        const tile1 = game.value.deck[tileId1];
        const tile2 = game.value.deck[tileId2];
        
        setTimeout(() => {
            tile1.revealed = false;
            tile2.revealed = false;
            tile1.type = '';
            tile2.type = '';
            game.value.activePlayer = nextPlayerId;
        }, 1500);
    });

    socket.on('flashlight', () => {
        // !!! TODO: what happens when they turn on the flashlight? !!!
    });

    socket.on('flashlightUsed', ({ message }) => {
        game.value.message = message;
    });

    socket.on('bearSpray', ({ data }) => {
        const { playerId, nextPlayerId } = data;
        game.value.players[playerId].hasSpray = true;
        game.value.activePlayer = nextPlayerId;
    });

    socket.on('bearSprayUsed', ({ data }) => {
        const { playerId } = data;
        game.value.players[playerId].hasSpray = false;
    });

    socket.on('reshuffled', ({ data }) => {
        const { deck } = data;
        game.value.deck = deck;
    });

    socket.on('endGame', ({ message }) => {
        game.value.gameOver = true;
        game.value.endGameStatus = message;
    });

    socket.on('gameReset', ({ data }) => {
        game.value = data;
    })

    socket.on('playerError', ({ message }) => {
        game.value.message = message;
    });
}