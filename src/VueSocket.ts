import { getCookie } from "./utils/cookie";

export class VueSocket extends WebSocket {
    events:{ [eventName:string]: (data:object) => any};

    constructor(url:string, protocols:string[] = []) {
        super(url, protocols);
        this.events = {};
        this.onclose = (err) => console.log(err);
        this.onmessage = (event) => this.handleEvent(event);
    }

    emit(eventName:string, data:any):void {
        if (this.readyState !== this.OPEN) return;
        
        const token = getCookie('session');
        const res = JSON.stringify({event: eventName, data, token});
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
        if(this.events[actionType]){
            const handler = this.events[actionType];
            handler(data);
        } else {
            console.log(`Action type ${actionType} has no handler function`);
        }
    }
}