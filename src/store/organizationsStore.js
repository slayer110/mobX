import {makeAutoObservable} from "mobx";
import {Organizations} from './entities/organizations/organizations'
import PubSub from "pubsub-js";


class organizationsStore {
    organizations = {};

    constructor() {
        makeAutoObservable(this);

        // Изменить отслеживаемое значение
        PubSub.subscribe('chatsData', (msg, chatsData) => this.loadOrganizations(chatsData[chatsData.length - 1].chatId))
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
        // console.log(this.organizations);
        // return 'jjjj'
        return PubSub.subscribe('chatActiveId', (msg, chatActiveId) =>console.log(chatActiveId))
    }
}

export default organizationsStore;
