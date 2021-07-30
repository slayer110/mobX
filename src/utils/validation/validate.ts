import { setIn } from 'final-form';

export const validateForm = (formSchema: any, values: any) => formSchema.validate(values, { abortEarly: false });

export const validateFormValues = (schema: any) => async (values: unknown) => {
    let formSchema = schema;

    if (typeof schema === 'function') {
        formSchema = schema();
    }

    try {
        await validateForm(formSchema, values);
    } catch (error) {
        const errors = error.inner.reduce((formError: any, innerError: any) => {
            return setIn(formError, innerError.path, innerError.message);
        }, {});

        return errors;
    }
};
