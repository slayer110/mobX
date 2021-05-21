import {makeAutoObservable, reaction} from "mobx";
import {Organizations} from './entities/organizations/organizations'


class organizationsStore {
    organizations = {};

    constructor(chatStore) {
        makeAutoObservable(this);
        this.chatStore = chatStore;

        // Изменить отслеживаемое значение
        reaction(() => this.chatStore.data.length, () => this.loadOrganizations(this.chatStore.data[this.chatStore.data.length - 1].chatId))
    }

    loadOrganizations = (chatId) => {
        this.organizations[chatId] = new Organizations();
        fetch(`https://jsonplaceholder.typicode.com/posts/${chatId}`).then(
            res => res.json()
        ).then(records => {
            records.title = records.title.split(" ");
            this.organizations[chatId].saveOrganizations(records);
            this.organizations[chatId].isLoading = false;
            this.organizations[chatId].isError = false;
            console.log(this.organizations[chatId])

        }).catch(() => {
            this.organizations[chatId].isLoading = false;
            this.organizations[chatId].isError = true;
        })
    };


    get activeOrganizations() {
        return this.organizations[this.chatStore.active]
    }
}

export default organizationsStore;
