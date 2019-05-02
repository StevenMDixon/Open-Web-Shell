
# :shrimp: Open Web Shell

Open web shell is a simple terminal/shell for your react web app or react website. 

# Installation

> npm install openwebshell

make sure to install the google ubuntu font so things look perfect

```HTML

<link href="https://fonts.googleapis.com/css?family=Ubuntu+Mono" rel="stylesheet">

```

Then import!

```JavaScript

import {Shell} from 'openwebshell';

```

# Usage

Open shell is simple yet can be set up to control entire web apps or sites if given the right functions. Open shell executes users provided functions in a sane and predictable manner. Given this there are 3 props that shell takes.

### Props

| PropName      | Type   |
| ------------- | ------:|
| config        | Object |
| functionList  | Array  |
| styles        | Object |

#### config

Defines functional configuration of the shell

| Name             | Type    | Description                            |
|------------------|---------|---------------------------------------:|
| defaultError     | string  | Sets error message on failed command   |
| terminal         | string  | Sets terminal input text ("C:\")       |
| charMax          | num     | Sets limit on input length             |
| defaultFunctions | bool    | Enables or disables provided functions | 

### functionList

Defines user provided functions for shell. Shell includes some functions by default, these can be disabled though config.

```JavaScript

const list = [
    {
        //name to call the function
        name: "function that sums two inputs",
        options: {
            //define what each flag does they will be passed into func below
            t: (e)=>e,
            d: (e)=>e
        },
        def: (e)=>{
            //default function when no flags or func is not defined
            return "Please provide proper flags" 
        },
        func: (e)=>{
            //if flags are used the arguments will contain objects with their key set to the flag
            //in this case t or d 
            //if flags are defined in options and a command is called with a parameter. the parameter will be passed to this function.
            return e.t||e.d||e;
        }
    }
]

```
 > Can I specify the same flag more than once? 

 No. The first instance of the flag will be the only one passed. if you want to pass more than one option on a single flag use the flag function to split the input on the flag. `(e)=>e.split(" ")`

 > Can I use functions defined in react components? 
 
 Yes make sure you pass either the correct context to the function list or pass bound components into your list.

 > Can I use redux?
 
 Yes just provide the correct context.

You can check out more advanced examples in the [Style Guide](https://stevendixondev.github.io/Open-Web-Shell/)

### styles

Currently limited styles can be overwritten in this component. All set styles use standard 'css in js object' notation. All avaliable options and there defaults: 

```JavaScript

const styles = {
    fontFamily: "'Ubuntu Mono', monospace;",
    width: "100%",
    height: "100%",
    color: "green",
    backgroundColor: "black",
}

```

# Dependencies

- React: "^16.8.0"
- styled-components: "^4.2.0",
- prop-types: "^15.7.2",

