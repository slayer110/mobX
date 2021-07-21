// external
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

// internal
import '../../../../App.css';
import { Post } from '../../models/Post';

const useStyles = makeStyles(() => ({
    tab: {
        height: '100px',
        width: '100%',
        borderBottom: '1px solid #b5b5b5',
        borderTop: '1px solid #b5b5b5',
        fontSize: '16px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#eff2f6',
        },
    },
    active: {
        backgroundColor: '#ffffff',
    },
}));

interface IProps {
    info: Post;
    onChangePost: (id: string) => void;
    activeId: string;
}

const PostTabView = (props: IProps) => {
    const { info, onChangePost, activeId } = props;
    const classes = useStyles();
    const { tab, active } = classes;

    return (
        <Button onClick={() => onChangePost(info.getId)} className={`${tab} ${info.getId === activeId && active}`}>
            {info.getName}
        </Button>
    );
};

export default React.memo(PostTabView);
