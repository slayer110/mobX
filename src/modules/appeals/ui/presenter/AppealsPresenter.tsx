// external
import * as React from 'react';
import { Tabs, Tab, Button, Grid, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';

// internal
import AppealsFormPresenter from './AppealsFormPresenter';
import { useStore } from '../../../../store/use-store';
import { Appeal } from '../../models/Appeal';

const useStyles = makeStyles(() => ({
    addAppealButton: {
        textAlign: 'right',
    },
}));

const AppealsPresenter = observer(() => {
    const { appealsStore } = useStore();
    const classes = useStyles();

    const handleAddAppeal = () => {
        appealsStore.addAppeal();
        appealsStore.changeActiveAppeal(appealsStore.activePostAppeals.length - 1);
    };

    return (
        <>
            <Grid item container direction="column">
                <Grid item>
                    <Tabs
                        value={appealsStore.activeAppealIndex}
                        onChange={(_e: React.ChangeEvent<unknown>, value: string) =>
                            appealsStore.changeActiveAppeal(value)
                        }
                    >
                        {appealsStore.activePostAppeals.map((appeal: Appeal, index: number) => (
                            <Tab key={appeal.id} label={`${index + 1}-вопрос`} />
                        ))}
                    </Tabs>
                </Grid>
                <Grid item>
                    <AppealsFormPresenter />
                </Grid>
            </Grid>
            <Grid item className={classes.addAppealButton}>
                <Button onClick={handleAddAppeal}>Добавить вопрос</Button>
            </Grid>
        </>
    );
});

export default React.memo(AppealsPresenter);
