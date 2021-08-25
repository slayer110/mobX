import { PostStore } from 'modules/post/store/PostStore';
import { MessagesStore } from 'modules/post/store/MessagesStore';
import { AppealsStore } from 'modules/appeals/store/AppealsStore';
import { SaveFormStore } from 'modules/saveForm/store/SaveFormStore';
import { OrgStore } from 'modules/org/store/OrgStore';
import { ContentStore } from 'modules/content/store/ContentStore';

export class RootStore {
    public postStore;

    public messagesStore;

    public appealsStore;

    public saveFormStore;

    public orgStore;

    public contentStore;

    public constructor() {
        this.postStore = new PostStore();
        this.messagesStore = new MessagesStore();
        this.appealsStore = new AppealsStore();
        this.saveFormStore = new SaveFormStore(this.appealsStore);
        this.orgStore = new OrgStore();
        this.contentStore = new ContentStore();
    }
}

export const rootStore = new RootStore();
