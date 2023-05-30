import React, {ChangeEvent} from 'react';
import {IUseInputText} from "./use-input-text.hook";

export interface ITextProps extends React.InputHTMLAttributes<HTMLInputElement> {
    hook: IUseInputText
}

export const Text: React.FC<ITextProps> = (props) => {
    const { hook, type, value, onChange: _, ...other } = props;
    const onChange = function (e: ChangeEvent<HTMLInputElement>) {
        hook.value.set(e.target.value);
    }
    return (
        <input type={'text'} {...other} value={hook.value.get} onChange={onChange}/>
    );
};
