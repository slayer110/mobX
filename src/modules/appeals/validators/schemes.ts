import * as yup from 'yup';

export const schemesTest = yup.object().shape({
    comment: yup.string().trim().min(4, 'Введите минимум 134 симоволов').required('Заполните полasdasdasdasdasdasdе'),
});

export const schemes = {
    appeal: yup.object().shape({
        // appealType: yup.string().required(),
        text: yup.string().trim().required(),
        comment: yup
            .string()
            .trim()
            .when('appealType', {
                is: 'expertise',
                then: yup.string().min(5, 'Введите минимум 5 симоволов').required('Заполните поле'),
                otherwise: yup.string().required('1231231231'),
            })
            // TODO для примера
            /*.when('$objTest', (objTest, schema) => {
                if (schemesTest.isValidSync(objTest)) {
                    return schema.min(16);
                }

                return schema.max(13);
            }),*/
        // .when('$comment', {
        //     is: '1111',
        //     then: (fieldSchema) => fieldSchema.required('qweqwqeweqweqwe'),
        //     otherwise: (fieldSchema) =>
        //         fieldSchema.min(5, 'Введите минимум 5 симоволов').required('Заполните поле'),
        // }),
        // competenceType: yup.string().required('Выберите поле'),
    }),
};

const objTest = {
    comment: '',
    phoneNumber: '6213489898234',
};
const obj = {
    appealType: 'expertise',
    comment: 'aqeqweqaweqasdasdasdasdasdwe',
};

/*console.warn(
    'b ',
    schemes.appeal
        .isValid(obj, {
            context: {
                objTest,
            },
        })
        .then((values, test) => {
            console.warn('common ', values, test);
        })
        .catch((err) => {
            console.warn('common err ', err);
        })
);*/
