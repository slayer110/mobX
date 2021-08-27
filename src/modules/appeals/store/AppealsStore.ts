// external
import { makeAutoObservable } from 'mobx';
import { v4 } from 'uuid';

// internal
import { EventBus } from 'common/eventBus/eventBus';
import { appeal } from 'modules/appeals/models/appeal';

// interfaces
import { IAppeals, IAppeal, IActiveAppeals } from 'modules/appeals/interfaces';

// constants
import { event } from 'common/eventBus/event';
import { validateSave } from 'modules/appeals/validators/validators';
import { schemes } from 'modules/appeals/validators/schemes';

export class AppealsStore {
    public appeals: IAppeals = {};

    public activeAppeals: IActiveAppeals = {};

    public activePost = '';

    public formsSubmit: any = {};

    public constructor() {
        makeAutoObservable(this, { formsSubmit: false });
        // TODO приходится сохранять одно и то же во многих модулях
        EventBus.subscribe(event.post.changeActiveId, (postId: string) => {
            this.saveActivePost(postId);
        });
        EventBus.subscribe(event.post.addNewChat, (postId: string) => {
            this.createAppeal(postId);
            this.addAppealForManyPosts(postId);
            this.changeActiveAppeal(0);
        });
    }

    public saveAppeal(data: IAppeal): void {
        const obj = this.activeAppealsByPost[this.activeAppealIndex];
        Object.assign(obj, this.activeAppeal, data);
    }

    public saveSubmit(appealId: string, submit: any) {
        this.formsSubmit[appealId] = submit;
    }

    public formSubmit = (data: IAppeal) => {
        console.warn('formSubmit => ', data);
        this.saveAppeal(data);
    };

    public submitAppeal(id: string = '') {
        try {
            if (!id) {
                return this.formsSubmit[this.activeAppeal.id]();
            }

            this.formsSubmit[id]();
        } catch (e) {
            console.warn('submit appeal', e);
        }
    }

    public saveActivePost(postId: string): void {
        this.activePost = postId;
    }

    // TODO подумать как правильнее обновлять
    public changeActiveAppeal(index: number): void {
        this.activeAppeals[this.activePost] = index;
    }

    public createAppeal(postId: string): void {
        const initialActiveIndex = 0;

        this.appeals[postId] = [];
        this.appeals[postId][initialActiveIndex] = { ...appeal };
        this.activeAppeals[postId] = initialActiveIndex;
    }

    public async validateAppeals(): Promise<void> {
        try {
            console.warn('validateAppeals start');
            await Promise.all(this.activeAppealsByPost.map((appeal: IAppeal) => validateSave(schemes.appeal, appeal)));
            console.warn('validateAppeals success');
        } catch (e) {
            console.warn('validateAppeals error', e);
            const appealIndex = this.activeAppealsByPost.findIndex((appeal) => appeal.id === e.value.id);

            if (appealIndex !== -1) {
                console.warn('validateAppeals change', appealIndex);
                this.changeActiveAppeal(appealIndex);
                this.submitAppeal(e.value.id);
                console.warn('validateAppeals submit');
            }

            throw e;
        }
    }

    public async addAppeal(): any {
        try {
            // this.formsSubmit[this.activeAppeal.id]().then((res) => {
            //     console.warn(1, res);
            //     this.activeAppealsByPost.push({ ...appeal, id: uuidv4() });
            //     this.changeActiveAppeal(this.activeAppealsByPost.length - 1);
            // });

            console.warn('addAppeal start');
            // TODO сабмитить надо все формы, надо все формы провалидировать и если все валидны, то добавлять вопрос
            await this.validateAppeals();
            console.warn('addAppeal success');
            /*for (let appealId in this.formsSubmit) {
                if (this.formsSubmit.hasOwnProperty(appealId)) {
                    this.formsSubmit[appealId]();
                }
            }*/
            this.activeAppealsByPost.push({ ...appeal, id: v4() });
            this.changeActiveAppeal(this.activeAppealsByPost.length - 1);
        } catch (e) {
            console.warn('error addAppeal ', e);
        }
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

    // TODO для проверки оптимизации
    public addAppealForManyPosts(postId: string): void {
        for (let i = 0; i < 5; i += 1) {
            this.appeals[postId].push({
                ...appeal,
                id: v4(),
            });
        }
    }
}
