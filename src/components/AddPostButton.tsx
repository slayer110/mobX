// external
import React from 'react';
import { Button } from '@material-ui/core';

// styles
import '../App.css';

const style: any = {
    border: '2px grey solid',
    height: '50px',
    cursor: 'pointer',
    bottom: '0px',
};

const AddPostButton = (props: any) => {
    const { handlerAddPost } = props;

    return (
        <Button onClick={handlerAddPost} style={style}>
            Добавить чат
        </Button>
    );
};

export default AddPostButton;
