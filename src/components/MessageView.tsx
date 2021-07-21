// external
import React from 'react';
import { makeStyles } from '@material-ui/core';

// internal
import { observer } from 'mobx-react';

const useStyles = makeStyles(() => ({
    messageStyle: {
        border: '1px grey solid',
        height: '50px',
        borderRadius: '10px',
        backgroundColor: '#FFFFFF',
    },
}));

interface IProps {
    message: string;
    style: any;
}

export const MessageView = observer((props: IProps) => {
    const { message, style } = props;
    const classes = useStyles();
    const { messageStyle } = classes;

    return (
        <div className={messageStyle} style={style}>
            {message}
        </div>
    );
});
