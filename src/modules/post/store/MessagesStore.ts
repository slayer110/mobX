// external
import { makeAutoObservable } from 'mobx';

// internal
import { messagesRestService } from 'modules/post/services/MessagesRestService';
import { EventBus } from 'common/eventBus/eventBus';
import { Messages } from 'modules/post/models/Messages';

// interfaces
import { IMessagesByPost } from '../interfaces/interfaces';

// constants
import { event } from 'common/eventBus/event';
import { v4 } from 'uuid';

// TODO переделать как с вопросами
export class MessagesStore {
    public messagesByPosts: IMessagesByPost = {};

    public activePost = '';

    public scrollPosition = 0;

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

    public setScrollPosition(rowIndex: number): void {
        this.scrollPosition = rowIndex;
    }

    public addMessages() {
        setInterval(() => {
            this.messagesByPosts[this.activePost].addMessages();
        }, 2000);
    }
}
