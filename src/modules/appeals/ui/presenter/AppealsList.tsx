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
}

export const AppealsList = observer<IOwnProps>(({ appeals, activeIndex, onSaveAppeal }) => {
    return (
        <>
            {appeals.map((appeal: Appeal, index: number) => (
                <AppealForm
                    key={appeal.id}
                    isVisible={activeIndex === index}
                    activeAppeal={appeal}
                    onSaveAppeal={onSaveAppeal}
                />
            ))}
        </>
    );
});
