import { Engine, coreFunctions } from '../library/Shell/engine';


const {
  getCommands,
  getFunctionFromFunctionList,
  getCommandSuggestions,
  getCorrectParameters,
  applySecondOptionToFunction,
} = coreFunctions;

const list = [
  {
    name: 'list',
    def: () => list.reduce((a, c) => { a.push(c.name); return a; }, []),
  },
  {
    name: 'test',
    options: { o: e => (e) },
    func: () => 'I am a test',
    def: () => 'I am a default',
  },
  {
    name: 'clear',
    def: () => 'I am a default',
    func: () => 'I am a function',
  },
];

describe('Engine', () => {
  it('Should return result of passed function', () => {
    expect(Engine(list, 'test')).toBe('I am a default');
  });
  it('Should return an error message if a command is not found', () => {
    expect(Engine([], 'color')).toEqual('color is not a defined command.');
  });
});

describe('_getCommands', () => {
  it('Should return the first word of a command string', () => {
    expect(getCommands("run cmd")).toEqual('run');
  })
  it('should return regardless if numbers are part of string', () => {
    expect(getCommands("1run cmd")).toEqual('1run');
  });
});

describe('_getFunctionFromFunctionList', () => {
  it('should return the correct function from function list', () => {
    expect(typeof getFunctionFromFunctionList(list, 'clear')).toEqual('object');
  })
  it('should return empty Array if no function is found', () => {
    expect(getFunctionFromFunctionList(list, 'run')).toEqual(null);
  });
});

describe('_getCommandSuggestions', () => {
  it('should return a list of suggestion in a string if a command is not found', () => {
    expect(typeof getCommandSuggestions('lips', list)).toEqual('string');
  })
  it('should return custom error if provided', () => {
    expect(getCommandSuggestions('lips', list, 'Error')).toEqual('Error');
  })
  it('should return basic error if no suggestions', () => {
    expect(getCommandSuggestions('free', list)).toEqual('Command Could Not Be Found. ');
  });
});

describe('_getCorrectParameters', () => {
  it('should return a list of available flags if incorrect flag is provided', () => {
    expect(getCorrectParameters(list[1]).length).toEqual(68);
  });
});

describe('_applySecondOptionToFunction', () => {
  // selectedFunction, options, target
  it('should return a list of available flags if incorrect flag is provided', () => {
    expect(applySecondOptionToFunction(list[1], 'twiggy')).toEqual('I am a test');
  })
  it('should return default if there is not a default command', () => {
    expect(applySecondOptionToFunction(list[0], 'test')).toEqual('This command does have a specified function to accept secondary parameters.')
  });
});