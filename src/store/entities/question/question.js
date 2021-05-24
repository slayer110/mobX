import {makeAutoObservable} from "mobx";

export class Question {
    isLoading = false;
    isError = false;
    isSuccess = false;
    text=''

    constructor() {
        makeAutoObservable(this)
    }

    fetchQuestion() {
        this.isLoading = true;
        this.list = [];
    }

    saveQuestion(record){
        this.text=record.title;
        this.isLoading = false;
        this.isSuccess = true;
    }

    fetchError() {
        this.isLoading = false;
        this.isError = true;
    }
}
