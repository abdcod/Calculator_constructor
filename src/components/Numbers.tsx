import React from 'react';
import "./Numbers.css"
import {ConnectDragSource} from "react-dnd";

type NumbersPropsType = {
    children: JSX.Element[];
    numbersDrag?: ConnectDragSource;
    style: {borderRadius?: 0, boxShadow?: "none", opacity?: "50%" | "100%", cursor?: "move" | "auto"}
    dragTopTipForNumbers?: boolean
    dragUnderTipForNumbers?: boolean
}

const Numbers = ({children, numbersDrag, style, dragTopTipForNumbers, dragUnderTipForNumbers}:NumbersPropsType) => {

    let classes = "numbers";
    if (dragUnderTipForNumbers) {
        classes = "numbers withUnderTip"
    }
    if (dragTopTipForNumbers) {
        classes = "numbers withTopTip"
    }

    return (
        <div ref={numbersDrag} style={style} className={classes}>
            {children}
        </div>
    );
};

export default Numbers;