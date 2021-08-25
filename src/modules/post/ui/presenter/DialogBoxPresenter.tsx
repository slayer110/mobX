// external
import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { makeStyles, Grid, Fab, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { List as ReactVirtualized } from 'react-virtualized';
import { FixedSizeList as ReactWindowVirtualized } from 'react-window';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { Virtuoso } from 'react-virtuoso';

// internal
import { useStore } from 'store/use-store';
import { MessageView } from 'components/MessageView';
import AddPostButton from 'components/AddPostButton';
import Messages from 'modules/post/ui/presenter/Messages';

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
    const { dialogBox, sendingMessageField, title } = classes;
    const reactVirtualizedRef = React.createRef();
    const reactWindowRef = React.createRef();
    const reactVirtuosoRef = React.createRef();

    const Row = (obj: any) => {
        const { index } = obj;

        return <MessageView message={`${messagesStore.activePostMessages.list[index]} ${index}`} />;
    };

    const rowRenderer = (obj: any) => {
        const { key, style, index } = obj;

        return (
            <MessageView message={`${messagesStore.activePostMessages.list[index]} ${index}`} style={style} key={key} />
        );
    };

    return (
        <Grid container lg className={classes.container} direction="column">
            <Grid item className={classes.title}>
                <h1>Список постов</h1>
                <Grid item className={classes.sendingMessageField}>
                    <AddPostButton handlerAddPost={postStore.addNewPost} />
                    <Button onClick={() => {
                        messagesStore.addMessages();
                    }} >
                        Добавить сообщения
                    </Button>
                </Grid>
            </Grid>
            <Grid item className={classes.dialogBox}>
                {/*{messagesStore.activePostMessages.list.map((item) => {
                    return (
                        <div key={item}>
                            {item}
                        </div>
                    );
                })}*/}
                <h2>react-virtuoso</h2>
                <Virtuoso
                    ref={reactVirtuosoRef}
                    data={messagesStore.activePostMessages.list}
                    totalCount={messagesStore.activePostMessages.list.length}
                    itemContent={(index, item) => {
                        return <MessageView message={item} />;
                    }}
                    // followOutput="smooth"
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
            {/*<Grid item className={classes.dialogBox}>
                <Suspense fallback={<h1>Загрузка</h1>}>
                <MessagesLazy activePostMessages={messagesStore.activePostMessages.list} />
                </Suspense>
            </Grid>*/}
            {/*<Grid item className={classes.dialogBox}>
                <h2>react-virtualized</h2>
                <ReactVirtualized
                    ref={reactVirtualizedRef}
                    height={300}
                    rowCount={messagesStore.activePostMessages.list.length}
                    scrollToIndex={messagesStore.scrollPosition}
                    rowHeight={20}
                    rowRenderer={rowRenderer}
                />
                <button
                    onClick={() => messagesStore.setScrollPosition(messagesStore.activePostMessages.list.length - 1)}
                >
                    Вниз
                </button>
            </Grid>*/}
        </Grid>
    );
});
