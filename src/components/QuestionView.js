import React from 'react';
import {useStore} from "../store/use-store";
import {observer} from "mobx-react";

const QuestionView=observer(()=> {
    const {questionStore} = useStore();

    const questionsStyle = {
        width: '587px',
        height: '800px',
        border: '1px black solid',
        display: 'inline-block',
        overflowY: 'auto'
    };

    const titleStyle={
        textAlign:'center',
    };

    return <div style={questionsStyle}>
        <div style={titleStyle}><h1>Вопросы</h1></div>
        {questionStore.activeQuestion?.text}
    </div>
});
export default QuestionView
