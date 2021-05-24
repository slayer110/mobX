import {makeAutoObservable} from "mobx";
import {Question} from "./entities/question/question";
import PubSub from "pubsub-js";

class QuestionStore {
    questions = {};
    active = '';
    activeChatId = ''

    constructor(chatsStore) {
        makeAutoObservable(this);
        PubSub.subscribe('chatActiveId', (msg, chatActiveId) => this.activeChatId = chatActiveId)
    }

    loadQuestion(idOrg) {
        this.active = idOrg;

        this.questions[this.activeChatId] = {}
        this.questions[this.activeChatId][this.active] = new Question();
        this.questions[this.activeChatId][this.active].fetchQuestion();
        fetch(`https://jsonplaceholder.typicode.com/todos/${idOrg}`).then(
            res => res.json()
        ).then(record => {
                this.questions[this.activeChatId][this.active].saveQuestion(record);
            }
        )
            .catch(() => {
                this.questions[this.activeChatId][this.active].fetchError();
            });
    }

    get activeQuestion() {
        return this.questions[this.activeChatId] && this.questions[this.activeChatId][this.active]
    }

}

export default QuestionStore;
