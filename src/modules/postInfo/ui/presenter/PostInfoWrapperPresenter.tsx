// external
import * as React from 'react';
import { Grid, makeStyles, Tabs, Tab, Button, TabPanel } from '@material-ui/core';
import { observer } from 'mobx-react-lite';

// internal
import { pos } ;
import AppealsPresenter from '../../../appeals/ui/presenter/AppealsPresenter';
import { Appeal } from '../../../appeals/models/Appeal';

const useStyles = makeStyles(() => ({
    appealsWrapper: {
        height: '100%',
    },
}));

const PostInfoWrapperPresenter = observer(() => {
    const { appealsStore } = useStore();
    const classes = useStyles();

    return (
        <>
            <Grid item container direction="column" justifyContent="space-between" className={classes.appealsWrapper}>
                <Tabs value={} onChange={}>
                    {appealsStore.activePostAppeals.map((appeal: Appeal, index: number) => (
                        <Tab key={appeal.id} label={`${index + 1}-вопрос`} />
                    ))}
                </Tabs>
                <TabPanel>{appealsStore.activePostAppeals.length > 0 && <AppealsPresenter />}</TabPanel>
            </Grid>
        </>
    );
});

export default React.memo(PostInfoWrapperPresenter);
