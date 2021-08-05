// external
import { setIn } from 'final-form';

export const validateSave = (formSchema: any, values: any) => formSchema.validate(values);

export const validateFormValues = (schema: any) => async (values: unknown) => {
    let formSchema = schema;

    if (typeof schema === 'function') {
        formSchema = schema();
    }

    try {
        await formSchema.validate(values, {
            context: {
                objTest: {
                    comment: 'objTestaaaaaaaasdasd',
                    phoneNumber: '6213489898234',
                },
            },
            abortEarly: false,
        });
    } catch (error) {
        return error.inner.reduce(
            (formError: any, innerError: any) => setIn(formError, innerError.path, innerError.message),
            {}
        );
    }
};
