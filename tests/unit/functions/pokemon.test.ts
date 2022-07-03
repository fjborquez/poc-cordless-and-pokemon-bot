import { pokemon } from "../../../src/functions/pokemon";
import { fetchPokemon } from '../../../src/helpers/pokemonApi';
import { Pokemon } from "../../../src/types/pokemon";

jest.mock('../../../src/helpers/pokemonApi', () => ({
    fetchPokemon: jest.fn()
}));

const mockedFetchPokemon = fetchPokemon as jest.Mock;
const callbackToTest = pokemon.callback;
const mockMessage: any = {
    content: 'prueba prueba prueba',
    reply: jest.fn()
};

describe('pokemon function', () => {
    test('it should execute Message.reply() when fetching a pokemon is ok', () => {
        const pikachu: Pokemon = {
            name: 'pikachu'
        };
        const httpBody = {
            data: pikachu
        };

        mockedFetchPokemon.mockResolvedValue(httpBody);
        (callbackToTest(mockMessage, {} as any) as Promise<void>).then(_ => {
            expect(mockMessage.reply).toBeCalled();
        });
    });

    test('it should execute Message.reply() when fetching a pokemon is failure', () => {
        mockedFetchPokemon.mockRejectedValue({});
        
        (callbackToTest(mockMessage, {} as any) as Promise<void>).then(_ => {
            expect(mockMessage.reply).toBeCalled();
        });
    });
});
