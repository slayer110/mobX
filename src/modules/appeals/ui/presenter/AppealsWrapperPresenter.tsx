// external
import React, { useCallback } from 'react';
import { Grid, makeStyles, Button } from '@material-ui/core';
import { observer } from 'mobx-react-lite';

// internal
import { useStore } from 'store/use-store';
import { AppealsPresenter } from './AppealsPresenter';

const useStyles = makeStyles(() => ({
    appealsWrapper: {
        height: '100%',
    },
}));

export const AppealsWrapperPresenter = observer(() => {
    const { saveFormStore, appealsStore } = useStore();
    const classes = useStyles();

    const handleSaveForm = useCallback(() => {
        saveFormStore.saveAll();
    }, [saveFormStore]);

    return (
        <>
            <Grid item container direction="column" justifyContent="space-between" className={classes.appealsWrapper}>
                <Grid item>{appealsStore.activeAppealsByPost.length > 0 && <AppealsPresenter />}</Grid>
                <Grid item>
                    <Button color="primary" onClick={handleSaveForm}>
                        Сохранить
                    </Button>
                </Grid>
            </Grid>
        </>
    );
});
