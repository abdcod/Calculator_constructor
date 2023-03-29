import React from "react";
import "./Button.css";

const Button = ({className, value, onClick, id, style}: any ) => {

    return (
        <button style={style} className={className} onClick={onClick} id={"item-" + id}>
            {value}
        </button>
    );
};

export default Button;
