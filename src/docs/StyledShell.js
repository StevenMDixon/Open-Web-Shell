import React from 'react'
import {Shell} from '../library';
import { PropTypes } from 'prop-types';
/**
 * 
 *
 * @visibleName Using Shell with Styles
 */
const StyledShell = (props) =>(<div><Shell {...props}/></div>)

export default StyledShell;

StyledShell.propTypes = {
    /** Array of Objects containing functions */
    functionList: PropTypes.array.isRequired,
    /** Object Whos key change aspects of the shell */
    config: PropTypes.object.isRequired,
    /** CSS in jss styles for shell component */
    styles: PropTypes.object
};

StyledShell.defaultProps = {
    functionList: [],
    config: {},
    styles: {}
};