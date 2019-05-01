SimpleShell example:

```jsx
<SimpleShell/>
```

Config options 
 
```js static

const config = {
    terminal: "C:\\>",  //Controls shell text. default is ubuntu.
    defaultError: "Sorry that command is not recognized.", //Sets default error message.,
    charMax: 30, //defines the max number of characters allowed one line
    defaultFunctions: true //default true, enables default functions provided with the shell
}

```

Style options 

```js static

const config = {
    color: "red", //Sets color of text. default white.
    backgroundColor: "black", //Sets color of terminal background. default black.
    fontFamily: "'Ubuntu Mono', monospace", // Default font ubuntu
    width: '100%', //default is 100%
    height: '100%' //default is 100%
 }

```