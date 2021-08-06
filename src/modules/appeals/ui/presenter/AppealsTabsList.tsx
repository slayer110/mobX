// external
import * as React from 'react';
import { Tabs, Tab, Button, Grid, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';

// internal
import { Appeal } from 'modules/appeals/models/Appeal';
import { AppealForm } from 'modules/appeals/ui/view/AppealForm';

interface IOwnProps {
    appeals: any;
    activeIndex: number;
    onSaveAppeal: any;
    changeActiveAppeal: any;
}

export const AppealsTabsList = observer<IOwnProps>(({ appeals, activeIndex, onSaveAppeal, changeActiveAppeal }) => {
    const handleChangeAppeal = (event: React.ChangeEvent<any>, value: number) => {
        changeActiveAppeal(value);
    };

    return (
        <>
            <Grid item>
                <Tabs value={activeIndex} onChange={handleChangeAppeal}>
                    {appeals.map((appeal: Appeal, index: number) => (
                        <Tab key={appeal.id} label={`${index + 1}-вопрос`} />
                    ))}
                </Tabs>
            </Grid>
            <Grid item lg={2}>
                {appeals.map((appeal: Appeal, index: number) => (
                    <AppealForm
                        key={appeal.id}
                        isVisible={activeIndex === index}
                        activeAppeal={appeal}
                        onSaveAppeal={onSaveAppeal}
                    />
                ))}
            </Grid>
        </>
    );
});
