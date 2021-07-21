// external
import { makeAutoObservable } from 'mobx';

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
        this.list = list;

        for (let i = 0; i < 10000; i += 1) {
            this.list.push(list);
        }
    }

    public fetchError(): void {
        this.isLoading = false;
        this.isError = true;
        this.isSuccess = false;
    }
}
