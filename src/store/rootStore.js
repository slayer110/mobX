import ChatStore from "./chatStore";
import OrganizationsStore from "./organizationsStore";
import QuestionStore from "./questionStore";

class RootStore {
    organizationsStore = new OrganizationsStore();
    chatStore = new ChatStore();
    questionStore = new QuestionStore(this.chatStore);
}

export default RootStore;
