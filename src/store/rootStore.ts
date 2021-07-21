import { PostStore } from '../modules/post/store/PostStore';
import MessagesStore from '../modules/post/store/MessagesStore';
import { AppealsStore } from '../modules/appeals/store/AppealsStore';

export class RootStore {
    public postStore = new PostStore();

    public messagesStore = new MessagesStore();

    public appealsStore = new AppealsStore();
}
