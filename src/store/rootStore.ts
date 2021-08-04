import { PostStore } from '../modules/post/store/PostStore';
import MessagesStore from '../modules/post/store/MessagesStore';
import { AppealsStore } from '../modules/appeals/store/AppealsStore';
import { SaveFormStore } from 'modules/saveForm/store/SaveFormStore';

export class RootStore {
    public postStore;

    public messagesStore;

    public appealsStore;

    public saveFormStore;

    public constructor() {
        this.postStore = new PostStore();
        this.messagesStore = new MessagesStore();
        this.appealsStore = new AppealsStore();
        this.saveFormStore = new SaveFormStore(this.appealsStore);
    }
}
