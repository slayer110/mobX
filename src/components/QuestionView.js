import React from 'react';
import {useStore} from '../store/use-store';
import {observer} from 'mobx-react';

const QuestionView = observer(() => {
    const {questionStore} = useStore();
    const questionsStyle = {
        width: '400px',
        height: '800px',
        border: '1px black solid',
        display: 'inline-block',
        overflowY: 'auto',
    };
    const styleButton = {
        display: 'inline-block'
    }
    const titleStyle = {
        textAlign: 'center',
    };

    const styleActiveQuestion={
        display: 'inline-block'
    }

    return (
        <div style={questionsStyle}>
            <div style={titleStyle}>
                <h1>Вопросы</h1>
            </div>
            {questionStore.activeQuestion?.data.name && <>
                <div style={styleActiveQuestion}>{questionStore.activeQuestion?.data.name}</div>
                <button onClick={questionStore.getFile} style={styleButton}>Загрузить</button>
            </>}
        </div>
    );
});
export default QuestionView;
