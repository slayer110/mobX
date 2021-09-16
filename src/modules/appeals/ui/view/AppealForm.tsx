// external
import React from 'react';
import { observer } from 'mobx-react-lite';
import { Form, FormSpy, Field } from 'react-final-form';
import { MenuItem, FormControl, InputLabel, makeStyles, TextField, Button } from '@material-ui/core';
import { Select, TextField as TextFieldRff, Checkboxes, CheckboxData } from 'mui-rff';
import createDecorator from 'final-form-focus';

// internal
import { validateFormValues } from 'modules/appeals/validators/validators';
import { schemes } from '../../validators/schemes';
import { AutoSave } from 'components/AutoSave';
import { appeal } from 'modules/appeals/models/appeal';

// interfaces
import { IAppeal } from '../../interfaces';
import { useEffect } from 'react';
import { useStore } from 'store/use-store';
import { toJS } from 'mobx';

// TODO Фокус на поле с ошибкой при переходе между вкладками обращений

const useStyles = makeStyles(() => ({
    field: {
        width: '100%',
        marginBottom: '30px',
    },
}));

const focusOnErrors = createDecorator();
const decorators = [focusOnErrors];

// TODO Чтобы валидация действовала только для видимых полей.
//  Сейчас если выбрать из выпадающего списка пункт, который не подразумевает видимость поля "Комментарий" и запустить проверку, поле "Комментарий" будет тоже валидироваться
export const AppealForm = observer(() => {
    const { appealsStore } = useStore();
    const activeAppeal = appealsStore.activeAppeal;
    const { comment, appealType, id, text, state } = activeAppeal;
    const classes = useStyles();
    // const checkboxData: CheckboxData[] = [{ label: 'Важность вопроса', value: true }];

    const onSubmit = (values) => {
        // if (values.text !== 'finalformrocks') {
        //     return { [FORM_ERROR]: 'Login Failed' }
        // }
        appealsStore.saveAppeal(values);
    };

    useEffect(() => {
        if (state !== 'IDLE') {
            console.log('MOUNT', id, state);
            appealsStore.submitAppeal();
        }
    }, []);

    return (
        <Form
            subscription={{}}
            onSubmit={onSubmit}
            decorators={decorators}
            initialValues={{ comment, appealType, text }}
            validate={validateFormValues(schemes.appeal)}
            validateOnBlur
            render={({ handleSubmit }) => {
                appealsStore.saveSubmit(id, handleSubmit);

                return (
                    <div>
                        <Button
                            onClick={() => {
                                appealsStore.addAppeal();
                            }}
                        >
                            Добавить вопрос
                        </Button>
                        <Button onClick={handleSubmit}>САБМИТ</Button>
                        <AutoSave debounce={200} onSave={onSubmit} initial={appeal} current={toJS(activeAppeal)} />
                        {/*<InputLabel>Статус</InputLabel>
                        <FormControl className={classes.field}>
                            <Select fullWidth name="appealType">
                                <MenuItem value="closedFirstLine">Закрыто</MenuItem>
                                <MenuItem value="complaint">Открыто</MenuItem>
                                <MenuItem value="expertise">Прикройте</MenuItem>
                            </Select>
                        </FormControl>*/}
                        <InputLabel>Комментарий RFF</InputLabel>
                        <FormControl className={classes.field}>
                            <TextFieldRff name="comment" multiline rows={7} />
                        </FormControl>
                        <InputLabel>Текст RFF</InputLabel>
                        <FormControl className={classes.field}>
                            <TextFieldRff name="text" multiline rows={7} />
                        </FormControl>
                    </div>
                );
            }}
        />
    );
});
