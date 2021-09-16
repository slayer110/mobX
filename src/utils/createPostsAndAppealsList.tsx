import {rootStore} from '../store/rootStore';
import {ETabContent} from "modules/content/enums";

export const createPostsAndAppealsList = () => {
    for (let i = 1; i <= 15; i += 1) {
        rootStore.postStore.addNewPost(String(i));
    }

    rootStore.contentStore.changeTab(ETabContent.APPEALS);
};
