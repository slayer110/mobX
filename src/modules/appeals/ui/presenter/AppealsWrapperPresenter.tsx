// external
import React, { useCallback } from 'react';
import { Grid, Button } from '@material-ui/core';
import { observer } from 'mobx-react-lite';

// internal
import { useStore } from 'store/use-store';
import { AppealsPresenter } from './AppealsPresenter';

export const AppealsWrapperPresenter = observer(() => {
    const { saveFormStore, appealsStore } = useStore();

    const handleSaveForm = useCallback(() => {
        saveFormStore.saveAll();
    }, [saveFormStore]);

    return (
        <Grid container direction="column">
            {appealsStore.activeAppealsByPost.length > 0 && (
                <Grid item lg={12}>
                    <AppealsPresenter />
                </Grid>
            )}
            <Grid item lg={12}>
                <Button color="primary" onClick={handleSaveForm}>
                    Сохранить
                </Button>
            </Grid>
        </Grid>
    );
});
