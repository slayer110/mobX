import React from 'react';
import {useStore} from '../store/use-store';
import {observer} from 'mobx-react';

const questionsStyle: any = {
    width: '400px',
    height: '800px',
    border: '1px black solid',
    display: 'inline-block',
    overflowY: 'auto',
};
const styleButton: any = {
    display: 'inline-block'
}
const titleStyle: any = {
    textAlign: 'center',
};

const styleActiveQuestion: any = {
    display: 'inline-block'
}

const QuestionView = observer(() => {
    const {questionStore}: any = useStore();

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
