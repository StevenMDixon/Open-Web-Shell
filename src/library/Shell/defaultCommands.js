function defaultCommands(context, funcs = [], enabled = true) {
  let list = [
    {
      name: 'help',
      def: ()=> (`Provide the name of a command to get detailed information on how to use that command`),
      func: (com)=>{
        if(list.some(i => i.name === com)){
          let selected = list.filter(item => item.name === com)[0];
          if(!selected.help){
            return `No help available for Command: ${selected.name}`
          }
          let flagHelp = Object.values(selected.help) || [];
          return `Command: ${com}\n
          ${`Description: ${selected.desc}` || ''}
          ${
             flagHelp.length > 0? flagHelp.reduce((acc,cur)=>(acc+cur+'\n', "")) :'' 
          }
          `
        }else{
          return `${com} does not match any commands`;
        }
      } 
    },
    {
      name: 'list',
      def: () => list.reduce((a, c) => { a.push(`${c.name} ${c.options? '('+Object.keys(c.options).reduce((acc, cur)=>(acc+'-'+cur+", "), "")+')': ''}`); return a; }, []),
      desc: 'Lists all of the commands that are accessible.',
      help: {
        t: '-t: a test flag used in developmet'
      }
    },
    {
      name: 'clear',
      def: context.clearLines,
      desc: 'Clears the command prompt',
      help:{},
    },
    {
      name: 'color',
      func: context.setColor,
      def: () => context.setColor('reset'),
      desc: 'Use two hexadecimal values to set the color of the shell, or reset by not specifying a color',
      help:{},
    },
    {
      name: 'font',
      func: context.setFont,
      def: () => 'provide a font name to set the font to',
      desc: 'Set the font of the shell by specifying a font',
      help:{},
    },
  ];
  // create list bases on whether we want to use default functions.
  // also clears duplicates from defaults
  list = enabled
    ? [...list.filter(a => funcs.filter(b => b.name === a.name).length === 0), ...funcs]
    : funcs;
  return list;
}

export default defaultCommands;
