import { pokemon } from "@functions/pokemon";
import { fetchPokemon } from '@helpers/pokemonApi';
import { Pokemon } from "types/pokemon";

jest.mock('@helpers/pokemonApi', () => ({
    fetchPokemon: jest.fn()
}));

const mockedFetchPokemon = fetchPokemon as jest.Mock;
const callbackToTest = pokemon.handler;
const mockInteraction: any = {
    options: {
        getNumber: () => {
            return 1;
        }
    },
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
        (callbackToTest(mockInteraction) as Promise<void>).then(_ => {
            expect(mockInteraction.reply).toBeCalled();
        });
    });

    test('it should execute Message.reply() when fetching a pokemon is failure', () => {
        mockedFetchPokemon.mockRejectedValue({});
        
        (callbackToTest(mockInteraction) as Promise<void>).then(_ => {
            expect(mockInteraction.reply).toBeCalled();
        });
    });
});
