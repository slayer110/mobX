// external
import * as React from 'react';
import { Tabs, Tab, Button, Grid, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';

// internal
import { Appeal } from 'modules/appeals/models/Appeal';

// TODO правильно ли?
export const AppealsTab = observer<any>(({ appeals, activeIndex, changeActiveAppeal }) => {
    const handleChangeAppeal = (event: React.ChangeEvent<any>, value: number) => {
        changeActiveAppeal(value);
    };

    return (
        <Tabs value={activeIndex} onChange={handleChangeAppeal}>
            {appeals.map((appeal: Appeal, index: number) => (
                <Tab key={appeal.id} label={`${index + 1}-вопрос`} />
            ))}
        </Tabs>
    );
});
