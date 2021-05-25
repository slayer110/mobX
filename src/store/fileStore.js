import { makeAutoObservable } from 'mobx';
import PubSub from 'pubsub-js';

export class FileStore {
    isLoading = false;
    isSuccess = false;
    isError = false;
    file = {
        id: '',
        name: '',
        type: '',
    };

    constructor() {
        makeAutoObservable(this);
    }

    getFileByQuestionId(questionId) {
        this.isLoading = true;
        fetch(`https://jsonplaceholder.typicode.com/posts/${questionId}`)
            .then((res) => res.json())
            .then((record) => {
                console.warn('fileStore => ', record);
                this.isSuccess = true;
            })
            .catch((error) => {
                this.isError = true;
            }).finally(() => {
                this.isLoading = false;
        });
    }
}
