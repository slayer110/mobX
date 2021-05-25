import {makeAutoObservable} from "mobx";
import PubSub from "pubsub-js";

export class Question {
    isLoading = false;
    isError = false;
    isSuccess = false;
    data = {id: '', title: '', file: null}

    constructor() {
        makeAutoObservable(this);
        PubSub.subscribe('activeOrgIdForFile', (msg, activeOrg) => this.getFile(activeOrg))
    }

    fetchQuestion() {
        this.isLoading = true;
        this.data = {};
    }

    saveQuestion(record) {
        this.data = {...this.data, title: record.title};
        this.isLoading = false;
        this.isSuccess = true;
    }

    fetchError() {
        this.isLoading = false;
        this.isError = true;
    }

    getFile(activeOrgId) {
        let file = new File();
        file.getFile(activeOrgId);
        this.data = {...this.data, file}
    }

}

class File {
    isLoading = false;
    isError = false;
    isSuccess = false;
    fileTitle = '';

    constructor() {
        makeAutoObservable(this);
    }

    getFile(activeOrg) {
        this.isLoading = true;
        this.isError = false;

        fetch(`https://jsonplaceholder.typicode.com/todos/${activeOrg}`).then(
            res => res.json()
        ).then(record => {
                this.fileTitle = record.title;
                this.isLoading = false;
            }
        ).catch((error) => {
            this.isError = true;
            this.isLoading = false;
        });
    }

}