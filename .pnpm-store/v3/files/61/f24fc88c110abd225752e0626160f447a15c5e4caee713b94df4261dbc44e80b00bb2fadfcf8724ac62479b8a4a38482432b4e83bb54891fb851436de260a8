"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeEffects = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = require("path");
const assertNever_1 = require("../assertNever");
const executeEffects = (effects, { dryRun }) => {
    effects.forEach(eff => {
        switch (eff.type) {
            case "file deletion":
                if (dryRun) {
                    if (!fs_extra_1.default.existsSync(eff.path)) {
                        throw new Error("Trying to delete file that doesn't exist: " + eff.path);
                    }
                }
                else {
                    // TODO: integrity checks
                    fs_extra_1.default.unlinkSync(eff.path);
                }
                break;
            case "rename":
                if (dryRun) {
                    // TODO: see what patch files look like if moving to exising path
                    if (!fs_extra_1.default.existsSync(eff.fromPath)) {
                        throw new Error("Trying to move file that doesn't exist: " + eff.fromPath);
                    }
                }
                else {
                    fs_extra_1.default.moveSync(eff.fromPath, eff.toPath);
                }
                break;
            case "file creation":
                if (dryRun) {
                    if (fs_extra_1.default.existsSync(eff.path)) {
                        throw new Error("Trying to create file that already exists: " + eff.path);
                    }
                    // todo: check file contents matches
                }
                else {
                    const fileContents = eff.hunk
                        ? eff.hunk.parts[0].lines.join("\n") +
                            (eff.hunk.parts[0].noNewlineAtEndOfFile ? "" : "\n")
                        : "";
                    fs_extra_1.default.ensureDirSync(path_1.dirname(eff.path));
                    fs_extra_1.default.writeFileSync(eff.path, fileContents, { mode: eff.mode });
                }
                break;
            case "patch":
                applyPatch(eff, { dryRun });
                break;
            case "mode change":
                const currentMode = fs_extra_1.default.statSync(eff.path).mode;
                if (((isExecutable(eff.newMode) && isExecutable(currentMode)) ||
                    (!isExecutable(eff.newMode) && !isExecutable(currentMode))) &&
                    dryRun) {
                    console.warn(`Mode change is not required for file ${eff.path}`);
                }
                fs_extra_1.default.chmodSync(eff.path, eff.newMode);
                break;
            default:
                assertNever_1.assertNever(eff);
        }
    });
};
exports.executeEffects = executeEffects;
function isExecutable(fileMode) {
    // tslint:disable-next-line:no-bitwise
    return (fileMode & 64) > 0;
}
const trimRight = (s) => s.replace(/\s+$/, "");
function linesAreEqual(a, b) {
    return trimRight(a) === trimRight(b);
}
/**
 * How does noNewLineAtEndOfFile work?
 *
 * if you remove the newline from a file that had one without editing other bits:
 *
 *    it creates an insertion/removal pair where the insertion has \ No new line at end of file
 *
 * if you edit a file that didn't have a new line and don't add one:
 *
 *    both insertion and deletion have \ No new line at end of file
 *
 * if you edit a file that didn't have a new line and add one:
 *
 *    deletion has \ No new line at end of file
 *    but not insertion
 *
 * if you edit a file that had a new line and leave it in:
 *
 *    neither insetion nor deletion have the annoation
 *
 */
