import { VueSocket } from "./VueSocket";

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
