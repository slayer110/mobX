import {makeAutoObservable} from "mobx";
import {Organizations} from './entities/organizations/organizations'
import PubSub from "pubsub-js";


class organizationsStore {
    organizations = {};
    activeChat=''

    constructor() {
        makeAutoObservable(this);

        // Изменить отслеживаемое значение
        PubSub.subscribe('chatsData', (msg, chatsData) => this.loadOrganizations(chatsData[chatsData.length - 1].chatId))
        PubSub.subscribe('chatActiveId', (msg, chatActiveId) => this.activeChat = chatActiveId)
    }

    loadOrganizations = (chatId) => {
        this.organizations[chatId] = new Organizations();
        this.organizations[chatId].fetchList();

        fetch(`https://jsonplaceholder.typicode.com/posts/${chatId}`).then((res) => res.json())
            .then((records) => {
                this.organizations[chatId].saveList(records.title.split(" "));
            })
            .catch(() => {
                this.organizations[chatId].fetchError();
            });
    };


    get activeOrganizations() {
        return this.organizations[this.activeChat]
    }
}

export default organizationsStore;
