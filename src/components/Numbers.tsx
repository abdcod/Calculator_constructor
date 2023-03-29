import React from 'react';
import "./Numbers.css"

const Numbers = ({children, numbersDrag, style, dragTopTipForNumbers, dragUnderTipForNumbers}:any) => {

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