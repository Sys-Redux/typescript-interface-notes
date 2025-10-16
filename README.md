# React Hooks Notes

## 1. useState()
Let's you add state to a functional component. It returns a *state variable* & a *setter* function to update that state.<br />
You can use it to track values that change over time (like form input, counters, etc.), & updating the state triggers React to re-render component w/ the new value.<br />
TypeScript infers the state type from the initial value, but also allows you to provide a type argument.<br />
*Example:*<br />
```tsx
import { useState } from 'react';

// State inferred as number, or explicitly annotate w/ <number>
const [count, setCount] = useState<number>(0);

// Update state (TS ensures 'count' is a number)
setCount(prevCount => prevCount + 1);

```
**Tip:** Always use the provided setter function, as modifying the state variable directly won't trigger re-render & is considered a React Anti-Pattern.
## 2. useEffect()
Enables component to perform "side effects" (e.g. fetching data, logging, DOM updates) after it renders.<br />
By default, the effect runs after every completed render if the component, unless you provide a dependency array.<br />
*Example:*<br />
```tsx
import { useEffect, useState } from 'react';

const [count, setCount] = useState(0);

// Update doc title on count change
useEffect(() => {
    document.title = `Count: ${count}`;
}, [count]); // Runs on mount & when count changes

// Optional: cleanup (clear on unmount)
useEffect(() => {
    const timer = setInterval(() => setCount(c => c + 1), 1000);
    return () => clearInterval(timer);
}, []);
```
**Tips:**<br />
You can pass an empty array [] to tell the effect to only run once after initial render.<br />
You can return a cleanup function inside the useEffect, which will run on component unmount, and is useful for removing event listeners.
## 3. useContext()
Grants component **global data access** from a React context provider without passing props down manually.<br />
It shares state across components that need it, no matter how deeply nested they are.<br />
With TypeScript, define the shape of the context's value & use it as a generic when creating the context, ensuring useContext return a properly typed value.<br />
*Example:*<br />
```tsx
import React, { createContext, useContext } from 'react';

// 1. Define context value type
type Theme = 'light' | 'dark';

// 2. Create context w/ default value
const ThemeContext = createContext<Theme>('light');

function Toolbar() {
    // Provide context value to children
    return (
        <ThemeContext.Provider value='dark'>
            <ThemedButton />
        </ThemeContext.Provider>
    );
}

function ThemedButton() {
    // 3. Consume context value (inferred as Theme)
    const theme = useContext(ThemeContext);
    return <button>{`Current theme: ${theme}`}</button>;
}
```
**Tip:** Any component reading context will re-render whenever context changes, so avoid updating context too frequently or storing rapidly changing values in context.
## 4. useRef()
Used for persisting mutable values or accessing DOM elements without causing re-renders, this value is held by **.current**.<br />
Often used to access DOM nodes or keep track of mutable values without causing re-renders(e.g. tracking the previous value of a prop or storing an interval ID).<br />
When referencing a DOM element, provide the element's type as a generic argument to useRef (include null if it starts empty).<br />
For non-DOM values, specify the value type. TypeScript will then know what ref.current is, preventing the need for "any."<br />
*Example:*<br />
```tsx
import { useEffect, useRef } from 'react';

// Create ref for an input element (initially null)
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
    // Auto-focus the input on mount, safe because we check current is not null
    inputRef.current?.focus();
}, []);

return <input ref={inputRef} type='text' placeholder='Focus on mount' /;>
```
**Tip:** useRef can be used to keep mutable data (like a counter or flag) that you want to persist renders, which makes it useful for tracking a previous renders value or debouncing calls.
## 5. useMemo()
Returns a **memoized (cached) value,** which optimizes performance by dodging expensive calculations on every render.<br />
Provide a function & an array, React will only re-run the function & update value when dependency changes, but if dependency remains the same, the previous result of the function is reused.<br />
*Example:*<br />
```tsx
import { useMemo, useState } from 'react';

const [count, setCount] = useState(0)

// Heavy computation simulated by squaring the count
const squared = useMemo((): number => {
    console.log('Computing square...');
    return count * count;
}, [count]);

console.log(`Squared value: ${squared});
```
**Tips:**<br />
useMemo() is great for tasks like filtering a large list or performing complex math if the inputs don't change.<br />
If the compute is cheap, skip useMemo(), as unnecessary useMemo() can result in added overhead.
## 6. useCallback()
Returns a **memoized callback function,** similar to useMemo but for functions.<br />
Provide a function & dependencies, useCallback will return the same function instance until there's a change in dependencies.<br />
This is useful when passing callbacks to child components to prevent unnecessary re-renders, or to avoid re-creating functions on every render.<br />
*Example:*<br />
```tsx
import { useCallback, useState } from 'react';

const [count, setCount] = useState(0);

// Memoize a function that uses 'count'
const showCount = useCallback(() => {
    alert(`Count is ${count}`);
}, [count]);

