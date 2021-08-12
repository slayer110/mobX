// external
import { v4 as uuidv4 } from 'uuid';
// interfaces

export class Appeal {
    public id = uuidv4();

    public comment = '';

    public appealType = '';

    public competenceType = '';

    public urgent = false;
    //
    // public saveAppealFields(data: IAppeal): void {
    //     const { comment, appealsType, competencesType, urgent } = data;
    //
    //     this.comment = comment;
    //     this.appealsType = appealsType;
    //     this.competencesType = competencesType;
    //     this.urgent = urgent;
    // }
}
