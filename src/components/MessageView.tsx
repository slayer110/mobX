// external
import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';

// internal
import { observer } from 'mobx-react-lite';

interface IProps {
    message: string;
}

const useStyles = makeStyles(() => ({
    messageStyle: {
        border: '1px grey solid',
        height: '50px',
        backgroundColor: '#FFFFFF',
        margin: '5px',
    },
}));

export const MessageView = observer((props: IProps) => {
    const { message } = props;
    const classes = useStyles();

    return (
        <Grid item lg className={classes.messageStyle}>
            {message}
        </Grid>
    );
});
