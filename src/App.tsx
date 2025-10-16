// Interfaces Typed Props

import 'bootstrap/dist/css/bootstrap.min.css';
import type { Person, ProfileProps } from './models/Person.model';
import PersonComponent from './components/PersonComponent';
import Status from './components/Status';
import Header from './components/Header';
import NestedComponentProp from './components/NestedComponent';
import Button from './components/Button';
import TaskList from './components/TaskList';
import type { Task } from './models/Task.model';
import { Container, Stack } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Counter from './components/Counter';
import { useState } from 'react';

function App() {

    const student: Person = {
        name: "John",
        age: 25,
        email: "johnB@gmail.com"
    }
    const student2: Person = {
        name: "Jane",
        age: 30
    }

    const profileData: ProfileProps = {
        person: student2,
        /* If we change student to any other value/data type, we get an error
        because this attribute is required in the ProfileProps type */
        message: "This is a message from the parent component!"
    }

    const handleClick = () => {
        alert("Button clicked!");
    }

    const tasks: Task[] = [
        { id: 1, title: 'Clean room', status: 'pending' },
        { id: 2, title: 'Do laundry', status: 'in-progress', description: 'Wash and fold clothes' },
        { id: 3, title: 'Grocery shopping', status: 'completed', description: 'Buy fruits and vegetables' }
    ]

    const [count, setCount] = useState<number>(0);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        setCount(count - 1);
    };

    const handleMultiply = () => {
        setCount(count * 2);
    };

    return (
        <div className='d-flex flex-column align-items-center justify-content-center vh-100 mt-4'>
            <p>
            {student.name} is {student.age} years old. You can contact him at {student.email}
            </p>
            <p>{profileData.message}</p>
            <Card>
                <Card.Body>
                    <PersonComponent {...profileData} />
                </Card.Body>
            </Card>
            <Status />
            <Header>Hey there buddy!</Header>
            <NestedComponentProp>
                <h3>This is a children component</h3>
                <Status />
                {/* We passed Status to NestedComponentProp as a children */}
            </NestedComponentProp>
            <Button onClick={handleClick} />
            <Container className="d-flex flex-column align-items-center justify-content-center mt-4">
                <h2>Tasks:</h2>
                <div>
                    <Stack direction='horizontal'>
                        {tasks.map((task) => (
                            <TaskList {...task} />
                        ))}
                    </Stack>
                </div>
            </Container>
            <Container>
                <h2 className='mt-4'>Counter:</h2>
                <p>Count: {count}</p>
                <Counter
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                    onMultiply={handleMultiply}
                />
            </Container>
        </div>
    );
}

export default App;