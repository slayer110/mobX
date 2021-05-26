import {makeAutoObservable} from 'mobx';

export default class FileStore {
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

        setTimeout(() => fetch(`https://jsonplaceholder.typicode.com/posts/${questionId}`)
            .then((res) => res.json())
            .then((record) => {
                console.warn('fileStore => ', record);
                this.file = {...this.file, name: record.title}
                this.isSuccess = true;
            })
            .catch((error) => {
                this.isError = true;
            }).finally(() => {
                this.isLoading = false;
            }), 10000);
    }
}
