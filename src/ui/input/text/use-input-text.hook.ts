import {useMemo, useState} from "react";

export interface IUseInputTextOptions {
    validationFunction?: (value: string) => boolean;
    debounce?: number;
}

export interface IUseInputText {
    value: {
        get: string;
        set: (value: string) => void;
    };
    valid: boolean;
}

export const useInputText = function (defaultValue: string = '', options: IUseInputTextOptions = {}): IUseInputText {
    const [value, setValue] = useState<string>(defaultValue);
    const valid = useMemo<boolean>(() => {
        if (options.validationFunction) {
            return options.validationFunction(value);
        } else {
            return true;
        }
    }, [value]);

    return {
        value: {
            get: value,
            set: setValue,
        },
        valid: valid
    }
}

export type UseInputText = (defaultValue: string, options: IUseInputTextOptions) => IUseInputText;
