import {makeAutoObservable} from 'mobx';
import {Question} from './entities/question/question';
import PubSub from 'pubsub-js';

class QuestionStore {
    questions: any = {};
    activeOrgId = '';
    activeChatId = '';
    activeId = '';

    constructor(readonly fileStore: any) {
        makeAutoObservable(this);
        this.fileStore = fileStore;

        PubSub.subscribe('chatActiveId', (msg: any, id: any) =>
            this.saveActiveChatId(msg, id)
        );
        PubSub.subscribe('activeOrgId', (msg: any, id: any) => {
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

    saveActiveChatId(msg: any, id: any) {
        this.activeChatId = id;
    }

    saveActiveOrgId(msg: any, id: any) {
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
                PubSub.publish('activeQuestionId', this.activeId = record.id)
            })
            .catch(() => {
                this.questions[this.activeChatId][
                    this.activeOrgId
                    ].fetchError();
            });
    }

    updateComment(comment: string) {
        this.activeQuestion.comment = comment;
    }

    getFile = () => {
        console.log('задница')
        // Как связать Question с FileStore, чтобы сущность File входила в Question?
        // Или связь с помощью eventbus так же как и в OrganizationStore с ChatsStore?
    }
}

export default QuestionStore;
