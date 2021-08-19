import { v4 as uuidv4 } from 'uuid';
import { IOrg } from 'modules/org/interfaces';

export const org: IOrg = {
    id: uuidv4(),
    fullName: '',
};
