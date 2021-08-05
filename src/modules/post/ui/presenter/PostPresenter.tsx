// external
import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { makeStyles, Grid } from '@material-ui/core';

// internal
import PostTabView from '../view/PostTabView';
import { useStore } from '../../../../store/use-store';
import DialogBoxPresenter from './DialogBoxPresenter';

// interfaces
import { Post } from '../../models/Post';

const useStyles = makeStyles(() => ({
    dialogBoxWrapper: {
        border: '2px solid black',
    },
}));

export const PostPresenter = observer(() => {
    const { postStore } = useStore();
    const classes = useStyles();
    const { dialogBoxWrapper } = classes;

    return (
        <Grid container direction="row">
            <Grid item lg={3}>
                {postStore.posts.map((info: Post) => (
                    <Grid key={info.getId} item lg={12}>
                        <PostTabView
                            onChangePost={postStore.changeActivePost}
                            info={info}
                            activeId={postStore.active}
                        />
                    </Grid>
                ))}
            </Grid>
            <Grid item lg={9} className={dialogBoxWrapper}>
                <DialogBoxPresenter />
            </Grid>
        </Grid>
    );
});
