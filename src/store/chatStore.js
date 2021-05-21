import {makeAutoObservable} from "mobx";

class ChatStore {
    data = [];

    active = null;

    constructor(questionsStore) {
        makeAutoObservable(this);
    }

    changeActiveChat = (chatId) => {
        this.active = chatId;
    };


    addNewChat = () => {
        const chatId = this.data.length + 1;
        if (this.data.length === 0) {
            this.active = chatId;
        }
        this.data.push({chatId, name: `${this.data.length+1} Чат`})
    };

}


export default ChatStore;
