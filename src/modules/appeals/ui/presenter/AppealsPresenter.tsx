// external
import * as React from 'react';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';

// internal
import { useStore } from 'store/use-store';
import { AppealsTabsList } from 'modules/appeals/ui/presenter/AppealsTabsList';
import { submit } from 'modules/appeals/ui/view/AppealForm';

const useStyles = makeStyles(() => ({
    addAppealButton: {
        textAlign: 'right',
    },
}));

export const AppealsPresenter = observer(() => {
    const { appealsStore } = useStore();
    const classes = useStyles();

    const handleAddAppeal = (event) => {
        try {
            // TODO через store
            /*submit(event).then(() => {
                console.warn('handleAddAppeal = suc)');
                appealsStore.addAppeal();
                appealsStore.changeActiveAppeal(appealsStore.activeAppealsByPost.length - 1);
            }).catch((e) => {
                console.warn('handleAddAppeal = wwwwwwwwwwe', e);
            });*/

            appealsStore.addAppeal();
            // appealsStore.changeActiveAppeal(appealsStore.activeAppealsByPost.length - 1);
        } catch (e) {
            console.warn('handleAddAppeal = e', e);
        }
    };

    const handleSaveAppeal = (data: any) => {
        appealsStore.saveAppeal(data);
    };

    const handleChangeAppeal = (index: number) => {
        appealsStore.changeActiveAppeal(index);
    };

    return (
        <>
            <Grid item container direction="column">
                <AppealsTabsList
                    onSaveAppeal={handleSaveAppeal}
                    changeActiveAppeal={handleChangeAppeal}
                    appeals={appealsStore.activeAppealsByPost}
                    activeIndex={appealsStore.activeAppealIndex}
                />
            </Grid>
            <Grid item className={classes.addAppealButton}>
                <Button onClick={handleAddAppeal}>Добавить вопрос</Button>
            </Grid>
        </>
    );
});
