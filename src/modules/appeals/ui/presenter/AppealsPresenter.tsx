// external
import React from 'react';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';

// internal
import { useStore } from 'store/use-store';
import { AppealsTabsList } from 'modules/appeals/ui/presenter/AppealsTabsList';

const useStyles = makeStyles(() => ({}));

export const AppealsPresenter = observer(() => {
    const { appealsStore } = useStore();
    const classes = useStyles();

    const handleSaveAppeal = (data: any) => {
        appealsStore.saveAppeal(data);
    };

    const handleChangeAppeal = (index: number) => {
        appealsStore.changeActiveAppeal(index);
    };

    return (
        <Grid item container direction="column">
            <AppealsTabsList
                onSaveAppeal={handleSaveAppeal}
                changeActiveAppeal={handleChangeAppeal}
                appeals={appealsStore.activeAppealsByPost}
                activeIndex={appealsStore.activeAppealIndex}
            />
        </Grid>
    );
});
