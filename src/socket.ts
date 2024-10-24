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
    socket.on('tileClick', ({ tileId, type }) => {
        const tile = game.value.deck[tileId];
        tile.revealed = true;
        tile.type = type;
    });

    socket.on('match', ({playerId, score}) => {
        game.value.players[playerId].points = score
    });
      
    socket.on('noMatch', ({ tileId1, tileId2, playerId }) => {
        const tile1 = game.value.deck[tileId1];
        const tile2 = game.value.deck[tileId2];
        
        setTimeout(() => {
            tile1.revealed = false;
            tile2.revealed = false;
            tile1.type = '';
            tile2.type = '';
        }, 1500);

        game.value.activePlayer = playerId - 1;
    });

    socket.on('endGame', ({endGameStatus}) => {
        game.value.gameOver = true;
        game.value.endGameStatus = endGameStatus;
    });

    socket.on('playerError', ({ message }) => {
        game.value.message = message;
    });
}