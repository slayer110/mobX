// external
import { makeAutoObservable } from 'mobx';

// enums
import { ETabContent } from 'modules/content/enums';

export class ContentStore {
    public activeTab: ETabContent = ETabContent.APPEALS;

    public constructor() {
        makeAutoObservable(this);
    }

    public changeTab(tab: ETabContent) {
        this.activeTab = tab;
    }
}
