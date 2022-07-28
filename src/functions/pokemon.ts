import { Pokemon } from 'types/pokemon';
import { BotCommand, BotCommandHandlerArgs } from "cordless";
import { fetchPokemon } from "@helpers/pokemonApi";
import { ApplicationCommandOptionType } from 'discord.js'

const name: string = 'pokemon';
const description: string = 'Put a number and then I will tell you the name of the pokemon';
const networkError: string = 'Pokemon not found';
const optionName = 'number';
const optionDescription = 'Who is this Pokemon?'

export const pokemon: BotCommand = {
  name: name,
  description: description,
  options: [
    {
      type: ApplicationCommandOptionType.Number,
      name: optionName,
      description: optionDescription,
      required: true
    }
  ],
  handler: doCallback
}

async function doCallback({interaction}: BotCommandHandlerArgs): Promise<void> {
  let pokemonId: any = interaction.options.getNumber(optionName, true);

  await fetchPokemon(pokemonId).
    then((pokemon: Pokemon) => interaction.reply(pokemon.name)).
    catch(_ => interaction.reply(networkError));
}
