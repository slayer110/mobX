// external
import { makeAutoObservable } from 'mobx';
import { v4 } from 'uuid';

// internal
import { Post } from '../models/Post';
import { EventBus } from '../../../common/eventBus/eventBus';

// constants
import { event } from '../../../common/eventBus/event';
import { CommonUtils } from 'utils/common';

export class PostStore {
    public posts: Post[] = [];

    public active: string = '';

    public constructor() {
        makeAutoObservable(this);
    }

    public changeActivePost = (postId: string) => {
        this.active = postId;
        EventBus.publish(event.post.changeActiveId, this.active);
    };

    public addNewPost = (id: string = '') => {
        const post = new Post();
        const postId = id && typeof id !== 'object' ? id : CommonUtils.generateRandomNumberInRange();

        post.saveName(`Пост №${postId} `);
        post.saveId(String(postId));

        this.posts.push(post);
        EventBus.publish(event.post.addNewChat, this.posts[this.posts.length - 1]?.getId);

        if (!this.active) {
            this.changeActivePost(postId);
        }
    };
}
