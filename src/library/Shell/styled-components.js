import styled, {
    keyframes
} from 'styled-components';

const shellColors = {
    0: 'Black',
    1: 'Navy',
    2: 'Green',
    3: 'Aqua',
    4: 'Maroon',
    5: 'Purple',
    6: 'Yellow',
    7: 'Silver',
    8: 'Gray',
    9: 'Blue',
    A: 'Lime',
    B: 'qua',
    C: 'Red',
    D: 'Fuchsia',
    E: 'Teal',
    F: 'White',
};

const ShellWrapper = styled.div `
    font-family: ${props => (props.styles.fontFamily ? props.styles.fontFamily : "'Ubuntu Mono', monospace;")}
    display: flex;
    flex-direction: column;
    background-color: ${props => (props.styles.backgroundColor ? props.styles.backgroundColor : 'black')};
    width: ${props => (props.styles.width ? props.styles.width : '100%')}
    color: ${props => (props.styles.color ? props.styles.color : 'white')}
    height: ${props => (props.styles.height ? props.styles.height : '100%')};
    max-width: 100%;
    padding: .5rem;
    overflow-Y: scroll;
    cursor: default;
`;

const LineWrapper = styled.div `
    margin-top: .2rem;
    margin-bottom: .2rem;
    display: flex;
    align-items: start;
    justify-content: start;
`;

const blink = keyframes `
    from {
        opacity: 1.0;
    }
    to {
        opacity: 0;
    }   
`

const pBase = styled.p `
    margin:  0;
    color: ${props => (props.styles.color ? props.styles.color : 'white')};
    font-size: ${props => (props.styles.fontSize ? props.styles.fontSize : '1rem')};
    position: relative;
    text-align: left;
`;

const InputLine = styled(pBase)
`
    margin: 1rem 0 1rem 0;  
    &::after {
        content: '';
        position: absolute;
        display: inline-block;
        vertical-align: top;
        top: 0;
        width: .5rem;
        height: 100%;
        background-color: ${props => (props.styles.color ? props.styles.color : 'white')}
        -webkit-animation: ${blink} 1s  infinite;
        animation: ${blink} 1s  infinite;
    }
`;

const LineInput = styled(pBase)
`
    color: ${props => (props.styles.color ? props.styles.color : 'white')};
    font-size: ${props => (props.styles.fontSize ? props.styles.fontSize : '1rem')};
    position: relative;
    margin: 1rem 0 1rem 0;
`



const HiddenInput = styled.input `
    color: ${props => (props.styles.backgroundColor ? props.styles.backgroundColor : 'black')};
    background-color: inherit;
    caret-color: inherit;
    background-color: transparent;
    border: 0px solid transparent;
    :focus
        outline: none;
        
`



const LineOutput = styled(pBase)
`
    width: 100%;
`;



export {
    LineInput,
    ShellWrapper,
    LineWrapper,
    LineOutput,
    shellColors,
    HiddenInput,
    InputLine
};