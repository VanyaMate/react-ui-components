import React, {FormEvent, useRef} from 'react';

export interface IForm extends Omit<React.FormHTMLAttributes<HTMLFormElement>, { onSubmit: (e: FormEvent<HTMLFormElement>) => void }> {
    onSubmit: (formData: FormData) => void;
}

const Form: React.FC<IForm> = (props) => {
    const { action, ...other } = props;
    const formRef = useRef<HTMLFormElement | null>(null);

    const onSubmit = function (e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        props.onSubmit(formRef.current ? new FormData(formRef.current!) : new FormData());
    }

    return (
        <form {...other} onSubmit={onSubmit} ref={formRef}/>
    );
};

export default Form;