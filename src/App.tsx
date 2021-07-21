// external
import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

// internal
import PostPresenter from './modules/post/ui/presenter/PostPresenter';
import AppealsPresenter from 'modules/postInfo/ui/presenter/PostInfoWrapperPresenter';

const useStyles = makeStyles(() => ({
    postContainer: {
        flexWrap: 'nowrap',
        height: '98vh',
        width: '1000px',
    },

    appealsContainer: { height: '98vh', marginLeft: '10px' },
}));

const App = () => {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid container item className={classes.postContainer}>
                <PostPresenter />
            </Grid>
            <Grid
                container
                direction="column"
                item
                lg
                className={classes.appealsContainer}
                alignItems="center"
                justifyContent="space-between"
            >
                <AppealsPresenter />
            </Grid>
        </Grid>
    );
};

export default App;
