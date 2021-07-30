import * as yup from 'yup';

export const validationSchemes = {
    appeal: yup.object().shape({
        appealType: yup.string().required('Выберите поле'),
        comment: yup.string().required('Заполните поле').min(5, 'Введите минимум 5 симоволов'),
        // competenceType: yup.string().required('Выберите поле'),
    }),
};
