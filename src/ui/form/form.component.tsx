import React, {FormEvent, useRef} from 'react';
import {Data, FormResponse} from "./use-form.hook";

export interface IForm extends React.FormHTMLAttributes<HTMLFormElement> {
    hook: FormResponse<any>
}

const Form: React.FC<IForm> = (props) => {
    const { action, ...other } = props;
    const formRef = props.hook.ref;

    const saveData = function () {
        const formData: FormData = formRef.current ? new FormData(formRef.current!) : new FormData();
        const formDataKeys = formData.keys();
        const data = {};

        let key = formDataKeys.next();
        while (key.value) {
            data[key.value] = formData.getAll(key.value);
            key = formDataKeys.next();
        }

        props.hook.formData.set(formData);
        props.hook.data.set(data);
        props.hook.formData.get = formData;
        props.hook.data.get = data;
    }

    const onSubmit = function (e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        saveData();
        props.hook.onSubmit?.(props.hook);
    }

    return (
        <form
            {...other}
            onSubmit={onSubmit}
            ref={formRef}
            onChange={saveData}
        />
    );
};

export default Form;