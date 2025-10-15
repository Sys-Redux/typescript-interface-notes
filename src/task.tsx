// TypeScript Tasks List

import './App.css';

function App() {

    type Task = {
        title: string;
        description: string;
        completed: boolean;
    }

    const tasks: Task[] = [];

    const task1: Task = {
        title: 'Learn TypeScript',
        description: 'Understand the basics of TypeScript',
        completed: false
    }
    const task2: Task = {
        title: 'Build a React App',
        description: 'Create a simple React application using TypeScript',
        completed: false
    }
    const task3: Task = {
        title: 'Deploy the App',
        description: 'Deploy the React application to a hosting service',
        completed: false
    }

    tasks.push(task1, task2, task3);

    console.log(tasks);

    return (
        <>
        {tasks.map((task, index) => (
            <div key={index} className='task' style={{border: '1px solid black', margin: '10px', padding: '10px'}}>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <p>Status: {task.completed ? 'Completed' : 'In Progress'}</p>
            </div>
        ))}
        </>
    )
}

export default App;