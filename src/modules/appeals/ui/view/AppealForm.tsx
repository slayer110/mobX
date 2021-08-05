// external
import * as React from 'react';
import { observer } from 'mobx-react-lite';
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

// TODO Чтобы валидация действовала только для видимых полей.
//  Сейчас если выбрать из выпадающего списка пункт, который не подразумевает видимость поля "Комментарий" и запустить проверку, поле "Комментарий" будет тоже валидироваться
export const AppealForm = observer<IProps>(({ activeAppeal, onSaveAppeal, isVisible }) => {
    const { comment, appealType } = activeAppeal;
    const classes = useStyles();
    // const checkboxData: CheckboxData[] = [{ label: 'Важность вопроса', value: true }];

    const handleChangeField = (field: any) => {
        const { name, value } = field;

        onSaveAppeal({ [name]: value });
    };

    return (
        <Form
            subscription={{ pristine: true }}
            onSubmit={() => {}}
            // validate={validateFormValues(schemes.appeal)}
            // decorators={[focusOnErrors]}
        >
            {({ handleSubmit }) => (
                <form className={isVisible ? classes.wrapper : classes.hidden} onSubmit={handleSubmit}>
                    <InputLabel>Статус</InputLabel>
                    <FormControl className={classes.field}>
                        <Select required fullWidth name="appealType" value={appealType}>
                            <MenuItem value="closedFirstLine">Закрыто</MenuItem>
                            <MenuItem value="complaint">Открыто</MenuItem>
                            <MenuItem value="expertise">Прикройте</MenuItem>
                        </Select>
                        <OnChange name="appealType">
                            {(value: any) => {
                                handleChangeField({ name: 'appealType', value });
                            }}
                        </OnChange>
                    </FormControl>
                    <InputLabel>Комментарий</InputLabel>
                    <FormControl className={classes.field}>
                        <TextField name="comment" multiline rows={7} value={comment} />
                        <OnChange name="comment">
                            {(value: any) => {
                                handleChangeField({ name: 'comment', value });
                            }}
                        </OnChange>
                    </FormControl>

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
            )}
        </Form>
    );
});
