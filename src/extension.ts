import { HoverProvider, ProviderResult, Hover, languages } from 'vscode';

languages.registerHoverProvider('uvuasm', {
    provideHover(document, position, token) {
        const asdf = document.getText(document.getWordRangeAtPosition(position));
        if (document.getText() === "JMP") return new Hover("Jumps to a specified label");
    }
});