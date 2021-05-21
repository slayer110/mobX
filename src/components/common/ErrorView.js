import React from 'react';


function ErrorComponent () {
    const errorStyle={
       color: 'red',
       backgroundColor: 'grey'
    };
    return <div style={errorStyle}>
        Ошибка загрузки
    </div>

};

export default ErrorComponent;
