// @ts-ignore
import React, {useState} from "react";
import Screen from "./components/Screen";
import Button from "./components/Button";
import Signs from "./components/Signs";
import Numbers from "./components/Numbers";
import Equals from "./components/Equals";
import {useDrag, useDrop} from "react-dnd";

// @ts-ignore
import eye from "./content/eye.svg"
// @ts-ignore
import brackets1 from "./content/brackets1.svg"

const math_signs = ["/", "X", "-", "+"];
const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."];

const toLocaleString = (num: any) =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num: any) => num.toString().replace(/\s/g, "");

const deleteNulls = (str: any) => {
    while (str[str.length - 1] === "0") {
        str = str.slice(0, -1);
    }
    return str;
}

const math = (a: any, b: any, sign: any) => {

    let temp;
    if (sign === "+") {
        temp = a + b;
    } else if (sign === "-") {
        temp = a - b;
    } else if (sign === "X") {
        temp = a * b;
        if (!Number.isInteger(temp)) {
            temp = temp.toFixed(20);
            temp = deleteNulls(temp);
        }
    } else if (sign === "/") {
        temp = a / b;
        if (!Number.isInteger(temp)) {
            temp = temp.toFixed(20);
            temp = deleteNulls(temp);
        }
    } else {
        temp = a;
    }
    return temp;
}

const zeroDivisionError = "Не определено";

