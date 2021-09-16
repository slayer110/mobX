// external
import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { observer } from 'mobx-react-lite';

// internal
import { Appeal } from 'modules/appeals/models/appeal';

interface IOwnProps {
    appeals: any;
    activeIndex: number;
    onChangeAppeal: any;
}

export const AppealsTabs = observer<IOwnProps>(({ appeals, activeIndex, onChangeAppeal }) => {
    const handleChangeAppeal = (event: React.ChangeEvent<any>, value: number) => {
        onChangeAppeal(value);
    };

    return (
        <Tabs value={activeIndex} variant="scrollable" scrollButtons="auto" onChange={handleChangeAppeal}>
            {appeals.map((appeal: Appeal, index: number) => (
                <Tab key={appeal.id} label={`${index + 1}-вопрос`} />
            ))}
        </Tabs>
    );
});
