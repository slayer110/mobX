import {makeAutoObservable} from 'mobx';

export class File {
    isLoading = false;
    isError = false;
    isSuccess = false;
    file = {
        id: '',
        name: '',
        type: '',
    };

    constructor() {
        makeAutoObservable(this);
    }

    saveQuestion(record: any) {
        this.file = {...this.file, id: record.id, name: record.title};
        this.isLoading = false;
        this.isSuccess = true;
    }

    fetchError() {
        this.isLoading = false;
        this.isError = true;
    }
}

