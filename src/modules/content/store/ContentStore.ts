// external
import { makeAutoObservable } from 'mobx';

// enums
import { ETabContent } from 'modules/content/enums';

export class ContentStore {
    public activeTab: ETabContent = ETabContent.CLIENT_INFO;

    public constructor() {
        makeAutoObservable(this);
    }

    public changeTab(tab: ETabContent) {
        this.activeTab = tab;
    }
}
