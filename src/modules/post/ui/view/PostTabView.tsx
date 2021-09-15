// external
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { observer } from 'mobx-react-lite';

// internal
import { Post } from '../../models/Post';

const useStyles = makeStyles(() => ({
    active: {
        backgroundColor: '#4f9a9898',
    },
}));

interface IProps {
    isActive: boolean;
    post: Post;
    onChangePost: () => void;
}

export const PostTabView = observer((props: IProps) => {
    const { post, onChangePost, isActive } = props;
    const classes = useStyles();

    return (
        <Button className={isActive ? classes.active : ''} onClick={onChangePost}>
            {post.getName}
        </Button>
    );
});
