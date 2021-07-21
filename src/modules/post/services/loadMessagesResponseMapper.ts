// interfaces
import { ILoadMessagesResponse } from './interfaces';

export const mapLoadMessagesResponse = (data: ILoadMessagesResponse): string[] => data.title.split(' ');
