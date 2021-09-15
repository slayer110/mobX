import React from 'react';

const style: any = {
    border: '2px grey solid',
    display: 'inline-block',
    height: '50px',
    cursor: 'pointer',
    position: 'absolute',
};

const AddChatButton = (props: any) => {
    const {handlerAddChat} = props;
    return (
        <button onClick={handlerAddChat} style={style}>
            Добавить чат
        </button>
    );
}

export default AddChatButton;
