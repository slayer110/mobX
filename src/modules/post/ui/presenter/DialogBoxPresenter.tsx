// external
import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { makeStyles, Grid, Fab, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Virtuoso } from 'react-virtuoso';

// internal
import { useStore } from 'store/use-store';
import { MessageView } from 'components/MessageView';
import { useCallback } from 'react';

const useStyles = makeStyles(() => ({
    container: {
        height: '1000px',
    },
    dialogBox: {
        backgroundColor: '#d3d3d3',
        // TODO должен быть не фиксируемым
        height: '200px',
    },
    record: {
        border: '1px black solid',
        backgroundColor: '#f5deb3',
    },
    sendingMessageField: {
        height: '10%',
    },
    title: {
        textAlign: 'center',
    },
}));

export const DialogBoxPresenter = observer(() => {
    const { messagesStore, postStore }: any = useStore();
    const classes = useStyles();
    const reactVirtuosoRef = React.createRef();

    const handleAddPost = useCallback(
        () => () => {
            postStore.addNewPost();
        },
        []
    );

    const handleAddMessages = useCallback(
        () => () => {
            messagesStore.addMessages();
        },
        []
    );

    return (
        <Grid container className={classes.container} direction="column">
            <Grid item className={classes.title}>
                <h1>Список постов</h1>
                <Grid item className={classes.sendingMessageField}>
                    <Button onClick={handleAddPost}>Добавить пост</Button>
                    <Button onClick={handleAddMessages}>Добавить сообщения</Button>
                </Grid>
            </Grid>
            <Grid item className={classes.dialogBox}>
                <h2>react-virtuoso</h2>
                <Virtuoso
                    ref={reactVirtuosoRef}
                    data={toJS(messagesStore.activePostMessages.list)}
                    totalCount={messagesStore.activePostMessages.list.length}
                    itemContent={(index, item) => {
                        return <MessageView message={item} />;
                    }}
                    components={{
                        Header: () => {
                            return (
                                <Button
                                    color="secondary"
                                    onClick={() => {
                                        messagesStore.addMessagesToStart();
                                    }}
                                >
                                    Загрузить ещё
                                </Button>
                            );
                        },
                    }}
                />
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={() => {
                        reactVirtuosoRef.current.scrollToIndex({
                            index: messagesStore.activePostMessages.list.length - 1,
                            behavior: 'smooth',
                        });
                    }}
                >
                    <AddIcon />
                </Fab>
            </Grid>
        </Grid>
    );
});