function applyPatch({ hunks, path }, { dryRun }) {
    // modifying the file in place
    const fileContents = fs_extra_1.default.readFileSync(path).toString();
    const mode = fs_extra_1.default.statSync(path).mode;
    const fileLines = fileContents.split(/\n/);
    const result = [];
    for (const hunk of hunks) {
        let fuzzingOffset = 0;
        while (true) {
            const modifications = evaluateHunk(hunk, fileLines, fuzzingOffset);
            if (modifications) {
                result.push(modifications);
                break;
            }
            fuzzingOffset =
                fuzzingOffset < 0 ? fuzzingOffset * -1 : fuzzingOffset * -1 - 1;
            if (Math.abs(fuzzingOffset) > 20) {
                throw new Error(`Cant apply hunk ${hunks.indexOf(hunk)} for file ${path}`);
            }
        }
    }
    if (dryRun) {
        return;
    }
    let diffOffset = 0;
    for (const modifications of result) {
        for (const modification of modifications) {
            switch (modification.type) {
                case "splice":
                    fileLines.splice(modification.index + diffOffset, modification.numToDelete, ...modification.linesToInsert);
                    diffOffset +=
                        modification.linesToInsert.length - modification.numToDelete;
                    break;
                case "pop":
                    fileLines.pop();
                    break;
                case "push":
                    fileLines.push(modification.line);
                    break;
                default:
                    assertNever_1.assertNever(modification);
            }
        }
    }
    fs_extra_1.default.writeFileSync(path, fileLines.join("\n"), { mode });
}
function evaluateHunk(hunk, fileLines, fuzzingOffset) {
    const result = [];
    let contextIndex = hunk.header.original.start - 1 + fuzzingOffset;
    // do bounds checks for index
    if (contextIndex < 0) {
        return null;
    }
    if (fileLines.length - contextIndex < hunk.header.original.length) {
        return null;
    }
    for (const part of hunk.parts) {
        switch (part.type) {
            case "deletion":
            case "context":
                for (const line of part.lines) {
                    const originalLine = fileLines[contextIndex];
                    if (!linesAreEqual(originalLine, line)) {
                        return null;
                    }
                    contextIndex++;
                }
                if (part.type === "deletion") {
                    result.push({
                        type: "splice",
                        index: contextIndex - part.lines.length,
                        numToDelete: part.lines.length,
                        linesToInsert: [],
                    });
                    if (part.noNewlineAtEndOfFile) {
                        result.push({
                            type: "push",
                            line: "",
                        });
                    }
                }
                break;
            case "insertion":
                result.push({
                    type: "splice",
                    index: contextIndex,
                    numToDelete: 0,
                    linesToInsert: part.lines,
                });
                if (part.noNewlineAtEndOfFile) {
                    result.push({ type: "pop" });
                }
                break;
            default:
                assertNever_1.assertNever(part.type);
        }
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcGF0Y2gvYXBwbHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0RBQXlCO0FBQ3pCLCtCQUE4QjtBQUU5QixnREFBNEM7QUFFckMsTUFBTSxjQUFjLEdBQUcsQ0FDNUIsT0FBd0IsRUFDeEIsRUFBRSxNQUFNLEVBQXVCLEVBQy9CLEVBQUU7SUFDRixPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3BCLFFBQVEsR0FBRyxDQUFDLElBQUksRUFBRTtZQUNoQixLQUFLLGVBQWU7Z0JBQ2xCLElBQUksTUFBTSxFQUFFO29CQUNWLElBQUksQ0FBQyxrQkFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQzVCLE1BQU0sSUFBSSxLQUFLLENBQ2IsNENBQTRDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FDeEQsQ0FBQTtxQkFDRjtpQkFDRjtxQkFBTTtvQkFDTCx5QkFBeUI7b0JBQ3pCLGtCQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtpQkFDeEI7Z0JBQ0QsTUFBSztZQUNQLEtBQUssUUFBUTtnQkFDWCxJQUFJLE1BQU0sRUFBRTtvQkFDVixpRUFBaUU7b0JBQ2pFLElBQUksQ0FBQyxrQkFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7d0JBQ2hDLE1BQU0sSUFBSSxLQUFLLENBQ2IsMENBQTBDLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FDMUQsQ0FBQTtxQkFDRjtpQkFDRjtxQkFBTTtvQkFDTCxrQkFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtpQkFDdEM7Z0JBQ0QsTUFBSztZQUNQLEtBQUssZUFBZTtnQkFDbEIsSUFBSSxNQUFNLEVBQUU7b0JBQ1YsSUFBSSxrQkFBRSxDQUFD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QUksQ0FBQyxFQUFFO3dCQUN0QyxPQUFPLElBQUksQ0FBQTtxQkFDWjtvQkFDRCxZQUFZLEVBQUUsQ0FBQTtpQkFDZjtnQkFFRCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO29CQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDO3dCQUNWLElBQUksRUFBRSxRQUFRO3dCQUNkLEtBQUssRUFBRSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO3dCQUN2QyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO3dCQUM5QixhQUFhLEVBQUUsRUFBRTtxQkFDbEIsQ0FBQyxDQUFBO29CQUVGLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO3dCQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDOzRCQUNWLElBQUksRUFBRSxNQUFNOzRCQUNaLElBQUksRUFBRSxFQUFFO3lCQUNULENBQUMsQ0FBQTtxQkFDSDtpQkFDRjtnQkFDRCxNQUFLO1lBQ1AsS0FBSyxXQUFXO2dCQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ1YsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsS0FBSyxFQUFFLFlBQVk7b0JBQ25CLFdBQVcsRUFBRSxDQUFDO29CQUNkLGFBQWEsRUFBRSxJQUFJLENBQUMsS0FBSztpQkFDMUIsQ0FBQyxDQUFBO2dCQUNGLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO29CQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7aUJBQzdCO2dCQUNELE1BQUs7WUFDUDtnQkFDRSx5QkFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUN6QjtLQUNGO0lBRUQsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gXCJmcy1leHRyYVwiXG5pbXBvcnQgeyBkaXJuYW1lIH0gZnJvbSBcInBhdGhcIlxuaW1wb3J0IHsgUGFyc2VkUGF0Y2hGaWxlLCBGaWxlUGF0Y2gsIEh1bmsgfSBmcm9tIFwiLi9wYXJzZVwiXG5pbXBvcnQgeyBhc3NlcnROZXZlciB9IGZyb20gXCIuLi9hc3NlcnROZXZlclwiXG5cbmV4cG9ydCBjb25zdCBleGVjdXRlRWZmZWN0cyA9IChcbiAgZWZmZWN0czogUGFyc2VkUGF0Y2hGaWxlLFxuICB7IGRyeVJ1biB9OiB7IGRyeVJ1bjogYm9vbGVhbiB9LFxuKSA9PiB7XG4gIGVmZmVjdHMuZm9yRWFjaChlZmYgPT4ge1xuICAgIHN3aXRjaCAoZWZmLnR5cGUpIHtcbiAgICAgIGNhc2UgXCJmaWxlIGRlbGV0aW9uXCI6XG4gICAgICAgIGlmIChkcnlSdW4pIHtcbiAgICAgICAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZWZmLnBhdGgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgIFwiVHJ5aW5nIHRvIGRlbGV0ZSBmaWxlIHRoYXQgZG9lc24ndCBleGlzdDogXCIgKyBlZmYucGF0aCxcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gVE9ETzogaW50ZWdyaXR5IGNoZWNrc1xuICAgICAgICAgIGZzLnVubGlua1N5bmMoZWZmLnBhdGgpXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgXCJyZW5hbWVcIjpcbiAgICAgICAgaWYgKGRyeVJ1bikge1xuICAgICAgICAgIC8vIFRPRE86IHNlZSB3aGF0IHBhdGNoIGZpbGVzIGxvb2sgbGlrZSBpZiBtb3ZpbmcgdG8gZXhpc2luZyBwYXRoXG4gICAgICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGVmZi5mcm9tUGF0aCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgXCJUcnlpbmcgdG8gbW92ZSBmaWxlIHRoYXQgZG9lc24ndCBleGlzdDogXCIgKyBlZmYuZnJvbVBhdGgsXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZzLm1vdmVTeW5jKGVmZi5mcm9tUGF0aCwgZWZmLnRvUGF0aClcbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSBcImZpbGUgY3JlYXRpb25cIjpcbiAgICAgICAgaWYgKGRyeVJ1bikge1xuICAgICAgICAgIGlmIChmcy5leGlzdHNTeW5jKGVmZi5wYXRoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBcIlRyeWluZyB0byBjcmVhdGUgZmlsZSB0aGF0IGFscmVhZHkgZXhpc3RzOiBcIiArIGVmZi5wYXRoLFxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyB0b2RvOiBjaGVjayBmaWxlIGNvbnRlbnRzIG1hdGNoZXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBmaWxlQ29udGVudHMgPSBlZmYuaHVua1xuICAgICAgICAgICAgPyBlZmYuaHVuay5wYXJ0c1swXS5saW5lcy5qb2luKFwiXFxuXCIpICtcbiAgICAgICAgICAgICAgKGVmZi5odW5rLnBhcnRzWzBdLm5vTmV3bGluZUF0RW5kT2ZGaWxlID8gXCJcIiA6IFwiXFxuXCIpXG4gICAgICAgICAgICA6IFwiXCJcbiAgICAgICAgICBmcy5lbnN1cmVEaXJTeW5jKGRpcm5hbWUoZWZmLnBhdGgpKVxuICAgICAgICAgIGZzLndyaXRlRmlsZVN5bmMoZWZmLnBhdGgsIGZpbGVDb250ZW50cywgeyBtb2RlOiBlZmYubW9kZSB9KVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIFwicGF0Y2hcIjpcbiAgICAgICAgYXBwbHlQYXRjaChlZmYsIHsgZHJ5UnVuIH0pXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIFwibW9kZSBjaGFuZ2VcIjpcbiAgICAgICAgY29uc3QgY3VycmVudE1vZGUgPSBmcy5zdGF0U3luYyhlZmYucGF0aCkubW9kZVxuICAgICAgICBpZiAoXG4gICAgICAgICAgKChpc0V4ZWN1dGFibGUoZWZmLm5ld01vZGUpICYmIGlzRXhlY3V0YWJsZShjdXJyZW50TW9kZSkpIHx8XG4gICAgICAgICAgICAoIWlzRXhlY3V0YWJsZShlZmYubmV3TW9kZSkgJiYgIWlzRXhlY3V0YWJsZShjdXJyZW50TW9kZSkpKSAmJlxuICAgICAgICAgIGRyeVJ1blxuICAgICAgICApIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oYE1vZGUgY2hhbmdlIGlzIG5vdCByZXF1aXJlZCBmb3IgZmlsZSAke2VmZi5wYXRofWApXG4gICAgICAgIH1cbiAgICAgICAgZnMuY2htb2RTeW5jKGVmZi5wYXRoLCBlZmYubmV3TW9kZSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFzc2VydE5ldmVyKGVmZilcbiAgICB9XG4gIH0pXG59XG5cbmZ1bmN0aW9uIGlzRXhlY3V0YWJsZShmaWxlTW9kZTogbnVtYmVyKSB7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1iaXR3aXNlXG4gIHJldHVybiAoZmlsZU1vZGUgJiAwYjAwMV8wMDBfMDAwKSA+IDBcbn1cblxuY29uc3QgdHJpbVJpZ2h0ID0gKHM6IHN0cmluZykgPT4gcy5yZXBsYWNlKC9cXHMrJC8sIFwiXCIpXG5mdW5jdGlvbiBsaW5lc0FyZUVxdWFsKGE6IHN0cmluZywgYjogc3RyaW5nKSB7XG4gIHJldHVybiB0cmltUmlnaHQoYSkgPT09IHRyaW1SaWdodChiKVxufVxuXG4vKipcbiAqIEhvdyBkb2VzIG5vTmV3TGluZUF0RW5kT2ZGaWxlIHdvcms/XG4gKlxuICogaWYgeW91IHJlbW92ZSB0aGUgbmV3bGluZSBmcm9tIGEgZmlsZSB0aGF0IGhhZCBvbmUgd2l0aG91dCBlZGl0aW5nIG90aGVyIGJpdHM6XG4gKlxuICogICAgaXQgY3JlYXRlcyBhbiBpbnNlcnRpb24vcmVtb3ZhbCBwYWlyIHdoZXJlIHRoZSBpbnNlcnRpb24gaGFzIFxcIE5vIG5ldyBsaW5lIGF0IGVuZCBvZiBmaWxlXG4gKlxuICogaWYgeW91IGVkaXQgYSBmaWxlIHRoYXQgZGlkbid0IGhhdmUgYSBuZXcgbGluZSBhbmQgZG9uJ3QgYWRkIG9uZTpcbiAqXG4gKiAgICBib3RoIGluc2VydGlvbiBhbmQgZGVsZXRpb24gaGF2ZSBcXCBObyBuZXcgbGluZSBhdCBlbmQgb2YgZmlsZVxuICpcbiAqIGlmIHlvdSBlZGl0IGEgZmlsZSB0aGF0IGRpZG4ndCBoYXZlIGEgbmV3IGxpbmUgYW5kIGFkZCBvbmU6XG4gKlxuICogICAgZGVsZXRpb24gaGFzIFxcIE5vIG5ldyBsaW5lIGF0IGVuZCBvZiBmaWxlXG4gKiAgICBidXQgbm90IGluc2VydGlvblxuICpcbiAqIGlmIHlvdSBlZGl0IGEgZmlsZSB0aGF0IGhhZCBhIG5ldyBsaW5lIGFuZCBsZWF2ZSBpdCBpbjpcbiAqXG4gKiAgICBuZWl0aGVyIGluc2V0aW9uIG5vciBkZWxldGlvbiBoYXZlIHRoZSBhbm5vYXRpb25cbiAqXG4gKi9cblxuZnVuY3Rpb24gYXBwbHlQYXRjaChcbiAgeyBodW5rcywgcGF0aCB9OiBGaWxlUGF0Y2gsXG4gIHsgZHJ5UnVuIH06IHsgZHJ5UnVuOiBib29sZWFuIH0sXG4pOiB2b2lkIHtcbiAgLy8gbW9kaWZ5aW5nIHRoZSBmaWxlIGluIHBsYWNlXG4gIGNvbnN0IGZpbGVDb250ZW50cyA9IGZzLnJlYWRGaWxlU3luYyhwYXRoKS50b1N0cmluZygpXG4gIGNvbnN0IG1vZGUgPSBmcy5zdGF0U3luYyhwYXRoKS5tb2RlXG5cbiAgY29uc3QgZmlsZUxpbmVzOiBzdHJpbmdbXSA9IGZpbGVDb250ZW50cy5zcGxpdCgvXFxuLylcblxuICBjb25zdCByZXN1bHQ6IE1vZGlmaWNhaXRvbltdW10gPSBbXVxuXG4gIGZvciAoY29uc3QgaHVuayBvZiBodW5rcykge1xuICAgIGxldCBmdXp6aW5nT2Zmc2V0ID0gMFxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBjb25zdCBtb2RpZmljYXRpb25zID0gZXZhbHVhdGVIdW5rKGh1bmssIGZpbGVMaW5lcywgZnV6emluZ09mZnNldClcbiAgICAgIGlmIChtb2RpZmljYXRpb25zKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKG1vZGlmaWNhdGlvbnMpXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGZ1enppbmdPZmZzZXQgPVxuICAgICAgICBmdXp6aW5nT2Zmc2V0IDwgMCA/IGZ1enppbmdPZmZzZXQgKiAtMSA6IGZ1enppbmdPZmZzZXQgKiAtMSAtIDFcblxuICAgICAgaWYgKE1hdGguYWJzKGZ1enppbmdPZmZzZXQpID4gMjApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBDYW50IGFwcGx5IGh1bmsgJHtodW5rcy5pbmRleE9mKGh1bmspfSBmb3IgZmlsZSAke3BhdGh9YCxcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChkcnlSdW4pIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGxldCBkaWZmT2Zmc2V0ID0gMFxuXG4gIGZvciAoY29uc3QgbW9kaWZpY2F0aW9ucyBvZiByZXN1bHQpIHtcbiAgICBmb3IgKGNvbnN0IG1vZGlmaWNhdGlvbiBvZiBtb2RpZmljYXRpb25zKSB7XG4gICAgICBzd2l0Y2ggKG1vZGlmaWNhdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgXCJzcGxpY2VcIjpcbiAgICAgICAgICBmaWxlTGluZXMuc3BsaWNlKFxuICAgICAgICAgICAgbW9kaWZpY2F0aW9uLmluZGV4ICsgZGlmZk9mZnNldCxcbiAgICAgICAgICAgIG1vZGlmaWNhdGlvbi5udW1Ub0RlbGV0ZSxcbiAgICAgICAgICAgIC4uLm1vZGlmaWNhdGlvbi5saW5lc1RvSW5zZXJ0LFxuICAgICAgICAgIClcbiAgICAgICAgICBkaWZmT2Zmc2V0ICs9XG4gICAgICAgICAgICBtb2RpZmljYXRpb24ubGluZXNUb0luc2VydC5sZW5ndGggLSBtb2RpZmljYXRpb24ubnVtVG9EZWxldGVcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwicG9wXCI6XG4gICAgICAgICAgZmlsZUxpbmVzLnBvcCgpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcInB1c2hcIjpcbiAgICAgICAgICBmaWxlTGluZXMucHVzaChtb2RpZmljYXRpb24ubGluZSlcbiAgICAgICAgICBicmVha1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGFzc2VydE5ldmVyKG1vZGlmaWNhdGlvbilcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmcy53cml0ZUZpbGVTeW5jKHBhdGgsIGZpbGVMaW5lcy5qb2luKFwiXFxuXCIpLCB7IG1vZGUgfSlcbn1cblxuaW50ZXJmYWNlIFB1c2gge1xuICB0eXBlOiBcInB1c2hcIlxuICBsaW5lOiBzdHJpbmdcbn1cbmludGVyZmFjZSBQb3Age1xuICB0eXBlOiBcInBvcFwiXG59XG5pbnRlcmZhY2UgU3BsaWNlIHtcbiAgdHlwZTogXCJzcGxpY2VcIlxuICBpbmRleDogbnVtYmVyXG4gIG51bVRvRGVsZXRlOiBudW1iZXJcbiAgbGluZXNUb0luc2VydDogc3RyaW5nW11cbn1cblxudHlwZSBNb2RpZmljYWl0b24gPSBQdXNoIHwgUG9wIHwgU3BsaWNlXG5cbmZ1bmN0aW9uIGV2YWx1YXRlSHVuayhcbiAgaHVuazogSHVuayxcbiAgZmlsZUxpbmVzOiBzdHJpbmdbXSxcbiAgZnV6emluZ09mZnNldDogbnVtYmVyLFxuKTogTW9kaWZpY2FpdG9uW10gfCBudWxsIHtcbiAgY29uc3QgcmVzdWx0OiBNb2RpZmljYWl0b25bXSA9IFtdXG4gIGxldCBjb250ZXh0SW5kZXggPSBodW5rLmhlYWRlci5vcmlnaW5hbC5zdGFydCAtIDEgKyBmdXp6aW5nT2Zmc2V0XG4gIC8vIGRvIGJvdW5kcyBjaGVja3MgZm9yIGluZGV4XG4gIGlmIChjb250ZXh0SW5kZXggPCAwKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICBpZiAoZmlsZUxpbmVzLmxlbmd0aCAtIGNvbnRleHRJbmRleCA8IGh1bmsuaGVhZGVyLm9yaWdpbmFsLmxlbmd0aCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBmb3IgKGNvbnN0IHBhcnQgb2YgaHVuay5wYXJ0cykge1xuICAgIHN3aXRjaCAocGFydC50eXBlKSB7XG4gICAgICBjYXNlIFwiZGVsZXRpb25cIjpcbiAgICAgIGNhc2UgXCJjb250ZXh0XCI6XG4gICAgICAgIGZvciAoY29uc3QgbGluZSBvZiBwYXJ0LmxpbmVzKSB7XG4gICAgICAgICAgY29uc3Qgb3JpZ2luYWxMaW5lID0gZmlsZUxpbmVzW2NvbnRleHRJbmRleF1cbiAgICAgICAgICBpZiAoIWxpbmVzQXJlRXF1YWwob3JpZ2luYWxMaW5lLCBsaW5lKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGV4dEluZGV4KytcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJ0LnR5cGUgPT09IFwiZGVsZXRpb25cIikge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6IFwic3BsaWNlXCIsXG4gICAgICAgICAgICBpbmRleDogY29udGV4dEluZGV4IC0gcGFydC5saW5lcy5sZW5ndGgsXG4gICAgICAgICAgICBudW1Ub0RlbGV0ZTogcGFydC5saW5lcy5sZW5ndGgsXG4gICAgICAgICAgICBsaW5lc1RvSW5zZXJ0OiBbXSxcbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgaWYgKHBhcnQubm9OZXdsaW5lQXRFbmRPZkZpbGUpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICAgICAgdHlwZTogXCJwdXNoXCIsXG4gICAgICAgICAgICAgIGxpbmU6IFwiXCIsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSBcImluc2VydGlvblwiOlxuICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgdHlwZTogXCJzcGxpY2VcIixcbiAgICAgICAgICBpbmRleDogY29udGV4dEluZGV4LFxuICAgICAgICAgIG51bVRvRGVsZXRlOiAwLFxuICAgICAgICAgIGxpbmVzVG9JbnNlcnQ6IHBhcnQubGluZXMsXG4gICAgICAgIH0pXG4gICAgICAgIGlmIChwYXJ0Lm5vTmV3bGluZUF0RW5kT2ZGaWxlKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goeyB0eXBlOiBcInBvcFwiIH0pXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFzc2VydE5ldmVyKHBhcnQudHlwZSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG4iXX0=