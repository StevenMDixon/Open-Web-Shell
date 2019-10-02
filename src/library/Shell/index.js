import React, { useState, useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';
import {
  InputLine,
  HiddenInput,
  ShellWrapper,
  LineInput,
  shellColors,
} from './styled-components';
import { Engine } from './engine';
import defaultCommands from './defaultCommands';
import {createOutLines} from './outputLineHandler';
import {core} from './shellCore';

const Shell = (props) => {
  
  const { functionList, config, styles } = props;
  // Create a state that holds our styles
  const [stateStyles, setStateStyles] = useState(styles);
  // Create a state that holds input lines
  const [lines, setLines] = useState([]);
  const [instruction, setInstruction] = useState('');
  // first run check
  const isFirstRun = useRef(true);
  // Create a reference to the current shell component
  // so that we can maintain focus when Creating new lines
  const shell = useRef(null);
  const falseInput = useRef(null);
  // Create an effect that uses the ref to update our
  // focus when a new line is added to state.
  const isCleared = useRef(false);
  const counterForPrevious = useRef(0);
  // Update managed input in shell.
  const updateLineValue = (e) => {
    setInstruction(e.target.value);
  };
  // Provide functions for context for the default functions
  const shellDefaultFunctions = {
    clearLines: () => {
      isCleared.current = true;
    },
    setFont: (e) => {
      setStateStyles({ ...stateStyles, fontFamily: e });
    },
    setColor: (e) => {
      if (e === 'reset') {
        return (
          setStateStyles({
            ...stateStyles,
            ...{ color: 'white', backgroundColor: 'black' },
          }),
          'Color reset.'
        );
      }
      const selected = {};
      const options = e
        .replace(/[^\w]/g, '')
        .split('')
        .slice(0, 2);
      if (options.length !== 2) {
        return 'Please Provide a two digit hexadecimal number to set the foreground and background';
      }
      if (options[0].toUpperCase() === options[1].toUpperCase()) {
        return 'Please do not specify the same color for foreground and background.';
      }
      if (shellColors[options[0].toUpperCase()]) {
        selected.color = shellColors[options[0].toUpperCase()] || stateStyles.color;
      }
      if (shellColors[options[1].toUpperCase()]) {
        selected.backgroundColor = shellColors[options[1].toUpperCase()]
        || stateStyles.backgroundColor;
      }
      setStateStyles({ ...stateStyles, ...selected });
      return 'color set.';
    },
  };
  // Apply the provided Functions from props to our engine, called when enter is detected.
  const applyFunction = (commandFromPrompt) => {
    const completeCommands = defaultCommands(
      shellDefaultFunctions,
      functionList,
      config.defaultFunctions,
    );
    return Engine(completeCommands, commandFromPrompt, config.defaultError);
  };

  // Captures focus when Shell component is clicked on
  const captureFocus = (e) => {
    if (!e.target.matches('input')) {
      falseInput.current.focus();
    }
  };

  const handleReturns = (ins) => {
    // Use the apply function to get the return from the engine
    let output = ins? applyFunction(ins): "";
    // check if function is returned...
    if(output instanceof Promise){
      output.then(data => {
        if (lines.length === 0) {
          setLines([{ id: lines.length, instruction: ins, out: data }]);
        } else {
          setLines([
            ...lines,
            { id: lines.length, instruction: ins, out: data },
          ]);
        }
        setInstruction('');
        counterForPrevious.current = lines.length + 1;
      })
    }
    else if (output instanceof Function) {
      output = 'function';
    }
    else {
    if (lines.length === 0) {
      setLines([{ id: lines.length, instruction: ins, out: output }]);
    } else {
      setLines([
        ...lines,
        { id: lines.length, instruction: ins, out: output },
      ]);
    }
    setInstruction('');
    counterForPrevious.current = lines.length + 1;
  }
  };

  // Checks for return character any time a keydown is detected
  // Also Catches tabs and prevent them from changing focus
  const checkForReturns = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (counterForPrevious.current !== 0) {
        counterForPrevious.current -= 1;
        setInstruction(lines[counterForPrevious.current].instruction);
      }
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowLeft') {
      e.preventDefault();
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setInstruction('');
    }
    if (e.key === 'Tab') {
      e.preventDefault();
    }
    if (e.key === 'Enter') {
      e.preventDefault();
        handleReturns(instruction);
    }
  };
  
  /*
   *
   * Effects
   *
   */
  // when checking for enter on line
  useEffect(() => {
    // Check if this is the first run so that shell is not autofocused on mount
    if (!isFirstRun.current) {
      shell.current.scrollTop = shell.current.scrollHeight;
      falseInput.current.focus();
    }
    if (isFirstRun.current) {
      if (config.startUp) handleReturns(config.startUp);
    }
    isFirstRun.current = false;
  }, [lines.length]);
  // for clear screen
  useEffect(() => {
    // create ability to clear screen without callbacks and timers
    if (isCleared.current) {
      setLines([]);
      setInstruction('');
      counterForPrevious.current = 0;
      isCleared.current = false;
    }
  }, [lines]);
  // state from props for style prop
  useEffect(() => {
    // If and only if the props for styles changes update the state of stateStyles
    setStateStyles(styles);
  }, [styles]);
  return (
    <ShellWrapper
      ref={shell}
      styles={stateStyles}
      onClick={captureFocus}
      onKeyDown={checkForReturns}
    >
      {lines.map(item => (
        <React.Fragment key={`${item.id}F`}>
          <LineInput styles={stateStyles}>
            {config.terminal || 'root@system:~$'}
            {item.instruction}
          </LineInput>
          <div style={{marginBottom: '.5rem'}}>
          {item.out ? createOutLines(item.out, stateStyles) : null}
          </div>
        </React.Fragment>
      ))}
      <InputLine styles={stateStyles}>
        {config.terminal || 'root@system:~$'}
        {instruction}
      </InputLine>
      <HiddenInput
        styles={stateStyles}
        type="text"
        maxLength={config.charMax || '40'}
        autoComplete="false"
        spellCheck="false"
        autoCorrect="false"
        autoCapitalize="false"
        onChange={updateLineValue}
        value={instruction}
        ref={falseInput}
      />
    </ShellWrapper>
  );
};

Shell.propTypes = {
  /** Array of Objects containing functions */
  functionList: PropTypes.arrayOf(PropTypes.object),
  /** Object Whos key change aspects of the shell */
  config: PropTypes.objectOf(PropTypes.any),
  /** CSS in jss styles for shell component */
  styles: PropTypes.objectOf(PropTypes.any),
};

Shell.defaultProps = {
  functionList: [],
  config: {},
  styles: {},
};

export default Shell;
