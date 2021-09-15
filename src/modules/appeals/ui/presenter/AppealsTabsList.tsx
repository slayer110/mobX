// external
import React from 'react';
import { Grid } from '@material-ui/core';
import { observer } from 'mobx-react-lite';

// internal
import { AppealForm } from 'modules/appeals/ui/view/AppealForm';
import { AppealsTabs } from 'modules/appeals/ui/presenter/AppealsTabs';

interface IOwnProps {
    appeals: any;
    activeIndex: number;
    onSaveAppeal: any;
    onChangeAppeal: any;
}

export const AppealsTabsList = observer<IOwnProps>(({ appeals, activeIndex, onSaveAppeal, onChangeAppeal }) => {
    return (
        <>
            <Grid item lg>
                <AppealsTabs appeals={appeals} activeIndex={activeIndex} onChangeAppeal={onChangeAppeal} />
            </Grid>
            <Grid item lg={2}>
                {appeals[activeIndex] && (
                    <AppealForm
                        key={appeals[activeIndex].id}
                        isVisible={true}
                        activeAppeal={appeals[activeIndex]}
                        onSaveAppeal={onSaveAppeal}
                    />
                )}
                {/*{appeals.map((appeal: Appeal, index: number) => (
                    <AppealForm
                        key={appeal.id}
                        isVisible={activeIndex === index}
                        activeAppeal={appeal}
                        onSaveAppeal={onSaveAppeal}
                    />
                ))}*/}
            </Grid>
        </>
    );
});
