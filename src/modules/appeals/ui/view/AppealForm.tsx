// external
import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Form, FormSpy, Field } from 'react-final-form';
import { OnChange, OnBlur } from 'react-final-form-listeners';
import { MenuItem, FormControl, InputLabel, makeStyles, TextField } from '@material-ui/core';
import { Select, TextField as TextFieldRff, Checkboxes, CheckboxData } from 'mui-rff';
import createDecorator from 'final-form-focus';

// internal
import { validateFormValues } from 'modules/appeals/validators/validators';
import { schemes } from '../../validators/schemes';

// interfaces
import { IAppeal } from '../../interfaces';
import { useEffect } from 'react';

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
const decorators = [focusOnErrors];

const subscription = { pristine: true, submitting: true };

// TODO Чтобы валидация действовала только для видимых полей.
//  Сейчас если выбрать из выпадающего списка пункт, который не подразумевает видимость поля "Комментарий" и запустить проверку, поле "Комментарий" будет тоже валидироваться
export const AppealForm = observer<IProps>(({ activeAppeal, onSaveAppeal, isVisible }) => {
    const { comment, appealType } = activeAppeal;
    const classes = useStyles();
    // const checkboxData: CheckboxData[] = [{ label: 'Важность вопроса', value: true }];
    let submit: any;

    const handleChangeField = (field: any) => {
        const { name, value } = field;

        onSaveAppeal({ [name]: value });
    };

    const handleSubmit = (data) => {
        console.warn('dadsadas ', data);
        // onSaveAppeal(data);
    };

    useEffect(() => {
        if (!isVisible) {
            console.warn(123123123);
            submit();
        }
    }, [isVisible]);

    return (
        <Form
            subscription={subscription}
            onSubmit={handleSubmit}
            // validate={validateFormValues(schemes.appeal)}
            decorators={decorators}
            render={({ handleSubmit }) => {
                submit = handleSubmit;
                return (
                    <form className={isVisible ? classes.wrapper : classes.hidden} onSubmit={handleSubmit}>
                        <InputLabel>Статус</InputLabel>
                        <FormControl className={classes.field}>
                            <Select required fullWidth name="appealType">
                                <MenuItem value="closedFirstLine">Закрыто</MenuItem>
                                <MenuItem value="complaint">Открыто</MenuItem>
                                <MenuItem value="expertise">Прикройте</MenuItem>
                            </Select>
                            {/*<OnChange name="appealType">
                            {(value: any) => {
                                handleChangeField({ name: 'appealType', value });
                            }}
                        </OnChange>*/}
                        </FormControl>
                        <InputLabel>Комментарий RFF</InputLabel>
                        <FormControl className={classes.field}>
                            <TextFieldRff name="commentsadasd" multiline rows={7} />
                            {/*<OnChange name="comment">
                            {(value: any) => {
                                handleChangeField({ name: 'comment', value });
                            }}
                        </OnChange>*/}
                            {/*<OnBlur name="comment">
                            {(value: any) => {
                                handleChangeField({ name: 'comment', value });
                            }}
                        </OnBlur>*/}
                        </FormControl>

                        <FormControl className={classes.field}>
                            <TextFieldRff name="asd" />
                            {/*<OnChange name="comment">
                            {(value: any) => {
                                handleChangeField({ name: 'comment', value });
                            }}
                        </OnChange>*/}
                            {/*<OnBlur name="comment">
                            {(value: any) => {
                                handleChangeField({ name: 'comment', value });
                            }}
                        </OnBlur>*/}
                        </FormControl>

                        {/*<Field name="comment">
                            {({ input, meta }) => (
                                <>
                                    <InputLabel>Комментарий</InputLabel>
                                    <FormControl className={classes.field}>
                                        <TextField {...input} multiline rows={7} />
                                    </FormControl>
                                </>
                            )}
                        </Field>*/}
                        <Field name="First">
                            {({ input, meta }) => (
                                <div>
                                    <label>First Name</label>
                                    <input {...input} placeholder="First Name" />
                                </div>
                            )}
                        </Field>

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
                        {/*<FormSpy subscription={{ values: true }} render={({values}) => {
                            console.warn('fom spy - ', values);

                            onSaveAppeal(values);
                            return null;
                        }} />*/}
                    </form>
                );
            }}
        />
    );
});
