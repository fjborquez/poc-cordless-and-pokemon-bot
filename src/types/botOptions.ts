import { BotFunction } from "cordless"

export type BotOptions = {
    functions: BotFunction[],
    helpCommand: string
}
