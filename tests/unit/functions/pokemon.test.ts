import { command } from '@functions/pokemon';
import { fetchPokemon } from '@helpers/pokemonApi';
import { Pokemon } from 'types/pokemon';
import { BotCommandHandlerArgs } from 'cordless';

jest.mock('@helpers/pokemonApi', () => ({
    fetchPokemon: jest.fn()
}));

const mockedFetchPokemon = fetchPokemon as jest.Mock;
const callbackToTest = command.handler;
const mockedArgs = {
    'interaction': {
        'options': {
            'getNumber': jest.fn()
        },
        'reply': jest.fn()
    }
} as unknown as BotCommandHandlerArgs;

describe('pokemon function', () => {
    test('it should execute Message.reply() when fetching a pokemon is ok', async () => {
        const pikachu: Pokemon = {
            name: 'pikachu',
        };
        const httpBody = {
            data: pikachu
        };

        mockedFetchPokemon.mockResolvedValue(httpBody);
        await callbackToTest(mockedArgs);
        
        expect(mockedFetchPokemon).toBeCalled();
    });

    test('it should execute Message.reply() when fetching a pokemon is failure', async () => {
        mockedFetchPokemon.mockRejectedValue({});
        await callbackToTest(mockedArgs);

        expect(mockedFetchPokemon).toBeCalled();
    });
});
