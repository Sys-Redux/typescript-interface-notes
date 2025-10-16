export interface Task {
    id: number;
    title: string;
    status: 'completed' | 'in-progress' | 'pending';
    description?: string; // Optional property
}

/* This interface defines the structure of a Task object.
It includes properties for id, title, status, and an optional description.
The status property is a union type that can only take one of the specified string values. */