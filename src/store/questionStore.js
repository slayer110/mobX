import {makeAutoObservable} from "mobx";
import {Question} from "./entities/question/question";
import PubSub from "pubsub-js";

class QuestionStore {
    questions = {};
    activeOrgId = '';
    activeChatId = ''

    constructor() {
        makeAutoObservable(this);

        PubSub.subscribe('chatActiveId', (msg, id) => this.saveActiveChatId(msg, id));
        PubSub.subscribe('activeOrgId', (msg, id) => {
            this.saveActiveOrgId(msg, id);
            !(this.questions[this.activeChatId] && this.questions[this.activeChatId][this.activeOrgId]) && this.loadQuestion()
        })
    }

    saveActiveChatId(msg, id) {
        this.activeChatId = id
    }

    saveActiveOrgId(msg, id) {
        this.activeOrgId = id;
    }

    loadQuestion() {
        if (!this.questions[this.activeChatId]) {
            this.questions[this.activeChatId] = {}
        }
        this.questions[this.activeChatId][this.activeOrgId] = new Question();
        this.questions[this.activeChatId][this.activeOrgId].fetchQuestion();
        fetch(`https://jsonplaceholder.typicode.com/todos/${this.activeOrgId}`).then(
            res => res.json()
        ).then(record => {
                this.questions[this.activeChatId][this.activeOrgId].saveQuestion(record);
            }
        )
            .catch(() => {
                this.questions[this.activeChatId][this.activeOrgId].fetchError();
            });
    }

    get activeQuestion() {
        return this.questions[this.activeChatId] && this.questions[this.activeChatId][this.activeOrgId]
    }

}

export default QuestionStore;
