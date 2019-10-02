import React from 'react';
import {
  LineOutput,
} from './styled-components';

const createOutLines = (line, stateStyles) => {
  if (Array.isArray(line)) {
    // if engine returns we map the output to the LineOutput component
    // console.log(line)
    return line.map(out => (
      <LineOutput styles={stateStyles} key={`${out}Output`}>
        {out}
      </LineOutput>
    ));
  }
  // if user wants to use newline instead of creating an array themselves.
  if (line.includes('\n')) {
    return line.split('\n').map(out => (
      <LineOutput styles={stateStyles} key={`${out}Output`}>
        {out}
      </LineOutput>
    ));
  }
  // if the return is just one line of text return
  return <LineOutput styles={stateStyles}>{line}</LineOutput>;
};

export {createOutLines};