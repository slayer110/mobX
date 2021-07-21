// external
import { makeAutoObservable } from 'mobx';

// internal
import { Post } from '../models/Post';
import { CommonUtils } from '../../../utils/common';
import { EventBus } from '../../../common/eventBus/eventBus';

// constants
import { event } from '../../../common/eventBus/event';

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

    public addNewPost = () => {
        const post = new Post();
        const postId = CommonUtils.generateRandomNumberInRange();

        post.saveName(`${postId} Чат`);
        post.saveId(postId);

        if (this.posts.length === 0) {
            this.active = post.getId;
            EventBus.publish(event.post.changeActiveId, this.active);
        }

        this.posts.push(post);
        EventBus.publish(event.post.addNewChat, this.posts[this.posts.length - 1]?.getId);
    };
}
