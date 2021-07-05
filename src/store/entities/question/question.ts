import {makeAutoObservable} from 'mobx';

export class Question {
    isLoading = false;
    isError = false;
    isSuccess = false;
    data = {id: '', name: '', comment: '', file: null};

    constructor() {
        makeAutoObservable(this);
    }

    saveQuestion(record: any) {
        this.data = {...this.data, id: record.id, name: record.title};
        this.isLoading = false;
        this.isSuccess = true;
    }

    fetchError() {
        this.isLoading = false;
        this.isError = true;
    }
}
