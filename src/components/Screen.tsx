import React from "react";
import {Textfit} from "react-textfit";
import "./Screen.css";

const Screen = ({drag, style, value, tipForScreen, disabled}:any) => {

    let classes = "screen_wrapper";

    if (tipForScreen === true) {
        classes = classes + " withUnderTip"
    }

    return (<div ref={drag} style={style} className={classes}>
            <Textfit className="screen" mode="single" max={40}>
                {disabled ? 0 : value}
            </Textfit>
        </div>
    );
};

export default Screen;
