import React from 'react'
import { Shell } from '../library';
import { PropTypes } from 'prop-types';
/**
 * Open Web Shell will take any 
 * 
 * 
 * Default commands are "List and clear"
 * 
 * list: lists all commands available including user specified.
 * 
 * clear: clears the console.
 *
 * @visibleName Using Shell with Commands
 */
const CommandShell = (props) =>{
    /** I am documentation */
    return(
    <div>
    <Shell {...props}/> 
    </div>)
    }

export default CommandShell;

CommandShell.propTypes = {
    /** Array of Objects containing functions */
    functionList: PropTypes.array.isRequired,
    /** Object Whos key change aspects of the shell */
    config: PropTypes.object.isRequired,
    /** CSS in jss styles for shell component */
    styles: PropTypes.object
};

CommandShell.defaultProps = {
    functionList: [],
    config: {},
    styles: {}
  };