import {makeAutoObservable} from "mobx";

export class Question {
    text = '';
    isLoading = false;
    error = false;

    constructor() {
        makeAutoObservable(this)
    }
}
