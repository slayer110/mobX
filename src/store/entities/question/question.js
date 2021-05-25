import { makeAutoObservable } from 'mobx';

export class Question {
    isLoading = false;
    isError = false;
    isSuccess = false;
    data = { id: '', name: '', comment: '', file: null };

    constructor() {
        makeAutoObservable(this);
    }

    fetchQuestion() {
        this.isLoading = true;
        this.data = {};
    }

    saveQuestion(record) {
        this.data = { ...this.data, name: record.title };
        this.isLoading = false;
        this.isSuccess = true;
    }

    fetchError() {
        this.isLoading = false;
        this.isError = true;
    }
}
