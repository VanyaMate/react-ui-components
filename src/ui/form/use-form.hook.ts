import {MutableRefObject, useMemo, useRef, useState} from "react";
import {IInput, IInputStatus} from "../input/input.interface";

export type Data<T> = T | { [key: string]: any };
export type InputError = { name: string, message: string };
export type FormResponse<T> = {
    formData: {
        get: FormData,
        set: (formData: FormData) => void,
    },
    data: {
        get: Data<T>,
        set: (data: Data<T>) => void,
    },
    onSubmit?: (formResponse: FormResponse<T>) => void,
    ref: MutableRefObject<HTMLFormElement | null>,
    valid: {
        status: boolean,
        errors: InputError[]
    },
};

export const useForm = function<T> (onSubmit?: (formResponse: FormResponse<T>) => void, inputs: IInput[] = []): FormResponse<T> {
    const [formData, setFormData] = useState<FormData>(new FormData());
    const [data, setData] = useState<Data<T>>({});
    const formRef = useRef<HTMLFormElement | null>(null);
    const valid = useMemo(() => {
        let status = true;
        const errors: InputError[] = inputs
            .filter((input) => {
                if (!input.valid.status) {
                    status = false;
                    return true;
                }
                return false;
            })
            .map((input) => {
                return { name: input.name, message: input.valid.message };
            })

        return {status, errors};
    }, inputs);

    const _onSubmit = (formResponse: FormResponse<T>) => {
        inputs.forEach((input) => input.valid.executeCheck());
        onSubmit?.(formResponse);
    }

    return {
        formData: {
            get: formData,
            set: setFormData,
        },
        data: {
            get: data,
            set: setData,
        },
        onSubmit: _onSubmit,
        ref: formRef,
        valid: valid
    }
}