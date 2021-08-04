// external
import React from 'react';
import { observer } from 'mobx-react';
import { FixedSizeList as DialogBoxArea } from 'react-window';
import { makeStyles, Grid } from '@material-ui/core';

// internal
import { useStore } from '../../../../store/use-store';
import { MessageView } from '../../../../components/MessageView';
import AddPostButton from '../../../../components/AddPostButton';

const useStyles = makeStyles(() => ({
    dialogBox: {
        border: '1px black solid',
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
            <Grid item className={title}>
                <h1>Окно диалога</h1>
                <Grid item className={sendingMessageField}>
                    <AddPostButton handlerAddPost={postStore.addNewPost} />
                </Grid>
            </Grid>
            <Grid item>
                <DialogBoxArea
                    className={dialogBox}
                    height={700}
                    itemCount={messagesStore.activePostMessages.list.length}
                    itemSize={50}
                    width="100%"
                >
                    {Row}
                </DialogBoxArea>
            </Grid>
        </>
    );
});

export default DialogBoxPresenter;
