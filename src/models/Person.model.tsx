export interface Person {
    name: string;
    age: number;
    email?: string; // Optional property
}

export interface ProfileProps {
    person: Person;
    message: string;
}