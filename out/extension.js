"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
vscode_1.languages.registerHoverProvider('uvuasm', {
    provideHover(document, position, token) {
        const asdf = document.getText(document.getWordRangeAtPosition(position));
        if (document.getText() === "JMP")
            return new vscode_1.Hover("Jumps to a specified label");
    }
});
//# sourceMappingURL=extension.js.map