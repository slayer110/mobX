// external
import React, { Suspense } from 'react';
import { observer } from 'mobx-react-lite';
import { makeStyles, Grid } from '@material-ui/core';
import { List as DialogReactVirtualizedBoxArea } from 'react-virtualized';
import { FixedSizeList as DialogBoxArea } from 'react-window';
import 'react-virtualized/styles.css'; // only needs to be imported once

// internal
import { useStore } from '../../../../store/use-store';
import { MessageView } from '../../../../components/MessageView';
import AddPostButton from '../../../../components/AddPostButton';
import Messages from 'modules/post/ui/presenter/Messages';

const useStyles = makeStyles(() => ({
    dialogBox: {
        backgroundColor: '#D3D3D3',
    },
    record: {
        border: '1px black solid',
        backgroundColor: '#F5DEB3',
    },
    sendingMessageField: {
        height: '10%',
    },
    title: {
        textAlign: 'center',
    },
}));

const DialogBoxPresenter = observer(() => {
    const { messagesStore, postStore }: any = useStore();
    const classes = useStyles();
    const dialogBoxAreaRef = React.createRef();

    const { dialogBox, sendingMessageField, title } = classes;

    const Row = (obj: any) => {
        const { style, index } = obj;

        return <MessageView style={style} message={`${messagesStore.activePostMessages.list[index]} ${index}`} />;
    };

    const rowRenderer = (obj: any) => {
        const { key, style, index } = obj;

        return (
            <MessageView message={`${messagesStore.activePostMessages.list[index]} ${index}`} style={style} key={key} />
        );
    };

    return (
        <>
            <Grid item className={classes.title}>
                <h1>Список постов</h1>
                <Grid item className={classes.sendingMessageField}>
                    <AddPostButton handlerAddPost={postStore.addNewPost} />
                </Grid>
            </Grid>
            <Grid item className={classes.dialogBox}>
                {/*<Suspense fallback={<h1>Загрузка</h1>}>*/}
                {/*<MessagesLazy activePostMessages={messagesStore.activePostMessages.list} />*/}
                {/*</Suspense>*/}

                {/*react-virtualized*/}
                <DialogReactVirtualizedBoxArea
                    ref={dialogBoxAreaRef}
                    width={700}
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

                {/*react-window*/}
                {/*<DialogBoxArea*/}
                {/*    ref={dialogBoxAreaRef}*/}
                {/*    className={classes.dialogBox}*/}
                {/*    height={300}*/}
                {/*    itemCount={messagesStore.activePostMessages.list.length}*/}
                {/*    itemSize={20}*/}
                {/*    width="100%"*/}
                {/*>*/}
                {/*    {Row}*/}
                {/*</DialogBoxArea>*/}
                {/*<button*/}
                {/*    onClick={() =>*/}
                {/*        dialogBoxAreaRef.current.scrollToItem(messagesStore.activePostMessages.list.length - 1)*/}
                {/*    }*/}
                {/*>*/}
                {/*    Вниз*/}
                {/*</button>*/}
            </Grid>
        </>
    );
});

export default DialogBoxPresenter;
