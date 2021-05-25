import { makeAutoObservable } from 'mobx';

export class Organizations {
    isLoading = false;
    isError = false;
    isSuccess = false;
    list = [];

    constructor() {
        makeAutoObservable(this);
    }

    fetchList() {
        this.isLoading = true;
        this.list = [];
    }

    saveList(list) {
        this.isLoading = false;
        this.isSuccess = true;
        this.list = list;
    }

    fetchError() {
        this.isLoading = false;
        this.isError = true;
    }
}
