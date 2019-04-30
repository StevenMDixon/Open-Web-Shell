import React from 'react';
import ReactDOM from 'react-dom';
import { Shell } from '../index';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Shell config={{}} functionList={[]}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('' , ()=>{
    
})