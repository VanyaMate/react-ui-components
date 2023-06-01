import React, {ChangeEvent, useMemo} from 'react';
import {IUseInputText, useInputText} from "./use-input-text.hook";
import css from './input-text.module.scss';

export interface ITextProps extends React.InputHTMLAttributes<HTMLInputElement> {
    hook?: IUseInputText
}

const Text: React.FC<ITextProps> = (props) => {
    const { hook, type, value, name, onChange: _, className, ...other } = props;
    const current = useInputText(String(props.value ?? ''), { name: name ?? '' });
    const activeHook = useMemo(() => hook ?? current, [hook, current]);

    const onChange = function (e: ChangeEvent<HTMLInputElement>) {
        activeHook.value.set(e.target.value);
    }

    return (
        <input
            type={type ?? 'text'}
            className={[css.container, className].join(' ')}
            value={activeHook.value.get}
            onChange={onChange}
            data-valid={activeHook.valid.status}
            name={activeHook.name}
            {...other}
        />
    );
};

export default Text;
