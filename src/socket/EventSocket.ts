export class EventSocket extends WebSocket {
    listeners:{ [eventName:string]: (data:object) => any};

    constructor(url:string, protocols:string[] = []) {
        super(url, protocols);
        this.listeners = {};
        this.onclose = (e: CloseEvent) => console.log(e);
        this.onmessage = (e: MessageEvent) => this.routeEvent(e);
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
        if (this.readyState !== this.OPEN) return;

        const res = JSON.stringify({ event: eventName, data });
        super.send(res);
    }

    /**
     * Registers a listener to an event name. All events matching eventName
     * will be passed to the listener to handle
     * 
     * @param eventName - the name of the event
     * @param listener - the listener function to evoke
     */
    on(eventName:string, listener:(data:any) => any):void {
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
        listener(data);
    }
}