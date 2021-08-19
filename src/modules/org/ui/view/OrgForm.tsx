// external
import React from 'react';
import { observer } from 'mobx-react-lite';
import { Form } from 'react-final-form';
import { FormControl, InputLabel, makeStyles } from '@material-ui/core';
import { TextField as TextFieldRff } from 'mui-rff';
import createDecorator from 'final-form-focus';

// internal
import { validateFormValues } from 'modules/appeals/validators/validators';
import { AutoSave } from 'components/AutoSave';
import { useStore } from 'store/use-store';
import { org } from 'modules/org/constants';
import { schema } from 'modules/org/validators/schema';

// interfaces

// TODO Фокус на поле с ошибкой при переходе между вкладками обращений

interface IProps {}

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

// TODO Чтобы валидация действовала только для видимых полей.
//  Сейчас если выбрать из выпадающего списка пункт, который не подразумевает видимость поля "Комментарий" и запустить проверку, поле "Комментарий" будет тоже валидироваться
export const OrgForm = observer<IProps>(() => {
    const { orgStore, appealsStore: {
        activeAppeal
    } } = useStore();
    const { id, fullName } = orgStore.activeOrg;
    const classes = useStyles();

    const onSubmit = (values: any) => {
        orgStore.saveOrg(values);
    };

    return (
        <Form
            subscription={{}}
            onSubmit={onSubmit}
            decorators={decorators}
            validate={validateFormValues(schema, {
                appeal: {...activeAppeal },
            })}
            initialValues={{
                fullName
            }}
            render={({ handleSubmit }) => {
                orgStore.saveSubmit(id, handleSubmit);

                return (
                    <form className={classes.wrapper} onSubmit={handleSubmit}>
                        <AutoSave debounce={200} onSave={onSubmit} initialState={org} />
                        <InputLabel>Полное имя</InputLabel>
                        <FormControl className={classes.field}>
                            <TextFieldRff name="fullName" />
                        </FormControl>
                    </form>
                );
            }}
        />
    );
});
