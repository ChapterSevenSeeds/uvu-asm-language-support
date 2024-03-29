import { HoverProvider, ProviderResult, Hover, languages, Range, TextEdit, Position, DebugConsoleMode, CompletionItem, CompletionItemKind, Location } from 'vscode';

class InsertChars {
    private _asSpaces: number;
    private _asTabs: number;
    private _prefersSpaces: boolean;
    private _tabSize: number;

    constructor(spaces: number, tabSize: number, prefersSpaces: boolean) {
        this._asTabs = Math.ceil(spaces / tabSize);
        this._asSpaces = this._asTabs * tabSize;
        this._prefersSpaces = prefersSpaces;
        this._tabSize = tabSize;
    }

    public get insertChars() {
        return this._prefersSpaces ? this._asSpaces : this._asTabs;
    }

    public get asSpaces() {
        return this._asSpaces;
    }

    public get asTabs() {
        return this._asTabs;
    }

    public increment() {
        this._asSpaces += this._tabSize;
        ++this._asTabs;
    }
}

languages.registerHoverProvider('uvuasm', {
    provideHover: (document, position, token) => {
        const range = document.getWordRangeAtPosition(position);
        const word = document.getText(range);

        switch (word) {
            case "JMP":
                return new Hover("`JMP Label`  \nJump to label.");
            case "JMR":
                return new Hover("`JMR RS`  \nJump to the address contained in `RS`.");
            case "BNZ":
                return new Hover("`BNZ RS Label`  \nJump to label if `RS` != 0.");
            case "BGT":
                return new Hover("`BGT RS Label`  \nJump to label if `RS` > 0.");
            case "BLT":
                return new Hover("`BLT RS Label`  \nJump to label if `RS` < 0.");
            case "BRZ":
                return new Hover("`BRZ RS Label`  \nJump to label if `RS` == 0.");
            case "MOV":
                return new Hover("`MOV RD RS`  \nCopy contents from `RS` to `RD`.");
            case "MOVI":
                return new Hover("`MOVI RD Imm`  \nMove `Imm` to `RD`.");
            case "LDA":
                return new Hover("`LDA RD Label`  \nLoad address of label into `RD`. The label can only exist in the data segment.");
            case "STR":
                return new Hover("`STR RS Label` *and* `STR RS RG`  \nStore the integer contained in `RS` at `Label` __or__ at the address contained in `RG`.");
            case "LDR":
                return new Hover("`LDR RD Label` *and* `LDR RD RG`  \nLoad the integer stored at `Label` __or__ at the address contained in `RG` into `RD`.");
            case "STB":
                return new Hover("`STB RS Label` *and* `STB RS RG`  \nStore the byte contained in `RS` at `Label` __or__ at the address contained in `RG`.");
            case "LDB":
                return new Hover("`LDB RD Label` *and* `LDB RD RG`  \nLoad the byte stored at `Label` __or__ at the address contained in `RG` into `RD`.");
            case "AND":
                return new Hover("`AND RD RS`  \nBitwise AND `RD` and `RS` together and store the result in `RD`.");
            case "OR":
                return new Hover("`OR RD RS`  \nBitwise OR `RD` and `RS` together and store the result in `RD`.");
            case "CMP":
                return new Hover("`CMP RD RS`  \nSets `RD` to 0 if `RD` = `RS`. Sets `RD` to 1 if `RD` > `RS`. Sets `RD` to -1 if `RD` < `RS`.");
            case "CMPI":
                return new Hover("`CMPI RD Imm`  \nSets `RD` to 0 if `RD` = `Imm`. Sets `RD` to 1 if `RD` > `Imm`. Sets `RD` to -1 if `RD` < `Imm`.");
            case "ADD":
                return new Hover("`ADD RD RS`  \nAdds `RD` and `RS` and stores the result in `RD`.");
            case "ADI":
                return new Hover("`ADI RD Imm`  \nAdds `RD` and `Imm` and stores the result in `RD`.");
            case "SUB":
                return new Hover("`SUB RD RS`  \nSubtracts `RS` from `RD` and stores the result in `RD`.");
            case "MUL":
                return new Hover("`MUL RD RS`  \nMultiplies `RD` and `RS` and stores the result in `RD`.");
            case "MULI":
                return new Hover("`MUL RD Imm`  \nMultiplies `RD` and `Imm` and stores the result in `RD`.");
            case "DIV":
                return new Hover("`DIV RD RS`  \nDivides `RD` by `RS` and stores the result in `RD`.");
            case "DIVI":
                return new Hover("`DIVI RD Imm`  \nDivides `RD` by `Imm` and stores the result in `RD`.");
            case ".INT":
                return new Hover("`.INT Imm`  \nAllocates space for an integer with an immediate value if provided, zero otherwise. No ASCII values allowed.");
            case ".BYT":
                return new Hover("`.BYT Imm`  \nAllocates space for a byte with an immediate value if provided, zero otherwise.");
            case ".STR":
                return new Hover("`.STR \"Imm\"`  \nAllocates space for a byte array whose values represent the characters from the string given in the operand. Individual implementations can either append a null terminator at the end or encode the string length as the first four bytes of the array.");
            case "TRP":
                return new Hover(["`TRP Imm`",
                    "If `Imm` =",
                    " - `0`: Executes STOP routine",
                    " - `1`: Prints the integer value of `R3` to stdout",
                    " - `2`: Reads an integer from stdin into `R3`",
                    " - `3`: Writes the byte value of `R3`",
                    " - `4`: Reads a byte from stdin into `R3`"].join("  \n"));
            case "PC":
                return new Hover("The program counter.");
            case "SL":
                return new Hover("The stack limit. Expanding the stack past this point is a stack overflow.");
            case "SB":
                return new Hover("The bottom of the stack.");
            case "SP":
                return new Hover("The stack pointer.");
            case "FP":
                return new Hover("The frame pointer.");
            default:
                var register = /^R(\d{1,2})$/.exec(word);
                if (register != null && register[1] != null) {
                    return new Hover(`Register ${register[1]}`);
                }
                break;
        }
    }
});

languages.registerDocumentFormattingEditProvider('uvuasm', {
    provideDocumentFormattingEdits(document, options, token) {
        const replacementChar = options.insertSpaces ? ' ' : '\t';
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

        let insertChars = new InsertChars(maxLabelLength, options.tabSize, options.insertSpaces);

        if (insertChars.asSpaces === maxLabelLength) insertChars.increment();

        return whiteSpaceRanges.map(x => new TextEdit(x.range, "".padStart(insertChars.insertChars - (options.insertSpaces ? x.labelLength : Math.floor(x.labelLength / options.tabSize)), replacementChar)))
    }
});

languages.registerDefinitionProvider('uvuasm', {
    provideDefinition: (document, position, token) => {
        const range = document.getWordRangeAtPosition(position);
        const word = document.getText(range);

        const lines = document.getText().split('\n');

        for (const [index, line] of Object.entries(lines)) {
            if (new RegExp(`^${word}`).test(line)) {
                return [new Location(document.uri, new Position(Number(index), 0))];
            }
        }

        return [];
    },
})

/* "completionProvider": {
    "resolveProvider": "true",
    "triggerCharacters": [
        "."
    ]
}
 */
/* languages.registerCompletionItemProvider('uvuasm', {
    provideCompletionItems: (document, position, token) => {
        const range = document.getWordRangeAtPosition(position);
        const word = document.getText(range);
        const asdf = new CompletionItem("R3", CompletionItemKind.Variable);
        return [asdf];
    }
}); */