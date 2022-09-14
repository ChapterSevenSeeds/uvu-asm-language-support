import { HoverProvider, ProviderResult, Hover, languages, Range, TextEdit, Position } from 'vscode';

languages.registerDocumentFormattingEditProvider('uvuasm', {
    provideDocumentFormattingEdits(document, options, token) {
        const edits: TextEdit[] = [];

        const text = document.getText().split('\n');

        let maxLabelLength = 1;
        for (const line of text) {
            const match = /^\w+/.exec(line)?.[0];
            if (match != null && match.length > maxLabelLength) maxLabelLength = match.length;
        }

        const insertChar = options.insertSpaces ? ' ' : '\t';
        let insertCount = Math.ceil(maxLabelLength / options.tabSize) * (options.insertSpaces ? options.tabSize : 1);
        if (insertCount === maxLabelLength / (options.insertSpaces ? 1 : options.tabSize)) insertCount += options.insertSpaces ? options.tabSize : 1;

        for (const [index, line] of Object.entries(text)) {
            let whiteSpaceStart = -1, whiteSpaceEnd = -1;
            for (let i = 0; i < line.length; ++i) {
                if (/\w/.test(line[i])) {
                    if (whiteSpaceStart != -1) {
                        whiteSpaceEnd = i;
                        break;
                    } 
                } else if (whiteSpaceStart == -1)  {
                    whiteSpaceStart = i;
                }
            }

            if (whiteSpaceEnd !== -1 && whiteSpaceStart !== -1) edits.push(TextEdit.replace(new Range(new Position(+index, whiteSpaceStart), new Position(+index, whiteSpaceEnd)), "".padStart(insertCount - (options.insertSpaces ? whiteSpaceStart : Math.floor(whiteSpaceStart / options.tabSize)), insertChar)));
        }

        return edits;
    }
})