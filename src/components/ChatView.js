import React from 'react';
import '../App.css';

const style = {
    height: '100px',
    border: '1px red solid',
    fontSize: '50px',
    cursor: 'pointer',
};

function ChatView(props) {
    const {info, active, onClick} = props;
    return <div onClick={() => onClick(info.chatId)} style={{
        ...style,
        backgroundColor: `${info.chatId === active ? 'red' : ''}`
    }}>{info.name}</div>
}

export default React.memo(ChatView)
