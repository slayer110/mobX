import {makeAutoObservable} from 'mobx';
import PubSub from 'pubsub-js';

export default class FileStore {

    files = {}

    constructor() {
        makeAutoObservable(this);
        PubSub.subscribe('activeQuestionId', (msg,activeId)=>this.getFileByQuestionId(activeId))
    }

    getFileByQuestionId(questionId) {
        this.isLoading = true;

        setTimeout(() => fetch(`https://jsonplaceholder.typicode.com/posts/${questionId}`)
            .then((res) => res.json())
            .then((record) => {
                console.warn('fileStore => ', record);
                this.files = {...this.file, name: record.title}
                this.isSuccess = true;
            })
            .catch((error) => {
                this.isError = true;
            }).finally(() => {
                this.isLoading = false;
            }), 10000);
    }
}
