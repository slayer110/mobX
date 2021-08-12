// external
import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Form, FormSpy, Field } from 'react-final-form';
import { OnChange, OnBlur } from 'react-final-form-listeners';
import { MenuItem, FormControl, InputLabel, makeStyles, TextField, Button } from '@material-ui/core';
import { Select, TextField as TextFieldRff, Checkboxes, CheckboxData } from 'mui-rff';
import createDecorator from 'final-form-focus';
import { default as createDecoratorSubmit } from 'final-form-submit-listener';
import { FORM_ERROR } from 'final-form'

// internal
import { validateFormValues } from 'modules/appeals/validators/validators';
import { schemes } from '../../validators/schemes';

// interfaces
import { IAppeal } from '../../interfaces';
import { useEffect } from 'react';
import { useStore } from 'store/use-store';
import { RootStore, rootStore } from 'store/rootStore';
import AutoSave1 from 'modules/appeals/ui/view/AutoSave';

// TODO Фокус на поле с ошибкой при переходе между вкладками обращений

interface IProps {
    activeAppeal: IAppeal;
    onSaveAppeal: (info: { [key: string]: string }) => void;
    isVisible: boolean;
}

interface IFormValues {
    appealType: string;
    comment: string;
}

const useStyles = makeStyles(() => ({
    hidden: {
        display: 'none',
    },
    field: {
        width: '100%',
        marginBottom: '30px',
    },
    wrapper: {
        marginTop: '30px',
    },
    error: {
        color: 'red',
    },
}));

const focusOnErrors = createDecorator();
const submitListener = createDecoratorSubmit({
    beforeSubmit: (formApi) => {
        console.warn('beforeSubmit');
    },
    afterSubmitSucceeded: (formApi) => {
        console.warn('afterSubmitSucceeded');
    },
    afterSubmitFailed: (formApi) => {
        console.warn('afterSubmitFailed');
    },
});
const decorators = [focusOnErrors];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export let submit: any;

const forms = {};

const formSubmits = (id: string) => async (data) => {
    console.warn('formSubmits => ', id, data);
};

// TODO Чтобы валидация действовала только для видимых полей.
//  Сейчас если выбрать из выпадающего списка пункт, который не подразумевает видимость поля "Комментарий" и запустить проверку, поле "Комментарий" будет тоже валидироваться
export const AppealForm = observer<IProps>(({ activeAppeal, onSaveAppeal, isVisible, onSaveSubmit }) => {
    const { appealsStore } = useStore();
    const { comment, appealType, id } = activeAppeal;
    const classes = useStyles();
    // const checkboxData: CheckboxData[] = [{ label: 'Важность вопроса', value: true }];

    const onSubmit = values => {
        // if (values.text !== 'finalformrocks') {
        //     return { [FORM_ERROR]: 'Login Failed' }
        // }

        appealsStore.saveAppeal(values);
    }

    return (
        <Form
            subscription={{}}
            onSubmit={onSubmit}
            decorators={decorators}
            validate={validateFormValues(schemes.appeal)}
            render={({ handleSubmit }) => {
                appealsStore.saveSubmit(id, handleSubmit);

                return (
                    <form className={isVisible ? classes.wrapper : classes.hidden} onSubmit={handleSubmit}>
                        <AutoSave1 debounce={200} onSave={onSubmit} />
                        <InputLabel>Статус</InputLabel>
                        <FormControl className={classes.field}>
                            <Select fullWidth name="appealType">
                                <MenuItem value="closedFirstLine">Закрыто</MenuItem>
                                <MenuItem value="complaint">Открыто</MenuItem>
                                <MenuItem value="expertise">Прикройте</MenuItem>
                            </Select>
                        </FormControl>
                        <InputLabel>Комментарий RFF</InputLabel>
                        <FormControl className={classes.field}>
                            <TextFieldRff name="comment" multiline rows={7} />
                        </FormControl>
                        <InputLabel>Текст RFF</InputLabel>
                        <FormControl className={classes.field}>
                            <TextFieldRff name="text" multiline rows={7} />
                        </FormControl>
                        <InputLabel>Текст RFF</InputLabel>
                        <FormControl className={classes.field}>
                            <TextFieldRff name="fole.tert.l" rows={7} />
                        </FormControl>
                        <FormControl className={classes.field}>
                            <TextFieldRff name="fole.tert.io" rows={7} />
                        </FormControl>
                        <Button
                            style={{ marginTop: '10px' }}
                            onClick={() => {
                                appealsStore.addAppeal();
                            }}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                            onClick={handleSubmit}
                        >
                            САБМИТ
                        </Button>

                        {/* {activeAppeal.appealType === 'expertise' && (
                        <Select fullWidth name="competenceType">
                            <MenuItem value="first">Первая компетенция</MenuItem>
                            <MenuItem value="second">Вторая компетенция</MenuItem>
                            <MenuItem value="third">Третья компетенция</MenuItem>
                        </Select>
                    )}
                    {activeAppeal.appealType === 'complaint' && (
                        <FormControl className={classes.field}>
                            <Checkboxes data={checkboxData} name="urgent" />
                            <OnChange name="urgent">
                                {(value: any) => {
                                    handleChangeField({ name: 'urgent', value: !!value[0] });
                                }}
                            </OnChange>
                        </FormControl>
                    )} */}
                    </form>
                );
            }}
        />
    );
});

// setTimeout(() => {
//     rootStore.appealsStore.saveAppeal({
//         comment: '234359898gdufghuodfg'
//     });
// }, 5000);

// setInterval(() => {
//     console.warn(forms);
// }, 1000)
