import {makeAutoObservable} from "mobx";
import {Question} from "./entities/question/question";

class QuestionStore {
    questions = {};
    active = '';
    activeChatId = ''

    constructor(chatsStore) {
        makeAutoObservable(this);
        this.chatsStore = chatsStore;
    }

    loadQuestion(idOrg) {
        this.active = idOrg;

        if (this.questions[this.chatsStore.active]) {
            this.questions[this.chatsStore.active][this.active] = new Question()
        }

        if (this.questions[this.chatsStore.active]) {
            this.questions[this.chatsStore.active][this.active].isLoading = true;
        }
        fetch(`https://jsonplaceholder.typicode.com/todos/${idOrg}`).then(
            res => res.json()
        ).then(record => {
                if (this.questions[this.chatsStore.active]) {
                    this.questions[this.chatsStore.active][this.active].isLoading = false;
                    this.questions[this.chatsStore.active][this.activeChatId].text = record;
                }
            }
        ).catch(() => {
            if (this.questions[this.chatsStore.active]) {
                this.questions[this.activeChatId][this.active].isLoading = false;
                this.questions[this.activeChatId][this.active].isError = true;
            }
        })
    }

    get activeQuestion() {
        return this.questions[this.chatsStore.active] && this.questions[this.chatsStore.active][this.active]
    }

}

export default QuestionStore;