const App = () => {
    let [calc, setCalc] = useState({
        sign: "",
        num: 0,
        res: 0,
    });

    const [runTimeMode, setRunTimeMode] = useState(false)

    const toggleConstructorMode = () => {
        if (runTimeMode) {
            setScreenBoard(false);
            setButtonBoard([]);
            setRunTimeMode(false);
            calc.res = 0;
        } else setRunTimeMode(true)
    }

    const [screenBoard, setScreenBoard] = useState(false);

    const [{isDragging}, drag] = useDrag(() => ({
        type: "screen",
        item: {id: "1"},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    const [, drop] = useDrop(() => ({
        accept: "screen",
        drop: (item: any) => addScreen(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }))

    const addScreen = (id: any) => {
        setScreenBoard(true)
    }

    let [buttonBoard, setButtonBoard] = useState([]);

    const [{isSignsDragging}, signsDrag] = useDrag(() => ({
        type: "button",
        item: {id: "1"},
        collect: (monitor) => ({
            isSignsDragging: !!monitor.isDragging()
        })
    }))

    const [{isNumbersDragging}, numbersDrag] = useDrag(() => ({
        type: "button",
        item: {id: "2"},
        collect: (monitor) => ({
            isNumbersDragging: !!monitor.isDragging()
        })
    }))

    const [{isEqualsDragging}, equalsDrag] = useDrag(() => ({
        type: "button",
        item: {id: "3"},
        collect: (monitor) => ({
            isEqualsDragging: !!monitor.isDragging()
        })
    }))

    const [, buttonsDrop] = useDrop(() => ({
        accept: "button",
        drop: (item: any) => addSigns(item.id),
        collect: (monitor) => ({
            isButtonsOver: !!monitor.isOver(),
        }),
    }))

    const addSigns = (id: any) => {
        setButtonBoard((prev: any) => {
            if (prev.length < 3) {
                return [
                    ...prev, {id: id}
                ]
            } else return prev;
        })
    }

    const numClickHandler = (e: any) => {
        e.preventDefault();
        const value = e.target.innerHTML;
        if (removeSpaces(calc.num).length < 16) {
            setCalc({
                ...calc,
                num:
                    removeSpaces(calc.num) % 1 === 0 && !calc.num.toString().includes(".")
                        ? toLocaleString(Number(removeSpaces(calc.num + value)))
                        : toLocaleString(calc.num + value),
                res: !calc.sign ? 0 : calc.res,
            });
        }
    };

    const comaClickHandler = (e: any) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        setCalc({
            ...calc,
            num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
        });
    };

    const signClickHandler = (e: any) => {
        setCalc({
            ...calc,
            sign: e.target.innerHTML,
            res: !calc.num
                ? calc.res
                : !calc.res
                    ? calc.num
                    : toLocaleString(
                        math(
                            Number(removeSpaces(calc.res)),
                            Number(removeSpaces(calc.num)),
                            calc.sign
                        )
                    ),
            num: 0,
        });
    };

    const equalsClickHandler = () => {
        if (calc.sign && calc.num) {
            setCalc({
                ...calc,
                res:
                    calc.num === "0" && calc.sign === "/"
                        ? zeroDivisionError
                        : toLocaleString(
                            math(
                                Number(removeSpaces(calc.res)),
                                Number(removeSpaces(calc.num)),
                                calc.sign
                            )
                        ),
                sign: "",
                num: 0,
            });
        }
    };

    const invertClickHandler = () => {
        setCalc({
            ...calc,
            num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
            res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
            sign: "",
        });
    };

    const percentClickHandler = () => {
        let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
        let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;
        setCalc({
            ...calc,
            num: (num /= Math.pow(100, 1)),
            res: (res /= Math.pow(100, 1)),
            sign: "",
        });
    };

    const resetClickHandler = () => {
        setCalc({
            ...calc,
            sign: "",
            num: 0,
            res: 0,
        });
    };

    const buttonClickHandler = (e: any, btn: any) => {
        btn === "C" || calc.res === zeroDivisionError
            ? resetClickHandler()
            : btn === "+-"
                ? invertClickHandler()
                : btn === "%"
                    ? percentClickHandler()
                    : btn === "="
                        ? equalsClickHandler()
                        : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                            ? signClickHandler(e)
                            : btn === "."
                                ? comaClickHandler(e)
                                : numClickHandler(e)
    }

    let buttonBordIds = buttonBoard.map((i: any) => i.id)

    return (<>
        <div className="container_for_toggle">
            <div className="wrapper_for_toggles">
                <button disabled={runTimeMode} className="toggle_buttons runtime_button"
                        onClick={toggleConstructorMode}><img className={runTimeMode ? "" : "enabled_img"} src={eye}
                                                             alt="eye"/> Runtime
                </button>
                <button onClick={toggleConstructorMode} disabled={!runTimeMode}
                        className="toggle_buttons constructor_button"><img
                    className={runTimeMode ? "enabled_img" : ""}
                    src={brackets1} alt="brackets"/> Constructor
                </button>
            </div>
        </div>
        <div className="drop_and_drag">
            <div className="drag_from">
                <Screen disabled={true} screenBoard={screenBoard} isDragging={isDragging}
                        drag={(!runTimeMode && !screenBoard) ? drag : (() => {
                        })} style={
                    {
                        margin: "0px 0px",
                        cursor: isDragging ? "move" : "auto",
                        opacity: (screenBoard || isDragging) ? "50%" : "100%",
                    }
                }
                        value={calc.num ? calc.num : calc.res}/>
                <Signs disabled={true}
                       signsDrag={(!runTimeMode && !buttonBordIds.includes("1")) ? signsDrag : (() => {
                       })} style={{
                    opacity: (buttonBordIds.includes("1") || isSignsDragging) ? "50%" : "100%",
                    cursor: isSignsDragging ? "move" : "auto",
                }}>
                    {math_signs.map((btn, i) => {
                        return (
                            <Button
                                // disabled={true}
                                style={{cursor: isSignsDragging ? "move" : "auto"}}
                                key={i}
                                value={btn}
                            />
                        );
                    })}
                </Signs>
                <Numbers style={{
                    opacity: (buttonBordIds.includes("2") || isNumbersDragging) ? "50%" : "100%",
                    cursor: isNumbersDragging ? "move" : "auto",
                }} numbersDrag={(!runTimeMode && !buttonBordIds.includes("2")) ? numbersDrag : (() => {
                })}>{numbers.map((btn, i) => {
                    return (
                        <Button
                            style={{cursor: isNumbersDragging ? "move" : "auto"}}
                            key={i}
                            id={i}
                            className={btn === "=" ? "equals" : ""}
                            value={btn}
                        />
                    );
                })}</Numbers>
                <Equals style={{
                    opacity: (buttonBordIds.includes("3") || isEqualsDragging) ? "50%" : "100%",
                    cursor: isEqualsDragging ? "move" : "auto",
                }} equalsDrag={(!runTimeMode && !buttonBordIds.includes("3")) ? equalsDrag : (() => {
                })}><Button
                    style={{cursor: isEqualsDragging ? "move" : "auto"}}
                    className="equals"
                    value="="
                /></Equals>

            </div>
            <div ref={drop} className="drop_to" style={{
                backgroundColor: (buttonBoard.length < 1 && !screenBoard && (isDragging || isSignsDragging || isNumbersDragging || isEqualsDragging)) ? "#F0F9FF" : "white",
                border: (!screenBoard && buttonBoard.length < 1) ? "2px dashed #C4C4C4" : "none"
            }}>
                <>{(!screenBoard && buttonBoard.length < 1) && <div className="wrapper_for_text">
                    <div className="text_about_drop">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                             fill="none">
                            <path d="M18.7778 1V5.44444" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M21 3.22222L16.5556 3.22222" stroke="black" strokeWidth="2"
                                  strokeLinecap="round"/>
                            <path
                                d="M12.3889 3.22222H5C2.79086 3.22222 1 5.01309 1 7.22223V16.2778M18.7778 9.61111V17C18.7778 19.2091 16.9869 21 14.7778 21H5C2.79086 21 1 19.2091 1 17V16.2778M1 16.2778L4.83824 12.4395C6.40034 10.8774 8.93298 10.8774 10.4951 12.4395C11.8961 13.8406 13.5664 15.5108 14.8889 16.8333"
                                stroke="black" strokeWidth="2" strokeLinecap="round"/>
                            <path
                                d="M18.7778 14.6111L18.2729 14.1062C16.7108 12.5441 14.1781 12.5441 12.616 14.1062L12.3889 14.3333"
                                stroke="black" strokeWidth="2" strokeLinecap="round"/>
                            <circle cx="12.1111" cy="7.66667" r="0.555556" fill="black"/>
                        </svg>
                        <p className="text_top">Перетащите сюда</p>
                        <p className="text_under">любой элемент<br/>из левой панели</p>
                    </div>
                </div>}</>
                {screenBoard && <div className="place_for_screen">
                    {
                        <Screen
                            tipForScreen={((buttonBoard.length === 0) && (screenBoard === true) && (isSignsDragging || isNumbersDragging || isEqualsDragging))}
                            style={{margin: "0px 0px", boxShadow: "none"}}
                            value={calc.num ? calc.num : calc.res}
                            disabled={false}/>
                    }
                </div>
                }

                {((screenBoard === false) && (buttonBoard[0]?.["id"] === "3") && isDragging) &&
                    <div className="place_for_screen tip_before_screen"></div>}
                {<>
                    <div ref={buttonsDrop} className="place_for_button">{buttonBoard.map((item: any) => {
                        switch (item.id) {
                            case "1":
                                let dragBottomTipForSigns = ((buttonBoard.length < 3) && (buttonBoard[buttonBoard.length - 1]["id"] === "1") && (isNumbersDragging || isEqualsDragging))
                                let dragTopTipForSigns = ((screenBoard === false) && (buttonBoard[0]["id"] === "1") && isDragging)

                                return (<Signs dragTopTipForSigns={dragTopTipForSigns}
                                               dragBottomTipForSigns={dragBottomTipForSigns} style={
                                    {
                                        borderRadius: 0,
                                        boxShadow: "none"
                                    }
                                }>
                                    {math_signs.map((btn, i) => {
                                        return (
                                            <Button
                                                style={{cursor: runTimeMode ? "pointer" : "auto"}}
                                                className={runTimeMode ? "enabled" : ""}
                                                key={i}
                                                value={btn}
                                                onClick={runTimeMode ? ((e: any) => buttonClickHandler(e, btn)) : undefined}
                                            />
                                        );
                                    })}
                                </Signs>)
                            case "2":
                                let dragUnderTipForNumbers = ((buttonBoard.length < 3) && (buttonBoard[buttonBoard.length - 1]["id"] === "2") && (isSignsDragging || isEqualsDragging))
                                let dragTopTipForNumbers = ((screenBoard === false) && (buttonBoard[0]["id"] === "2") && isDragging)

                                return (<Numbers dragTopTipForNumbers={dragTopTipForNumbers}
                                                 dragUnderTipForNumbers={dragUnderTipForNumbers} style={{
                                    borderRadius: 0,
                                    boxShadow: "none"
                                }}>{numbers.map((btn, i) => {
                                    return (
                                        <Button
                                            style={{cursor: runTimeMode ? "pointer" : "auto"}}
                                            key={i}
                                            id={i}
                                            className={runTimeMode ? "enabled" : ""}
                                            value={btn}
                                            onClick={runTimeMode ? ((e: any) => buttonClickHandler(e, btn)) : undefined}
                                        />
                                    );
                                })}</Numbers>);
                            case '3':
                                let dragTopTipForEquals = ((buttonBoard.length < 3) && (buttonBoard[buttonBoard.length - 1]["id"] === "3") && (isSignsDragging || isNumbersDragging))

                                return (<Equals dragTopTipForEquals={dragTopTipForEquals} style={
                                    {
                                        borderRadius: 0,
                                        boxShadow: "none"
                                    }
                                }>
                                    <Button
                                        style={{cursor: runTimeMode ? "pointer" : "auto"}}
                                        className={runTimeMode ? "equals enabled" : "equals"}
                                        value={"="}
                                        onClick={runTimeMode ? ((e: any) => buttonClickHandler(e, "=")) : undefined}
                                    />
                                </Equals>)
                            default:
                                return ""
                        }

                    })}</div>
                </>}
            </div>
        </div>
    </>)
}

export default App;

