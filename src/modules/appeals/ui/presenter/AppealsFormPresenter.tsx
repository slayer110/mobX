// external
import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Select,
    MenuItem,
    FormControl,
    FormControlLabel,
    InputLabel,
    makeStyles,
    TextField,
    Checkbox,
} from '@material-ui/core';
import { observer } from 'mobx-react-lite';

// internal
import { useStore } from '../../../../store/use-store';

// interfaces
import { IAppeal } from '../../interfaces';

const schema = yup.object().shape({
    comment: yup.string().min(5),
});

const useStyles = makeStyles(() => ({
    field: {
        display: 'block',
        marginTop: '30px',
        minWidth: '100%',
    },
    wrapper: {
        marginTop: '20px',
    },
    error: {
        color: 'red',
    },
}));

const AppealsFormPresenter = observer(() => {
    const { appealsStore } = useStore();
    const defaultValues: IAppeal = {
        comment: '',
        appealsType: '',
        competencesType: '',
        urgent: false,
    };
    const {
        control,
        watch,
        formState: { errors },
        setValue,
    } = useForm<IAppeal>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues,
    });
    const classes = useStyles();
    const isShowComment = watch('appealsType') === 'closedFirstLine';
    const isShowCompetence = watch('appealsType') === 'expertise';
    const isShowUrgent = watch('appealsType') === 'complaint';

    const handleChangeField = (field: any) => {
        const { name, value } = field;

        appealsStore.saveAppeal({ [name]: value });
    };

    React.useEffect(() => {
        setValue('appealsType', appealsStore.activeAppeal.appealsType);
        setValue('comment', appealsStore.activeAppeal.comment);
        setValue('competencesType', appealsStore.activeAppeal.competencesType);
        setValue('urgent', appealsStore.activeAppeal.urgent);
    }, [appealsStore.activeAppealIndex, appealsStore.activePost, appealsStore.activeAppeal]);

    return (
        <form className={classes.wrapper}>
            <FormControl className={classes.field}>
                <InputLabel>Статус</InputLabel>
                <Controller
                    name="appealsType"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            fullWidth
                            onChange={(e) => {
                                handleChangeField({ name: 'appealsType', value: e.target.value });
                                field.onChange(e);
                            }}
                        >
                            <MenuItem value="closedFirstLine">Закрыто 1-ая линия</MenuItem>
                            <MenuItem value="complaint">Жалоба/претензия</MenuItem>
                            <MenuItem value="expertise">Экспертиза</MenuItem>
                        </Select>
                    )}
                />
            </FormControl>
            {isShowComment && (
                <FormControl className={classes.field}>
                    <Controller
                        name="comment"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                multiline
                                rows={2}
                                maxRows={5}
                                label="Комментарий"
                                placeholder="Введите комментарий"
                                fullWidth
                                onChange={(e) => {
                                    handleChangeField({ name: 'comment', value: e.target.value });
                                    field.onChange(e);
                                }}
                            />
                        )}
                    />
                    <p className={classes.error}>{errors.comment?.message}</p>
                </FormControl>
            )}
            {isShowCompetence && (
                <FormControl className={classes.field}>
                    <InputLabel>Компетенции</InputLabel>
                    <Controller
                        name="competencesType"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                fullWidth
                                onChange={(e) => {
                                    handleChangeField({ name: 'competencesType', value: e.target.value });
                                    field.onChange(e);
                                }}
                            >
                                <MenuItem value="first">Первая компетенция</MenuItem>
                                <MenuItem value="second">Вторая компетенция</MenuItem>
                                <MenuItem value="third">Третья компетенция</MenuItem>
                            </Select>
                        )}
                    />
                </FormControl>
            )}
            {isShowUrgent && (
                <FormControl className={classes.field}>
                    <Controller
                        name="urgent"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                label="Важность вопроса"
                                control={
                                    <Checkbox
                                        {...field}
                                        checked={field.value}
                                        onChange={(e) => {
                                            handleChangeField({ name: 'urgent', value: e.target.value });
                                            field.onChange(e);
                                        }}
                                    />
                                }
                            />
                        )}
                    />
                </FormControl>
            )}
        </form>
    );
});

export default React.memo(AppealsFormPresenter);
