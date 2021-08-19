import { v4 as uuidv4 } from 'uuid';

export const appeal = {
    id: uuidv4(),
    comment: '',
    text: '',
    appealType: '',
    competenceType: '',
    urgent: false,
};
