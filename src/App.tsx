// external
import React, {useEffect} from 'react';
import { hot } from "react-hot-loader/root";
import { Grid } from '@material-ui/core';
import { observer } from 'mobx-react-lite';

// internal
import { PostPresenter } from 'modules/post/ui/presenter/PostPresenter';
import { ContentPresenter } from 'modules/content/ui/presenter/ContentPresenter';
import { useStore } from 'store/use-store';
import { createPostsAndAppealsList } from 'utils/createPostsAndAppealsList';

export const App = hot(observer(() => {
    const { postStore } = useStore();

    useEffect(() => createPostsAndAppealsList(), []);

    return (
        <Grid container direction="row" spacing={2}>
            <Grid item lg={4}>
                <PostPresenter />
            </Grid>
            {postStore.posts.length > 0 && (
                <Grid item lg={6}>
                    <ContentPresenter />
                </Grid>
            )}
        </Grid>
    );
}));
