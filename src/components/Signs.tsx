import React from 'react';
import "./Signs.css"
import {ConnectDragSource} from "react-dnd";

type SignsPropsType = {
    children:JSX.Element[],
    signsDrag?:ConnectDragSource,
    style?: { borderRadius?: 0, boxShadow?: "none", opacity?: "50%" | "100%", cursor?: "move" | "auto"},
    dragBottomTipForSigns?:boolean
    dragTopTipForSigns?:boolean
}

const Signs = ({children, signsDrag, style, dragBottomTipForSigns, dragTopTipForSigns}:SignsPropsType) => {

    let classes = "signs";
    if (dragBottomTipForSigns) {
        classes = classes + " withUnderTip "
    }
    if (dragTopTipForSigns) {
        classes = classes + " withTopTip"
    }

    return (
        <div ref={signsDrag} style={style} className={classes}>
            {children}
        </div>
    );
};

export default Signs;