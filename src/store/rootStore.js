import ChatStore from "./chatStore";
import OrganizationsStore from "./organizationsStore";
import QuestionStore from "./questionStore";

class RootStore {
    chatStore = new ChatStore();
    organizationsStore = new OrganizationsStore();
    questionStore = new QuestionStore();
}

export default RootStore;
