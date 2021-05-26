import {makeAutoObservable} from 'mobx';
import {Question} from './entities/question/question';
import PubSub from 'pubsub-js';

class QuestionStore {
    questions = {};
    activeOrgId = '';
    activeChatId = '';

    fileStore = null;

    constructor(fileStore) {
        makeAutoObservable(this);
        this.fileStore = fileStore;

        PubSub.subscribe('chatActiveId', (msg, id) =>
            this.saveActiveChatId(msg, id)
        );
        PubSub.subscribe('activeOrgId', (msg, id) => {
            this.saveActiveOrgId(msg, id);
            !(
                this.questions[this.activeChatId] &&
                this.questions[this.activeChatId][this.activeOrgId]
            ) && this.loadQuestion();
        });
    }

    get activeQuestion() {
        return (
            this.questions[this.activeChatId] &&
            this.questions[this.activeChatId][this.activeOrgId]
        );
    }

    saveActiveChatId(msg, id) {
        this.activeChatId = id;
    }

    saveActiveOrgId(msg, id) {
        this.activeOrgId = id;
    }

    loadQuestion() {
        if (!this.questions[this.activeChatId]) {
            this.questions[this.activeChatId] = {};
        }

        this.questions[this.activeChatId][this.activeOrgId] = new Question();

        fetch(`https://jsonplaceholder.typicode.com/todos/${this.activeOrgId}`)
            .then((res) => res.json())
            .then((record) => {
                this.questions[this.activeChatId][
                    this.activeOrgId
                    ].saveQuestion(record);
            })
            .catch(() => {
                this.questions[this.activeChatId][
                    this.activeOrgId
                    ].fetchError();
            });
    }

    updateComment(comment) {
        this.activeQuestion.comment = comment;
    }

    getFile = () => {
        // Как связать Question с FileStore, чтобы сущность File входила в Question?
        // Или связь с помощью eventbus так же как и в OrganizationStore с ChatsStore?
    }
}

export default QuestionStore;
