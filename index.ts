import { init } from 'cordless';
import { helpCommand, pokemon } from './src/functions/pokemon';
import { BotOptions } from './src/types/botOptions';
import { config } from './src/helpers/config';

const botToken: string = config('DISCORD_BOT_TOKEN');
const options: BotOptions = {
  functions: [pokemon], 
  helpCommand: helpCommand
}

const initialized = init(options);
initialized.login(botToken);
