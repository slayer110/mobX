// internal
import { EventBus } from '../../../common/eventBus/eventBus';
import { validateForm } from '../../../utils/validation/validate';
import { validationSchemes } from '../../../utils/validation/schemes';

// external
import { makeAutoObservable } from 'mobx';

// interfaces
import { IAppeals, IAppeal, IActiveAppeals } from '../interfaces';

// constants
import { event } from '../../../common/eventBus/event';
import { v4 as uuidv4 } from 'uuid';

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
        // TODO То, что приходится сохранять одно и то же во многих модулях
        EventBus.subscribe(event.post.changeActiveId, (postId: string) => {
            this.saveActivePost(postId);
        });
        EventBus.subscribe(event.post.addNewChat, (postId: string) => {
            this.createAppeal(postId);
        });
    }

    public saveAppeal(data: IAppeal): void {
        this.activePostAppeals[this.activeAppealIndex] = { ...this.activeAppeal, ...data };
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
        // @ts-ignore
        this.appeals[postId][initialActiveIndex] = appeal;
        this.activeAppeals[postId] = initialActiveIndex;
    }

    public async validateData(): Promise<void> {
        let validationErrorIndex = 0;

        try {
            await Promise.all(this.activePostAppeals.map((item: IAppeal) => validateForm(validationSchemes.appeal, item)));
        } catch (e) {
            validationErrorIndex = this.activePostAppeals.findIndex((item) => item.id === e.value.id);
            this.changeActiveAppeal(validationErrorIndex);
        }
    }

    public addAppeal(): void {
        this.activePostAppeals.push({ ...appeal, id: uuidv4() });
    }

    public get activeAppeal(): IAppeal {
        return this.activePostAppeals[this.activeAppealIndex] || appeal;
    }

    public get activeAppealIndex(): number {
        return this.activeAppeals[this.activePost] || 0;
    }

    public get activePostAppeals(): IAppeal[] {
        return this.appeals[this.activePost] || [];
    }
}
