import { Pokemon } from 'types/pokemon';
import axios from "axios";
import { config } from '@helpers/config';

const idPattern: string = config('ID_POKEMON_PATTERN');
const urlTemplate: string = config('URL_API_POKEMON') + idPattern + '/';

export function fetchPokemon(pokemonId: string): Promise<Pokemon> {
    const urlWithId = createApiUrl(pokemonId);
  
    return axios.get(urlWithId).then(response => response.data);
}

function createApiUrl(pokemonId: string): string {
    return urlTemplate.replace(idPattern, pokemonId);
}
