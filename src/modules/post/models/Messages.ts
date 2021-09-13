// external
import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

export class Messages {
    public list: string[] = [];

    private isLoading = false;

    private isError = false;

    private isSuccess = false;

    public constructor() {
        makeAutoObservable(this);
    }

    public fetchList(): void {
        this.isLoading = true;
        this.list = [];
    }

    public saveList(list: any): void {
        this.isLoading = false;
        this.isSuccess = true;

        for (let i = 0; i < 300; i += 1) {
            this.list.push(uuidv4());
        }
    }

    public fetchError(): void {
        this.isLoading = false;
        this.isError = true;
        this.isSuccess = false;
    }

    public addMessages() {
        this.list.push(uuidv4());
    }

    public addMessagesToStart() {
        this.list.unshift(uuidv4());
    }
}
