"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyHunkIntegrity = exports.parsePatchFile = exports.interpretParsedPatchFile = exports.EXECUTABLE_FILE_MODE = exports.NON_EXECUTABLE_FILE_MODE = exports.parseHunkHeaderLine = void 0;
const assertNever_1 = require("../assertNever");
const parseHunkHeaderLine = (headerLine) => {
    const match = headerLine
        .trim()
        .match(/^@@ -(\d+)(,(\d+))? \+(\d+)(,(\d+))? @@.*/);
    if (!match) {
        throw new Error(`Bad header line: '${headerLine}'`);
    }
    return {
        original: {
            start: Math.max(Number(match[1]), 1),
            length: Number(match[3] || 1),
        },
        patched: {
            start: Math.max(Number(match[4]), 1),
            length: Number(match[6] || 1),
        },
    };
};
exports.parseHunkHeaderLine = parseHunkHeaderLine;
exports.NON_EXECUTABLE_FILE_MODE = 0o644;
exports.EXECUTABLE_FILE_MODE = 0o755;
const emptyFilePatch = () => ({
    diffLineFromPath: null,
    diffLineToPath: null,
    oldMode: null,
    newMode: null,
    deletedFileMode: null,
    newFileMode: null,
    renameFrom: null,
    renameTo: null,
    beforeHash: null,
    afterHash: null,
    fromPath: null,
    toPath: null,
    hunks: null,
});
const emptyHunk = (headerLine) => ({
    header: exports.parseHunkHeaderLine(headerLine),
    parts: [],
});
const hunkLinetypes = {
    "@": "header",
    "-": "deletion",
    "+": "insertion",
    " ": "context",
    "\\": "pragma",
    // Treat blank lines as context
    undefined: "context",
};
function parsePatchLines(lines, { supportLegacyDiffs }) {
    const result = [];
    let currentFilePatch = emptyFilePatch();
    let state = "parsing header";
    let currentHunk = null;
    let currentHunkMutationPart = null;
    function commitHunk() {
        if (currentHunk) {
            if (currentHunkMutationPart) {
                currentHunk.parts.push(currentHunkMutationPart);
                currentHunkMutationPart = null;
            }
            currentFilePatch.hunks.push(currentHunk);
            currentHunk = null;
        }
    }
    function commitFilePatch() {
        commitHunk();
        result.push(currentFilePatch);
        currentFilePatch = emptyFilePatch();
    }
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (state === "parsing header") {
            if (line.startsWith("@@")) {
                state = "parsing hunks";
                currentFilePatch.hunks = [];
                i--;
            }
            else if (line.startsWith("diff --git ")) {
                if (currentFilePatch && currentFilePatch.diffLineFromPath) {
                    commitFilePatch();
                }
                const match = line.match(/^diff --git a\/(.*?) b\/(.*?)\s*$/);
                if (!match) {
                    throw new Error("Bad diff line: " + line);
                }
                currentFilePatch.diffLineFromPath = match[1];
                currentFilePatch.diffLineToPath = match[2];
            }
            else if (line.startsWith("old mode ")) {
                currentFilePatch.oldMode = line.slice("old mode ".length).trim();
            }
            else if (line.startsWith("new mode ")) {
                currentFilePatch.newMode = line.slice("new mode ".length).trim();
            }
            else if (line.startsWith("deleted file mode ")) {
                currentFilePatch.deletedFileMode = line
                    .slice("deleted file mode ".length)
                    .trim();
            }
            else if (line.startsWith("new file mode ")) {
                currentFilePatch.newFileMode = line
                    .slice("new file mode ".length)
                    .trim();
            }
            else if (line.startsWith("rename from ")) {
                currentFilePatch.renameFrom = line.slice("rename from ".length).trim();
            }
            else if (line.startsWith("rename to ")) {
                currentFilePatch.renameTo = line.slice("rename to ".length).trim();
            }
            else if (line.startsWith("index ")) {
                const match = line.match(/(\w+)\.\.(\w+)/);
                if (!match) {
                    continue;
                }
                currentFilePatch.beforeHash = match[1];
                currentFilePatch.afterHash = match[2];
            }
            else if (line.startsWith("--- ")) {
                currentFilePatch.fromPath = line.slice("--- a/".length).trim();
            }
            else if (line.startsWith("+++ ")) {
                currentFilePatch.toPath = line.slice("+++ b/".length).trim();
            }
        }
        else {
            if (supportLegacyDiffs && line.startsWith("--- a/")) {
                state = "parsing header";
                commitFilePatch();
                i--;
                continue;
            }
            // parsing hunks
            const lineType = hunkLinetypes[line[0]] || null;
            switch (lineType) {
                case "header":
                    commitHunk();
                    currentHunk = emptyHunk(line);
                    break;
                case null:
                    // unrecognized, bail out
                    state = "parsing header";
                    commitFilePatch();
                    i--;
                    break;
                case "pragma":
                    if (!line.startsWith("\\ No newline at end of file")) {
                        throw new Error("Unrecognized pragma in patch file: " + line);
                    }
                    if (!currentHunkMutationPart) {
                        throw new Error("Bad parser state: No newline at EOF pragma encountered without context");
                    }
                    currentHunkMutationPart.noNewlineAtEndOfFile = true;
                    break;
                case "insertion":
                case "deletion":
                case "context":
                    if (!currentHunk) {
                        throw new Error("Bad parser state: Hunk lines encountered before hunk header");
                    }
                    if (currentHunkMutationPart &&
                        currentHunkMutationPart.type !== lineType) {
                        currentHunk.parts.push(currentHunkMutationPart);
                        currentHunkMutationPart = null;
                    }
                    if (!currentHunkMutationPart) {
                        currentHunkMutationPart = {
                            type: lineType,
                            lines: [],
                            noNewlineAtEndOfFile: false,
                        };
                    }
                    currentHunkMutationPart.lines.push(line.slice(1));
                    break;
                default:
                    // exhausitveness check
                    assertNever_1.assertNever(lineType);
            }
        }
    }
    commitFilePatch();
    for (const { hunks } of result) {
        if (hunks) {
            for (const hunk of hunks) {
                verifyHunkIntegrity(hunk);
            }
        }
    }
    return result;
}
function interpretParsedPatchFile(files) {
    const result = [];
    for (const file of files) {
        const { diffLineFromPath, diffLineToPath, oldMode, newMode, deletedFileMode, newFileMode, renameFrom, renameTo, beforeHash, afterHash, fromPath, toPath, hunks, } = file;
        const type = renameFrom
            ? "rename"
            : deletedFileMode
                ? "file deletion"
                : newFileMode
                    ? "file creation"
                    : hunks && hunks.length > 0
                        ? "patch"
                        : "mode change";
        let destinationFilePath = null;
        switch (type) {
            case "rename":
                if (!renameFrom || !renameTo) {
                    throw new Error("Bad parser state: rename from & to not given");
                }
                result.push({
                    type: "rename",
                    fromPath: renameFrom,
                    toPath: renameTo,
                });
                destinationFilePath = renameTo;
                break;
            case "file deletion": {
                const path = diffLineFromPath || fromPath;
                if (!path) {
                    throw new Error("Bad parse state: no path given for file deletion");
                }
                result.push({
                    type: "file deletion",
                    hunk: (hunks && hunks[0]) || null,
                    path,
                    mode: parseFileMode(deletedFileMode),
                    hash: beforeHash,
                });
                break;
            }
            case "file creation": {
                const path = diffLineToPath || toPath;
                if (!path) {
                    throw new Error("Bad parse state: no path given for file creation");
                }
                result.push({
                    type: "file creation",
                    hunk: (hunks && hunks[0]) || null,
                    path,
                    mode: parseFileMode(newFileMode),
                    hash: afterHash,
                });
                break;
            }
            case "patch":
            case "mode change":
                destinationFilePath = toPath || diffLineToPath;
                break;
            default:
                assertNever_1.assertNever(type);
        }
        if (destinationFilePath && oldMode && newMode && oldMode !== newMode) {
            result.push({
                type: "mode change",
                path: destinationFilePath,
                oldMode: parseFileMode(oldMode),
                newMode: parseFileMode(newMode),
            });
        }
        if (destinationFilePath && hunks && hunks.length) {
            result.push({
                type: "patch",
                path: destinationFilePath,
                hunks,
                beforeHash,
                afterHash,
            });
        }
    }
    return result;
}
exports.interpretParsedPatchFile = interpretParsedPatchFile;
function parseFileMode(mode) {
    // tslint:disable-next-line:no-bitwise
    const parsedMode = parseInt(mode, 8) & 0o777;
    if (parsedMode !== exports.NON_EXECUTABLE_FILE_MODE &&
        parsedMode !== exports.EXECUTABLE_FILE_MODE) {
        throw new Error("Unexpected file mode string: " + mode);
    }
    return parsedMode;
}
function parsePatchFile(file) {
    const lines = file.split(/\n/g);
    if (lines[lines.length - 1] === "") {
        lines.pop();
    }
    try {
        return interpretParsedPatchFile(parsePatchLines(lines, { supportLegacyDiffs: false }));
    }
    catch (e) {
        if (e instanceof Error &&
            e.message === "hunk header integrity check failed") {
            return interpretParsedPatchFile(parsePatchLines(lines, { supportLegacyDiffs: true }));
        }
        throw e;
    }
}
exports.parsePatchFile = parsePatchFile;
function verifyHunkIntegrity(hunk) {
    // verify hunk integrity
    let originalLength = 0;
    let patchedLength = 0;
    for (const { type, lines } of hunk.parts) {
        switch (type) {
            case "context":
                patchedLength += lines.length;
                originalLength += lines.length;
                break;
            case "deletion":
                originalLength += lines.length;
                break;
            case "insertion":
                patchedLength += lines.length;
                break;
            default:
                assertNever_1.assertNever(type);
        }
    }
    if (originalLength !== hunk.header.original.length ||
        patchedLength !== hunk.header.patched.length) {
        throw new Error("hunk header integrity check failed");
    }
}
exports.verifyHunkIntegrity = verifyHunkIntegrity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcGF0Y2gvcGFyc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0RBQTRDO0FBYXJDLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxVQUFrQixFQUFjLEVBQUU7SUFDcEUsTUFBTSxLQUFLLEdBQUcsVUFBVTtTQUNyQixJQUFJLEVBQUU7U0FDTixLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQTtJQUNyRCxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsVUFBVSxHQUFHLENBQUMsQ0FBQTtLQUNwRDtJQUVELE9BQU87UUFDTCxRQUFRLEVBQUU7WUFDUixLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QjtRQUNELE9BQU8sRUFBRTtZQUNQLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlCO0tBQ0YsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQWxCWSxRQUFBLG1CQUFtQix1QkFrQi9CO0FBRVksUUFBQSx3QkFBd0IsR0FBRyxLQUFLLENBQUE7QUFDaEMsUUFBQSxvQkFBb0IsR0FBRyxLQUFLLENBQUE7QUErRXpDLE1BQU0sY0FBYyxHQUFHLEdBQWMsRUFBRSxDQUFDLENBQUM7SUFDdkMsZ0JBQWdCLEVBQUUsSUFBSTtJQUN0QixjQUFjLEVBQUUsSUFBSTtJQUNwQixPQUFPLEVBQUUsSUFBSTtJQUNiLE9B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TUFBTSxFQUM1QztRQUNBLE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQTtLQUN0RDtBQUNILENBQUM7QUEzQkQsa0RBMkJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXNzZXJ0TmV2ZXIgfSBmcm9tIFwiLi4vYXNzZXJ0TmV2ZXJcIlxuXG5leHBvcnQgaW50ZXJmYWNlIEh1bmtIZWFkZXIge1xuICBvcmlnaW5hbDoge1xuICAgIHN0YXJ0OiBudW1iZXJcbiAgICBsZW5ndGg6IG51bWJlclxuICB9XG4gIHBhdGNoZWQ6IHtcbiAgICBzdGFydDogbnVtYmVyXG4gICAgbGVuZ3RoOiBudW1iZXJcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcGFyc2VIdW5rSGVhZGVyTGluZSA9IChoZWFkZXJMaW5lOiBzdHJpbmcpOiBIdW5rSGVhZGVyID0+IHtcbiAgY29uc3QgbWF0Y2ggPSBoZWFkZXJMaW5lXG4gICAgLnRyaW0oKVxuICAgIC5tYXRjaCgvXkBAIC0oXFxkKykoLChcXGQrKSk/IFxcKyhcXGQrKSgsKFxcZCspKT8gQEAuKi8pXG4gIGlmICghbWF0Y2gpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEJhZCBoZWFkZXIgbGluZTogJyR7aGVhZGVyTGluZX0nYClcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgb3JpZ2luYWw6IHtcbiAgICAgIHN0YXJ0OiBNYXRoLm1heChOdW1iZXIobWF0Y2hbMV0pLCAxKSxcbiAgICAgIGxlbmd0aDogTnVtYmVyKG1hdGNoWzNdIHx8IDEpLFxuICAgIH0sXG4gICAgcGF0Y2hlZDoge1xuICAgICAgc3RhcnQ6IE1hdGgubWF4KE51bWJlcihtYXRjaFs0XSksIDEpLFxuICAgICAgbGVuZ3RoOiBOdW1iZXIobWF0Y2hbNl0gfHwgMSksXG4gICAgfSxcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgTk9OX0VYRUNVVEFCTEVfRklMRV9NT0RFID0gMG82NDRcbmV4cG9ydCBjb25zdCBFWEVDVVRBQkxFX0ZJTEVfTU9ERSA9IDBvNzU1XG5cbnR5cGUgRmlsZU1vZGUgPSB0eXBlb2YgTk9OX0VYRUNVVEFCTEVfRklMRV9NT0RFIHwgdHlwZW9mIEVYRUNVVEFCTEVfRklMRV9NT0RFXG5cbmludGVyZmFjZSBQYXRjaE11dGF0aW9uUGFydCB7XG4gIHR5cGU6IFwiY29udGV4dFwiIHwgXCJpbnNlcnRpb25cIiB8IFwiZGVsZXRpb25cIlxuICBsaW5lczogc3RyaW5nW11cbiAgbm9OZXdsaW5lQXRFbmRPZkZpbGU6IGJvb2xlYW5cbn1cblxuaW50ZXJmYWNlIEZpbGVSZW5hbWUge1xuICB0eXBlOiBcInJlbmFtZVwiXG4gIGZyb21QYXRoOiBzdHJpbmdcbiAgdG9QYXRoOiBzdHJpbmdcbn1cblxuaW50ZXJmYWNlIEZpbGVNb2RlQ2hhbmdlIHtcbiAgdHlwZTogXCJtb2RlIGNoYW5nZVwiXG4gIHBhdGg6IHN0cmluZ1xuICBvbGRNb2RlOiBGaWxlTW9kZVxuICBuZXdNb2RlOiBGaWxlTW9kZVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZpbGVQYXRjaCB7XG4gIHR5cGU6IFwicGF0Y2hcIlxuICBwYXRoOiBzdHJpbmdcbiAgaHVua3M6IEh1bmtbXVxuICBiZWZvcmVIYXNoOiBzdHJpbmcgfCBudWxsXG4gIGFmdGVySGFzaDogc3RyaW5nIHwgbnVsbFxufVxuXG5pbnRlcmZhY2UgRmlsZURlbGV0aW9uIHtcbiAgdHlwZTogXCJmaWxlIGRlbGV0aW9uXCJcbiAgcGF0aDogc3RyaW5nXG4gIG1vZGU6IEZpbGVNb2RlXG4gIGh1bms6IEh1bmsgfCBudWxsXG4gIGhhc2g6IHN0cmluZyB8IG51bGxcbn1cblxuaW50ZXJmYWNlIEZpbGVDcmVhdGlvbiB7XG4gIHR5cGU6IFwiZmlsZSBjcmVhdGlvblwiXG4gIG1vZGU6IEZpbGVNb2RlXG4gIHBhdGg6IHN0cmluZ1xuICBodW5rOiBIdW5rIHwgbnVsbFxuICBoYXNoOiBzdHJpbmcgfCBudWxsXG59XG5cbmV4cG9ydCB0eXBlIFBhdGNoRmlsZVBhcnQgPVxuICB8IEZpbGVQYXRjaFxuICB8IEZpbGVEZWxldGlvblxuICB8IEZpbGVDcmVhdGlvblxuICB8IEZpbGVSZW5hbWVcbiAgfCBGaWxlTW9kZUNoYW5nZVxuXG5leHBvcnQgdHlwZSBQYXJzZWRQYXRjaEZpbGUgPSBQYXRjaEZpbGVQYXJ0W11cblxudHlwZSBTdGF0ZSA9IFwicGFyc2luZyBoZWFkZXJcIiB8IFwicGFyc2luZyBodW5rc1wiXG5cbmludGVyZmFjZSBGaWxlRGVldHMge1xuICBkaWZmTGluZUZyb21QYXRoOiBzdHJpbmcgfCBudWxsXG4gIGRpZmZMaW5lVG9QYXRoOiBzdHJpbmcgfCBudWxsXG4gIG9sZE1vZGU6IHN0cmluZyB8IG51bGxcbiAgbmV3TW9kZTogc3RyaW5nIHwgbnVsbFxuICBkZWxldGVkRmlsZU1vZGU6IHN0cmluZyB8IG51bGxcbiAgbmV3RmlsZU1vZGU6IHN0cmluZyB8IG51bGxcbiAgcmVuYW1lRnJvbTogc3RyaW5nIHwgbnVsbFxuICByZW5hbWVUbzogc3RyaW5nIHwgbnVsbFxuICBiZWZvcmVIYXNoOiBzdHJpbmcgfCBudWxsXG4gIGFmdGVySGFzaDogc3RyaW5nIHwgbnVsbFxuICBmcm9tUGF0aDogc3RyaW5nIHwgbnVsbFxuICB0b1BhdGg6IHN0cmluZyB8IG51bGxcbiAgaHVua3M6IEh1bmtbXSB8IG51bGxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBIdW5rIHtcbiAgaGVhZGVyOiBIdW5rSGVhZGVyXG4gIHBhcnRzOiBQYXRjaE11dGF0aW9uUGFydFtdXG59XG5cbmNvbnN0IGVtcHR5RmlsZVBhdGNoID0gKCk6IEZpbGVEZWV0cyA9PiAoe1xuICBkaWZmTGluZUZyb21QYXRoOiBudWxsLFxuICBkaWZmTGluZVRvUGF0aDogbnVsbCxcbiAgb2xkTW9kZTogbnVsbCxcbiAgbmV3TW9kZTogbnVsbCxcbiAgZGVsZXRlZEZpbGVNb2RlOiBudWxsLFxuICBuZXdGaWxlTW9kZTogbnVsbCxcbiAgcmVuYW1lRnJvbTogbnVsbCxcbiAgcmVuYW1lVG86IG51bGwsXG4gIGJlZm9yZUhhc2g6IG51bGwsXG4gIGFmdGVySGFzaDogbnVsbCxcbiAgZnJvbVBhdGg6IG51bGwsXG4gIHRvUGF0aDogbnVsbCxcbiAgaHVua3M6IG51bGwsXG59KVxuXG5jb25zdCBlbXB0eUh1bmsgPSAoaGVhZGVyTGluZTogc3RyaW5nKTogSHVuayA9PiAoe1xuICBoZWFkZXI6IHBhcnNlSHVua0hlYWRlckxpbmUoaGVhZGVyTGluZSksXG4gIHBhcnRzOiBbXSxcbn0pXG5cbmNvbnN0IGh1bmtMaW5ldHlwZXM6IHtcbiAgW2s6IHN0cmluZ106IFBhdGNoTXV0YXRpb25QYXJ0W1widHlwZVwiXSB8IFwicHJhZ21hXCIgfCBcImhlYWRlclwiXG59ID0ge1xuICBcIkBcIjogXCJoZWFkZXJcIixcbiAgXCItXCI6IFwiZGVsZXRpb25cIixcbiAgXCIrXCI6IFwiaW5zZXJ0aW9uXCIsXG4gIFwiIFwiOiBcImNvbnRleHRcIixcbiAgXCJcXFxcXCI6IFwicHJhZ21hXCIsXG4gIC8vIFRyZWF0IGJsYW5rIGxpbmVzIGFzIGNvbnRleHRcbiAgdW5kZWZpbmVkOiBcImNvbnRleHRcIixcbn1cblxuZnVuY3Rpb24gcGFyc2VQYXRjaExpbmVzKFxuICBsaW5lczogc3RyaW5nW10sXG4gIHsgc3VwcG9ydExlZ2FjeURpZmZzIH06IHsgc3VwcG9ydExlZ2FjeURpZmZzOiBib29sZWFuIH0sXG4pOiBGaWxlRGVldHNbXSB7XG4gIGNvbnN0IHJlc3VsdDogRmlsZURlZXRzW10gPSBbXVxuICBsZXQgY3VycmVudEZpbGVQYXRjaDogRmlsZURlZXRzID0gZW1wdHlGaWxlUGF0Y2goKVxuICBsZXQgc3RhdGU6IFN0YXRlID0gXCJwYXJzaW5nIGhlYWRlclwiXG4gIGxldCBjdXJyZW50SHVuazogSHVuayB8IG51bGwgPSBudWxsXG4gIGxldCBjdXJyZW50SHVua011dGF0aW9uUGFydDogUGF0Y2hNdXRhdGlvblBhcnQgfCBudWxsID0gbnVsbFxuXG4gIGZ1bmN0aW9uIGNvbW1pdEh1bmsoKSB7XG4gICAgaWYgKGN1cnJlbnRIdW5rKSB7XG4gICAgICBpZiAoY3VycmVudEh1bmtNdXRhdGlvblBhcnQpIHtcbiAgICAgICAgY3VycmVudEh1bmsucGFydHMucHVzaChjdXJyZW50SHVua011dGF0aW9uUGFydClcbiAgICAgICAgY3VycmVudEh1bmtNdXRhdGlvblBhcnQgPSBudWxsXG4gICAgICB9XG4gICAgICBjdXJyZW50RmlsZVBhdGNoLmh1bmtzIS5wdXNoKGN1cnJlbnRIdW5rKVxuICAgICAgY3VycmVudEh1bmsgPSBudWxsXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY29tbWl0RmlsZVBhdGNoKCkge1xuICAgIGNvbW1pdEh1bmsoKVxuICAgIHJlc3VsdC5wdXNoKGN1cnJlbnRGaWxlUGF0Y2gpXG4gICAgY3VycmVudEZpbGVQYXRjaCA9IGVtcHR5RmlsZVBhdGNoKClcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBsaW5lID0gbGluZXNbaV1cblxuICAgIGlmIChzdGF0ZSA9PT0gXCJwYXJzaW5nIGhlYWRlclwiKSB7XG4gICAgICBpZiAobGluZS5zdGFydHNXaXRoKFwiQEBcIikpIHtcbiAgICAgICAgc3RhdGUgPSBcInBhcnNpbmcgaHVua3NcIlxuICAgICAgICBjdXJyZW50RmlsZVBhdGNoLmh1bmtzID0gW11cbiAgICAgICAgaS0tXG4gICAgICB9IGVsc2UgaWYgKGxpbmUuc3RhcnRzV2l0aChcImRpZmYgLS1naXQgXCIpKSB7XG4gICAgICAgIGlmIChjdXJyZW50RmlsZVBhdGNoICYmIGN1cnJlbnRGaWxlUGF0Y2guZGlmZkxpbmVGcm9tUGF0aCkge1xuICAgICAgICAgIGNvbW1pdEZpbGVQYXRjaCgpXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eZGlmZiAtLWdpdCBhXFwvKC4qPykgYlxcLyguKj8pXFxzKiQvKVxuICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIGRpZmYgbGluZTogXCIgKyBsaW5lKVxuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRGaWxlUGF0Y2guZGlmZkxpbmVGcm9tUGF0aCA9IG1hdGNoWzFdXG4gICAgICAgIGN1cnJlbnRGaWxlUGF0Y2guZGlmZkxpbmVUb1BhdGggPSBtYXRjaFsyXVxuICAgICAgfSBlbHNlIGlmIChsaW5lLnN0YXJ0c1dpdGgoXCJvbGQgbW9kZSBcIikpIHtcbiAgICAgICAgY3VycmVudEZpbGVQYXRjaC5vbGRNb2RlID0gbGluZS5zbGljZShcIm9sZCBtb2RlIFwiLmxlbmd0aCkudHJpbSgpXG4gICAgICB9IGVsc2UgaWYgKGxpbmUuc3RhcnRzV2l0aChcIm5ldyBtb2RlIFwiKSkge1xuICAgICAgICBjdXJyZW50RmlsZVBhdGNoLm5ld01vZGUgPSBsaW5lLnNsaWNlKFwibmV3IG1vZGUgXCIubGVuZ3RoKS50cmltKClcbiAgICAgIH0gZWxzZSBpZiAobGluZS5zdGFydHNXaXRoKFwiZGVsZXRlZCBmaWxlIG1vZGUgXCIpKSB7XG4gICAgICAgIGN1cnJlbnRGaWxlUGF0Y2guZGVsZXRlZEZpbGVNb2RlID0gbGluZVxuICAgICAgICAgIC5zbGljZShcImRlbGV0ZWQgZmlsZSBtb2RlIFwiLmxlbmd0aClcbiAgICAgICAgICAudHJpbSgpXG4gICAgICB9IGVsc2UgaWYgKGxpbmUuc3RhcnRzV2l0aChcIm5ldyBmaWxlIG1vZGUgXCIpKSB7XG4gICAgICAgIGN1cnJlbnRGaWxlUGF0Y2gubmV3RmlsZU1vZGUgPSBsaW5lXG4gICAgICAgICAgLnNsaWNlKFwibmV3IGZpbGUgbW9kZSBcIi5sZW5ndGgpXG4gICAgICAgICAgLnRyaW0oKVxuICAgICAgfSBlbHNlIGlmIChsaW5lLnN0YXJ0c1dpdGgoXCJyZW5hbWUgZnJvbSBcIikpIHtcbiAgICAgICAgY3VycmVudEZpbGVQYXRjaC5yZW5hbWVGcm9tID0gbGluZS5zbGljZShcInJlbmFtZSBmcm9tIFwiLmxlbmd0aCkudHJpbSgpXG4gICAgICB9IGVsc2UgaWYgKGxpbmUuc3RhcnRzV2l0aChcInJlbmFtZSB0byBcIikpIHtcbiAgICAgICAgY3VycmVudEZpbGVQYXRjaC5yZW5hbWVUbyA9IGxpbmUuc2xpY2UoXCJyZW5hbWUgdG8gXCIubGVuZ3RoKS50cmltKClcbiAgICAgIH0gZWxzZSBpZiAobGluZS5zdGFydHNXaXRoKFwiaW5kZXggXCIpKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gbGluZS5tYXRjaCgvKFxcdyspXFwuXFwuKFxcdyspLylcbiAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudEZpbGVQYXRjaC5iZWZvcmVIYXNoID0gbWF0Y2hbMV1cbiAgICAgICAgY3VycmVudEZpbGVQYXRjaC5hZnRlckhhc2ggPSBtYXRjaFsyXVxuICAgICAgfSBlbHNlIGlmIChsaW5lLnN0YXJ0c1dpdGgoXCItLS0gXCIpKSB7XG4gICAgICAgIGN1cnJlbnRGaWxlUGF0Y2guZnJvbVBhdGggPSBsaW5lLnNsaWNlKFwiLS0tIGEvXCIubGVuZ3RoKS50cmltKClcbiAgICAgIH0gZWxzZSBpZiAobGluZS5zdGFydHNXaXRoKFwiKysrIFwiKSkge1xuICAgICAgICBjdXJyZW50RmlsZVBhdGNoLnRvUGF0aCA9IGxpbmUuc2xpY2UoXCIrKysgYi9cIi5sZW5ndGgpLnRyaW0oKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc3VwcG9ydExlZ2FjeURpZmZzICYmIGxpbmUuc3RhcnRzV2l0aChcIi0tLSBhL1wiKSkge1xuICAgICAgICBzdGF0ZSA9IFwicGFyc2luZyBoZWFkZXJcIlxuICAgICAgICBjb21taXRGaWxlUGF0Y2goKVxuICAgICAgICBpLS1cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIC8vIHBhcnNpbmcgaHVua3NcbiAgICAgIGNvbnN0IGxpbmVUeXBlID0gaHVua0xpbmV0eXBlc1tsaW5lWzBdXSB8fCBudWxsXG4gICAgICBzd2l0Y2ggKGxpbmVUeXBlKSB7XG4gICAgICAgIGNhc2UgXCJoZWFkZXJcIjpcbiAgICAgICAgICBjb21taXRIdW5rKClcbiAgICAgICAgICBjdXJyZW50SHVuayA9IGVtcHR5SHVuayhsaW5lKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgICAvLyB1bnJlY29nbml6ZWQsIGJhaWwgb3V0XG4gICAgICAgICAgc3RhdGUgPSBcInBhcnNpbmcgaGVhZGVyXCJcbiAgICAgICAgICBjb21taXRGaWxlUGF0Y2goKVxuICAgICAgICAgIGktLVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJwcmFnbWFcIjpcbiAgICAgICAgICBpZiAoIWxpbmUuc3RhcnRzV2l0aChcIlxcXFwgTm8gbmV3bGluZSBhdCBlbmQgb2YgZmlsZVwiKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIHByYWdtYSBpbiBwYXRjaCBmaWxlOiBcIiArIGxpbmUpXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghY3VycmVudEh1bmtNdXRhdGlvblBhcnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgXCJCYWQgcGFyc2VyIHN0YXRlOiBObyBuZXdsaW5lIGF0IEVPRiBwcmFnbWEgZW5jb3VudGVyZWQgd2l0aG91dCBjb250ZXh0XCIsXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICAgIGN1cnJlbnRIdW5rTXV0YXRpb25QYXJ0Lm5vTmV3bGluZUF0RW5kT2ZGaWxlID0gdHJ1ZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJpbnNlcnRpb25cIjpcbiAgICAgICAgY2FzZSBcImRlbGV0aW9uXCI6XG4gICAgICAgIGNhc2UgXCJjb250ZXh0XCI6XG4gICAgICAgICAgaWYgKCFjdXJyZW50SHVuaykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBcIkJhZCBwYXJzZXIgc3RhdGU6IEh1bmsgbGluZXMgZW5jb3VudGVyZWQgYmVmb3JlIGh1bmsgaGVhZGVyXCIsXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGN1cnJlbnRIdW5rTXV0YXRpb25QYXJ0ICYmXG4gICAgICAgICAgICBjdXJyZW50SHVua011dGF0aW9uUGFydC50eXBlICE9PSBsaW5lVHlwZVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgY3VycmVudEh1bmsucGFydHMucHVzaChjdXJyZW50SHVua011dGF0aW9uUGFydClcbiAgICAgICAgICAgIGN1cnJlbnRIdW5rTXV0YXRpb25QYXJ0ID0gbnVsbFxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWN1cnJlbnRIdW5rTXV0YXRpb25QYXJ0KSB7XG4gICAgICAgICAgICBjdXJyZW50SHVua011dGF0aW9uUGFydCA9IHtcbiAgICAgICAgICAgICAgdHlwZTogbGluZVR5cGUsXG4gICAgICAgICAgICAgIGxpbmVzOiBbXSxcbiAgICAgICAgICAgICAgbm9OZXdsaW5lQXRFbmRPZkZpbGU6IGZhbHNlLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBjdXJyZW50SHVua011dGF0aW9uUGFydC5saW5lcy5wdXNoKGxpbmUuc2xpY2UoMSkpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAvLyBleGhhdXNpdHZlbmVzcyBjaGVja1xuICAgICAgICAgIGFzc2VydE5ldmVyKGxpbmVUeXBlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbW1pdEZpbGVQYXRjaCgpXG5cbiAgZm9yIChjb25zdCB7IGh1bmtzIH0gb2YgcmVzdWx0KSB7XG4gICAgaWYgKGh1bmtzKSB7XG4gICAgICBmb3IgKGNvbnN0IGh1bmsgb2YgaHVua3MpIHtcbiAgICAgICAgdmVyaWZ5SHVua0ludGVncml0eShodW5rKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGludGVycHJldFBhcnNlZFBhdGNoRmlsZShmaWxlczogRmlsZURlZXRzW10pOiBQYXJzZWRQYXRjaEZpbGUge1xuICBjb25zdCByZXN1bHQ6IFBhcnNlZFBhdGNoRmlsZSA9IFtdXG5cbiAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgY29uc3Qge1xuICAgICAgZGlmZkxpbmVGcm9tUGF0aCxcbiAgICAgIGRpZmZMaW5lVG9QYXRoLFxuICAgICAgb2xkTW9kZSxcbiAgICAgIG5ld01vZGUsXG4gICAgICBkZWxldGVkRmlsZU1vZGUsXG4gICAgICBuZXdGaWxlTW9kZSxcbiAgICAgIHJlbmFtZUZyb20sXG4gICAgICByZW5hbWVUbyxcbiAgICAgIGJlZm9yZUhhc2gsXG4gICAgICBhZnRlckhhc2gsXG4gICAgICBmcm9tUGF0aCxcbiAgICAgIHRvUGF0aCxcbiAgICAgIGh1bmtzLFxuICAgIH0gPSBmaWxlXG4gICAgY29uc3QgdHlwZTogUGF0Y2hGaWxlUGFydFtcInR5cGVcIl0gPSByZW5hbWVGcm9tXG4gICAgICA/IFwicmVuYW1lXCJcbiAgICAgIDogZGVsZXRlZEZpbGVNb2RlXG4gICAgICA/IFwiZmlsZSBkZWxldGlvblwiXG4gICAgICA6IG5ld0ZpbGVNb2RlXG4gICAgICA/IFwiZmlsZSBjcmVhdGlvblwiXG4gICAgICA6IGh1bmtzICYmIGh1bmtzLmxlbmd0aCA+IDBcbiAgICAgID8gXCJwYXRjaFwiXG4gICAgICA6IFwibW9kZSBjaGFuZ2VcIlxuXG4gICAgbGV0IGRlc3RpbmF0aW9uRmlsZVBhdGg6IHN0cmluZyB8IG51bGwgPSBudWxsXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIFwicmVuYW1lXCI6XG4gICAgICAgIGlmICghcmVuYW1lRnJvbSB8fCAhcmVuYW1lVG8pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYWQgcGFyc2VyIHN0YXRlOiByZW5hbWUgZnJvbSAmIHRvIG5vdCBnaXZlblwiKVxuICAgICAgICB9XG4gICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICB0eXBlOiBcInJlbmFtZVwiLFxuICAgICAgICAgIGZyb21QYXRoOiByZW5hbWVGcm9tLFxuICAgICAgICAgIHRvUGF0aDogcmVuYW1lVG8sXG4gICAgICAgIH0pXG4gICAgICAgIGRlc3RpbmF0aW9uRmlsZVBhdGggPSByZW5hbWVUb1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSBcImZpbGUgZGVsZXRpb25cIjoge1xuICAgICAgICBjb25zdCBwYXRoID0gZGlmZkxpbmVGcm9tUGF0aCB8fCBmcm9tUGF0aFxuICAgICAgICBpZiAoIXBhdGgpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYWQgcGFyc2Ugc3RhdGU6IG5vIHBhdGggZ2l2ZW4gZm9yIGZpbGUgZGVsZXRpb25cIilcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgdHlwZTogXCJmaWxlIGRlbGV0aW9uXCIsXG4gICAgICAgICAgaHVuazogKGh1bmtzICYmIGh1bmtzWzBdKSB8fCBudWxsLFxuICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgbW9kZTogcGFyc2VGaWxlTW9kZShkZWxldGVkRmlsZU1vZGUhKSxcbiAgICAgICAgICBoYXNoOiBiZWZvcmVIYXNoLFxuICAgICAgICB9KVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgY2FzZSBcImZpbGUgY3JlYXRpb25cIjoge1xuICAgICAgICBjb25zdCBwYXRoID0gZGlmZkxpbmVUb1BhdGggfHwgdG9QYXRoXG4gICAgICAgIGlmICghcGF0aCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhZCBwYXJzZSBzdGF0ZTogbm8gcGF0aCBnaXZlbiBmb3IgZmlsZSBjcmVhdGlvblwiKVxuICAgICAgICB9XG4gICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICB0eXBlOiBcImZpbGUgY3JlYXRpb25cIixcbiAgICAgICAgICBodW5rOiAoaHVua3MgJiYgaHVua3NbMF0pIHx8IG51bGwsXG4gICAgICAgICAgcGF0aCxcbiAgICAgICAgICBtb2RlOiBwYXJzZUZpbGVNb2RlKG5ld0ZpbGVNb2RlISksXG4gICAgICAgICAgaGFzaDogYWZ0ZXJIYXNoLFxuICAgICAgICB9KVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgY2FzZSBcInBhdGNoXCI6XG4gICAgICBjYXNlIFwibW9kZSBjaGFuZ2VcIjpcbiAgICAgICAgZGVzdGluYXRpb25GaWxlUGF0aCA9IHRvUGF0aCB8fCBkaWZmTGluZVRvUGF0aFxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXNzZXJ0TmV2ZXIodHlwZSlcbiAgICB9XG5cbiAgICBpZiAoZGVzdGluYXRpb25GaWxlUGF0aCAmJiBvbGRNb2RlICYmIG5ld01vZGUgJiYgb2xkTW9kZSAhPT0gbmV3TW9kZSkge1xuICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICB0eXBlOiBcIm1vZGUgY2hhbmdlXCIsXG4gICAgICAgIHBhdGg6IGRlc3RpbmF0aW9uRmlsZVBhdGgsXG4gICAgICAgIG9sZE1vZGU6IHBhcnNlRmlsZU1vZGUob2xkTW9kZSksXG4gICAgICAgIG5ld01vZGU6IHBhcnNlRmlsZU1vZGUobmV3TW9kZSksXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmIChkZXN0aW5hdGlvbkZpbGVQYXRoICYmIGh1bmtzICYmIGh1bmtzLmxlbmd0aCkge1xuICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICB0eXBlOiBcInBhdGNoXCIsXG4gICAgICAgIHBhdGg6IGRlc3RpbmF0aW9uRmlsZVBhdGgsXG4gICAgICAgIGh1bmtzLFxuICAgICAgICBiZWZvcmVIYXNoLFxuICAgICAgICBhZnRlckhhc2gsXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuZnVuY3Rpb24gcGFyc2VGaWxlTW9kZShtb2RlOiBzdHJpbmcpOiBGaWxlTW9kZSB7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1iaXR3aXNlXG4gIGNvbnN0IHBhcnNlZE1vZGUgPSBwYXJzZUludChtb2RlLCA4KSAmIDBvNzc3XG4gIGlmIChcbiAgICBwYXJzZWRNb2RlICE9PSBOT05fRVhFQ1VUQUJMRV9GSUxFX01PREUgJiZcbiAgICBwYXJzZWRNb2RlICE9PSBFWEVDVVRBQkxFX0ZJTEVfTU9ERVxuICApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIGZpbGUgbW9kZSBzdHJpbmc6IFwiICsgbW9kZSlcbiAgfVxuICByZXR1cm4gcGFyc2VkTW9kZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VQYXRjaEZpbGUoZmlsZTogc3RyaW5nKTogUGFyc2VkUGF0Y2hGaWxlIHtcbiAgY29uc3QgbGluZXMgPSBmaWxlLnNwbGl0KC9cXG4vZylcbiAgaWYgKGxpbmVzW2xpbmVzLmxlbmd0aCAtIDFdID09PSBcIlwiKSB7XG4gICAgbGluZXMucG9wKClcbiAgfVxuICB0cnkge1xuICAgIHJldHVybiBpbnRlcnByZXRQYXJzZWRQYXRjaEZpbGUoXG4gICAgICBwYXJzZVBhdGNoTGluZXMobGluZXMsIHsgc3VwcG9ydExlZ2FjeURpZmZzOiBmYWxzZSB9KSxcbiAgICApXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoXG4gICAgICBlIGluc3RhbmNlb2YgRXJyb3IgJiZcbiAgICAgIGUubWVzc2FnZSA9PT0gXCJodW5rIGhlYWRlciBpbnRlZ3JpdHkgY2hlY2sgZmFpbGVkXCJcbiAgICApIHtcbiAgICAgIHJldHVybiBpbnRlcnByZXRQYXJzZWRQYXRjaEZpbGUoXG4gICAgICAgIHBhcnNlUGF0Y2hMaW5lcyhsaW5lcywgeyBzdXBwb3J0TGVnYWN5RGlmZnM6IHRydWUgfSksXG4gICAgICApXG4gICAgfVxuICAgIHRocm93IGVcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdmVyaWZ5SHVua0ludGVncml0eShodW5rOiBIdW5rKSB7XG4gIC8vIHZlcmlmeSBodW5rIGludGVncml0eVxuICBsZXQgb3JpZ2luYWxMZW5ndGggPSAwXG4gIGxldCBwYXRjaGVkTGVuZ3RoID0gMFxuICBmb3IgKGNvbnN0IHsgdHlwZSwgbGluZXMgfSBvZiBodW5rLnBhcnRzKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIFwiY29udGV4dFwiOlxuICAgICAgICBwYXRjaGVkTGVuZ3RoICs9IGxpbmVzLmxlbmd0aFxuICAgICAgICBvcmlnaW5hbExlbmd0aCArPSBsaW5lcy5sZW5ndGhcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgXCJkZWxldGlvblwiOlxuICAgICAgICBvcmlnaW5hbExlbmd0aCArPSBsaW5lcy5sZW5ndGhcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgXCJpbnNlcnRpb25cIjpcbiAgICAgICAgcGF0Y2hlZExlbmd0aCArPSBsaW5lcy5sZW5ndGhcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFzc2VydE5ldmVyKHR5cGUpXG4gICAgfVxuICB9XG5cbiAgaWYgKFxuICAgIG9yaWdpbmFsTGVuZ3RoICE9PSBodW5rLmhlYWRlci5vcmlnaW5hbC5sZW5ndGggfHxcbiAgICBwYXRjaGVkTGVuZ3RoICE9PSBodW5rLmhlYWRlci5wYXRjaGVkLmxlbmd0aFxuICApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJodW5rIGhlYWRlciBpbnRlZ3JpdHkgY2hlY2sgZmFpbGVkXCIpXG4gIH1cbn1cbiJdfQ==