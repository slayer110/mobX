// external
import React, { useCallback } from 'react';
import { Grid, makeStyles, Tabs, Tab } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store/use-store';

// internal
import { AppealsWrapperPresenter } from 'modules/appeals/ui/presenter/AppealsWrapperPresenter';
import { OrgPresenter } from 'modules/org/ui/presenter/OrgPresenter';
import { ETabContent } from 'modules/content/enums';

const useStyles = makeStyles(() => ({
    hidden: {
        display: 'none',
    },
}));

export const ContentPresenter = observer(() => {
    const classes = useStyles();
    const { contentStore } = useStore();

    const handleChangeTab = useCallback((event: React.ChangeEvent<any>, value: number) => {
        contentStore.changeTab(value);
    }, []);

    return (
        <Grid container direction="column">
            <Grid item lg>
                <Tabs value={contentStore.activeTab} onChange={handleChangeTab}>
                    <Tab label="О клиенте" value={ETabContent.CLIENT_INFO} />
                    <Tab label="Обращения" value={ETabContent.APPEALS} />
                </Tabs>
            </Grid>
            <Grid item lg>
                {contentStore.activeTab === ETabContent.CLIENT_INFO && <OrgPresenter />}
                {contentStore.activeTab === ETabContent.APPEALS && <AppealsWrapperPresenter />}
            </Grid>
        </Grid>
    );
});
