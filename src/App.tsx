import React from 'react';
import './App.css';
import {observer} from 'mobx-react-lite';
import Organizations from './modules/chat/ui/CorrespondenceAreaView';
import QuestionView from './components/QuestionView';
import Chat from './modules/chat/ui/ChatView';
import AddChatButton from './components/AddChatButton';
import {useStore} from './store/use-store';
import FileView from "./components/FileView";
import CorrespondenceAreaView from "./modules/chat/ui/CorrespondenceAreaView";

const chatsBoxStyle: any = {
    height: '100%',
    width: '10%',
    border: '1px solid black',
    overflowY: 'auto',
    display: 'inline-block',
};
const containerStyle: any = {width: '100%', height: '98vh', display:'flex'};

const App = observer(() => {
    const {chatStore}: any = useStore();

    return (
        <div style={containerStyle}>
            <div style={chatsBoxStyle}>
                {chatStore.data.map((elem: any, i: number) => (
                    <Chat
                        onClick={chatStore.changeActiveChat}
                        key={i}
                        info={elem}
                        active={chatStore.active}
                    />
                ))}
            </div>
            <CorrespondenceAreaView/>
            {/*<QuestionView/>*/}
            {/*<FileView/>*/}
            <AddChatButton handlerAddChat={chatStore.addNewChat}/>
        </div>
    );
});

export default App;
