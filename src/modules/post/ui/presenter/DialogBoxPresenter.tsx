// external
import React, { Suspense } from 'react';
import { observer } from 'mobx-react-lite';
import { makeStyles, Grid } from '@material-ui/core';

// internal
import { useStore } from '../../../../store/use-store';
import { MessageView } from '../../../../components/MessageView';
import AddPostButton from '../../../../components/AddPostButton';
import { FixedSizeList as DialogBoxArea } from 'react-window';
import Messages from 'modules/post/ui/presenter/Messages';

const MessagesLazy = React.lazy(() => import('./Messages'));

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
    const { dialogBox, sendingMessageField, title } = classes;

    const Row = (obj: any) => {
        const { style, index } = obj;

        return <MessageView style={style} message={`${messagesStore.activePostMessages.list[index]}`} />;
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
                <Suspense fallback={<h1>Загрузка</h1>}>
                    <MessagesLazy activePostMessages={messagesStore.activePostMessages.list} />
                </Suspense>
                <Messages activePostMessages={messagesStore.activePostMessages.list} />

                {/*<DialogBoxArea*/}
                {/*    className={classes.dialogBox}*/}
                {/*    height={400}*/}
                {/*    itemCount={messagesStore.activePostMessages.list.length}*/}
                {/*    itemSize={10}*/}
                {/*    width="100%"*/}
                {/*>*/}
                {/*    {Row}*/}
                {/*</DialogBoxArea>*/}
            </Grid>
        </>
    );
});

export default DialogBoxPresenter;
