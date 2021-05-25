import {makeAutoObservable} from "mobx";
import {Organizations} from './entities/organizations/organizations'
import PubSub from "pubsub-js";


class OrganizationsStore {
    organizations = {};
    activeChat=''
    activeOrgId = '';

    constructor() {
        makeAutoObservable(this);

        // Изменить отслеживаемое значение
        PubSub.subscribe('chatsData', (msg, lastChatId) => this.loadOrganizations(lastChatId))

        PubSub.subscribe('chatActiveId', (msg, chatActiveId) => this.changeActiveChatId(msg,chatActiveId))
    }

    changeActiveChatId(msg, chatActiveId) {
        this.activeChat = chatActiveId
    }

    selectOrg=(orgId)=> {
        this.activeOrgId = orgId;
        PubSub.publish('activeOrgId', this.activeOrgId)
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
        return this.organizations[this.activeChat] || new Organizations()
    }
}

export default OrganizationsStore;
