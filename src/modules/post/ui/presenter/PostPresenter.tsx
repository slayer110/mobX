// external
import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { makeStyles, Grid } from '@material-ui/core';
import { v4 } from 'uuid';

// internal
import { PostTabView } from 'modules/post/ui/view/PostTabView';
import { useStore } from 'store/use-store';
import { DialogBoxPresenter } from 'modules/post/ui/presenter/DialogBoxPresenter';
import { Post } from 'modules/post/models/Post';

const useStyles = makeStyles(() => ({
    dialogBoxWrapper: {
        border: '2px solid black',
    },
}));

export const PostPresenter = observer(() => {
    const { postStore } = useStore();
    const classes = useStyles();
    const activeId: string = postStore.active;

    const handleChangePost = useCallback((postId: string) => () => {
        postStore.changeActivePost(postId);
    }, []);

    return (
        <Grid container direction="row">
            <Grid item lg={3}>
                {postStore.posts.map((post: Post) => (
                    <Grid key={v4()} item lg={12}>
                        <PostTabView
                            isActive={post.getId === activeId}
                            post={post}
                            onChangePost={handleChangePost(post.getId)}
                        />
                    </Grid>
                ))}
            </Grid>
            <Grid item lg={9} className={classes.dialogBoxWrapper}>
                <DialogBoxPresenter />
            </Grid>
        </Grid>
    );
});
