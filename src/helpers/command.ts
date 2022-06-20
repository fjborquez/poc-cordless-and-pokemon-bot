export function extractParameters(content: string, separator: string): string[] {
    return content.split(separator);
}

export function isThisTheCommand(functionCommand: string, actualCommand: string): boolean {
    return actualCommand.startsWith(`${functionCommand} `);
}
