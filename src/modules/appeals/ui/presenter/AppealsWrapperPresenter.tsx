// external
import * as React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';

// internal
import { useStore } from '../../../../store/use-store';
import AppealsPresenter from './AppealsPresenter';

const useStyles = makeStyles(() => ({
    appealsWrapper: {
        height: '100%',
    },
}));

const AppealsWrapperPresenter = observer(() => {
    const { appealsStore } = useStore();
    const classes = useStyles();

    return (
        <>
            <Grid item container direction="column" justifyContent="space-between" className={classes.appealsWrapper}>
                {appealsStore.activePostAppeals.length > 0 && <AppealsPresenter />}
            </Grid>
        </>
    );
});

export default React.memo(AppealsWrapperPresenter);
