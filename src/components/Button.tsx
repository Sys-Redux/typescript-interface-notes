// Event prop
interface ButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = (props) => {
    return <button onClick={props.onClick}>Click Me</button>
}

export default Button;