import Button from './button';
import Input from './input';
import { useRef } from 'react';

export default function Form({ style, styleButton, title, inputs, ...props }) {
    const buttonRef = useRef(null);
    return (
        <form className={style} {...props}>
            {inputs.map((inputProps, index) => (
                <Input key={index} {...inputProps} />
            ))}
            <Button ref={buttonRef} type="submit" style={styleButton}>{title}</Button>
        </form>
    );
}
