import React from "react";
import {Textfit} from "react-textfit";
import "./Screen.css";
import {ConnectDragSource} from "react-dnd";

type ScreenPropsType = {
    drag?:ConnectDragSource,
    style: { margin:"0px 0px", cursor?: "move"|"auto", opacity?: "50%" | "100%", boxShadow?: "none" },
    value: number,
    tipForScreen?: boolean
    disabled:boolean
}

const Screen = ({drag, style, value, tipForScreen, disabled}:ScreenPropsType) => {

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
