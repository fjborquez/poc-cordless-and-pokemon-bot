import { Pokemon } from 'types/pokemon';
import { BotFunction } from "cordless";
import { fetchPokemon } from "@helpers/pokemonApi";
import { extractParameters, isThisTheCommand } from '@helpers/command';
import { config } from '@helpers/config';

const parametersSeparator: string = config('PARAMETERS_SEPARATOR');
const command: string = '/pokemon';
const name: string = 'pokemon';
const description: string = 'Put a number and then I will tell you the name of the pokemon';
const networkError: string = 'Pokemon not found';
const parametersError: string = 'No pokemon id provided';
export const helpCommand: string = `${command} help`;

export const pokemon: BotFunction = {
  name: name,
  description: description,
  condition: (msg) => isThisTheCommand(command, msg.content),
  callback: doCallback
}

async function doCallback(msg: any): Promise<void> {
  let content: any = msg.content;
  let [_, ...params]: string[] = extractParameters(content, parametersSeparator);
  let pokemonId: string = extractPokemonIdFromParameters(params);

  return await fetchPokemon(pokemonId).
    then((pokemon: Pokemon) => msg.reply(pokemon.name)).
    catch(_ => msg.reply(networkError));
}

function extractPokemonIdFromParameters(params: string[]): string {
    if (params.length === 0) {
        throw new Error(parametersError);
    }

    return params[0];
}
