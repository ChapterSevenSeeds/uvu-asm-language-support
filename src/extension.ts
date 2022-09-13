import { HoverProvider, ProviderResult, Hover, languages,  } from 'vscode';

languages.registerDocumentFormattingEditProvider('uvuasm', {
    provideDocumentFormattingEdits(document, options, token) {

    }
})