import React from 'react'
import { Shell } from '../library';
import { PropTypes } from 'prop-types';
/**
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
    /** Keys change config of the shell */
    config: PropTypes.object.isRequired,
    /** CSS in jss styles for shell component */
    styles: PropTypes.object
};

CommandShell.defaultProps = {
    functionList: [],
    config: {},
    styles: {}
  };