// // internal
// import { Appeal } from '../models/Appeal';
// import { EventBus } from '../../../common/eventBus/eventBus';
//
// external
import { makeAutoObservable } from 'mobx';
//
// // interfaces
// import { IAppeals, IActiveAppeals } from '../interfaces';

// constants
// import { event } from '../../../common/eventBus/event';

class PostInfoStore {
    public activeChapter = 0;

    public constructor() {
        makeAutoObservable(this);
    }

    public changeChapter(chapter: number): void {
        this.activeChapter = chapter;
    }
}

export const postInfoStore = new PostInfoStore();
