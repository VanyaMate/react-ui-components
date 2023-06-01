import {MutableRefObject, useMemo, useRef, useState} from "react";
import {IInput, IInputStatus} from "../input/input.interface";

export type Data<T> = T | { [key: string]: any };
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
        errors: string[]
    },
};

export const useForm = function<T> (onSubmit?: (formResponse: FormResponse<T>) => void, inputs: IInput[] = []): FormResponse<T> {
    const [formData, setFormData] = useState<FormData>(new FormData());
    const [data, setData] = useState<Data<T>>({});
    const formRef = useRef<HTMLFormElement | null>(null);
    const valid = useMemo(() => {
        let status = true;
        const errors: string[] = inputs
            .filter((input) => {
                if (!input.valid.status) {
                    status = false;
                    return true;
                }
                return false;
            })
            .map((error) => {
                return error.valid.message
            })

        return {status, errors};
    }, inputs);

    return {
        formData: {
            get: formData,
            set: setFormData,
        },
        data: {
            get: data,
            set: setData,
        },
        onSubmit,
        ref: formRef,
        valid: valid
    }
}