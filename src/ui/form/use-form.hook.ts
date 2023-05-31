import {MutableRefObject, useRef, useState} from "react";

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
    ref: MutableRefObject<HTMLFormElement | null>
};

export const useForm = function<T> (onSubmit?: (formResponse: FormResponse<T>) => void): FormResponse<T> {
    const [formData, setFormData] = useState<FormData>(new FormData());
    const [data, setData] = useState<Data<T>>();
    const formRef = useRef<HTMLFormElement | null>(null);

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
    }
}