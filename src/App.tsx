// external
import React from 'react';
import { Grid } from '@material-ui/core';
import { observer } from 'mobx-react-lite';

// internal
import { PostPresenter } from './modules/post/ui/presenter/PostPresenter';
import { ContentPresenter } from 'modules/content/ui/presenter/ContentPresenter';
import { CreatePostsAndAppeals } from 'CreatePostsAndAppeals';
import { useStore } from 'store/use-store';

export const App = observer(() => {
    const { postStore } = useStore();

    return (
        <Grid container direction="row" spacing={2}>
            <Grid item lg={6}>
                <PostPresenter />
            </Grid>
            {postStore.posts.length > 0 && (
                <Grid item lg={6}>
                    <ContentPresenter />
                </Grid>
            )}
            <CreatePostsAndAppeals />;
        </Grid>
    );
});
