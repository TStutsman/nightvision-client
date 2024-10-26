export class VueSocket extends WebSocket {
    events:{ [eventName:string]: (data:object) => any};

    constructor(url:string, protocols:string[] = []) {
        console.log(url, protocols)
        super(url, protocols);
        this.events = {};
        this.onclose = (err) => console.log(err);
        this.onmessage = (event) => this.handleEvent(event);
    }

    emit(eventName:string, data:any):void {
        if (this.readyState !== this.OPEN) return;
         
        const res = JSON.stringify({event: eventName, data});
        super.send(res);
    }

    send(data:any):void {
        if (this.readyState !== this.OPEN) return;

        const res = JSON.stringify(data);
        super.send(res);
    }

    on(eventName:string, cb:(data:any) => any):void {
        this.events[eventName] = cb;
    }

    handleEvent(event: MessageEvent):void {
        const { actionType, ...data } = JSON.parse(event.data);
        const handler = this.events[actionType];
        handler(data);
    }
}