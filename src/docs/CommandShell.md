CommandShell example:

```jsx inside Markdown

const styles = {
    fontFamily: 'courier'
}

const functions = {
    ChangeFonts: (e =>{styles.fontFamily = e})
}
 
const list = [
    {name: 'run', def:()=>(["This command is not implemented"])},
    {name: 'font', options: {t: (e)=>(e) }, func: (e)=>(functions.ChangeFonts(e.t), console.log(e)), def: (e)=>["Specify font with -t"]}
];



<CommandShell functionList={list} styles={styles}/>
```