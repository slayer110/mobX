import { Appeal } from './models/Appeal';

export interface IAppeal {
    appealsType: string;
    comment: string;
    competencesType: string;
    urgent: boolean;
}

export interface IAppeals {
    [key: string]: Appeal[];
}

export interface IActiveAppeals {
    [key: string]: number;
}

