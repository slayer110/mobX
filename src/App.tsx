// external
import React from 'react';
import { Grid } from '@material-ui/core';

// internal
import { PostPresenter } from './modules/post/ui/presenter/PostPresenter';
import { AppealsWrapperPresenter } from './modules/appeals/ui/presenter/AppealsWrapperPresenter';

export const App = () => {
    return (
        <Grid container direction="row" spacing={2}>
            <Grid item lg={6}>
                <PostPresenter />
            </Grid>
            <Grid item lg={6}>
                <AppealsWrapperPresenter />
            </Grid>
        </Grid>
    );
};
