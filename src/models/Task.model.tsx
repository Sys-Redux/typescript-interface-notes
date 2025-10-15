export interface Task {
    id: number;
    title: string;
    status: 'completed' | 'in-progress' | 'pending';
    description?: string; // Optional property
}