export interface Person {
    name: string;
    age: number;
    email?: string; // Optional property
}

export interface ProfileProps {
    person: Person;
    message: string;
}

/* Interfaces are used to define the structure of an object.
They help in type-checking and ensuring that objects adhere to a specific shape. */