import { isThisTheCommand, extractParameters } from "../../../src/helpers/command";

describe('isThisTheCommand function', () => {
    const functionCommand = 'thecommand';
    const parameter = ' -aparameter';
    const functionCommandWithParameters = functionCommand.concat(parameter);
    const notTheCommand = 'notthecommand';

    test('it should return true when the commands are the same', () => {
        const actualCommand = functionCommand;

        expect(isThisTheCommand(functionCommand, actualCommand)).toBe(true);
    });

    test('it should return false when the commands are not the same', () => {
        const actualCommand = notTheCommand;

        expect(isThisTheCommand(functionCommand, actualCommand)).toBe(false);
    });

    test('it should return true when the function command has parameters', () => {
        const actualCommand = functionCommand;

        expect(isThisTheCommand(functionCommandWithParameters, actualCommand));
    });

    test('it should return false when the function command has parameters and the commands are not the same', () => {
        const actualCommand = notTheCommand.concat(parameter);

        expect(isThisTheCommand(functionCommandWithParameters, actualCommand));
    });
});

describe('extractParameters function', () => {
    const content = 'command aparameter otherparameter';

    test('it should return an array of strings with length three (3) when content contains separator', () => {
        const separator = ' ';
        const parameters: string[] = extractParameters(content, separator);

        expect(parameters.length).toBe(3);
    });

    test('it should return an array of strings with length one (1) when content does not contain separator', () => {
        const separator = '-';
        const parameters = extractParameters(content, separator);

        expect(parameters.length).toBe(1);
    });

    test('it should return an array of strings with length one (1) when content is an empty string', () => {
        const emptyContent = '';
        const separator = '-';
        const parameters =  extractParameters(emptyContent, separator);

        expect(parameters.length).toBe(1);
    });
});
