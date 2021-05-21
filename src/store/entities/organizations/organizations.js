import {makeAutoObservable} from "mobx";

export class Organizations {
    list = [];
    isLoading = true;
    isError = false;
    constructor(){
        makeAutoObservable(this)
    }
}
