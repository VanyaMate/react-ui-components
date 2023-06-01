import {useEffect, useMemo, useState} from "react";
import {IInput} from "../input.interface";

export interface IUseInputTextOptions {
    name?: string;
    validationFunction?: (value: string) => boolean;
    message?: ((value: string) => string) | string;
    debounce?: number;
}

export interface IUseInputText extends IInput {}

export const useInputText = function (defaultValue: string = '', options: IUseInputTextOptions = {}): IUseInputText {
    const [value, setValue] = useState<string>(defaultValue);
    const [changed, setChanged] = useState<boolean>(false);
    const [check, setCheck] = useState<boolean>(false);

    useEffect(() => {
        return () => setChanged(true);
    }, [value, check])

    const valid = useMemo<boolean>(() => {
        if (options.validationFunction) {
            return options.validationFunction(value);
        } else {
            return true;
        }
    }, [value, check]);

    return {
        name: options.name ?? '',
        value: {
            get: value,
            set: setValue,
        },
        valid: {
            status: changed ? valid : true,
            message: typeof options.message === 'function' ? options.message(value) : (options.message ?? ''),
            executeCheck: () => setCheck(prev => !prev),
        }
    }
}

export type UseInputText = (defaultValue: string, options: IUseInputTextOptions) => IUseInputText;
