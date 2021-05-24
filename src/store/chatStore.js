import {makeAutoObservable} from "mobx";
import PubSub from 'pubsub-js';

class ChatStore {
    data = [];

    active = null;

    constructor(questionsStore) {
        makeAutoObservable(this);
    }

    changeActiveChat = (chatId) => {
        this.active = chatId;
        PubSub.publish('chatActiveId', this.active);
    };


    addNewChat = () => {
        const chatId = this.data.length + 1;
        if (this.data.length === 0) {
            this.active = chatId;
        }
        this.data.push({chatId, name: `${this.data.length+1} Чат`})
        PubSub.publish('chatsData', this.data);
    };

}


export default ChatStore;
