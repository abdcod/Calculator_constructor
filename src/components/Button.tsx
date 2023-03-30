import React from "react";
import "./Button.css";

type ButtonPropsType = {
        className?: "equals" | "" | "equals enabled" | "enabled"
        value: number | string
        onClick?:  React.MouseEventHandler<HTMLButtonElement> | undefined
        id?:number
        style: {cursor: "pointer" | "auto" | "move"}
}

const Button = ({className, value, onClick, id, style}: ButtonPropsType ) => {

    return (
        <button style={style} className={className} onClick={onClick} id={"item-" + id}>
            {value}
        </button>
    );
};

export default Button;
