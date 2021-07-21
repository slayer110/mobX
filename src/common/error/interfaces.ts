export interface IErrorBody {
    title: string;
    code: string;
    message: string;
    uuid: string;
    system: string;
}

export interface IError {
    isCancelled: boolean;
    request: any;
    body: IErrorBody;
}
