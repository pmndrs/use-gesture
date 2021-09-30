"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectPackageManager = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = require("./path");
const chalk_1 = __importDefault(require("chalk"));
const process_1 = __importDefault(require("process"));
const find_yarn_workspace_root_1 = __importDefault(require("find-yarn-workspace-root"));
function printNoYarnLockfileError() {
    console.error(`
${chalk_1.default.red.bold("**ERROR**")} ${chalk_1.default.red(`The --use-yarn option was specified but there is no yarn.lock file`)}
`);
}
function printNoLockfilesError() {
    console.error(`
${chalk_1.default.red.bold("**ERROR**")} ${chalk_1.default.red(`No package-lock.json, npm-shrinkwrap.json, or yarn.lock file.

You must use either npm@>=5, yarn, or npm-shrinkwrap to manage this project's
dependencies.`)}
`);
}
function printSelectingDefaultMessage() {
    console.info(`${chalk_1.default.bold("patch-package")}: you have both yarn.lock and package-lock.json
Defaulting to using ${chalk_1.default.bold("npm")}
You can override this setting by passing --use-yarn or deleting
package-lock.json if you don't need it
`);
}
const detectPackageManager = (appRootPath, overridePackageManager) => {
    const packageLockExists = fs_extra_1.default.existsSync(path_1.join(appRootPath, "package-lock.json"));
    const shrinkWrapExists = fs_extra_1.default.existsSync(path_1.join(appRootPath, "npm-shrinkwrap.json"));
    const yarnLockExists = fs_extra_1.default.existsSync(path_1.join(appRootPath, "yarn.lock"));
    if ((packageLockExists || shrinkWrapExists) && yarnLockExists) {
        if (overridePackageManager) {
            return overridePackageManager;
        }
        else {
            printSelectingDefaultMessage();
            return shrinkWrapExists ? "npm-shrinkwrap" : "npm";
        }
    }
    else if (packageLockExists || shrinkWrapExists) {
        if (overridePackageManager === "yarn") {
            printNoYarnLockfileError();
            process_1.default.exit(1);
        }
        else {
            return shrinkWrapExists ? "npm-shrinkwrap" : "npm";
        }
    }
    else if (yarnLockExists || find_yarn_workspace_root_1.default()) {
        return "yarn";
    }
    else {
        printNoLockfilesError();
        process_1.default.exit(1);
    }
    throw Error();
};
exports.detectPackageManager = detectPackageManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0ZWN0UGFja2FnZU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZGV0ZWN0UGFja2FnZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0RBQXlCO0FBQ3pCLGlDQUE2QjtBQUM3QixrREFBeUI7QUFDekIsc0RBQTZCO0FBQzdCLHdGQUF3RDtBQUl4RCxTQUFTLHdCQUF3QjtJQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDO0VBQ2QsZUFBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksZUFBSyxDQUFDLEdBQUcsQ0FDdEMsb0VBQW9FLENBQ3JFO0NBQ0YsQ0FBQyxDQUFBO0FBQ0YsQ0FBQztBQUVELFNBQVMscUJBQXFCO0lBQzVCLE9BQU8sQ0FBQyxLQUFLLENBQUM7RUFDZCxlQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxlQUFLLENBQUMsR0FBRyxDQUN0Qzs7O2NBR1UsQ0FDWDtDQUNGLENBQUMsQ0FBQTtBQUNGLENBQUM7QUFFRCxTQUFTLDRCQUE0QjtJQUNuQyxPQUFPLENBQUMsSUFBSSxDQUNWLEdBQUcsZUFBSyxDQUFDLElBQUksQ0FDWCxlQUFlLENBQ2hCO3NCQUNpQixlQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzs7O0NBR3RDLENBQ0UsQ0FBQTtBQUNILENBQUM7QUFFTSxNQUFNLG9CQUFvQixHQUFHLENBQ2xDLFdBQW1CLEVBQ25CLHNCQUE2QyxFQUM3QixFQUFFO0lBQ2xCLE1BQU0saUJBQWlCLEdBQUcsa0JBQUUsQ0FBQyxVQUFVLENBQ3JDLFdBQUksQ0FBQyxXQUFXLEVBQUUsbUJBQW1CLENBQUMsQ0FDdkMsQ0FBQTtJQUNELE1BQU0sZ0JBQWdCLEdBQUcsa0JBQUUsQ0FBQyxVQUFVLENBQ3BDLFdBQUksQ0FBQyxXQUFXLEVBQUUscUJBQXFCLENBQUMsQ0FDekMsQ0FBQTtJQUNELE1BQU0sY0FBYyxHQUFHLGtCQUFFLENBQUMsVUFBVSxDQUFDLFdBQUksQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQTtJQUNwRSxJQUFJLENBQUMsaUJBQWlCLElBQUksZ0JBQWdCLENBQUMsSUFBSSxjQUFjLEVBQUU7UUFDN0QsSUFBSSxzQkFBc0IsRUFBRTtZQUMxQixPQUFPLHNCQUFzQixDQUFBO1NBQzlCO2FBQU07WUFDTCw0QkFBNEIsRUFBRSxDQUFBO1lBQzlCLE9BQU8sZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7U0FDbkQ7S0FDRjtTQUFNLElBQUksaUJBQWlCLElBQUksZ0JBQWdCLEVBQUU7UUFDaEQsSUFBSSxzQkFBc0IsS0FBSyxNQUFNLEVBQUU7WUFDckMsd0JBQXdCLEVBQUUsQ0FBQTtZQUMxQixpQkFBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNoQjthQUFNO1lBQ0wsT0FBTyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtTQUNuRDtLQUNGO1NBQU0sSUFBSSxjQUFjLElBQUksa0NBQWlCLEVBQUUsRUFBRTtRQUNoRCxPQUFPLE1BQU0sQ0FBQTtLQUNkO1NBQU07UUFDTCxxQkFBcUIsRUFBRSxDQUFBO1FBQ3ZCLGlCQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ2hCO0lBQ0QsTUFBTSxLQUFLLEVBQUUsQ0FBQTtBQUNmLENBQUMsQ0FBQTtBQWhDWSxRQUFBLG9CQUFvQix3QkFnQ2hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gXCJmcy1leHRyYVwiXG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcIi4vcGF0aFwiXG5pbXBvcnQgY2hhbGsgZnJvbSBcImNoYWxrXCJcbmltcG9ydCBwcm9jZXNzIGZyb20gXCJwcm9jZXNzXCJcbmltcG9ydCBmaW5kV29ya3NwYWNlUm9vdCBmcm9tIFwiZmluZC15YXJuLXdvcmtzcGFjZS1yb290XCJcblxuZXhwb3J0IHR5cGUgUGFja2FnZU1hbmFnZXIgPSBcInlhcm5cIiB8IFwibnBtXCIgfCBcIm5wbS1zaHJpbmt3cmFwXCJcblxuZnVuY3Rpb24gcHJpbnROb1lhcm5Mb2NrZmlsZUVycm9yKCkge1xuICBjb25zb2xlLmVycm9yKGBcbiR7Y2hhbGsucmVkLmJvbGQoXCIqKkVSUk9SKipcIil9ICR7Y2hhbGsucmVkKFxuICAgIGBUaGUgLS11c2UteWFybiBvcHRpb24gd2FzIHNwZWNpZmllZCBidXQgdGhlcmUgaXMgbm8geWFybi5sb2NrIGZpbGVgLFxuICApfVxuYClcbn1cblxuZnVuY3Rpb24gcHJpbnROb0xvY2tmaWxlc0Vycm9yKCkge1xuICBjb25zb2xlLmVycm9yKGBcbiR7Y2hhbGsucmVkLmJvbGQoXCIqKkVSUk9SKipcIil9ICR7Y2hhbGsucmVkKFxuICAgIGBObyBwYWNrYWdlLWxvY2suanNvbiwgbnBtLXNocmlua3dyYXAuanNvbiwgb3IgeWFybi5sb2NrIGZpbGUuXG5cbllvdSBtdXN0IHVzZSBlaXRoZXIgbnBtQD49NSwgeWFybiwgb3IgbnBtLXNocmlua3dyYXAgdG8gbWFuYWdlIHRoaXMgcHJvamVjdCdzXG5kZXBlbmRlbmNpZXMuYCxcbiAgKX1cbmApXG59XG5cbmZ1bmN0aW9uIHByaW50U2VsZWN0aW5nRGVmYXVsdE1lc3NhZ2UoKSB7XG4gIGNvbnNvbGUuaW5mbyhcbiAgICBgJHtjaGFsay5ib2xkKFxuICAgICAgXCJwYXRjaC1wYWNrYWdlXCIsXG4gICAgKX06IHlvdSBoYXZlIGJvdGggeWFybi5sb2NrIGFuZCBwYWNrYWdlLWxvY2suanNvblxuRGVmYXVsdGluZyB0byB1c2luZyAke2NoYWxrLmJvbGQoXCJucG1cIil9XG5Zb3UgY2FuIG92ZXJyaWRlIHRoaXMgc2V0dGluZyBieSBwYXNzaW5nIC0tdXNlLXlhcm4gb3IgZGVsZXRpbmdcbnBhY2thZ2UtbG9jay5qc29uIGlmIHlvdSBkb24ndCBuZWVkIGl0XG5gLFxuICApXG59XG5cbmV4cG9ydCBjb25zdCBkZXRlY3RQYWNrYWdlTWFuYWdlciA9IChcbiAgYXBwUm9vdFBhdGg6IHN0cmluZyxcbiAgb3ZlcnJpZGVQYWNrYWdlTWFuYWdlcjogUGFja2FnZU1hbmFnZXIgfCBudWxsLFxuKTogUGFja2FnZU1hbmFnZXIgPT4ge1xuICBjb25zdCBwYWNrYWdlTG9ja0V4aXN0cyA9IGZzLmV4aXN0c1N5bmMoXG4gICAgam9pbihhcHBSb290UGF0aCwgXCJwYWNrYWdlLWxvY2suanNvblwiKSxcbiAgKVxuICBjb25zdCBzaHJpbmtXcmFwRXhpc3RzID0gZnMuZXhpc3RzU3luYyhcbiAgICBqb2luKGFwcFJvb3RQYXRoLCBcIm5wbS1zaHJpbmt3cmFwLmpzb25cIiksXG4gIClcbiAgY29uc3QgeWFybkxvY2tFeGlzdHMgPSBmcy5leGlzdHNTeW5jKGpvaW4oYXBwUm9vdFBhdGgsIFwieWFybi5sb2NrXCIpKVxuICBpZiAoKHBhY2thZ2VMb2NrRXhpc3RzIHx8IHNocmlua1dyYXBFeGlzdHMpICYmIHlhcm5Mb2NrRXhpc3RzKSB7XG4gICAgaWYgKG92ZXJyaWRlUGFja2FnZU1hbmFnZXIpIHtcbiAgICAgIHJldHVybiBvdmVycmlkZVBhY2thZ2VNYW5hZ2VyXG4gICAgfSBlbHNlIHtcbiAgICAgIHByaW50U2VsZWN0aW5nRGVmYXVsdE1lc3NhZ2UoKVxuICAgICAgcmV0dXJuIHNocmlua1dyYXBFeGlzdHMgPyBcIm5wbS1zaHJpbmt3cmFwXCIgOiBcIm5wbVwiXG4gICAgfVxuICB9IGVsc2UgaWYgKHBhY2thZ2VMb2NrRXhpc3RzIHx8IHNocmlua1dyYXBFeGlzdHMpIHtcbiAgICBpZiAob3ZlcnJpZGVQYWNrYWdlTWFuYWdlciA9PT0gXCJ5YXJuXCIpIHtcbiAgICAgIHByaW50Tm9ZYXJuTG9ja2ZpbGVFcnJvcigpXG4gICAgICBwcm9jZXNzLmV4aXQoMSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNocmlua1dyYXBFeGlzdHMgPyBcIm5wbS1zaHJpbmt3cmFwXCIgOiBcIm5wbVwiXG4gICAgfVxuICB9IGVsc2UgaWYgKHlhcm5Mb2NrRXhpc3RzIHx8IGZpbmRXb3Jrc3BhY2VSb290KCkpIHtcbiAgICByZXR1cm4gXCJ5YXJuXCJcbiAgfSBlbHNlIHtcbiAgICBwcmludE5vTG9ja2ZpbGVzRXJyb3IoKVxuICAgIHByb2Nlc3MuZXhpdCgxKVxuICB9XG4gIHRocm93IEVycm9yKClcbn1cbiJdfQ==