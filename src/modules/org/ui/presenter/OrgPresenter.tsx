// external
import React from 'react';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';

// internal
import { useStore } from 'store/use-store';
import { OrgForm } from 'modules/org/ui/view/OrgForm';

const useStyles = makeStyles(() => ({}));

export const OrgPresenter = observer(() => {
    const classes = useStyles();

    return <OrgForm />;
});
