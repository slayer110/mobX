// external
import { makeAutoObservable } from 'mobx';

// internal
import { messagesRestService } from '../services/MessagesRestService';
import { EventBus } from '../../../common/eventBus/eventBus';
import { Messages } from '../models/Messages';

// interfaces
import { IMessagesByPost } from '../interfaces/interfaces';

// constants
import { event } from '../../../common/eventBus/event';

class MessagesStore {
    public messagesByPosts: IMessagesByPost = {};

    public activePost = '';

    public constructor() {
        makeAutoObservable(this);
        EventBus.subscribe(event.post.addNewChat, (postId: string) => {
            this.loadMessages(postId);
        });
        EventBus.subscribe(event.post.changeActiveId, (postId: string) => this.saveActivePostId(postId));
    }

    public saveActivePostId(id: string): void {
        this.activePost = id;
    }

    public async loadMessages(postId: string): Promise<void> {
        try {
            this.messagesByPosts[postId] = new Messages();
            /* eslint-disable @typescript-eslint/no-unused-expressions */
            this.messagesByPosts[postId]?.fetchList();

            const list = await messagesRestService.loadPostMessages(postId);

            /* eslint-disable @typescript-eslint/no-unused-vars */
            this.messagesByPosts[postId]?.saveList(list);
        } catch (e) {
            /* eslint-disable @typescript-eslint/no-unused-vars */
            this.messagesByPosts[postId]?.fetchError();
        }
    }

    public get activePostMessages(): Messages {
        return this.messagesByPosts[this.activePost] || new Messages();
    }
}

export default MessagesStore;
