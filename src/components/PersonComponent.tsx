import React from "react";
import type { ProfileProps } from "../models/Person.model";

/* Expects to receive a prop that is an object w/ a Person key w/ a
value of a Person instance & a message key w/ a string value */
const PersonComponent: React.FC<ProfileProps>= (props) => {
    return (
        <div>
            <h1>Person Details:</h1>
            <h2>{props.person.name}</h2>
            <p>{`Age: ${props.person.age}`}</p>
            <p>{`Email: ${props.person.email || 'No email provided'}`}</p>
            <p>{`Message: ${props.message }`}</p>
        </div>
    )
}

export default PersonComponent;