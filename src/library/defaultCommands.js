function defaultCommands(context, funcs=[], enabled=true) {
    let list = [
        {
            name: 'list',
            def: () => { return list.reduce((a,c)=>{a.push(c.name); return a},[])},
        },
        {
            name: 'clear',
            def: context.clearLines,
        },
        {
            name: 'color',
            func: context.setColor,
            def: ()=>"provide color to change text"
        }
    ]
    //create list bases on whether we want to use default functions. also clears duplicates from defaults
    list = enabled? [...list.filter(a => funcs.filter(b=> b.name === a.name).length === 0), ...funcs]: funcs;
    return list;
}

export {defaultCommands}