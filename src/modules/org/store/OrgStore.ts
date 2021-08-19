// external
import { makeAutoObservable } from 'mobx';

// internal
import { EventBus } from 'common/eventBus/eventBus';

// interfaces
import { IOrg } from 'modules/org/interfaces';

// constants
import { event } from 'common/eventBus/event';
import { org } from 'modules/org/constants';

export class OrgStore {
    public formsSubmit: any = {};

    public orgsByPost: Record<string, IOrg> = {};

    public activePost = '';

    public constructor() {
        makeAutoObservable(this, { formsSubmit: false });
        // TODO приходится сохранять одно и то же во многих модулях
        EventBus.subscribe(event.post.changeActiveId, (postId: string) => {
            this.saveActivePost(postId);
        });
        EventBus.subscribe(event.post.addNewChat, (postId: string) => {
            this.addOrg(postId);
        });
    }

    public saveActivePost(postId: string): void {
        this.activePost = postId;
    }

    public saveOrg(org: IOrg): void {
        const obj = this.orgsByPost[this.activePost];
        Object.assign(obj, this.activeOrg, org);
    }

    public addOrg(postId: string) {
        this.orgsByPost[postId] = { ...org };
    }

    public saveSubmit(orgId: string, submit: () => void) {
        this.formsSubmit[orgId] = submit;
    }

    public get activeOrg(): IOrg {
        return this.orgsByPost[this.activePost] || org;
    }
}
