import {makeAutoObservable} from 'mobx';
import {Organizations} from './entities/organizations/organizations';
import PubSub from 'pubsub-js';

class OrganizationsStore {
    organizations: any = {};
    activeChat = '';
    activeOrgId = '';

    constructor() {
        makeAutoObservable(this);
        PubSub.subscribe('chatsData', (msg: any, lastChatId: any) =>
            this.loadOrganizations(lastChatId)
        );
        PubSub.subscribe('chatActiveId', (msg:any, id: any) =>
            this.saveActiveChatId(id)
        );
    }

    saveActiveChatId(id: any) {
        this.activeChat = id;
    }

    selectOrg = (orgId: any) => {
        this.activeOrgId = orgId;
        PubSub.publish('activeOrgId', this.activeOrgId);
    };

    loadOrganizations = (chatId: any) => {
        this.organizations[chatId] = new Organizations();
        this.organizations[chatId].fetchList();

        fetch(`https://jsonplaceholder.typicode.com/posts/${chatId}`)
            .then((res) => res.json())
            .then((records) => {
                this.organizations[chatId].saveList(records.title.split(' '));
            })
            .catch(() => {
                this.organizations[chatId].fetchError();
            });
    };

    get activeOrganizations() {
        return this.organizations[this.activeChat] || new Organizations();
    }
}

export default OrganizationsStore;
