import axios from 'axios';
import { config } from 'helpers/config';
import { fetchPokemon } from "helpers/pokemonApi";

jest.mock('axios');
jest.mock('helpers/config', () => ({
    config: jest.fn()
}))

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedConfig = config as jest.Mock;

describe('fetchPokemon function', () => {
    mockedConfig.mockReturnValue("avalue");

    test('it should return a promise of a pokemon when id is a valid value', () => {
        const idPokemon = "25";
        const namePokemon = "pikachu";
        const returnedPokemon = {
            'name': namePokemon
        }
        const httpBody = {
            data: returnedPokemon
        };

        mockedAxios.get.mockResolvedValue(httpBody);

        fetchPokemon(idPokemon).then(result => {
            expect(result.name).toBe(namePokemon);
        });
    });

    test('it should throw an error when idPokemon is -1', () => testWithError('-1', 'idPokemon is -1'));
    test('it should throw an error when idPokemon is 3000 and is greater than last id pokemon', () => testWithError('3000', 'idPokemon is 3000'));
    test('it should throw an error when pokemon id is a letter "a"', () => testWithError('a', 'idPokemon is a'));

    async function testWithError(idPokemon: string, message: string) {        
        mockedAxios.get.mockRejectedValue(new Error(message));
        await expect(fetchPokemon(idPokemon)).rejects.toThrowError();
    }
});
