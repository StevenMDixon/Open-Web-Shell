StyledShell example:

```jsx

const styles = {
    color: "red", //Sets color of text. default white.
    backgroundColor: "black", //Sets color of terminal background. default black.
    fontFamily: "'Ubuntu Mono', monospace", // Default font ubuntu
    width: '400px', //default is 100%
    height: '200px', //default is 100%,
    fontSize: '1rem' //default 1rem
 };


<StyledShell styles={styles}/>
```

Style options 

```js static

const styles = {
    color: "red", //Sets color of text. default white.
    backgroundColor: "black", //Sets color of terminal background. default black.
    fontFamily: "'Ubuntu Mono', monospace", // Default font ubuntu
    width: '100%', //default is 100%
    height: '100%', //default is 100%,
    fontSize: '1rem' //default 1rem
 }

```

By default shell is setup to grow to width and height of a container that is defined in.

Currently Styles are limited but still targetable with regular css selectors including `div`, `p`, and `input`.