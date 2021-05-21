import ChatStore from "./chatStore";
import OrganizationsStore from "./organizationsStore";
import QuestionStore from "./questionStore";

class RootStore {
    chatStore = new ChatStore();
    organizationsStore = new OrganizationsStore(this.chatStore);
    questionStore = new QuestionStore(this.chatStore);
}

export default RootStore;
