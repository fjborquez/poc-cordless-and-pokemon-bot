import { init } from 'cordless';
import { command } from '@functions/pokemon';
import { BotOptions } from 'types/botOptions';
import { config } from '@helpers/config';

const botToken: string = config('DISCORD_BOT_TOKEN');
const options: BotOptions = {
  commands: [command], 
  token: botToken,
}

init(options);