// Using the callback
<button onClick={showCount}>Show Count</button>
```
**Tip:** Avoid overusing useCallback without reason, as if it's not providing a realisable gain, it could complicate your code for no reason.
## 7. useReducer()
An alternative to useState() for managing state that involves **more complex logic or multiple sub-values.**<br />
Define a reducer function that describes how to update state based on an **action**, useReducer gives you current state & a **dispatch** function to send actions to that reducer.<br />
Similar to Redux but on a component level.<br />
In TypeScript, define an interface/type for your state & a type for actions, ensuring that the reducer function parameters & return value are strongly typed, and that dispatching actions will be type-checked.<br />
*Example:*<br />
```tsx
import { useReducer } from 'react';

// Define shape of state
interface State {
    count: number;
}

// Define all possible actions w/ a union type
type Action =
    | { type: 'increment' }
    | { type: 'decrement' }
    | { type: 'reset' };

// Initial state must match state type
const initialState: State = { count: 0 };

// The reducer function acceps State + Action types & returns new state
function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        case 'reset':
            return initialState;
        default:
            // Using exhaustive checking, but if an unknown action slips through:
            return state;
    }
}

// Use the reducer in a component
const [state, dispatch] = useReducer(reducer, initialState);
console.log(state.count);
dispatch({ type: 'increment' });
```
**Tip:** The **dispatch** function triggers the reducer -- it's like "sending an action" that describes how to update state. This makes transitions more predictable & easier to debug, since all updates flow through the reducer.
## 8. useLayoutEffect()
Is almost identical to useEffect in usage & typing, but it fires earlier in the render cycle (after DOM mutations but before the browser paints).<br />
Use when you need to measure or monitor the DOM layout synchronously and have those changes applied immediately, to avoid visible flicker.<br />
*Example:*<br />
```tsx
import { useLayoutEffect, useRef } from 'react';

const divRef = useRef<HTMLDivElement>(null);

useLayoutEffect(() => {
    // Measure DOM layout before paint
    if (divRef.current) {
        const rect = divRef.current.getBoundingClientRect();
        console.log('Height of div:', rect.height);
    }
}, []);

return <div ref={divRef}>Hello, measure me!</div>;
```
In this example, we use a ref to access a DOM element and measure its height. The hook runs on mount (empty dependency array), ensuring we log the size before the browser repaints.<br />
**Tips:**<br />
Because useLayoutEffect runs before painting, it **blocks the browser from displaying the content** until it finishes, so avoid heavy computation.<br />
Example usage: if you need to measure an element's size & then update state or apply styles before the browser paints.
## 9. useImperativeHandle()
An advanced hook used with *React.forwardRef* to customize the value exposed by a ref.<br />
Rather than exposing the whole child DOM node, you can expose specific methods or properties.<br />
In TypeScript, define an interface for the ref handle & use that as a generic type for forwardRef & useImperativeHandle. This gives compile-time safety for ref interactions between parent & child.<br />
*Example:*<br />
```tsx
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

// Define methods/properties parent can access
interface MyButtonHandle {
    focus: () => void;
}
// (Optional) define props for the component
type MyButtonProps = { label: string };

const MyButton = forwardRef<MyButtonHandle, MyButtonProps>((props, ref) => {
    const innerRef = useRef<HTMLButtonElement>(null);

    // Expose a custom handle to parent via the ref
    useImperativeHandle(ref, () => ({
        focus: () => innerRef.current?.focus()
        // parent can call focus()
    }), []);

    return <button ref={innerRef}>{props.label}</button>;
});

// Usage in parent component
const buttonRef = useRef<MyButtonHandle>(null);
<MyButton ref={buttonRef} label='Click Me!' />;
buttonRef.current?.focus();
// calls the custom focus method on MyButton
```
**Tips:**<br />
Only use this hook when a child ,ust expose an imperative method (e.g. a custom input component needing an externally callable .focus() method).<br />
Define clear types for what is exposed to keep contact between components explicit & type-safe.
## 10. useId
Generates a unique ID string for each instance of a component, ensuring consistent IDs across server & client renders.<br />
*Example:*<br />
```tsx
import { useId } from 'react';

function TextField(props: { label: string }) {
    const id = useId(); // id is a unique string
    return (
        <div>
            <label htmlFor={id}>{props.label}</label>
            <input id={id} type='text' />
        </div>
    );
}
```
## 11. useDebugValue
Specialized hook for **custom hook devs.** Enables labelling the value of a custom hook for use in React DevTools. It doesn't effect your app's behavior at all.<br />
*Example:*<br />
```jsx
import { useState, useEffect, useDebugValue } from 'react';

//Example custom hook
function useOnlineStatus(userId) {
    const [isOnline, setIsOnline] = useState(false);
    useEffect(() => {
        // ...subscribe to user online status & update isOnline
    }, [userId]);
    useDebugValue(isOnline ? 'Online' : 'Offline');
    // Label for DevTools
    return isOnline;
}
```