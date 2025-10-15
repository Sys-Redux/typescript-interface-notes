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