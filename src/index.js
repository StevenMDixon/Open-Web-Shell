import React, { useState, useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';
import { ShellWrapper, LineInput, LineWrapper, ShellLocation, LineOutput, shellColors} from './styled-components';
import { Engine } from './engine';
import { defaultCommands } from './defaultCommands';

function Shell({ functionList, config, styles = {} }) {
    //Create a state that holds our styles
    const [stateStyles, setStateStyles] = useState(styles);
    //Create a state that holds input lines
    const [lines, setLines] = useState([{ id: 0, inst: "" }]);
    //first run check
    const isFirstRun = useRef(true);
    //Create a reference to the current shell component so that we can maintain focus when 
    //creating new lines
    const shell = useRef(null);
    //create an effect that uses the ref to update our focus when a new line is added to state.
    const isCleared = useRef(false);
    //for enter
    useEffect(() => {
        //check if this is the first run so that shell is not autofocused on
        if (!isFirstRun.current) {
            let shellLinesToFocus = shell.current.querySelectorAll(`._shelllines`);
            shellLinesToFocus[lines.length - 1].focus();
        }
        isFirstRun.current = false;
    }, [lines.length])
    //for clear screen
    useEffect(() => {
        //create ability to clear screen without callbacks and timers
        if (isCleared.current) { setLines([{ id: 0, inst: "" }]); isCleared.current = false }
    }, [lines])
    //state from props for style prop
    useEffect(() => {
        setStateStyles(styles);
    }, [styles])

    //Update managed input in shell.
    const updateLineValue = (e) => {
        setLines(lines.map(item => item.id + "Lines" === e.target.id ? { id: item.id, inst: e.target.value } : item))
    }
    //Provide functions for context for the default functions
    const defaultUseFunctions = {
        clearLines: () => { isCleared.current = true },
        setColor: (e) => { 
            let selected = {}
            let options = e.split("").slice(0,2);
            if(options.length !== 2){
                return `Please Provide a two digit hexadecimal number to set the foreground and background`
            }else{
                if(options[0].toUpperCase() === options[1].toUpperCase()){
                    return `Please do not specify the same color for foreground and background.`
                }
                else{
                    if(shellColors[options[0]]){
                        selected.color = shellColors[options[0].toUpperCase()] || null;
                    }
                    if(shellColors[options[1]]){
                        selected.backgroundColor = shellColors[options[1].toUpperCase()] || null;
                    }
                    
                    setStateStyles({ ...stateStyles, ...selected }) }
                }
            }
    }
    // Apply the provided Functions from props to our engine, called when enter is detected.
    const applyFunction = (commandFromPrompt) => {
        let completeCommands = defaultCommands(defaultUseFunctions, functionList, config.defaultFunctions);
        return Engine(completeCommands, commandFromPrompt, config.defaultError);
    }
    // Captures focus when Shell component is clicked on
    const captureFocus = (e) => {
        if (!e.target.matches('input') || e.target.disabled) {
            let shellLinesToFocus = shell.current.querySelectorAll(`._shelllines`);
            shellLinesToFocus[lines.length - 1].focus();
        }
    }
    //Checks for return character any time a keydown is detected
    //Also Catches tabs and prevent them from changing focus
    const checkForReturns = (e) => {
        if (e.key === "Tab") {
            e.preventDefault();
        }
        if (e.key === "Enter") {
            e.preventDefault();
            let output = applyFunction(lines[lines.length - 1].inst);
            setLines([...lines.map(item => item.id === lines.length - 1 ? { ...item, out: output } : item), { id: lines.length, inst: "" }])
        }
    }
    const createOutLines = (line) => {
        if (Array.isArray(line)) {
            //if engine returns we map the output to the LineOutput component
            return line.map(out => <LineOutput key={out + 'Output'}>{out}</LineOutput>)
        } else {
            //if user wants to use newline instead of creating an array themselves.
            if (line.includes('\n')) {
                return line.split('\n').map(out => <LineOutput key={out + 'Output'}>{out}</LineOutput>)
            } else
                //if the return is just one line of text return
                return <LineOutput>{line}</LineOutput>
        }
    }

    return (
        <ShellWrapper ref={shell} styles={stateStyles} onClick={captureFocus} onKeyDown={checkForReturns}>
            {lines.map((item, index) =>
                <React.Fragment key={item.id + 'F'}>
                    <LineWrapper key={item.id + 'L'}>
                        <ShellLocation key={item.id + 'S'}>{config.terminal || "root@system:~$"}</ShellLocation>
                        <LineInput
                            styles={stateStyles}
                            type='text'
                            autoComplete="off"
                            spellcheck="false"
                            autocorrect="off"
                            autocapitalize="off"
                            className="_shelllines"
                            id={item.id + "Lines"}
                            key={item.id + 'Input'}
                            disabled={index !== lines.length - 1}
                            value={item.inst}
                            onChange={updateLineValue}
                            maxLength={config.charMax || "30"}
                        />
                    </LineWrapper>
                    {item.out ? createOutLines(item.out) : null}
                </React.Fragment>
            )}
        </ShellWrapper>
    );
}

Shell.propTypes = {
    /** Array of Objects containing functions */
    functionList: PropTypes.array,
    /** Object Whos key change aspects of the shell */
    config: PropTypes.object,
    /** CSS in jss styles for shell component */
    styles: PropTypes.object
};

Shell.defaultProps = {
    functionList: [],
    config: {},
    styles: {}
}

export { Shell };