// Children Props
import React from "react";

type HeaderProp = {
    children: string;
}

const Header: React.FC<HeaderProp> = ({ children }: HeaderProp) => {
    return (
        <h1>{children}</h1>
    )
}

export default Header;

/*
In React w/ TypeScript, the children prop represents the content passed
between the opening and closing tags of a component.
To type the children prop, you can use the React.ReactNode type,
which is a union type that includes all possible types that can be rendered
in React, such as strings, numbers, elements, fragments, portals, and arrays of these types.

React.propsWithChildren is a utility type that automatically includes
the children prop in your component's props type definition.
This is useful when you want to create a component that can accept children
without explicitly defining the children prop in your props interface.
*/