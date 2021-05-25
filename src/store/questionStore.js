import {makeAutoObservable} from "mobx";
import {Question} from "./entities/question/question";
import PubSub from "pubsub-js";

class QuestionStore {
    questions = {};
    activeOrg = '';
    activeChatId = ''

    constructor() {
        makeAutoObservable(this);

        PubSub.subscribe('chatActiveId', (msg, chatActiveId) => this.changeActiveChatId(msg, chatActiveId));
        PubSub.subscribe('activeOrgId', (msg, activeOrgId) => {
            this.changeActiveOrgId(msg, activeOrgId);
            !(this.questions[this.activeChatId] && this.questions[this.activeChatId][this.activeOrg]) && this.loadQuestion()
        })
    }

    changeActiveChatId(msg, chatActiveId) {
        this.activeChat = chatActiveId
    }

    changeActiveOrgId(msg, chatActiveId) {
        this.activeOrg = chatActiveId;
    }

    loadQuestion() {
        if (!this.questions[this.activeChatId]) {
            this.questions[this.activeChatId] = {}
        }
        this.questions[this.activeChatId][this.activeOrg] = new Question();
        this.questions[this.activeChatId][this.activeOrg].fetchQuestion();
        fetch(`https://jsonplaceholder.typicode.com/todos/${this.activeOrg}`).then(
            res => res.json()
        ).then(record => {
                this.questions[this.activeChatId][this.activeOrg].saveQuestion(record);
            }
        )
            .catch(() => {
                this.questions[this.activeChatId][this.activeOrg].fetchError();
            });
    }

    get activeQuestion() {
        return this.questions[this.activeChatId] && this.questions[this.activeChatId][this.activeOrg]
    }

}

export default QuestionStore;
