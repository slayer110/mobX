import {makeAutoObservable} from "mobx";
import {Question} from "./entities/question/question";

class QuestionStore {
    questions = {};
    active = '';

    constructor(chatsStore) {
        makeAutoObservable(this);
        this.chatsStore = chatsStore;
    }

    loadQuestion(idOrg) {
        this.active = idOrg;
        fetch(`https://jsonplaceholder.typicode.com/todos/${idOrg}`).then(
            res => res.json()
        ).then(record => this.updateQuestion(record, this.chatsStore.active, idOrg)
        ).catch()
    }

    updateQuestion = (record, chatId, idOrg) => {
        let question = new Question(record);
        this.questions[chatId] = {};
        this.questions[chatId][idOrg] = question
    };

    get activeQuestion() {
        return this.questions[this.chatsStore.active] && this.questions[this.chatsStore.active][this.active]
    }

}

export default QuestionStore;
