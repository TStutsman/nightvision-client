export class VueSocket extends WebSocket {
    data:object;
    events:{ [eventName:string]: (data:object) => any};

    constructor(url:string, protocols:string[] = []) {
        super(url, protocols);
        this.data = {};
        this.events = {};
        this.onmessage = (event) => this.handleEvent(event);
    }

    emit(eventName:string, data:any):void {
        const res = JSON.stringify({event: eventName, data});
        super.send(res);
    }

    send(data:any):void {
        const res = JSON.stringify(data);
        super.send(res);
    }

    on(eventName:string, cb:(data:any) => any):void {
        this.events[eventName] = cb;
    }

    handleEvent(event: MessageEvent):void {
        const [ eventName, data ] = event.data;
        const handler = this.events[eventName];
        handler(data);
    }
}