interface CounterProps {
    onIncrement: () => void;
    onDecrement: () => void;
    onMultiply: () => void;
}

const CounterCallbackComponent: React.FC<CounterProps> = ({ onIncrement, onDecrement, onMultiply }) => {
    return (
        <div>
            <button onClick={onIncrement}>Increment</button>
            <button onClick={onDecrement}>Decrement</button>
            <button onClick={onMultiply}>Multiply</button>
        </div>
    );
};

export default CounterCallbackComponent;

// This code defines a React functional component named CounterCallbackComponent.
// It accepts two props: onIncrement and onDecrement, both of which are functions that take no arguments and return void.
// The component renders two buttons: one for incrementing and one for decrementing.
// When the Increment button is clicked, it calls the onIncrement function passed as a prop.
// When the Decrement button is clicked, it calls the onDecrement function passed as a prop.
// When the Multiply button is clicked, it calls the onMultiply function passed as a prop.