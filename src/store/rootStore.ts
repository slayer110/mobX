import { ChatStore } from '../modules/chat/store/chatStore';
import OrganizationsStore from './organizationsStore';
import QuestionStore from './questionStore';
import FileStore from './fileStore';

class RootStore {
    chatStore = new ChatStore();
    fileStore = new FileStore();
    questionStore = new QuestionStore(this.fileStore);
    organizationsStore = new OrganizationsStore();
}

export default RootStore;
