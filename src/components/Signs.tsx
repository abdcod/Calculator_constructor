import React from 'react';
import "./Signs.css"

const Signs = ({children, signsDrag, style, dragBottomTipForSigns, dragTopTipForSigns, disabled}:any) => {

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