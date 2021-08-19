import React from 'react';
import {useStore} from '../store/use-store';
import {observer} from 'mobx-react-lite';

const appealsStyle: any = {
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

const styleActiveAppeal: any = {
    display: 'inline-block'
}

const AppealView = observer(() => {
    const {appealStore}: any = useStore();

    return (
        <div style={appealsStyle}>
            <div style={titleStyle}>
                <h1>Вопросы</h1>
            </div>
            {appealStore.activeAppeal?.data.name && <>
                <div style={styleActiveAppeal}>{appealStore.activeAppeal?.data.name}</div>
                <button onClick={appealStore.getFile} style={styleButton}>Загрузить</button>
            </>}
        </div>
    );
});
export default AppealView;
