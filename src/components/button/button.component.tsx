import {BaseButton,
    GoogleSignInButton,
    InvertedButton,
    LoadingSpinner,} from './button.styles';

export enum BUTTON_TYPE_CLASSES {
    base = 'base',
    google = 'google-sign-in',
    inverted = 'inverted',
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton => 
({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
}[buttonType])

const Button = ({ children, buttonType, ...otherProps }) => {
    return ( 
    <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} 
        {...otherProps}
    >
        {children}
    </button>
    );
};

export default Button;