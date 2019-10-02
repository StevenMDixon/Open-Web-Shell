import React from 'react'
import { Shell } from '../library';
import { PropTypes } from 'prop-types';
/**
 * @visibleName Using Shell with Commands
 */
const CommandShell = (props) =>{
    /** I am documentation */
    return(
    <div style={{height: '500px'}}>
    <Shell {...props}/> 
    </div>)
    }

export default CommandShell;
