// external
import { makeAutoObservable } from 'mobx';

// internal
import { EventBus } from 'common/eventBus/eventBus';
import { AppealsStore } from 'modules/appeals/store/AppealsStore';
import { validateSave } from 'modules/appeals/validators/validators';
import { schemes } from 'modules/appeals/validators/schemes';

// interfaces
import { IAppeals, IAppeal, IActiveAppeals } from 'modules/appeals/interfaces';

// constants
import { event } from '../../../common/eventBus/event';

enum ESaveFormStatus {
    IDLE = 'IDLE',
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export class SaveFormStore {
    public status = ESaveFormStatus.IDLE;

    public constructor(private readonly appealsStore: AppealsStore) {
        makeAutoObservable(this);
    }

    public async saveAll(): Promise<void> {
        try {
            this.status = ESaveFormStatus.PENDING;
            await this.validate();
            this.status = ESaveFormStatus.SUCCESS;
        } catch (e) {
            console.warn('saveAll = ', e);
            this.status = ESaveFormStatus.ERROR;
        }
    }

    private async validateAppeals(): Promise<void> {
        try {
            await Promise.all(
                this.appealsStore.activeAppealsByPost.map((appeal: IAppeal) => validateSave(schemes.appeal, appeal))
            );
        } catch (e) {
            const appealIndex = this.appealsStore.activeAppealsByPost.findIndex((appeal) => appeal.id === e.value.id);

            if (appealIndex !== -1) {
                this.appealsStore.changeActiveAppeal(appealIndex);
            }

            throw e;
        }
    }

    private async validateOtherForm(): Promise<void> {
        return Promise.resolve();
    }

    private async validate() {
        try {
            await this.validateAppeals();
            await this.validateOtherForm();
        } catch (e) {
            console.warn('validate = ', e);
            console.error(e);
        }
    }
}
