import { useState } from "react";

type AuthUser = {
    name: string;
    email: string;
}

export const UseStateNotes = () => {
const [user, setUser] = useState<AuthUser>({} as AuthUser);

const handleLogin = () => {
    const user = { name: 'John', email: 'john@example.com' };
    setUser(user);
}

const handleLogout = () => {
    setUser({} as AuthUser);
}

    return (
        <>
            <h1>User Login:</h1>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout}>Logout</button>
            <p>name {user.name}</p>
            <p>email {user.email}</p>
        </>
    );
}

// useState with Type Assertion:
// const [user, setUser] = useState<AuthUser>({} as AuthUser);

// Here, we are using Type Assertion to tell TypeScript that the initial
// state is of type AuthUser, even though we are initializing it with
// an empty object. This allows us to avoid TypeScript errors when
// accessing properties of user before it is set by handleLogin.