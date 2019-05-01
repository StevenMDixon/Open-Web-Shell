const _getCommands = (command) =>{
    /*
    * Todo:
    *   Add handler for promises (Promise.resolve(obj) == obj)
    *   Fix returns so that it is known what is passed back to func. - done...
    *   some sort of actual scripting? Prompt command?
    *   loading type of thing... with promises 
    */



    //regex to match first word in command
    let output = command.match(/^\w*/g);
    //return matching or return empty array
    return output.length > 0? output[0] : output;
}

const _getFunctionFromFunctionList = (list, target) =>{
    //filter function list to match target
    let output = list.filter(a => a.name === target);
    //return object or return empty array
    return output.length > 0? output[0] : output;
}

const _getCommandSuggestions = (command, funcs, error) =>{
    //'sdfs' is not recognized as an internal or external command, operable program or batch file
    //return custom error message if defined
    if(error) return error;
    //check if any of the functions match and return a list of all close answers
    let suggestion = funcs.filter(a=> a.name[0] === command[0]).reduce((a,c)=>{a+="\n"+c.name; return a}, "");
    let suggestionText = "";
    if(command.length !== 0 && suggestion.length !== 0){
        suggestionText = `Did you mean: ${suggestion}`;
    }
    return `Command Could Not Be Found. ${suggestionText}`;
}

//Return the correct parameters when the function is incorrect
const _getCorrectParameters = (func) =>{
    let options = Object.keys(func.options)|| false;
    let output = "";
    if(options){
        output = `Available Parameters:\n
        ${options.reduce((a,c)=>{a+="-"+c+"\n"; return a}, "")}
        `;
    }
    return `Error Incorrect Parameter. ${output}`;
}

const _applySecondOptionToFunction = (selectedFunction, options) =>{
    let secondOption = options.replace(selectedFunction.name, "").replace(/\s/g, "");
    if(!Object.keys(selectedFunction).includes("func")){
        return "This command does have a specified function to accept secondary parameters."
    }
    return selectedFunction.func(secondOption);
}

const Engine = (funcs, command, defError=false) =>{
    //Grab the first part of the command, up to the next whitespace
    let target = _getCommands(command);

    //Find the function in the provided funcs array.
    let selectedCommand = _getFunctionFromFunctionList(funcs, target);

    //splits command to for next check to see if user input an extra space after command.
    let splitCommand = command.split(" ");

    //If there is not a function with a matching name return suggested functions
    if(selectedCommand.length === 0 || splitCommand[1] === ""){
        return _getCommandSuggestions(target, funcs, defError);
    }

    //Case for default options or simple commands that take one input
    if(!command.includes('-') && splitCommand.length > 1){
        return _applySecondOptionToFunction(selectedCommand, command);
    }

   //Remove the target and the split the rest into flags.
    let options = command.replace(target, "").split(" -").filter(a => a!== " "? a: "");

    //Handle provided options while there are not any flags in the function
    if((!selectedCommand.options || Object.keys(selectedCommand.options).length === 0) && options.length > 0){
        return "Command does not have flags. Remove flags and run command again.";
    }
    //Handle no options or no options provided by users
    if(options.length <= 0 || !selectedCommand.options || Object.keys(selectedCommand.options).length <= 0){
       return selectedCommand.def(selectedCommand);
    }else{
        //Handle options, by creating a new array of objects.
        //[{option: e, arg: ""}]
        let splitCommands = options.reduce((acc, cur)=>{
            let r = cur.split(" ");
            acc.push({option: r[0], arg: r.slice(1, r.length).join(" ")})
            return acc;
        }, [])

        //Verify the options users passed in their command are valid
        let runCommands = splitCommands.map(a => {
            let optionFunction = selectedCommand.options[a.option] || false;
            
            if(optionFunction){
                let tempObject = {};
                tempObject[a.option] = optionFunction(a.arg);
                return tempObject;
            }else{
                return false;
            }
        })
        //If the options where not valid our runCommmands will include false.
        if(runCommands.includes(false)){
           return _getCorrectParameters(selectedCommand);
        }
        //Return our selected command with the options passed in.
        //currenty no way to tell which tag was specified in what order...
        //we will make it return objects! when flags are present!
        return selectedCommand.func(...runCommands);
    }
}

const coreFunctions = {_getCommands, _getFunctionFromFunctionList, _getCommandSuggestions, _getCorrectParameters, _applySecondOptionToFunction}

export {Engine, coreFunctions};