import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { FormSpy } from 'react-final-form';
import diff from 'object-diff';
import isEqual from 'lodash.isequal';
import { observer } from 'mobx-react-lite';

const sanitizeEmptyValues = (initialValues: any, values: any) => {
    if (!initialValues) {
        return values;
    }

    const initialValuesWithEmptyFields = Object.keys(initialValues).reduce((acc: any, key: string) => {
        if (key === 'urgent') {
            debugger;
        }

        if (values[key] instanceof Date || Array.isArray(values[key])) {
            acc[key] = values[key];
        } else if (typeof values[key] === 'object' && values[key] !== null) {
            acc[key] = sanitizeEmptyValues(initialValues[key], values[key]);
        } else if (typeof values[key] === 'number') {
            acc[key] = typeof values[key] === 'undefined' ? 0 : values[key];
        } else if (typeof values[key] === 'boolean') {
            acc[key] = typeof values[key] === 'undefined' ? false : values[key];
        } else if (typeof values[key] === 'string') {
            acc[key] = typeof values[key] === 'undefined' ? '' : values[key];
        } else {
            acc[key] = typeof values[key] === 'undefined' ? '' : values[key];
        }
        return acc;
    }, {});

    return Object.assign({}, initialValuesWithEmptyFields, values);
};

interface IProps {
    initialState: any;
    debounce: number;
    onSave: (values: any) => void;
}

interface IOwnProps extends IProps {
    values: any;
}

class AutoSaveComponent extends React.Component<IOwnProps> {
    private timeout: any;

    constructor(props: IOwnProps) {
        super(props);
        this.state = { values: props.initialState, submitting: false };
    }

    public UNSAFE_componentWillReceiveProps(nextProps: Readonly<IOwnProps>) {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(this.save, nextProps.debounce);
    }

    save = () => {
        const { values, onSave, initialState } = this.props;

        // This diff step is totally optional
        // let difference = sanitizeEmptyValues(
        //     init,
        //     values
        // );
        // console.warn('BEFORE difference  diff => ', difference, values, this.state.values);
        // let equesl = isEqual(difference, init);
        // console.warn('isEqual', equesl);
        // console.warn('AFTER difference  diff => ', difference);
        // debugger;

        const obj = Object.assign({}, initialState, values);
        let equesl = isEqual(this.state.values, obj);
        // console.warn('obj', obj);
        // console.warn('this.state.values', this.state.values);
        // console.warn('isEqual', equesl);

        if (!equesl) {
            console.warn('AUTO SAVE CHANGED', obj);
            // values have changed
            this.setState({ submitting: true, values: obj });
            onSave(obj);
            this.setState({ submitting: false });
        }
    };

    render() {
        // This component doesn't have to render anything, but it can render
        // submitting state.
        return null;
    }
}

const AutoSaveComponent2 = React.memo<IOwnProps>((props) => {
    const { values, debounce, onSave, initialState } = props;
    let timeout: any;
    const [valuesState, setValues] = useState(initialState);

    const handleSaveValues = useCallback(() => {
        // This diff step is totally optional
        // let difference = sanitizeEmptyValues(
        //     init,
        //     values
        // );
        // console.warn('BEFORE difference  diff => ', difference, values, this.state.values);
        // let equesl = isEqual(difference, init);
        // console.warn('isEqual', equesl);
        // console.warn('AFTER difference  diff => ', difference);
        // debugger;

        const obj = Object.assign({}, initialState, values);
        let equesl = isEqual(valuesState, obj);
        // console.warn('obj', obj);
        // console.warn('this.state.values', this.state.values);
        // console.warn('isEqual', equesl);

        if (!equesl) {
            console.warn('AUTO SAVE CHANGED', obj);
            // values have changed
            setValues(obj);
            onSave(obj);
        }
    }, []);

    useMemo(() => {
        console.warn('values ', values);
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(handleSaveValues, debounce);
    }, [values]);

    return null;
});

// Make a HOC
// This is not the only way to accomplish auto-save, but it does let us:
// - Use built-in React lifecycle methods to listen for changes
// - Maintain state of when we are submitting
// - Render a message when submitting
// - Pass in debounce and save props nicely
// export default (props) => <FormSpy {...props} subscription={{ values: true }} component={AutoSave2} />;

export const AutoSave = (props: IProps) => {
    return (
        <FormSpy subscription={{ values: true }}>
            {({ values }) => (
                <AutoSaveComponent
                    initialState={props.initialState}
                    values={values}
                    debounce={props.debounce}
                    onSave={props.onSave}
                />
            )}
        </FormSpy>
    );
};
