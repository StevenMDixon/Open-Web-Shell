import styled from 'styled-components';

const shellColors = {
    0: "Black",
    1: "Navy",
    2: "Green",
    3: "Aqua",
    4: "Maroon",
    5: "Purple",
    6: "Yellow",
    7: "Silver",
    8: "Gray",
    9: "Blue",
    A: "Lime",
    B: "qua",
    C: "Red",
    D: "Fuchsia",
    E: "Teal",
    F: "White"
}

const ShellWrapper = styled.div`
font-family: ${props => props.styles.fontFamily? props.styles.fontFamily: "'Ubuntu Mono', monospace;"}
display:flex;
flex-direction: column;
background-color: ${props => props.styles.backgroundColor? props.styles.backgroundColor: "black"};
width: ${props => props.styles.width? props.styles.width: "100%"}
color: ${props => props.styles.color? props.styles.color: "white"}
height: ${props => props.styles.height? props.styles.height: "100%"};
max-width: 100%;
padding: .2rem;
overflow: hidden;
cursor: default;
`
const LineWrapper = styled.div`
    margin-top: .2rem;
    margin-bottom: .2rem;
    display: flex;
    align-items: start;
    justify-content: start;
`

const pBase = styled.p`
    margin:  0.2rem 0 0.2rem 0;
    color: inherit
    font-size: 1rem;
`

const ShellLocation = styled(pBase)`
    :after{
        content: " ";
        white-space: pre;
    }
`

const LineOutput = styled(pBase)`
    width: 100%;
`

const LineInput = styled.input`
    background-color: transparent;
    border: 0px solid transparent;
    color: ${props => props.styles.color? props.styles.color: "white"}
    margin:  0.2rem 0 0.2rem 0;
    flex-basis: 80%;
    flex: 1;
    font-family: ${props => props.styles.fontFamily? props.styles.fontFamily : "'Ubuntu Mono', monospace;"}
    cursor: default;
    font-size: 1rem;
    :focus
        outline: none;
        
`

export {LineInput, ShellWrapper, LineWrapper, ShellLocation, LineOutput, shellColors};