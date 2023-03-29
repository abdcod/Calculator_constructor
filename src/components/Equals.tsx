import React from 'react';
import "./Equals.css"

const Equals = ({children, equalsDrag, style, dragTopTipForEquals}: any) => {

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