import { Appeal } from './models/Appeal';

export interface IAppeal {
    id: string;
    appealType: string;
    comment: string;
    competenceType: string;
    urgent: boolean;
}

export interface IAppeals {
    [key: string]: Appeal[];
}

export interface IActiveAppeals {
    [key: string]: number;
}
