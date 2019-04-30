import {Engine, coreFunctions} from '../engine.js';


const {
    _getCommands, 
    _getFunctionFromFunctionList, 
    _getCommandSuggestions, 
    _getCorrectParameters, 
    _applySecondOptionToFunction} = coreFunctions;

const list = [
    {
        name: 'list',
        def: () => { return list.reduce((a,c)=>{a.push(c.name); return a},[])},
    },
    {
        name: 'test',
        options: {o: (e)=>(e)},
        func: (e)=>"I am a test",
        def: (e)=>'I am a default',
    },
    {
        name: 'clear',
        def: (e)=>'I am a default',
        func: (e)=>'I am a function'
    },

]

describe("Engine", ()=>{
    it('Should return result of passed function', ()=>{
        expect(Engine(list, 'test')).toBe('I am a default');
    });
    it('Should return an error message if a command is not found', ()=>{
        expect(Engine([], 'color')).toEqual(`Command Could Not Be Found. `);
    });
})

describe('_getCommands', ()=>{
    it('Should return the first word of a command string', ()=>{
        expect(_getCommands("run cmd")).toEqual('run');
    })
    it('should return regardless if numbers are part of string', ()=>{
        expect(_getCommands("1run cmd")).toEqual('1run');
    })
})

describe('_getFunctionFromFunctionList', ()=>{
    it('should return the correct function from function list', ()=>{
        expect(typeof _getFunctionFromFunctionList(list, 'clear')).toEqual('object');
    })
    it('should return empty Array if no function is found', ()=>{
        console.log(_getFunctionFromFunctionList(list, 'test'))
        expect(Array.isArray(_getFunctionFromFunctionList(list, 'run'))).toEqual(true);
    })
})

describe('_getCommandSuggestions', ()=>{
    it('should return a list of suggestion in a string if a command is not found', ()=>{
        expect(typeof _getCommandSuggestions('lips', list)).toEqual('string');
    })
    it('should return custom error if provided', ()=>{
        expect( _getCommandSuggestions('lips', list, "Error")).toEqual('Error');
    })
    it('should return basic error if no suggestions', ()=>{
        expect( _getCommandSuggestions('free', list)).toEqual('Command Could Not Be Found. ');
    })
})

describe('_getCorrectParameters', ()=>{
    it('should return a list of available flags if incorrect flag is provided', ()=>{
        expect(_getCorrectParameters(list[1]).length).toEqual(52)
    })
    
})

describe('_applySecondOptionToFunction', ()=>{
    //selectedFunction, options, target
    it('should return a list of available flags if incorrect flag is provided', ()=>{
        expect(_applySecondOptionToFunction(list[1] ,"twiggy")).toEqual("I am a test")
    })
    it('should return default if there is not a default command', ()=>{
        expect(_applySecondOptionToFunction(list[0] ,"test")).toEqual('This command does have a specified function to accept secondary parameters.')
    })
})