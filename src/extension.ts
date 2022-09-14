import { HoverProvider, ProviderResult, Hover, languages, Range, TextEdit, Position, DebugConsoleMode } from 'vscode';

languages.registerDocumentFormattingEditProvider('uvuasm', {
    provideDocumentFormattingEdits(document, options, token) {
        function lengthInSpaces(length: number) {
            return length;
        }
        function lengthInTabs(length: number) {
            return Math.ceil(length / options.tabSize);
        }

        const replacementChar = options.insertSpaces ? ' ' : '\t';
        const lengthConversionFunction = options.insertSpaces ? lengthInSpaces : lengthInTabs;
        const text = document.getText().split('\n');

        let maxLabelLength = 1; // In spaces
        const whiteSpaceRanges: {
            range: Range,
            labelLength: number
        }[] = [];

        for (const [index, line] of Object.entries(text)) {
            if (!Boolean(line.trim()) || line.trim().startsWith(';')) continue;

            const match = /^(\w*)(\s+)/.exec(line);

            if (match != null) {
                if (match[1].length > maxLabelLength) {
                    maxLabelLength = match[1].length;
                }

                whiteSpaceRanges.push({
                    range: new Range(new Position(Number(index), match[1].length), new Position(Number(index), match[1].length + match[2].length)),
                    labelLength: match[1].length // In spaces
                });
            }
        }

        let insertChars = Math.floor(lengthConversionFunction(maxLabelLength) / options.tabSize) * options.tabSize;
        if (insertChars % options.tabSize === 0) insertChars += options.insertSpaces ? options.tabSize : 1;

        return whiteSpaceRanges.map(x => new TextEdit(x.range, "".padStart(insertChars - lengthConversionFunction(x.labelLength), replacementChar)))
    }
})