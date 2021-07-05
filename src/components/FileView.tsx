import React from 'react';
import {useStore} from '../store/use-store';
import {observer} from "mobx-react";


const FileView = observer(() => {
    const {questionStore}: any = useStore();
    const fileStyle: any = {
        width: '30%',
        height: '800px',
        border: '1px black solid',
        display: 'inline-block',
        overflowY: 'hidden',
    };

    return (
        <div style={fileStyle}>
            <h1>Файлы</h1>
            {questionStore.activeQuestion?.data.file?.name}
        </div>
    );
})
export default FileView;