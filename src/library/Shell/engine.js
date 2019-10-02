const getCommands = (command) => {
  // regex to match first word in command
  const output = command.match(/^\w*/g);
  // return matching or return empty array
  return output.length > 0 ? output[0] : output;
};

const getFunctionFromFunctionList = (list, target) => {
  // filter function list to match target
  const output = list.filter(a => a.name === target);
  // return object or return null value
  return output.length > 0 ? output[0] : null;
};

const getCommandSuggestions = (command, funcs, error) => {
  // 'sdfs' is not recognized as an internal or external command, operable program or batch file
  // return custom error message if defined
  if (error) return error;
  // check if any of the functions match and return a list of all close answers
  const suggestion = funcs.filter(a => a.name[0] === command[0]).reduce((a, c) => `${a}\n${c.name}`, '');
  let suggestionText = '';
  if (command.length !== 0 && suggestion.length !== 0) {
    suggestionText = `Did you mean: ${suggestion}`;
  }
  return `Command Could Not Be Found. ${suggestionText}`;
};

// Return the correct parameters when the function is incorrect
const getCorrectParameters = (func) => {
  const options = Object.keys(func.options) || false;
  let output = '';
  if (options) {
    output = `Available Parameters:\n
      ${options.reduce((a, c) => `${a}-${c}\n`, '')}
        `;
  }
  return `Error Incorrect Parameter. ${output}`;
};

const applySecondOptionToFunction = (selectedFunction, options) => {
  const secondOption = options.replace(selectedFunction.name, '').trim();
  if (!Object.keys(selectedFunction).includes('func')) {
    return 'This command does have a specified function to accept secondary parameters.';
  }
  return selectedFunction.func(secondOption);
};

const Engine = (funcs, command, defError = false) => {
  // Grab the first part of the command, up to the next whitespace
  const target = getCommands(command);

  // Find the function in the provided funcs array.
  const selectedCommand = getFunctionFromFunctionList(funcs, target);

  if (!selectedCommand) {
    return `${target} is not a defined command.`;
  }

  if (!selectedCommand.def) {
    return 'Default command not specified.';
  }

  // splits command to for next check to see if user input an extra space after command.
  const splitCommand = command.split(' ');

  // If there is not a function with a matching name return suggested functions
  if (selectedCommand.length === 0 || splitCommand[1] === '') {
    return getCommandSuggestions(target, funcs, defError);
  }

  // regex matches any flag, not a perfect pattern commands cannot have dashes
  const testForOptions = command.match(/-.*?(?=\s-)|-.*/g);

  // Case for default options or simple commands that take one input
  if (!testForOptions && splitCommand.length > 1) {
    return applySecondOptionToFunction(selectedCommand, command);
  }

  // Remove the target and the split the rest into flags.
  // const options = command.replace(target, '').split(' -').filter(a => (a !== ' ' ? a : ''));

  // Handle provided options while there are not any flags in the function
  if ((!selectedCommand.options
    || Object.keys(selectedCommand.options).length === 0)
    && testForOptions) {
    return 'Command does not have flags. Remove flags and run command again.';
  }
  // Handle no options or no options provided by users return default function
  if (
    !testForOptions
    || !selectedCommand.options
    || Object.keys(selectedCommand.options).length <= 0) {
    return selectedCommand.def(selectedCommand);
  }
  // Handle options, by creating a new array of objects.
  // [{option: e, arg: ""}]
  const splitCommands = testForOptions.reduce((acc, cur) => {
    const r = cur.split(' ');
    acc.push({ option: r[0].replace(/-/, ''), arg: r.slice(1, r.length).join(' ') });
    return acc;
  }, []);

  // Verify the options users passed in their command are valid
  const runCommands = splitCommands.map((a) => {
    const optionFunction = selectedCommand.options[a.option] || false;

    if (optionFunction) {
      const tempObject = {};
      tempObject[a.option] = optionFunction(a.arg);
      return tempObject;
    }
    return false;
  });
    // If the options where not valid our runCommmands will include false.
    // Test and return correct parameters if false.
    // This will not check if the users function return false now, this was an issue.
  if (runCommands.includes(false)) {
    return getCorrectParameters(selectedCommand);
  }
  // Return our selected command with the options passed in.
  // currenty no way to tell which tag was specified in what order...
  // we will make it return objects! when flags are present!
  return selectedCommand.func(...runCommands);
};

const coreFunctions = {
  getCommands,
  getFunctionFromFunctionList,
  getCommandSuggestions,
  getCorrectParameters,
  applySecondOptionToFunction,
};

export { Engine, coreFunctions };
