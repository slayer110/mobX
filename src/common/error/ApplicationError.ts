// internal
import { IError, IErrorBody } from './interfaces';
import { makeAutoObservable } from 'mobx';

export class ApplicationError implements IError {
    public body: IErrorBody = {
        code: '',
        system: '',
        message: '',
        title: '',
        uuid: '',
    };

    public isCancelled: boolean = false;

    public request: unknown = {};

    public constructor() {
        makeAutoObservable(this);
    }

    public setCode(code: string): void {
        this.body.code = code;
    }

    public setSystem(system: string): void {
        this.body.system = system;
    }

    public setUuid(uuid: string): void {
        this.body.uuid = uuid;
    }

    public setTitle(title: string): void {
        this.body.title = title;
    }

    public setCancelledRequest(isCancelled: boolean): void {
        this.isCancelled = isCancelled;
    }

    public setRequestParams(params: unknown): void {
        this.request = params;
    }

    public setMessage(message: string): void {
        this.body.message = message;
    }

    public getMessage(): string {
        return this.body.message;
    }

    public getCode(): string {
        return this.body.code;
    }

    public getRequest(): any {
        return this.request;
    }

    public getCancelled(): boolean {
        return this.isCancelled;
    }
}
