import { Card } from 'react-bootstrap';
import type { Task } from '../models/Task.model';

const TaskList: React.FC<Task> = (props) => {
    return (
        <Card>
            <Card.Title>{props.title}</Card.Title>
            <Card.Body>
                {props.description || 'No description provided'}
                <p>{props.status}</p>
            </Card.Body>
        </Card>
    );
}

export default TaskList;