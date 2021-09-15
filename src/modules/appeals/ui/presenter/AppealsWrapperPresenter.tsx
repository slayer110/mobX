// external
import React, { useCallback } from 'react';
import { Grid, Button } from '@material-ui/core';
import { observer } from 'mobx-react-lite';

// internal
import { useStore } from 'store/use-store';
import { AppealsTabsList } from 'modules/appeals/ui/presenter/AppealsTabsList';

export const AppealsWrapperPresenter = observer(() => {
    const { saveFormStore, appealsStore } = useStore();

    const handleSaveForm = useCallback(() => {
        saveFormStore.saveAll();
    }, []);

    const handleSaveAppeal = (data: any) => {
        appealsStore.saveAppeal(data);
    };

    const handleChangeAppeal = (index: number) => {
        appealsStore.changeActiveAppeal(index);
    };

    return (
        <Grid container direction="column">
            <Grid item lg={12}>
                <Grid container direction="column">
                    <AppealsTabsList
                        activeIndex={appealsStore.activeAppealIndex}
                        appeals={appealsStore.activeAppealsByPost}
                        onSaveAppeal={handleSaveAppeal}
                        onChangeAppeal={handleChangeAppeal}
                    />
                </Grid>
            </Grid>
            <Grid item lg={2}>
                <Button color="primary" onClick={handleSaveForm}>
                    Сохранить
                </Button>
            </Grid>
        </Grid>
    );
});
