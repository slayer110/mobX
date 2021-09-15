// external

import PubSub from 'pubsub-js';

export class EventBus {
    public static subscribe(event: string, eventHandler: (data?: any) => void): string {
        return PubSub.subscribe(event, (_message: string, data: any) => eventHandler(data));
    }

    public static publish(event: string, data: unknown) {
        return PubSub.publish(event, data);
    }

    public static publishSync(event: string, data: unknown) {
        return PubSub.publishSync(event, data);
    }
}
