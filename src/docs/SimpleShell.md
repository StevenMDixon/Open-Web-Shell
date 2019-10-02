SimpleShell example:

```jsx
const config = {
    terminal: "E:\\>", //Controls shell text. default is ubuntu style.
    defaultError: "Sorry that command is not recognized.", //Sets default error message.,
    charMax: 30, //defines the max number of characters allowed one line
    defaultFunctions: true, //default true, enables default functions provided with the shell,
    startUp: 'list' // default = '', use to run command as termial is mounted can take arguments.
};

<SimpleShell config={config}/>
```

Config options 
 
```js static

const config = {
    terminal: "E:>",  //Controls shell text. default is ubuntu style.
    defaultError: "Sorry that command is not recognized.", //Sets default error message.,
    charMax: 30, //defines the max number of characters allowed one line
    defaultFunctions: true, //default true, enables default functions provided with the shell,
    startUp: 'list' // default = '', use to run command as termial is mounted can take arguments.
}
 
```

