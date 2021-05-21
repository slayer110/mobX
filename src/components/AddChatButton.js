import React from 'react';
import '../App.css';

const style = {
    border: '2px grey solid',
    display: 'inline-block',
    height: '50px',
    cursor: 'pointer',
    position:'absolute'
};

function AddChatButton(props) {
    const {handlerAddChat} = props;
    return <button onClick={handlerAddChat} style={style}>Добавить чат</button>
}

export default AddChatButton
