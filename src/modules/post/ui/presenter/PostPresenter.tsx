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
    PostTabsWrapper: {
        height: '100%',
        width: '120px',
        backgroundColor: '#e6e9ed',
        overflowY: 'auto',
    },
    dialogBoxWrapper: {
        border: '2px solid black',
        flexWrap: 'nowrap',
        width: '100%',
        minWidth: 600,
    },
}));

export const PostPresenter = observer(() => {
    const { postStore } = useStore();
    const classes = useStyles();
    const { PostTabsWrapper, dialogBoxWrapper } = classes;

    return (
        <>
            <Grid container item alignContent="flex-start" className={PostTabsWrapper}>
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

            <Grid container item direction="column" className={dialogBoxWrapper}>
                <DialogBoxPresenter />
            </Grid>
        </>
    );
});
