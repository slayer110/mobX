import React from 'react';
import './App.css';
import {observer} from "mobx-react-lite";
import Organizations from "./components/OrganizationListView";
import QuestionView from "./components/QuestionView";
import Chat from "./components/ChatView"
import AddChatButton from "./components/AddChatButton"
import {useStore} from "./store/use-store";

const chatsBoxStyle = {height: '800px',width:'10%', border: '1px solid black', overflowY: 'auto', display:'inline-block'};
const containerStyle = {width:'1500px',minHeight:'100%'};

const App = observer(() => {
        const {chatStore} = useStore();

        return (
            <div style={containerStyle}>
                <div style={chatsBoxStyle}>
                    {chatStore.data.map((elem, i) => <Chat onClick={chatStore.changeActiveChat}
                                                           key={i}
                                                           info={elem}
                                                           active={chatStore.active}/>)}
                </div>
                <Organizations/>
                <QuestionView/>
                <AddChatButton handlerAddChat={chatStore.addNewChat}/>
            </div>
        );
    }
);


export default App;
