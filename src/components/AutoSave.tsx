import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { FormSpy } from 'react-final-form';
import isEqual from 'lodash.isequal';

interface IProps {
    initial: any;
    current: any;
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
        this.state = {
            values: props.current,
            submitting: false,
        };
    }

    public UNSAFE_componentWillReceiveProps(nextProps: Readonly<IOwnProps>) {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(this.save, nextProps.debounce);
    }

    save = () => {
        const { values, onSave, current, initial } = this.props;

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

        const test = Object.assign({}, initial, values);
        console.warn('changes', test);
        const obj = Object.assign({}, current, test);
        // TODO как сделать в 1 заход?
        // let equesl = isEqual(this.state.values, obj);
        let equesl = isEqual(current, obj);
        // Object.assign(obj, current);
        console.warn('current', current);
        console.warn('result', obj);
        // console.warn('values', values);
        console.warn('this.state.values', this.state.values);
        console.warn('isEqual', equesl);

        if (!equesl) {
            console.warn('AUTO SAVE CHANGED', obj);
            // values have changed
            this.setState({ submitting: true, values: obj });
            onSave(obj);
        }
    };

    render() {
        // This component doesn't have to render anything, but it can render
        // submitting state.
        return null;
    }
}

const AutoSaveComponent2 = React.memo<IOwnProps>((props) => {
    const { values, debounce, onSave, current } = props;
    let timeout: any;
    const [valuesState, setValues] = useState(current);

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

        const obj = Object.assign({}, current, values);
        let equesl = isEqual(valuesState, obj);
        console.warn('initialState', current);
        console.warn('values', values);
        console.warn('obj', obj);
        console.warn('this.state.values', this.state.values);
        console.warn('isEqual', equesl);

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
                    initial={props.initial}
                    current={props.current}
                    values={values}
                    debounce={props.debounce}
                    onSave={props.onSave}
                />
            )}
        </FormSpy>
    );
};
