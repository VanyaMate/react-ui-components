import React from 'react';
import css from './button.module.scss';

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
}

const Button: React.FC<IButton> = (props) => {
    const { active, className, ...other } = props;

    return (
        <button className={[css.container, className, active ? css.active : ''].join(' ')} {...other}/>
    );
};

export default Button;