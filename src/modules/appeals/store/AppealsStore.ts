// external
import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

// internal
import { EventBus } from 'common/eventBus/eventBus';

// interfaces
import { IAppeals, IAppeal, IActiveAppeals } from 'interfaces';

// constants
import { event } from 'common/eventBus/event';

const appeal = {
    id: uuidv4(),
    comment: '',
    appealType: '',
    competenceType: '',
    urgent: false,
};

export class AppealsStore {
    public appeals: IAppeals = {};

    public activeAppeals: IActiveAppeals = {};

    public activePost = '';

    public constructor() {
        makeAutoObservable(this);
        // TODO приходится сохранять одно и то же во многих модулях
        EventBus.subscribe(event.post.changeActiveId, (postId: string) => {
            this.saveActivePost(postId);
        });
        EventBus.subscribe(event.post.addNewChat, (postId: string) => {
            this.createAppeal(postId);
        });
    }

    public saveAppeal(data: IAppeal): void {
        const obj = this.activeAppealsByPost[this.activeAppealIndex];

        Object.assign(obj, this.activeAppeal, data);
    }

    public saveActivePost(postId: string): void {
        this.activePost = postId;
    }

    public changeActiveAppeal(index: number): void {
        this.activeAppeals[this.activePost] = index;
    }

    public createAppeal(postId: string): void {
        const initialActiveIndex = 0;

        this.appeals[postId] = [];
        this.appeals[postId][initialActiveIndex] = appeal;
        this.activeAppeals[postId] = initialActiveIndex;
    }

    public addAppeal(): void {
        this.activeAppealsByPost.push({ ...appeal, id: uuidv4() });
    }

    public get activeAppeal(): IAppeal {
        return this.activeAppealsByPost[this.activeAppealIndex] || appeal;
    }

    public get activeAppealIndex(): number {
        return this.activeAppeals[this.activePost] || 0;
    }

    public get activeAppealsByPost(): IAppeal[] {
        return this.appeals[this.activePost] || [];
    }
}
