import React, { useState, useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';
import { ShellWrapper, LineInput, LineWrapper, ShellLocation, LineOutput, shellColors } from './styled-components';
import { Engine } from './engine';
import defaultCommands from './defaultCommands';

function Shell({ functionList, config, styles = {} }) {
  // Create a state that holds our styles
  const [stateStyles, setStateStyles] = useState(styles);
  // Create a state that holds input lines
  const [lines, setLines] = useState([{ id: 0, inst: "" }]);
  // first run check
  const isFirstRun = useRef(true);
  // Create a reference to the current shell component 
  // so that we can maintain focus when Creating new lines
  const shell = useRef(null);
  // Create an effect that uses the ref to update our 
  // focus when a new line is added to state.
  const isCleared = useRef(false);
  
  // when checking for enter on line 
  useEffect(() => {
    // Check if this is the first run so that shell is not autofocused on mount
    if (!isFirstRun.current) {
      const shellLinesToFocus = shell.current.querySelectorAll(`._shelllines`);
      shellLinesToFocus[lines.length - 1].focus();
    }
    // after first run set to false
    isFirstRun.current = false;
  }, [lines.length])
  // for clear screen
  useEffect(() => {
    // create ability to clear screen without callbacks and timers
    if (isCleared.current) { setLines([{ id: 0, inst: "" }]); isCleared.current = false }
  }, [lines])
  // state from props for style prop
  useEffect(() => {
    // If and only if the props for styles changes update the state of stateStyles
    setStateStyles(styles);
  }, [styles])
  // Update managed input in shell.
  const updateLineValue = (e) => {
    setLines(lines.map(item => item.id + 'Lines' === e.target.id ? { id: item.id, inst: e.target.value } : item))
  }
  // Provide functions for context for the default functions
  const shellDefaultFunctions = {
    clearLines: () => { isCleared.current = true },
    setFont: (e) => {
      setStateStyles({ ...stateStyles, fontFamily: e })
    },
    setColor: (e) => {
      if (e === 'reset') return (setStateStyles({ ...stateStyles, ...{ color: "white", backgroundColor: 'black' } }), "Color reset.")
      const selected = {}
      const options = e.split("").slice(0, 2);
      if (options.length !== 2) {
        return `Please Provide a two digit hexadecimal number to set the foreground and background`
      } else {
        if (options[0].toUpperCase() === options[1].toUpperCase()) {
          return `Please do not specify the same color for foreground and background.`
        }
        else {
          if (shellColors[options[0].toUpperCase()]) {
            selected.color = shellColors[options[0].toUpperCase()] || stateStyles.color;
          }
          if (shellColors[options[1].toUpperCase()]) {
            selected.backgroundColor = shellColors[options[1].toUpperCase()] || stateStyles.backgroundColor;
          }
          setStateStyles({ ...stateStyles, ...selected })
        };
        return 'color set.';
      }
    }
  }
  // Apply the provided Functions from props to our engine, called when enter is detected.
  const applyFunction = (commandFromPrompt) => {
    const completeCommands = defaultCommands(shellDefaultFunctions, functionList, config.defaultFunctions);
    return Engine(completeCommands, commandFromPrompt, config.defaultError);
  }
  // Captures focus when Shell component is clicked on
  const captureFocus = (e) => {
    if (((!e.target.matches('input') || e.target.disabled)) && e.target.matches('p'))  {
      let shellLinesToFocus = shell.current.querySelectorAll('._shelllines');
      shellLinesToFocus[lines.length - 1].focus();
    }
  }
  //remove focus from last line item
  const removeFocus = (e) => {
    //get all shell lines
    const shellLinesToFocus = shell.current.querySelectorAll('._shelllines');
      // remove Focus
      shellLinesToFocus[lines.length - 1].blur();
      // disable current input
      shellLinesToFocus[lines.length - 1].disabled = true;
  }
  const handleReturns = () =>{
    //blur our current line
    removeFocus();
    // Use the apply function to get the return from the engine
    let output = applyFunction(lines[lines.length - 1].inst);
    // check if function is returned...
    if(output instanceof Function){
      console.log('test')
      output = 'function'
    }
    // set the wait variable to off;
    setLines([...lines.map(item => item.id === lines.length - 1 ? { ...item, out: output } : item), { id: lines.length, inst: "" }])
    
  }

  // Checks for return character any time a keydown is detected
  // Also Catches tabs and prevent them from changing focus
  const checkForReturns = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      handleReturns();
    }
  }
  
  const createOutLines = (line) => {
    if (Array.isArray(line)) {
      // if engine returns we map the output to the LineOutput component
      return line.map(out => <LineOutput key={out + 'Output'}>{out}</LineOutput>)
    } else {
      // if user wants to use newline instead of creating an array themselves.
      if (line.includes('\n')) {
        return line.split('\n').map((out, index) => <LineOutput key={index + 'Output'}>{out}</LineOutput>)
      } else
        // if the return is just one line of text return
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
              disabled={(index < lines.length-1)}
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