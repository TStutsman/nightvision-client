import { VueSocket } from "./VueSocket";

export function mountWebSocket(gameId:number):VueSocket {
    return new VueSocket(`ws://localhost:8080/${gameId}`);
}
