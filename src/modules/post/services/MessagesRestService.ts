// internal
import { httpClient, HTTPClient } from '../../../common/httpClient/httpClient';
import { mapLoadMessagesResponse } from './loadMessagesResponseMapper';

export class MessagesRestService {
    private httpClient: HTTPClient = httpClient;

    public async loadPostMessages(postId: string): Promise<string[]> {
        return mapLoadMessagesResponse(
            await this.httpClient.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        );
    }
}

export const messagesRestService: MessagesRestService = new MessagesRestService();
