"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readPatch = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs_extra_1 = require("fs-extra");
const path_1 = require("../path");
const path_2 = require("path");
const parse_1 = require("./parse");
function readPatch({ patchFilePath, packageDetails, patchDir, }) {
    try {
        return parse_1.parsePatchFile(fs_extra_1.readFileSync(patchFilePath).toString());
    }
    catch (e) {
        const fixupSteps = [];
        const relativePatchFilePath = path_2.normalize(path_1.relative(process.cwd(), patchFilePath));
        const patchBaseDir = relativePatchFilePath.slice(0, relativePatchFilePath.indexOf(patchDir));
        if (patchBaseDir) {
            fixupSteps.push(`cd ${patchBaseDir}`);
        }
        fixupSteps.push(`patch -p1 -i ${relativePatchFilePath.slice(relativePatchFilePath.indexOf(patchDir))}`);
        fixupSteps.push(`npx patch-package ${packageDetails.pathSpecifier}`);
        if (patchBaseDir) {
            fixupSteps.push(`cd ${path_1.relative(path_1.resolve(process.cwd(), patchBaseDir), process.cwd())}`);
        }
        console.error(`
${chalk_1.default.red.bold("**ERROR**")} ${chalk_1.default.red(`Failed to apply patch for package ${chalk_1.default.bold(packageDetails.humanReadablePathSpecifier)}`)}
    
  This happened because the patch file ${relativePatchFilePath} could not be parsed.
   
  If you just upgraded patch-package, you can try running:
  
    ${fixupSteps.join("\n    ")}
    
  Otherwise, try manually creating the patch file again.
  
  If the problem persists, please submit a bug report:
  
    https://github.com/ds300/patch-package/issues/new?title=Patch+file+parse+error&body=%3CPlease+attach+the+patch+file+in+question%3E

`);
        process.exit(1);
    }
    return [];
}
exports.readPatch = readPatch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXRjaC9yZWFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtEQUF5QjtBQUN6Qix1Q0FBdUM7QUFDdkMsa0NBQTJDO0FBQzNDLCtCQUFnQztBQUVoQyxtQ0FBdUQ7QUFFdkQsU0FBZ0IsU0FBUyxDQUFDLEVBQ3hCLGFBQWEsRUFDYixjQUFjLEVBQ2QsUUFBUSxHQUtUO0lBQ0MsSUFBSTtRQUNGLE9BQU8sc0JBQWMsQ0FBQyx1QkFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7S0FDOUQ7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE1BQU0sVUFBVSxHQUFhLEVBQUUsQ0FBQTtRQUMvQixNQUFNLHFCQUFxQixHQUFHLGdCQUFTLENBQ3JDLGVBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQ3ZDLENBQUE7UUFDRCxNQUFNLFlBQVksR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQzlDLENBQUMsRUFDRCxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQ3hDLENBQUE7UUFDRCxJQUFJLFlBQVksRUFBRTtZQUNoQixVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sWUFBWSxFQUFFLENBQUMsQ0FBQTtTQUN0QztRQUNELFVBQVUsQ0FBQyxJQUFJLENBQ2IsZ0JBQWdCLHFCQUFxQixDQUFDLEtBQUssQ0FDekMscUJBQXFCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUN4QyxFQUFFLENBQ0osQ0FBQTtRQUNELFVBQVUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLGNBQWMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFBO1FBQ3BFLElBQUksWUFBWSxFQUFFO1lBQ2hCLFVBQVUsQ0FBQyxJQUFJLENBQ2IsTUFBTSxlQUFRLENBQUMsY0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxZQUFZLENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUN0RSxDQUFBO1NBQ0Y7UUFFRCxPQUFPLENBQUMsS0FBSyxDQUFDO0VBQ2hCLGVBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLGVBQUssQ0FBQyxHQUFHLENBQ3BDLHFDQUFxQyxlQUFLLENBQUMsSUFBSSxDQUM3QyxjQUFjLENBQUMsMEJBQTBCLENBQzFDLEVBQUUsQ0FDSjs7eUNBRW9DLHFCQUFxQjs7OztNQUl4RCxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7Ozs7Ozs7Q0FROUIsQ0FBQyxDQUFBO1FBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUNoQjtJQUNELE9BQU8sRUFBRSxDQUFBO0FBQ1gsQ0FBQztBQTFERCw4QkEwREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhbGsgZnJvbSBcImNoYWxrXCJcbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gXCJmcy1leHRyYVwiXG5pbXBvcnQgeyByZWxhdGl2ZSwgcmVzb2x2ZSB9IGZyb20gXCIuLi9wYXRoXCJcbmltcG9ydCB7IG5vcm1hbGl6ZSB9IGZyb20gXCJwYXRoXCJcbmltcG9ydCB7IFBhY2thZ2VEZXRhaWxzIH0gZnJvbSBcIi4uL1BhY2thZ2VEZXRhaWxzXCJcbmltcG9ydCB7IHBhcnNlUGF0Y2hGaWxlLCBQYXRjaEZpbGVQYXJ0IH0gZnJvbSBcIi4vcGFyc2VcIlxuXG5leHBvcnQgZnVuY3Rpb24gcmVhZFBhdGNoKHtcbiAgcGF0Y2hGaWxlUGF0aCxcbiAgcGFja2FnZURldGFpbHMsXG4gIHBhdGNoRGlyLFxufToge1xuICBwYXRjaEZpbGVQYXRoOiBzdHJpbmdcbiAgcGFja2FnZURldGFpbHM6IFBhY2thZ2VEZXRhaWxzXG4gIHBhdGNoRGlyOiBzdHJpbmdcbn0pOiBQYXRjaEZpbGVQYXJ0W10ge1xuICB0cnkge1xuICAgIHJldHVybiBwYXJzZVBhdGNoRmlsZShyZWFkRmlsZVN5bmMocGF0Y2hGaWxlUGF0aCkudG9TdHJpbmcoKSlcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnN0IGZpeHVwU3RlcHM6IHN0cmluZ1tdID0gW11cbiAgICBjb25zdCByZWxhdGl2ZVBhdGNoRmlsZVBhdGggPSBub3JtYWxpemUoXG4gICAgICByZWxhdGl2ZShwcm9jZXNzLmN3ZCgpLCBwYXRjaEZpbGVQYXRoKSxcbiAgICApXG4gICAgY29uc3QgcGF0Y2hCYXNlRGlyID0gcmVsYXRpdmVQYXRjaEZpbGVQYXRoLnNsaWNlKFxuICAgICAgMCxcbiAgICAgIHJlbGF0aXZlUGF0Y2hGaWxlUGF0aC5pbmRleE9mKHBhdGNoRGlyKSxcbiAgICApXG4gICAgaWYgKHBhdGNoQmFzZURpcikge1xuICAgICAgZml4dXBTdGVwcy5wdXNoKGBjZCAke3BhdGNoQmFzZURpcn1gKVxuICAgIH1cbiAgICBmaXh1cFN0ZXBzLnB1c2goXG4gICAgICBgcGF0Y2ggLXAxIC1pICR7cmVsYXRpdmVQYXRjaEZpbGVQYXRoLnNsaWNlKFxuICAgICAgICByZWxhdGl2ZVBhdGNoRmlsZVBhdGguaW5kZXhPZihwYXRjaERpciksXG4gICAgICApfWAsXG4gICAgKVxuICAgIGZpeHVwU3RlcHMucHVzaChgbnB4IHBhdGNoLXBhY2thZ2UgJHtwYWNrYWdlRGV0YWlscy5wYXRoU3BlY2lmaWVyfWApXG4gICAgaWYgKHBhdGNoQmFzZURpcikge1xuICAgICAgZml4dXBTdGVwcy5wdXNoKFxuICAgICAgICBgY2QgJHtyZWxhdGl2ZShyZXNvbHZlKHByb2Nlc3MuY3dkKCksIHBhdGNoQmFzZURpciksIHByb2Nlc3MuY3dkKCkpfWAsXG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc29sZS5lcnJvcihgXG4ke2NoYWxrLnJlZC5ib2xkKFwiKipFUlJPUioqXCIpfSAke2NoYWxrLnJlZChcbiAgICAgIGBGYWlsZWQgdG8gYXBwbHkgcGF0Y2ggZm9yIHBhY2thZ2UgJHtjaGFsay5ib2xkKFxuICAgICAgICBwYWNrYWdlRGV0YWlscy5odW1hblJlYWRhYmxlUGF0aFNwZWNpZmllcixcbiAgICAgICl9YCxcbiAgICApfVxuICAgIFxuICBUaGlzIGhhcHBlbmVkIGJlY2F1c2UgdGhlIHBhdGNoIGZpbGUgJHtyZWxhdGl2ZVBhdGNoRmlsZVBhdGh9IGNvdWxkIG5vdCBiZSBwYXJzZWQuXG4gICBcbiAgSWYgeW91IGp1c3QgdXBncmFkZWQgcGF0Y2gtcGFja2FnZSwgeW91IGNhbiB0cnkgcnVubmluZzpcbiAgXG4gICAgJHtmaXh1cFN0ZXBzLmpvaW4oXCJcXG4gICAgXCIpfVxuICAgIFxuICBPdGhlcndpc2UsIHRyeSBtYW51YWxseSBjcmVhdGluZyB0aGUgcGF0Y2ggZmlsZSBhZ2Fpbi5cbiAgXG4gIElmIHRoZSBwcm9ibGVtIHBlcnNpc3RzLCBwbGVhc2Ugc3VibWl0IGEgYnVnIHJlcG9ydDpcbiAgXG4gICAgaHR0cHM6Ly9naXRodWIuY29tL2RzMzAwL3BhdGNoLXBhY2thZ2UvaXNzdWVzL25ldz90aXRsZT1QYXRjaCtmaWxlK3BhcnNlK2Vycm9yJmJvZHk9JTNDUGxlYXNlK2F0dGFjaCt0aGUrcGF0Y2grZmlsZStpbitxdWVzdGlvbiUzRVxuXG5gKVxuICAgIHByb2Nlc3MuZXhpdCgxKVxuICB9XG4gIHJldHVybiBbXVxufVxuIl19