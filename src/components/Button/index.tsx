import React, { ButtonHTMLAttributes } from 'react';

import './styles.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    value: string;
}

const Button: React.FC<ButtonProps> = ({ value, ...rest }) => {
    return <button {...rest}>{ value }</button>;
}


export default Button;
