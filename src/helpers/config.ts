import dotenv from 'dotenv';

export function config(key: string): string {
    dotenv.config();

    if (key in process.env) {
        return process.env[key]!;
    }

    throw new Error(`${key} not found in .env file`);
}
