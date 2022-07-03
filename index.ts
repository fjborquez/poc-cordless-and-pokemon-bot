import { init } from 'cordless';
import { helpCommand, pokemon } from 'functions/pokemon';
import { BotOptions } from 'types/botOptions';
import { config } from 'helpers/config';

const botToken: string = config('DISCORD_BOT_TOKEN');
const options: BotOptions = {
  functions: [pokemon], 
  helpCommand: helpCommand
}

const initialized = init(options);
initialized.login(botToken);
