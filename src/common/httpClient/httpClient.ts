// external
import Axios, { AxiosPromise, AxiosResponse, Canceler, AxiosStatic } from 'axios';

// internal
import { ApplicationError } from '../error/ApplicationError';

const { CancelToken } = Axios;

export class HTTPClient {
    private tokens: Record<string, any> = {};

    private axiosInstance: AxiosStatic = Axios;

    public post(url: string, token: string = '', requestData: any = {}): any {
        const config: Record<string, any> = {
            cancelToken: new CancelToken((cancel: Canceler) => {
                this.tokens[token] = cancel;
            }),
        };

        return this.axiosInstance
            .post(url, requestData, config)
            .then((response: AxiosResponse): AxiosPromise<any> => {
                const { success } = response.data;

                if (!success) {
                    return Promise.reject(response.data);
                }

                return response.data.body;
            })
            .catch((error: any) => {
                const isCancelled: boolean = this.isCancel(error);
                const bhError: any = error?.error;
                let errorText: string = '';

                if (bhError?.text) {
                    errorText = bhError.text;
                } else if (error?.message) {
                    errorText = error.message;
                } else if (typeof error === 'string') {
                    errorText = error;
                }

                const applicationError: ApplicationError = new ApplicationError();

                applicationError.setMessage(errorText);
                applicationError.setCancelledRequest(isCancelled);
                applicationError.setRequestParams(requestData);
                applicationError.setCode(bhError?.code || 'HTTP_ERROR');
                applicationError.setSystem(bhError?.system || '');
                applicationError.setUuid(bhError?.uuid || '');
                applicationError.setTitle(bhError?.title || '');

                return Promise.reject(applicationError);
            });
    }

    public get(url: string, token: string = '', requestData: any = {}): any {
        const config: Record<string, any> = {
            cancelToken: new CancelToken((cancel: Function) => {
                this.tokens[token] = cancel;
            }),
        };

        return this.axiosInstance
            .get(url, config)
            .then((response: AxiosResponse): AxiosPromise<any> => response.data)
            .catch((error: any) => {
                const isCancelled: boolean = this.isCancel(error);
                const bhError: any = error?.error;
                let errorText: string = '';

                if (bhError?.text) {
                    errorText = bhError.text;
                } else if (error?.message) {
                    errorText = error.message;
                } else if (typeof error === 'string') {
                    errorText = error;
                }

                const applicationError: ApplicationError = new ApplicationError();

                applicationError.setMessage(errorText);
                applicationError.setCancelledRequest(isCancelled);
                applicationError.setRequestParams(requestData);
                applicationError.setCode(bhError?.code || 'HTTP_ERROR');
                applicationError.setSystem(bhError?.system || '');
                applicationError.setUuid(bhError?.uuid || '');
                applicationError.setTitle(bhError?.title || '');

                return Promise.reject(applicationError);
            });
    }

    public cancel(id: string, message: string = ''): void {
        const token: Function = this.tokens[id];

        if (token) {
            token(message);
        }
    }

    public isCancel(response: any): boolean {
        return this.axiosInstance.isCancel(response);
    }
}

export const httpClient: HTTPClient = new HTTPClient();
