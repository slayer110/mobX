import ChatStore from './chatStore';
import OrganizationsStore from './organizationsStore';
import QuestionStore from './questionStore';

class RootStore {
    chatStore = new ChatStore();
    questionStore = new QuestionStore();
    organizationsStore = new OrganizationsStore(this.questionStore);
}

export default RootStore;
