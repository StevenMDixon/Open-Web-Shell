import React from 'react'
import {Shell} from '../library';
import { PropTypes } from 'prop-types';
/**
 * General component description in JSDoc format. Markdown is *supported*
 * 
 * 
 * 
 *@visibleName Basic Shell Setup
 */
const SimpleShell = (props) =>(<Shell {...props}/>)

export default SimpleShell;

SimpleShell.propTypes = {
    /** Array of Objects containing functions */
    functionList: PropTypes.array.isRequired,
    /** Object Whos key change aspects of the shell */
    config: PropTypes.object.isRequired,
    /** CSS in jss styles for shell component */
    styles: PropTypes.object
};

SimpleShell.defaultProps = {
    functionList: [],
    config: {},
    styles: {}
  };