// Event prop
interface ButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = (props) => {
    return <button onClick={props.onClick}>Click Me</button>
}

export default Button;

/* Typing event handlers as props
    Define an interface that defines the shape of the props your component
    expects, including the event handler.
    Use the interface in your component definition to ensure type safety.
*/