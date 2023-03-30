import React from 'react';
import "./Equals.css"
import {ConnectDragSource} from "react-dnd";

type EqualsPropsType = {
        children: JSX.Element
        equalsDrag?: ConnectDragSource
        style: { opacity?: "50%" | "100%", cursor?: "move" | "auto", borderRadius?: 0, boxShadow?: "none" }
        dragTopTipForEquals?: boolean
}

const Equals = ({children, equalsDrag, style, dragTopTipForEquals}: EqualsPropsType) => {

    let classes = "equals_wrapper";
    if (dragTopTipForEquals) {
        classes = "equals_wrapper topTipForEquals"
    }

    return (
        <div style={style} ref={equalsDrag} className={classes}>
            {children}
        </div>
    );
};

export default Equals;