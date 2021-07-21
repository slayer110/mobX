// internal
import { Appeal } from '../models/Appeal';
import { EventBus } from '../../../common/eventBus/eventBus';

// external
import { makeAutoObservable } from 'mobx';

// constants
import { event } from '../../../common/eventBus/event';

export class OrganizationsStore {
    public organizations: any = {};

    public activePost = '';

    public constructor() {
        makeAutoObservable(this);
        // TODO То, что приходится сохранять одно и то же во многих модулях
        EventBus.subscribe(event.post.changeActiveId, (postId: string) => {
            this.saveActivePost(postId);
        });
        EventBus.subscribe(event.post.addNewChat, (postId: string) => {
            this.createOrganization(postId);
        });
    }

    // public saveAppeal(data: Appeal): void {
    //     this.activeAppeal.saveAppealFields(data);
    // }
    //
    // public saveActivePost(postId: string): void {
    //     this.activePost = postId;
    // }
    //
    // public changeActiveAppeal(index: number): void {
    //     this.activeAppeals[this.activePost] = index;
    // }
    //
    public createOrganization(postId: string): void {

        this.organizations[postId] = [];
        // @ts-ignore
        this.appeals[postId][initialActiveIndex] = new Appeal();
        this.activeAppeals[postId] = initialActiveIndex;
    }
    //
    // public addAppeal(): void {
    //     const appeal = new Appeal();
    //
    //     this.activePostAppeals.push(appeal);
    // }
    //
    // public get activeAppeal(): Appeal {
    //     return this.activePostAppeals[this.activeAppealIndex] || new Appeal();
    // }
    //
    // public get activeAppealIndex(): number {
    //     return this.activeAppeals[this.activePost] || 0;
    // }
    //
    // public get activePostAppeals(): Appeal[] {
    //     return this.appeals[this.activePost] || [];
    // }
}
