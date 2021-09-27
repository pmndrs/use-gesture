"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const process_1 = __importDefault(require("process"));
const minimist_1 = __importDefault(require("minimist"));
const applyPatches_1 = require("./applyPatches");
const getAppRootPath_1 = require("./getAppRootPath");
const makePatch_1 = require("./makePatch");
const makeRegExp_1 = require("./makeRegExp");
const detectPackageManager_1 = require("./detectPackageManager");
const path_1 = require("./path");
const path_2 = require("path");
const slash = require("slash");
const is_ci_1 = __importDefault(require("is-ci"));
const appPath = getAppRootPath_1.getAppRootPath();
const argv = minimist_1.default(process_1.default.argv.slice(2), {
    boolean: [
        "use-yarn",
        "case-sensitive-path-filtering",
        "reverse",
        "help",
        "version",
        "error-on-fail",
        "create-issue",
    ],
    string: ["patch-dir"],
});
const packageNames = argv._;
console.log(chalk_1.default.bold("patch-package"), 
// tslint:disable-next-line:no-var-requires
require(path_1.join(__dirname, "../package.json")).version);
if (argv.version || argv.v) {
    // noop
}
else if (argv.help || argv.h) {
    printHelp();
}
else {
    const patchDir = slash(path_2.normalize((argv["patch-dir"] || "patches") + path_2.sep));
    if (patchDir.startsWith("/")) {
        throw new Error("--patch-dir must be a relative path");
    }
    if (packageNames.length) {
        const includePaths = makeRegExp_1.makeRegExp(argv.include, "include", /.*/, argv["case-sensitive-path-filtering"]);
        const excludePaths = makeRegExp_1.makeRegExp(argv.exclude, "exclude", /package\.json$/, argv["case-sensitive-path-filtering"]);
        const packageManager = detectPackageManager_1.detectPackageManager(appPath, argv["use-yarn"] ? "yarn" : null);
        const createIssue = argv["create-issue"];
        packageNames.forEach((packagePathSpecifier) => {
            makePatch_1.makePatch({
                packagePathSpecifier,
                appPath,
                packageManager,
                includePaths,
                excludePaths,
                patchDir,
                createIssue,
            });
        });
    }
    else {
        console.log("Applying patches...");
        const reverse = !!argv["reverse"];
        // don't want to exit(1) on postinsall locally.
        // see https://github.com/ds300/patch-package/issues/86
        const shouldExitWithError = !!argv["error-on-fail"] || is_ci_1.default || process_1.default.env.NODE_ENV === "test";
        applyPatches_1.applyPatchesForApp({ appPath, reverse, patchDir, shouldExitWithError });
    }
}
function printHelp() {
    console.log(`
Usage:

  1. Patching packages
  ====================

    ${chalk_1.default.bold("patch-package")}

  Without arguments, the ${chalk_1.default.bold("patch-package")} command will attempt to find and apply
  patch files to your project. It looks for files named like

     ./patches/<package-name>+<version>.patch

  Options:

    ${chalk_1.default.bold("--patch-dir <dirname>")}

      Specify the name for the directory in which the patch files are located.
      
    ${chalk_1.default.bold("--error-on-fail")}
    
      Forces patch-package to exit with code 1 after failing.
    
      When running locally patch-package always exits with 0 by default.
      This happens even after failing to apply patches because otherwise 
      yarn.lock and package.json might get out of sync with node_modules,
      which can be very confusing.
      
      --error-on-fail is ${chalk_1.default.bold("switched on")} by default on CI.
      
      See https://github.com/ds300/patch-package/issues/86 for background.

    ${chalk_1.default.bold("--reverse")}
        
      Un-applies all patches.

      Note that this will fail if the patched files have changed since being
      patched. In that case, you'll probably need to re-install 'node_modules'.

      This option was added to help people using CircleCI avoid an issue around caching
      and patch file updates (https://github.com/ds300/patch-package/issues/37),
      but might be useful in other contexts too.
      

  2. Creating patch files
  =======================

    ${chalk_1.default.bold("patch-package")} <package-name>${chalk_1.default.italic("[ <package-name>]")}

  When given package names as arguments, patch-package will create patch files
  based on any changes you've made to the versions installed by yarn/npm.

  Options:
  
    ${chalk_1.default.bold("--create-issue")}
    
       For packages whose source is hosted on GitHub this option opens a web
       browser with a draft issue based on your diff.

    ${chalk_1.default.bold("--use-yarn")}

        By default, patch-package checks whether you use npm or yarn based on
        which lockfile you have. If you have both, it uses npm by default.
        Set this option to override that default and always use yarn.

    ${chalk_1.default.bold("--exclude <regexp>")}

        Ignore paths matching the regexp when creating patch files.
        Paths are relative to the root dir of the package to be patched.

        Default: 'package\\.json$'

    ${chalk_1.default.bold("--include <regexp>")}

        Only consider paths matching the regexp when creating patch files.
        Paths are relative to the root dir of the package to be patched.

        Default '.*'

    ${chalk_1.default.bold("--case-sensitive-path-filtering")}

        Make regexps used in --include or --exclude filters case-sensitive.
    
    ${chalk_1.default.bold("--patch-dir")}

        Specify the name for the directory in which to put the patch files.
`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBeUI7QUFDekIsc0RBQTZCO0FBQzdCLHdEQUErQjtBQUUvQixpREFBbUQ7QUFDbkQscURBQWlEO0FBQ2pELDJDQUF1QztBQUN2Qyw2Q0FBeUM7QUFDekMsaUVBQTZEO0FBQzdELGlDQUE2QjtBQUM3QiwrQkFBcUM7QUFDckMsK0JBQStCO0FBQy9CLGtEQUF3QjtBQUV4QixNQUFNLE9BQU8sR0FBRywrQkFBYyxFQUFFLENBQUE7QUFDaEMsTUFBTSxJQUFJLEdBQUcsa0JBQVEsQ0FBQyxpQkFBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7SUFDM0MsT0FBTyxFQUFFO1FBQ1AsVUFBVTtRQUNWLCtCQUErQjtRQUMvQixTQUFTO1FBQ1QsTUFBTTtRQUNOLFNBQVM7UUFDVCxlQUFlO1FBQ2YsY0FBYztLQUNmO0lBQ0QsTUFBTSxFQUFFLENBQUMsV0FBVyxDQUFDO0NBQ3RCLENBQUMsQ0FBQTtBQUNGLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUE7QUFFM0IsT0FBTyxDQUFDLEdBQUcsQ0FDVCxlQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztBQUMzQiwyQ0FBMkM7QUFDM0MsT0FBTyxDQUFDLFdBQUksQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FDcEQsQ0FBQTtBQUVELElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFO0lBQzFCLE9BQU87Q0FDUjtLQUFNLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFO0lBQzlCLFNBQVMsRUFBRSxDQUFBO0NBQ1o7S0FBTTtJQUNMLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxnQkFBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxHQUFHLFVBQUcsQ0FBQyxDQUFDLENBQUE7SUFDekUsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQTtLQUN2RDtJQUNELElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRTtRQUN2QixNQUFNLFlBQVksR0FBRyx1QkFBVSxDQUM3QixJQUFJLENBQUMsT0FBTyxFQUNaLFNBQVMsRUFDVCxJQUFJLEVBQ0osSUFBSSxDQUFDLCtCQUErQixDQUFDLENBQ3RDLENBQUE7UUFDRCxNQUFNLFlBQVksR0FBRyx1QkFBVSxDQUM3QixJQUFJLENBQUMsT0FBTyxFQUNaLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsSUFBSSxDQUFDLCtCQUErQixDQUFDLENBQ3RDLENBQUE7UUFDRCxNQUFNLGNBQWMsR0FBRywyQ0FBb0IsQ0FDekMsT0FBTyxFQUNQLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ2pDLENBQUE7UUFDRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDeEMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLG9CQUE0QixFQUFFLEVBQUU7WUFDcEQscUJBQVMsQ0FBQztnQkFDUixvQkFBb0I7Z0JBQ3BCLE9BQU87Z0JBQ1AsY0FBYztnQkFDZCxZQUFZO2dCQUNaLFlBQVk7Z0JBQ1osUUFBUTtnQkFDUixXQUFXO2FBQ1osQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7S0FDSDtTQUFNO1FBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO1FBQ2xDLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDakMsK0NBQStDO1FBQy9DLHVEQUF1RDtRQUN2RCxNQUFNLG1CQUFtQixHQUN2QixDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLGVBQUksSUFBSSxpQkFBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTSxDQUFBO1FBQ3BFLGlDQUFrQixDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxDQUFBO0tBQ3hFO0NBQ0Y7QUFFRCxTQUFTLFNBQVM7SUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQzs7Ozs7O01BTVIsZUFBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7OzJCQUVOLGVBQUssQ0FBQyxJQUFJLENBQ2pDLGVBQWUsQ0FDaEI7Ozs7Ozs7TUFPRyxlQUFLLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDOzs7O01BSW5DLGVBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7Ozs7Ozs7OzsyQkFTUixlQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQzs7OztNQUk5QyxlQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O01BZXZCLGVBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixlQUFLLENBQUMsTUFBTSxDQUMzRCxtQkFBbUIsQ0FDcEI7Ozs7Ozs7TUFPRyxlQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDOzs7OztNQUs1QixlQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQzs7Ozs7O01BTXhCLGVBQUssQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUM7Ozs7Ozs7TUFPaEMsZUFBSyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQzs7Ozs7OztNQU9oQyxlQUFLLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxDQUFDOzs7O01BSTdDLGVBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDOzs7Q0FHOUIsQ0FBQyxDQUFBO0FBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFsayBmcm9tIFwiY2hhbGtcIlxuaW1wb3J0IHByb2Nlc3MgZnJvbSBcInByb2Nlc3NcIlxuaW1wb3J0IG1pbmltaXN0IGZyb20gXCJtaW5pbWlzdFwiXG5cbmltcG9ydCB7IGFwcGx5UGF0Y2hlc0ZvckFwcCB9IGZyb20gXCIuL2FwcGx5UGF0Y2hlc1wiXG5pbXBvcnQgeyBnZXRBcHBSb290UGF0aCB9IGZyb20gXCIuL2dldEFwcFJvb3RQYXRoXCJcbmltcG9ydCB7IG1ha2VQYXRjaCB9IGZyb20gXCIuL21ha2VQYXRjaFwiXG5pbXBvcnQgeyBtYWtlUmVnRXhwIH0gZnJvbSBcIi4vbWFrZVJlZ0V4cFwiXG5pbXBvcnQgeyBkZXRlY3RQYWNrYWdlTWFuYWdlciB9IGZyb20gXCIuL2RldGVjdFBhY2thZ2VNYW5hZ2VyXCJcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwiLi9wYXRoXCJcbmltcG9ydCB7IG5vcm1hbGl6ZSwgc2VwIH0gZnJvbSBcInBhdGhcIlxuaW1wb3J0IHNsYXNoID0gcmVxdWlyZShcInNsYXNoXCIpXG5pbXBvcnQgaXNDaSBmcm9tIFwiaXMtY2lcIlxuXG5jb25zdCBhcHBQYXRoID0gZ2V0QXBwUm9vdFBhdGgoKVxuY29uc3QgYXJndiA9IG1pbmltaXN0KHByb2Nlc3MuYXJndi5zbGljZSgyKSwge1xuICBib29sZWFuOiBbXG4gICAgXCJ1c2UteWFyblwiLFxuICAgIFwiY2FzZS1zZW5zaXRpdmUtcGF0aC1maWx0ZXJpbmdcIixcbiAgICBcInJldmVyc2VcIixcbiAgICBcImhlbHBcIixcbiAgICBcInZlcnNpb25cIixcbiAgICBcImVycm9yLW9uLWZhaWxcIixcbiAgICBcImNyZWF0ZS1pc3N1ZVwiLFxuICBdLFxuICBzdHJpbmc6IFtcInBhdGNoLWRpclwiXSxcbn0pXG5jb25zdCBwYWNrYWdlTmFtZXMgPSBhcmd2Ll9cblxuY29uc29sZS5sb2coXG4gIGNoYWxrLmJvbGQoXCJwYXRjaC1wYWNrYWdlXCIpLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdmFyLXJlcXVpcmVzXG4gIHJlcXVpcmUoam9pbihfX2Rpcm5hbWUsIFwiLi4vcGFja2FnZS5qc29uXCIpKS52ZXJzaW9uLFxuKVxuXG5pZiAoYXJndi52ZXJzaW9uIHx8IGFyZ3Yudikge1xuICAvLyBub29wXG59IGVsc2UgaWYgKGFyZ3YuaGVscCB8fCBhcmd2LmgpIHtcbiAgcHJpbnRIZWxwKClcbn0gZWxzZSB7XG4gIGNvbnN0IHBhdGNoRGlyID0gc2xhc2gobm9ybWFsaXplKChhcmd2W1wicGF0Y2gtZGlyXCJdIHx8IFwicGF0Y2hlc1wiKSArIHNlcCkpXG4gIGlmIChwYXRjaERpci5zdGFydHNXaXRoKFwiL1wiKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIi0tcGF0Y2gtZGlyIG11c3QgYmUgYSByZWxhdGl2ZSBwYXRoXCIpXG4gIH1cbiAgaWYgKHBhY2thZ2VOYW1lcy5sZW5ndGgpIHtcbiAgICBjb25zdCBpbmNsdWRlUGF0aHMgPSBtYWtlUmVnRXhwKFxuICAgICAgYXJndi5pbmNsdWRlLFxuICAgICAgXCJpbmNsdWRlXCIsXG4gICAgICAvLiovLFxuICAgICAgYXJndltcImNhc2Utc2Vuc2l0aXZlLXBhdGgtZmlsdGVyaW5nXCJdLFxuICAgIClcbiAgICBjb25zdCBleGNsdWRlUGF0aHMgPSBtYWtlUmVnRXhwKFxuICAgICAgYXJndi5leGNsdWRlLFxuICAgICAgXCJleGNsdWRlXCIsXG4gICAgICAvcGFja2FnZVxcLmpzb24kLyxcbiAgICAgIGFyZ3ZbXCJjYXNlLXNlbnNpdGl2ZS1wYXRoLWZpbHRlcmluZ1wiXSxcbiAgICApXG4gICAgY29uc3QgcGFja2FnZU1hbmFnZXIgPSBkZXRlY3RQYWNrYWdlTWFuYWdlcihcbiAgICAgIGFwcFBhdGgsXG4gICAgICBhcmd2W1widXNlLXlhcm5cIl0gPyBcInlhcm5cIiA6IG51bGwsXG4gICAgKVxuICAgIGNvbnN0IGNyZWF0ZUlzc3VlID0gYXJndltcImNyZWF0ZS1pc3N1ZVwiXVxuICAgIHBhY2thZ2VOYW1lcy5mb3JFYWNoKChwYWNrYWdlUGF0aFNwZWNpZmllcjogc3RyaW5nKSA9PiB7XG4gICAgICBtYWtlUGF0Y2goe1xuICAgICAgICBwYWNrYWdlUGF0aFNwZWNpZmllcixcbiAgICAgICAgYXBwUGF0aCxcbiAgICAgICAgcGFja2FnZU1hbmFnZXIsXG4gICAgICAgIGluY2x1ZGVQYXRocyxcbiAgICAgICAgZXhjbHVkZVBhdGhzLFxuICAgICAgICBwYXRjaERpcixcbiAgICAgICAgY3JlYXRlSXNzdWUsXG4gICAgICB9KVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coXCJBcHBseWluZyBwYXRjaGVzLi4uXCIpXG4gICAgY29uc3QgcmV2ZXJzZSA9ICEhYXJndltcInJldmVyc2VcIl1cbiAgICAvLyBkb24ndCB3YW50IHRvIGV4aXQoMSkgb24gcG9zdGluc2FsbCBsb2NhbGx5LlxuICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZHMzMDAvcGF0Y2gtcGFja2FnZS9pc3N1ZXMvODZcbiAgICBjb25zdCBzaG91bGRFeGl0V2l0aEVycm9yID1cbiAgICAgICEhYXJndltcImVycm9yLW9uLWZhaWxcIl0gfHwgaXNDaSB8fCBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJ0ZXN0XCJcbiAgICBhcHBseVBhdGNoZXNGb3JBcHAoeyBhcHBQYXRoLCByZXZlcnNlLCBwYXRjaERpciwgc2hvdWxkRXhpdFdpdGhFcnJvciB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIHByaW50SGVscCgpIHtcbiAgY29uc29sZS5sb2coYFxuVXNhZ2U6XG5cbiAgMS4gUGF0Y2hpbmcgcGFja2FnZXNcbiAgPT09PT09PT09PT09PT09PT09PT1cblxuICAgICR7Y2hhbGsuYm9sZChcInBhdGNoLXBhY2thZ2VcIil9XG5cbiAgV2l0aG91dCBhcmd1bWVudHMsIHRoZSAke2NoYWxrLmJvbGQoXG4gICAgXCJwYXRjaC1wYWNrYWdlXCIsXG4gICl9IGNvbW1hbmQgd2lsbCBhdHRlbXB0IHRvIGZpbmQgYW5kIGFwcGx5XG4gIHBhdGNoIGZpbGVzIHRvIHlvdXIgcHJvamVjdC4gSXQgbG9va3MgZm9yIGZpbGVzIG5hbWVkIGxpa2VcblxuICAgICAuL3BhdGNoZXMvPHBhY2thZ2UtbmFtZT4rPHZlcnNpb24+LnBhdGNoXG5cbiAgT3B0aW9uczpcblxuICAgICR7Y2hhbGsuYm9sZChcIi0tcGF0Y2gtZGlyIDxkaXJuYW1lPlwiKX1cblxuICAgICAgU3BlY2lmeSB0aGUgbmFtZSBmb3IgdGhlIGRpcmVjdG9yeSBpbiB3aGljaCB0aGUgcGF0Y2ggZmlsZXMgYXJlIGxvY2F0ZWQuXG4gICAgICBcbiAgICAke2NoYWxrLmJvbGQoXCItLWVycm9yLW9uLWZhaWxcIil9XG4gICAgXG4gICAgICBGb3JjZXMgcGF0Y2gtcGFja2FnZSB0byBleGl0IHdpdGggY29kZSAxIGFmdGVyIGZhaWxpbmcuXG4gICAgXG4gICAgICBXaGVuIHJ1bm5pbmcgbG9jYWxseSBwYXRjaC1wYWNrYWdlIGFsd2F5cyBleGl0cyB3aXRoIDAgYnkgZGVmYXVsdC5cbiAgICAgIFRoaXMgaGFwcGVucyBldmVuIGFmdGVyIGZhaWxpbmcgdG8gYXBwbHkgcGF0Y2hlcyBiZWNhdXNlIG90aGVyd2lzZSBcbiAgICAgIHlhcm4ubG9jayBhbmQgcGFja2FnZS5qc29uIG1pZ2h0IGdldCBvdXQgb2Ygc3luYyB3aXRoIG5vZGVfbW9kdWxlcyxcbiAgICAgIHdoaWNoIGNhbiBiZSB2ZXJ5IGNvbmZ1c2luZy5cbiAgICAgIFxuICAgICAgLS1lcnJvci1vbi1mYWlsIGlzICR7Y2hhbGsuYm9sZChcInN3aXRjaGVkIG9uXCIpfSBieSBkZWZhdWx0IG9uIENJLlxuICAgICAgXG4gICAgICBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2RzMzAwL3BhdGNoLXBhY2thZ2UvaXNzdWVzLzg2IGZvciBiYWNrZ3JvdW5kLlxuXG4gICAgJHtjaGFsay5ib2xkKFwiLS1yZXZlcnNlXCIpfVxuICAgICAgICBcbiAgICAgIFVuLWFwcGxpZXMgYWxsIHBhdGNoZXMuXG5cbiAgICAgIE5vdGUgdGhhdCB0aGlzIHdpbGwgZmFpbCBpZiB0aGUgcGF0Y2hlZCBmaWxlcyBoYXZlIGNoYW5nZWQgc2luY2UgYmVpbmdcbiAgICAgIHBhdGNoZWQuIEluIHRoYXQgY2FzZSwgeW91J2xsIHByb2JhYmx5IG5lZWQgdG8gcmUtaW5zdGFsbCAnbm9kZV9tb2R1bGVzJy5cblxuICAgICAgVGhpcyBvcHRpb24gd2FzIGFkZGVkIHRvIGhlbHAgcGVvcGxlIHVzaW5nIENpcmNsZUNJIGF2b2lkIGFuIGlzc3VlIGFyb3VuZCBjYWNoaW5nXG4gICAgICBhbmQgcGF0Y2ggZmlsZSB1cGRhdGVzIChodHRwczovL2dpdGh1Yi5jb20vZHMzMDAvcGF0Y2gtcGFja2FnZS9pc3N1ZXMvMzcpLFxuICAgICAgYnV0IG1pZ2h0IGJlIHVzZWZ1bCBpbiBvdGhlciBjb250ZXh0cyB0b28uXG4gICAgICBcblxuICAyLiBDcmVhdGluZyBwYXRjaCBmaWxlc1xuICA9PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgJHtjaGFsay5ib2xkKFwicGF0Y2gtcGFja2FnZVwiKX0gPHBhY2thZ2UtbmFtZT4ke2NoYWxrLml0YWxpYyhcbiAgICBcIlsgPHBhY2thZ2UtbmFtZT5dXCIsXG4gICl9XG5cbiAgV2hlbiBnaXZlbiBwYWNrYWdlIG5hbWVzIGFzIGFyZ3VtZW50cywgcGF0Y2gtcGFja2FnZSB3aWxsIGNyZWF0ZSBwYXRjaCBmaWxlc1xuICBiYXNlZCBvbiBhbnkgY2hhbmdlcyB5b3UndmUgbWFkZSB0byB0aGUgdmVyc2lvbnMgaW5zdGFsbGVkIGJ5IHlhcm4vbnBtLlxuXG4gIE9wdGlvbnM6XG4gIFxuICAgICR7Y2hhbGsuYm9sZChcIi0tY3JlYXRlLWlzc3VlXCIpfVxuICAgIFxuICAgICAgIEZvciBwYWNrYWdlcyB3aG9zZSBzb3VyY2UgaXMgaG9zdGVkIG9uIEdpdEh1YiB0aGlzIG9wdGlvbiBvcGVucyBhIHdlYlxuICAgICAgIGJyb3dzZXIgd2l0aCBhIGRyYWZ0IGlzc3VlIGJhc2VkIG9uIHlvdXIgZGlmZi5cblxuICAgICR7Y2hhbGsuYm9sZChcIi0tdXNlLXlhcm5cIil9XG5cbiAgICAgICAgQnkgZGVmYXVsdCwgcGF0Y2gtcGFja2FnZSBjaGVja3Mgd2hldGhlciB5b3UgdXNlIG5wbSBvciB5YXJuIGJhc2VkIG9uXG4gICAgICAgIHdoaWNoIGxvY2tmaWxlIHlvdSBoYXZlLiBJZiB5b3UgaGF2ZSBib3RoLCBpdCB1c2VzIG5wbSBieSBkZWZhdWx0LlxuICAgICAgICBTZXQgdGhpcyBvcHRpb24gdG8gb3ZlcnJpZGUgdGhhdCBkZWZhdWx0IGFuZCBhbHdheXMgdXNlIHlhcm4uXG5cbiAgICAke2NoYWxrLmJvbGQoXCItLWV4Y2x1ZGUgPHJlZ2V4cD5cIil9XG5cbiAgICAgICAgSWdub3JlIHBhdGhzIG1hdGNoaW5nIHRoZSByZWdleHAgd2hlbiBjcmVhdGluZyBwYXRjaCBmaWxlcy5cbiAgICAgICAgUGF0aHMgYXJlIHJlbGF0aXZlIHRvIHRoZSByb290IGRpciBvZiB0aGUgcGFja2FnZSB0byBiZSBwYXRjaGVkLlxuXG4gICAgICAgIERlZmF1bHQ6ICdwYWNrYWdlXFxcXC5qc29uJCdcblxuICAgICR7Y2hhbGsuYm9sZChcIi0taW5jbHVkZSA8cmVnZXhwPlwiKX1cblxuICAgICAgICBPbmx5IGNvbnNpZGVyIHBhdGhzIG1hdGNoaW5nIHRoZSByZWdleHAgd2hlbiBjcmVhdGluZyBwYXRjaCBmaWxlcy5cbiAgICAgICAgUGF0aHMgYXJlIHJlbGF0aXZlIHRvIHRoZSByb290IGRpciBvZiB0aGUgcGFja2FnZSB0byBiZSBwYXRjaGVkLlxuXG4gICAgICAgIERlZmF1bHQgJy4qJ1xuXG4gICAgJHtjaGFsay5ib2xkKFwiLS1jYXNlLXNlbnNpdGl2ZS1wYXRoLWZpbHRlcmluZ1wiKX1cblxuICAgICAgICBNYWtlIHJlZ2V4cHMgdXNlZCBpbiAtLWluY2x1ZGUgb3IgLS1leGNsdWRlIGZpbHRlcnMgY2FzZS1zZW5zaXRpdmUuXG4gICAgXG4gICAgJHtjaGFsay5ib2xkKFwiLS1wYXRjaC1kaXJcIil9XG5cbiAgICAgICAgU3BlY2lmeSB0aGUgbmFtZSBmb3IgdGhlIGRpcmVjdG9yeSBpbiB3aGljaCB0byBwdXQgdGhlIHBhdGNoIGZpbGVzLlxuYClcbn1cbiJdfQ==