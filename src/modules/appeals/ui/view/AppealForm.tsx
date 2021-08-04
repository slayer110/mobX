// external
import * as React from 'react';
import { Form } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { MenuItem, FormControl, InputLabel, makeStyles } from '@material-ui/core';
import { Select, TextField, Checkboxes, CheckboxData } from 'mui-rff';
import createDecorator from 'final-form-focus';

// internal
import { validateFormValues } from 'modules/appeals/validators/validators';
import { schemes } from '../../validators/schemes';

// interfaces
import { IAppeal } from '../../interfaces';

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
    field: {
        minWidth: '100%',
    },
    wrapper: {
        marginTop: '30px',
    },
    error: {
        color: 'red',
    },
}));

const focusOnErrors = createDecorator();

export const AppealForm = React.memo((props: IProps) => {
    const { activeAppeal, onSaveAppeal, isVisible } = props;
    const classes = useStyles();
    const formRef = React.useRef(null);

    const checkboxData: CheckboxData[] = [{ label: 'Важность вопроса', value: true }];

    const handleChangeField = (field: any) => {
        const { name, value } = field;

        onSaveAppeal({ [name]: value });
    };

    return (
        <Form
            subscription={{ submitSucceeded: true }}
            onSubmit={null}
            validate={validateFormValues(schemes.appeal)}
            decorators={[focusOnErrors]}
        >
            {({ handleSubmit }) => (
                <form
                    ref={formRef}
                    style={{ display: isVisible ? 'block' : 'none' }}
                    onSubmit={handleSubmit}
                    className={classes.wrapper}
                >
                    <InputLabel>Статус</InputLabel>
                    <FormControl className={classes.field}>
                        <Select required fullWidth name="appealType" value={activeAppeal.appealType}>
                            <MenuItem value="closedFirstLine">Закрыто 1-ая линия</MenuItem>
                            <MenuItem value="complaint">Жалоба/претензия</MenuItem>
                            <MenuItem value="expertise">Экспертиза</MenuItem>
                        </Select>
                        <OnChange name="appealType">
                            {(value: any) => {
                                handleChangeField({ name: 'appealType', value });
                            }}
                        </OnChange>
                    </FormControl>
                    {/* TODO Чтобы валидация действовала только для видимых полей. Сейчас если выбрать из выпадающего списка пункт, который не подразумевает видимость поля "Комментарий" и запустить проверку, поле "Комментарий" будет тоже валидироваться */}

                    {/* {activeAppeal.appealType === 'closedFirstLine' && ( */}
                    <>
                        <InputLabel>Комментарий</InputLabel>
                        <FormControl className={classes.field}>
                            <TextField name="comment" value={activeAppeal.comment} />
                            <OnChange name="comment">
                                {(value: any, previous: any) => {
                                    handleChangeField({ name: 'comment', value, previous });
                                }}
                            </OnChange>
                        </FormControl>
                    </>
                    {/* )} */}
                    {activeAppeal.appealType === 'expertise' && (
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
                                {(value: any, previous: any) => {
                                    const valueFromCheckboxList = !!value[0];

                                    handleChangeField({ name: 'urgent', valueFromCheckboxList, previous });
                                }}
                            </OnChange>
                        </FormControl>
                    )}
                </form>
            )}
        </Form>
    );
});
