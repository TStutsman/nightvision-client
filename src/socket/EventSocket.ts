import type { Game } from "@/types";
import type { Ref } from "vue";

export class EventSocket {
    socket: WebSocket | null;
    game: Ref<Game> | null;
    onopen: ((this: WebSocket, ev: Event) => any) | null;
    listeners:{ [eventName:string]: (game:Ref<Game>, data:object) => any};

    constructor() {
        this.socket = null;
        this.onopen = null;
        this.game = null;
        this.listeners = {};
    }

    /**
     * Sends a jsonified event to the server to be processed.
     * 
     * If the socket is not open, returns early
     * 
     * @param eventName - the name of the event to send to the server
     * @param data - [optional] any additional data required to process the event
     */
    emit(eventName:string):void;
    emit(eventName:string, data:any):void;
    emit(eventName:string, data?:any):void {
        if(!this.socket) return;

        if (this.socket.readyState !== this.socket.OPEN) return;

        const res = JSON.stringify({ event: eventName, data });
        this.socket.send(res);
    }

    /**
     * Registers a listener to an event name. All events matching eventName
     * will be passed to the listener to handle
     * 
     * @param eventName - the name of the event
     * @param listener - the listener function to evoke
     */
    on(eventName:string, listener:(game:Ref<Game>, data:any) => any):void {
        this.listeners[eventName] = listener;
    }

    /**
     * Routes the message events to the listener registered to the name of the
     * incoming event
     * 
     * @param event - a MessageEvent from the Websocket to be routed
     */
    routeEvent(event: MessageEvent):void {
        const { actionType, ...data } = JSON.parse(event.data);

        if(this.listeners[actionType] === undefined) {
            console.log(`Action type \x1b[33m${actionType}\x1b[0m has no listener function`);
            return;
        }

        const listener = this.listeners[actionType];
        if(!this.game) return;
        listener(this.game, data);
    }

    connect(url:string, protocols:string[] = []):void {
        const socket = new WebSocket(url, protocols);
        socket.onopen = this.onopen;
        socket.onclose = (e: CloseEvent) => console.log(e);
        socket.onmessage = (e: MessageEvent) => this.routeEvent(e);

        this.socket = socket;
    }

    /**
     * Attaches the event listeners to the game instance that Vue is watching
     * to perform DOM updates
     * 
     * @param game - the game object that Vue is watching
     */
    attach(game: Ref<Game>) {
        this.game = game;
    }
}