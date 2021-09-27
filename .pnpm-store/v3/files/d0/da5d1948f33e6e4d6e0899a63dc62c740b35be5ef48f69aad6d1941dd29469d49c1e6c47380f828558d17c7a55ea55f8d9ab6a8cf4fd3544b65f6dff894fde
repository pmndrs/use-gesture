"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPatch = exports.applyPatchesForApp = void 0;
const chalk_1 = __importDefault(require("chalk"));
const patchFs_1 = require("./patchFs");
const apply_1 = require("./patch/apply");
const fs_extra_1 = require("fs-extra");
const path_1 = require("./path");
const path_2 = require("path");
const PackageDetails_1 = require("./PackageDetails");
const reverse_1 = require("./patch/reverse");
const semver_1 = __importDefault(require("semver"));
const read_1 = require("./patch/read");
const packageIsDevDependency_1 = require("./packageIsDevDependency");
class PatchApplicationError extends Error {
    constructor(msg) {
        super(msg);
    }
}
function findPatchFiles(patchesDirectory) {
    if (!fs_extra_1.existsSync(patchesDirectory)) {
        return [];
    }
    return patchFs_1.getPatchFiles(patchesDirectory);
}
function getInstalledPackageVersion({ appPath, path, pathSpecifier, isDevOnly, patchFilename, }) {
    const packageDir = path_1.join(appPath, path);
    if (!fs_extra_1.existsSync(packageDir)) {
        if (process.env.NODE_ENV === "production" && isDevOnly) {
            return null;
        }
        let err = `${chalk_1.default.red("Error:")} Patch file found for package ${path_2.posix.basename(pathSpecifier)}` + ` which is not present at ${path_1.relative(".", packageDir)}`;
        if (!isDevOnly && process.env.NODE_ENV === "production") {
            err += `

  If this package is a dev dependency, rename the patch file to
  
    ${chalk_1.default.bold(patchFilename.replace(".patch", ".dev.patch"))}
`;
        }
        throw new PatchApplicationError(err);
    }
    const { version } = require(path_1.join(packageDir, "package.json"));
    // normalize version for `npm ci`
    const result = semver_1.default.valid(version);
    if (result === null) {
        throw new PatchApplicationError(`${chalk_1.default.red("Error:")} Version string '${version}' cannot be parsed from ${path_1.join(packageDir, "package.json")}`);
    }
    return result;
}
function applyPatchesForApp({ appPath, reverse, patchDir, shouldExitWithError, }) {
    const patchesDirectory = path_1.join(appPath, patchDir);
    const files = findPatchFiles(patchesDirectory);
    if (files.length === 0) {
        console.error(chalk_1.default.blueBright("No patch files found"));
        return;
    }
    const errors = [];
    const warnings = [];
    for (const filename of files) {
        try {
            const packageDetails = PackageDetails_1.getPackageDetailsFromPatchFilename(filename);
            if (!packageDetails) {
                warnings.push(`Unrecognized patch file in patches directory ${filename}`);
                continue;
            }
            const { name, version, path, pathSpecifier, isDevOnly, patchFilename, } = packageDetails;
            const installedPackageVersion = getInstalledPackageVersion({
                appPath,
                path,
                pathSpecifier,
                isDevOnly: isDevOnly ||
                    // check for direct-dependents in prod
                    (process.env.NODE_ENV === "production" &&
                        packageIsDevDependency_1.packageIsDevDependency({ appPath, packageDetails })),
                patchFilename,
            });
            if (!installedPackageVersion) {
                // it's ok we're in production mode and this is a dev only package
                console.log(`Skipping dev-only ${chalk_1.default.bold(pathSpecifier)}@${version} ${chalk_1.default.blue("✔")}`);
                continue;
            }
            if (applyPatch({
                patchFilePath: path_1.resolve(patchesDirectory, filename),
                reverse,
                packageDetails,
                patchDir,
            })) {
                // yay patch was applied successfully
                // print warning if version mismatch
                if (installedPackageVersion !== version) {
                    warnings.push(createVersionMismatchWarning({
                        packageName: name,
                        actualVersion: installedPackageVersion,
                        originalVersion: version,
                        pathSpecifier,
                        path,
                    }));
                }
                console.log(`${chalk_1.default.bold(pathSpecifier)}@${version} ${chalk_1.default.green("✔")}`);
            }
            else if (installedPackageVersion === version) {
                // completely failed to apply patch
                // TODO: propagate useful error messages from patch application
                errors.push(createBrokenPatchFileError({
                    packageName: name,
                    patchFileName: filename,
                    pathSpecifier,
                    path,
                }));
            }
            else {
                errors.push(createPatchApplictionFailureError({
                    packageName: name,
                    actualVersion: installedPackageVersion,
                    originalVersion: version,
                    patchFileName: filename,
                    path,
                    pathSpecifier,
                }));
            }
        }
        catch (error) {
            if (error instanceof PatchApplicationError) {
                errors.push(error.message);
            }
            else {
                errors.push(createUnexpectedError({ filename, error }));
            }
        }
    }
    for (const warning of warnings) {
        console.warn(warning);
    }
    for (const error of errors) {
        console.error(error);
    }
    const problemsSummary = [];
    if (warnings.length) {
        problemsSummary.push(chalk_1.default.yellow(`${warnings.length} warning(s)`));
    }
    if (errors.length) {
        problemsSummary.push(chalk_1.default.red(`${errors.length} error(s)`));
    }
    if (problemsSummary.length) {
        console.error("---");
        console.error("patch-package finished with", problemsSummary.join(", ") + ".");
    }
    if (errors.length) {
        process.exit(shouldExitWithError ? 1 : 0);
    }
}
exports.applyPatchesForApp = applyPatchesForApp;
function applyPatch({ patchFilePath, reverse, packageDetails, patchDir, }) {
    const patch = read_1.readPatch({ patchFilePath, packageDetails, patchDir });
    try {
        apply_1.executeEffects(reverse ? reverse_1.reversePatch(patch) : patch, { dryRun: false });
    }
    catch (e) {
        try {
            apply_1.executeEffects(reverse ? patch : reverse_1.reversePatch(patch), { dryRun: true });
        }
        catch (e) {
            return false;
        }
    }
    return true;
}
exports.applyPatch = applyPatch;
function createVersionMismatchWarning({ packageName, actualVersion, originalVersion, pathSpecifier, path, }) {
    return `
${chalk_1.default.yellow("Warning:")} patch-package detected a patch file version mismatch

  Don't worry! This is probably fine. The patch was still applied
  successfully. Here's the deets:

  Patch file created for

    ${packageName}@${chalk_1.default.bold(originalVersion)}

  applied to

    ${packageName}@${chalk_1.default.bold(actualVersion)}
  
  At path
  
    ${path}

  This warning is just to give you a heads-up. There is a small chance of
  breakage even though the patch was applied successfully. Make sure the package
  still behaves like you expect (you wrote tests, right?) and then run

    ${chalk_1.default.bold(`patch-package ${pathSpecifier}`)}

  to update the version in the patch file name and make this warning go away.
`;
}
function createBrokenPatchFileError({ packageName, patchFileName, path, pathSpecifier, }) {
    return `
${chalk_1.default.red.bold("**ERROR**")} ${chalk_1.default.red(`Failed to apply patch for package ${chalk_1.default.bold(packageName)} at path`)}
  
    ${path}

  This error was caused because patch-package cannot apply the following patch file:

    patches/${patchFileName}

  Try removing node_modules and trying again. If that doesn't work, maybe there was
  an accidental change made to the patch file? Try recreating it by manually
  editing the appropriate files and running:
  
    patch-package ${pathSpecifier}
  
  If that doesn't work, then it's a bug in patch-package, so please submit a bug
  report. Thanks!

    https://github.com/ds300/patch-package/issues
    
`;
}
function createPatchApplictionFailureError({ packageName, actualVersion, originalVersion, patchFileName, path, pathSpecifier, }) {
    return `
${chalk_1.default.red.bold("**ERROR**")} ${chalk_1.default.red(`Failed to apply patch for package ${chalk_1.default.bold(packageName)} at path`)}
  
    ${path}

  This error was caused because ${chalk_1.default.bold(packageName)} has changed since you
  made the patch file for it. This introduced conflicts with your patch,
  just like a merge conflict in Git when separate incompatible changes are
  made to the same piece of code.

  Maybe this means your patch file is no longer necessary, in which case
  hooray! Just delete it!

  Otherwise, you need to generate a new patch file.

  To generate a new one, just repeat the steps you made to generate the first
  one.

  i.e. manually make the appropriate file changes, then run 

    patch-package ${pathSpecifier}

  Info:
    Patch file: patches/${patchFileName}
    Patch was made for version: ${chalk_1.default.green.bold(originalVersion)}
    Installed version: ${chalk_1.default.red.bold(actualVersion)}
`;
}
function createUnexpectedError({ filename, error, }) {
    return `
${chalk_1.default.red.bold("**ERROR**")} ${chalk_1.default.red(`Failed to apply patch file ${chalk_1.default.bold(filename)}`)}
  
${error.stack}

  `;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbHlQYXRjaGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcGx5UGF0Y2hlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBeUI7QUFDekIsdUNBQXlDO0FBQ3pDLHlDQUE4QztBQUM5Qyx1Q0FBcUM7QUFDckMsaUNBQWdEO0FBQ2hELCtCQUE0QjtBQUM1QixxREFHeUI7QUFDekIsNkNBQThDO0FBQzlDLG9EQUEyQjtBQUMzQix1Q0FBd0M7QUFDeEMscUVBQWlFO0FBRWpFLE1BQU0scUJBQXNCLFNBQVEsS0FBSztJQUN2QyxZQUFZLEdBQVc7UUFDckIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1osQ0FBQztDQUNGO0FBRUQsU0FBUyxjQUFjLENBQUMsZ0JBQXdCO0lBQzlDLElBQUksQ0FBQyxxQkFBVSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7UUFDakMsT0FBTyxFQUFFLENBQUE7S0FDVjtJQUVELE9BQU8sdUJBQWEsQ0FBQyxnQkFBZ0IsQ0FBYSxDQUFBO0FBQ3BELENBQUM7QUFFRCxTQUFTLDBCQUEwQixDQUFDLEVBQ2xDLE9BQU8sRUFDUCxJQUFJLEVBQ0osYUFBYSxFQUNiLFNBQVMsRUFDVCxhQUFhLEdBT2Q7SUFDQyxNQUFNLFVBQVUsR0FBRyxXQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3RDLElBQUksQ0FBQyxxQkFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzNCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssWUFBWSxJQUFJLFNBQVMsRUFBRTtZQUN0RCxPQUFPLElBQUksQ0FBQTtTQUNaO1FBRUQsSUFBSSxHQUFHLEdBQ0wsR0FBRyxlQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxpQ0FBaUMsWUFBSyxDQUFDLFFBQVEsQ0FDbkUsYUFBYSxDQUNkLEVBQUUsR0FBRyw0QkFBNEIsZUFBUSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFBO1FBRS9ELElBQUksQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssWUFBWSxFQUFFO1lBQ3ZELEdBQUcsSUFBSTs7OztNQUlQLGVBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7Q0FDOUQsQ0FBQTtTQUNJO1FBQ0QsTUFBTSxJQUFJLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQ3JDO0lBRUQsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQyxXQUFJLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUE7SUFDN0QsaUNBQWlDO0lBQ2pDLE1BQU0sTUFBTSxHQUFHLGdCQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3BDLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtRQUNuQixNQUFNLElBQUkscUJBQXFCLENBQzdCLEdBQUcsZUFBSyxDQUFDLEdBQUcsQ0FDVixRQUFRLENBQ1Qsb0JBQW9CLE9BQU8sMkJBQTJCLFdBQUksQ0FDekQsVUFBVSxFQUNWLGNBQWMsQ0FDZixFQUFFLENBQ0osQ0FBQTtLQUNGO0lBRUQsT0FBTyxNQUFnQixDQUFBO0FBQ3pCLENBQUM7QUFFRCxTQUFnQixrQkFBa0IsQ0FBQyxFQUNqQyxPQUFPLEVBQ1AsT0FBTyxFQUNQLFFBQVEsRUFDUixtQkFBbUIsR0FNcEI7SUFDQyxNQUFNLGdCQUFnQixHQUFHLFdBQUksQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDaEQsTUFBTSxLQUFLLEdBQUcsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFFOUMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUN0QixPQUFPLENBQUMsS0FBSyxDQUFDLGVBQUssQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFBO1FBQ3ZELE9BQU07S0FDUDtJQUVELE1BQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQTtJQUMzQixNQUFNLFFBQVEsR0FBYSxFQUFFLENBQUE7SUFFN0IsS0FBSyxNQUFNLFFBQVEsSUFBSSxLQUFLLEVBQUU7UUFDNUIsSUFBSTtZQUNGLE1BQU0sY0FBYyxHQUFHLG1EQUFrQyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBRW5FLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ25CLFFBQVEsQ0FBQyxJQUFJLENBQ1gsZ0RBQWdELFFBQVEsRUFBRSxDQUMzRCxDQUFBO2dCQUNELFNBQVE7YUFDVDtZQUVELE1BQU0sRUFDSixJQUFJLEVBQ0osT0FBTyxFQUNQLElBQUksRUFDSixhQUFhLEVBQ2IsU0FBUyxFQUNULGFBQWEsR0FDZCxHQUFHLGNBQWMsQ0FBQTtZQUVsQixNQUFNLHVCQUF1QixHQUFHLDBCQUEwQixDQUFDO2dCQUN6RCxPQUFPO2dCQUNQLElBQUk7Z0JBQ0osYUFBYTtnQkFDYixTQUFTLEVBQ1AsU0FBUztvQkFDVCxzQ0FBc0M7b0JBQ3RDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssWUFBWTt3QkFDcEMsK0NBQXNCLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztnQkFDeEQsYUFBYTthQUNkLENBQUMsQ0FBQTtZQUNGLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtnQkFDNUIsa0VBQWtFO2dCQUNsRSxPQUFPLENBQUMsR0FBRyxDQUNULHFCQUFxQixlQUFLLENBQUMsSUFBSSxDQUM3QixhQUFhLENBQ2QsSUFBSSxPQUFPLElBQUksZUFBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUNsQyxDQUFBO2dCQUNELFNBQVE7YUFDVDtZQUVELElBQ0UsVUFBVSxDQUFDO2dCQUNULGFBQWEsRUFBRSxjQUFPLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxDQUFXO2dCQUM1RCxPQUFPO2dCQUNQLGNBQWM7Z0JBQ2QsUUFBUTthQUNULENBQUMsRUFDRjtnQkFDQSxxQ0FBcUM7Z0JBQ3JDLG9DQUFvQztnQkFDcEMsSUFBSSx1QkFBdUIsS0FBSyxPQUFPLEVBQUU7b0JBQ3ZDLFFBQVEsQ0FBQyxJQUFJLENBQ1gsNEJBQTRCLENBQUM7d0JBQzNCLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixhQUFhLEVBQUUsdUJBQXVCO3dCQUN0QyxlQUFlLEVBQUUsT0FBTzt3QkFDeEIsYUFBYTt3QkFDYixJQUFJO3FCQUNMLENBQUMsQ0FDSCxDQUFBO2lCQUNGO2dCQUNELE9BQU8sQ0FBQyxHQUFHLENBQ1QsR0FBRyxlQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLE9BQU8sSUFBSSxlQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQzlELENBQUE7YUFDRjtpQkFBTSxJQUFJLHVCQUF1QixLQUFLLE9BQU8sRUFBRTtnQkFDOUMsbUNBQW1DO2dCQUNuQywrREFBK0Q7Z0JBQy9ELE1BQU0sQ0FBQyxJQUFJLENBQ1QsMEJBQTBCLENBQUM7b0JBQ3pCLFdBQVcsRUFBRSxJQUFJO29CQUNqQixhQUFhLEVBQUUsUUFBUTtvQkFDdkIsYUFBYTtvQkFDYixJQUFJO2lCQUNMLENBQUMsQ0FDSCxDQUFBO2FBQ0Y7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLElBQUksQ0FDVCxpQ0FBaUMsQ0FBQztvQkFDaEMsV0FBVyxFQUFFLElBQUk7b0JBQ2pCLGFBQWEsRUFBRSx1QkFBdUI7b0JBQ3RDLGVBQWUsRUFBRSxPQUFPO29CQUN4QixhQUFhLEVBQUUsUUFBUTtvQkFDdkIsSUFBSTtvQkFDSixhQUFhO2lCQUNkLENBQUMsQ0FDSCxDQUFBO2FBQ0Y7U0FDRjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsSUFBSSxLQUFLLFlBQVkscUJBQXFCLEVBQUU7Z0JBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO2FBQzNCO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFBO2FBQ3hEO1NBQ0Y7S0FDRjtJQUVELEtBQUssTUFBTSxPQUFPLElBQUksUUFBUSxFQUFFO1FBQzlCLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7S0FDdEI7SUFDRCxLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtRQUMxQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0tBQ3JCO0lBRUQsTUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFBO0lBQzFCLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtRQUNuQixlQUFlLENBQUMsSUFBSSxDQUFDLGVBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxhQUFhLENBQUMsQ0FBQyxDQUFBO0tBQ3BFO0lBQ0QsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1FBQ2pCLGVBQWUsQ0FBQyxJQUFJLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLFdBQVcsQ0FBQyxDQUFDLENBQUE7S0FDN0Q7SUFFRCxJQUFJLGVBQWUsQ0FBQyxNQUFNLEVBQUU7UUFDMUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNwQixPQUFPLENBQUMsS0FBSyxDQUNYLDZCQUE2QixFQUM3QixlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FDakMsQ0FBQTtLQUNGO0lBRUQsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1FBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDMUM7QUFDSCxDQUFDO0FBakpELGdEQWlKQztBQUVELFNBQWdCLFVBQVUsQ0FBQyxFQUN6QixhQUFhLEVBQ2IsT0FBTyxFQUNQLGNBQWMsRUFDZCxRQUFRLEdBTVQ7SUFDQyxNQUFNLEtBQUssR0FBRyxnQkFBUyxDQUFDLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0lBQ3BFLElBQUk7UUFDRixzQkFBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsc0JBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7S0FDekU7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLElBQUk7WUFDRixzQkFBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxzQkFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7U0FDeEU7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sS0FBSyxDQUFBO1NBQ2I7S0FDRjtJQUVELE9BQU8sSUFBSSxDQUFBO0FBQ2IsQ0FBQztBQXZCRCxnQ0F1QkM7QUFFRCxTQUFTLDRCQUE0QixDQUFDLEVBQ3BDLFdBQVcsRUFDWCxhQUFhLEVBQ2IsZUFBZSxFQUNmLGFBQWEsRUFDYixJQUFJLEdBT0w7SUFDQyxPQUFPO0VBQ1AsZUFBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7Ozs7Ozs7TUFPcEIsV0FBVyxJQUFJLGVBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDOzs7O01BSTFDLFdBQVcsSUFBSSxlQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQzs7OztNQUl4QyxJQUFJOzs7Ozs7TUFNSixlQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixhQUFhLEVBQUUsQ0FBQzs7O0NBR2pELENBQUE7QUFDRCxDQUFDO0FBRUQsU0FBUywwQkFBMEIsQ0FBQyxFQUNsQyxXQUFXLEVBQ1gsYUFBYSxFQUNiLElBQUksRUFDSixhQUFhLEdBTWQ7SUFDQyxPQUFPO0VBQ1AsZUFBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksZUFBSyxDQUFDLEdBQUcsQ0FDdEMscUNBQXFDLGVBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FDdkU7O01BRUcsSUFBSTs7OztjQUlJLGFBQWE7Ozs7OztvQkFNUCxhQUFhOzs7Ozs7O0NBT2hDLENBQUE7QUFDRCxDQUFDO0FBRUQsU0FBUyxpQ0FBaUMsQ0FBQyxFQUN6QyxXQUFXLEVBQ1gsYUFBYSxFQUNiLGVBQWUsRUFDZixhQUFhLEVBQ2IsSUFBSSxFQUNKLGFBQWEsR0FRZDtJQUNDLE9BQU87RUFDUCxlQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxlQUFLLENBQUMsR0FBRyxDQUN0QyxxQ0FBcUMsZUFBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUN2RTs7TUFFRyxJQUFJOztrQ0FFd0IsZUFBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7Ozs7Ozs7Ozs7Ozs7OztvQkFlckMsYUFBYTs7OzBCQUdQLGFBQWE7a0NBQ0wsZUFBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO3lCQUMxQyxlQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7Q0FDckQsQ0FBQTtBQUNELENBQUM7QUFFRCxTQUFTLHFCQUFxQixDQUFDLEVBQzdCLFFBQVEsRUFDUixLQUFLLEdBSU47SUFDQyxPQUFPO0VBQ1AsZUFBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksZUFBSyxDQUFDLEdBQUcsQ0FDdEMsOEJBQThCLGVBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FDckQ7O0VBRUQsS0FBSyxDQUFDLEtBQUs7O0dBRVYsQ0FBQTtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhbGsgZnJvbSBcImNoYWxrXCJcbmltcG9ydCB7IGdldFBhdGNoRmlsZXMgfSBmcm9tIFwiLi9wYXRjaEZzXCJcbmltcG9ydCB7IGV4ZWN1dGVFZmZlY3RzIH0gZnJvbSBcIi4vcGF0Y2gvYXBwbHlcIlxuaW1wb3J0IHsgZXhpc3RzU3luYyB9IGZyb20gXCJmcy1leHRyYVwiXG5pbXBvcnQgeyBqb2luLCByZXNvbHZlLCByZWxhdGl2ZSB9IGZyb20gXCIuL3BhdGhcIlxuaW1wb3J0IHsgcG9zaXggfSBmcm9tIFwicGF0aFwiXG5pbXBvcnQge1xuICBnZXRQYWNrYWdlRGV0YWlsc0Zyb21QYXRjaEZpbGVuYW1lLFxuICBQYWNrYWdlRGV0YWlscyxcbn0gZnJvbSBcIi4vUGFja2FnZURldGFpbHNcIlxuaW1wb3J0IHsgcmV2ZXJzZVBhdGNoIH0gZnJvbSBcIi4vcGF0Y2gvcmV2ZXJzZVwiXG5pbXBvcnQgc2VtdmVyIGZyb20gXCJzZW12ZXJcIlxuaW1wb3J0IHsgcmVhZFBhdGNoIH0gZnJvbSBcIi4vcGF0Y2gvcmVhZFwiXG5pbXBvcnQgeyBwYWNrYWdlSXNEZXZEZXBlbmRlbmN5IH0gZnJvbSBcIi4vcGFja2FnZUlzRGV2RGVwZW5kZW5jeVwiXG5cbmNsYXNzIFBhdGNoQXBwbGljYXRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobXNnOiBzdHJpbmcpIHtcbiAgICBzdXBlcihtc2cpXG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZFBhdGNoRmlsZXMocGF0Y2hlc0RpcmVjdG9yeTogc3RyaW5nKTogc3RyaW5nW10ge1xuICBpZiAoIWV4aXN0c1N5bmMocGF0Y2hlc0RpcmVjdG9yeSkpIHtcbiAgICByZXR1cm4gW11cbiAgfVxuXG4gIHJldHVybiBnZXRQYXRjaEZpbGVzKHBhdGNoZXNEaXJlY3RvcnkpIGFzIHN0cmluZ1tdXG59XG5cbmZ1bmN0aW9uIGdldEluc3RhbGxlZFBhY2thZ2VWZXJzaW9uKHtcbiAgYXBwUGF0aCxcbiAgcGF0aCxcbiAgcGF0aFNwZWNpZmllcixcbiAgaXNEZXZPbmx5LFxuICBwYXRjaEZpbGVuYW1lLFxufToge1xuICBhcHBQYXRoOiBzdHJpbmdcbiAgcGF0aDogc3RyaW5nXG4gIHBhdGhTcGVjaWZpZXI6IHN0cmluZ1xuICBpc0Rldk9ubHk6IGJvb2xlYW5cbiAgcGF0Y2hGaWxlbmFtZTogc3RyaW5nXG59KTogbnVsbCB8IHN0cmluZyB7XG4gIGNvbnN0IHBhY2thZ2VEaXIgPSBqb2luKGFwcFBhdGgsIHBhdGgpXG4gIGlmICghZXhpc3RzU3luYyhwYWNrYWdlRGlyKSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgJiYgaXNEZXZPbmx5KSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIGxldCBlcnIgPVxuICAgICAgYCR7Y2hhbGsucmVkKFwiRXJyb3I6XCIpfSBQYXRjaCBmaWxlIGZvdW5kIGZvciBwYWNrYWdlICR7cG9zaXguYmFzZW5hbWUoXG4gICAgICAgIHBhdGhTcGVjaWZpZXIsXG4gICAgICApfWAgKyBgIHdoaWNoIGlzIG5vdCBwcmVzZW50IGF0ICR7cmVsYXRpdmUoXCIuXCIsIHBhY2thZ2VEaXIpfWBcblxuICAgIGlmICghaXNEZXZPbmx5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgZXJyICs9IGBcblxuICBJZiB0aGlzIHBhY2thZ2UgaXMgYSBkZXYgZGVwZW5kZW5jeSwgcmVuYW1lIHRoZSBwYXRjaCBmaWxlIHRvXG4gIFxuICAgICR7Y2hhbGsuYm9sZChwYXRjaEZpbGVuYW1lLnJlcGxhY2UoXCIucGF0Y2hcIiwgXCIuZGV2LnBhdGNoXCIpKX1cbmBcbiAgICB9XG4gICAgdGhyb3cgbmV3IFBhdGNoQXBwbGljYXRpb25FcnJvcihlcnIpXG4gIH1cblxuICBjb25zdCB7IHZlcnNpb24gfSA9IHJlcXVpcmUoam9pbihwYWNrYWdlRGlyLCBcInBhY2thZ2UuanNvblwiKSlcbiAgLy8gbm9ybWFsaXplIHZlcnNpb24gZm9yIGBucG0gY2lgXG4gIGNvbnN0IHJlc3VsdCA9IHNlbXZlci52YWxpZCh2ZXJzaW9uKVxuICBpZiAocmVzdWx0ID09PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFBhdGNoQXBwbGljYXRpb25FcnJvcihcbiAgICAgIGAke2NoYWxrLnJlZChcbiAgICAgICAgXCJFcnJvcjpcIixcbiAgICAgICl9IFZlcnNpb24gc3RyaW5nICcke3ZlcnNpb259JyBjYW5ub3QgYmUgcGFyc2VkIGZyb20gJHtqb2luKFxuICAgICAgICBwYWNrYWdlRGlyLFxuICAgICAgICBcInBhY2thZ2UuanNvblwiLFxuICAgICAgKX1gLFxuICAgIClcbiAgfVxuXG4gIHJldHVybiByZXN1bHQgYXMgc3RyaW5nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVBhdGNoZXNGb3JBcHAoe1xuICBhcHBQYXRoLFxuICByZXZlcnNlLFxuICBwYXRjaERpcixcbiAgc2hvdWxkRXhpdFdpdGhFcnJvcixcbn06IHtcbiAgYXBwUGF0aDogc3RyaW5nXG4gIHJldmVyc2U6IGJvb2xlYW5cbiAgcGF0Y2hEaXI6IHN0cmluZ1xuICBzaG91bGRFeGl0V2l0aEVycm9yOiBib29sZWFuXG59KTogdm9pZCB7XG4gIGNvbnN0IHBhdGNoZXNEaXJlY3RvcnkgPSBqb2luKGFwcFBhdGgsIHBhdGNoRGlyKVxuICBjb25zdCBmaWxlcyA9IGZpbmRQYXRjaEZpbGVzKHBhdGNoZXNEaXJlY3RvcnkpXG5cbiAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgIGNvbnNvbGUuZXJyb3IoY2hhbGsuYmx1ZUJyaWdodChcIk5vIHBhdGNoIGZpbGVzIGZvdW5kXCIpKVxuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgZXJyb3JzOiBzdHJpbmdbXSA9IFtdXG4gIGNvbnN0IHdhcm5pbmdzOiBzdHJpbmdbXSA9IFtdXG5cbiAgZm9yIChjb25zdCBmaWxlbmFtZSBvZiBmaWxlcykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwYWNrYWdlRGV0YWlscyA9IGdldFBhY2thZ2VEZXRhaWxzRnJvbVBhdGNoRmlsZW5hbWUoZmlsZW5hbWUpXG5cbiAgICAgIGlmICghcGFja2FnZURldGFpbHMpIHtcbiAgICAgICAgd2FybmluZ3MucHVzaChcbiAgICAgICAgICBgVW5yZWNvZ25pemVkIHBhdGNoIGZpbGUgaW4gcGF0Y2hlcyBkaXJlY3RvcnkgJHtmaWxlbmFtZX1gLFxuICAgICAgICApXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgdmVyc2lvbixcbiAgICAgICAgcGF0aCxcbiAgICAgICAgcGF0aFNwZWNpZmllcixcbiAgICAgICAgaXNEZXZPbmx5LFxuICAgICAgICBwYXRjaEZpbGVuYW1lLFxuICAgICAgfSA9IHBhY2thZ2VEZXRhaWxzXG5cbiAgICAgIGNvbnN0IGluc3RhbGxlZFBhY2thZ2VWZXJzaW9uID0gZ2V0SW5zdGFsbGVkUGFja2FnZVZlcnNpb24oe1xuICAgICAgICBhcHBQYXRoLFxuICAgICAgICBwYXRoLFxuICAgICAgICBwYXRoU3BlY2lmaWVyLFxuICAgICAgICBpc0Rldk9ubHk6XG4gICAgICAgICAgaXNEZXZPbmx5IHx8XG4gICAgICAgICAgLy8gY2hlY2sgZm9yIGRpcmVjdC1kZXBlbmRlbnRzIGluIHByb2RcbiAgICAgICAgICAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgICAgICBwYWNrYWdlSXNEZXZEZXBlbmRlbmN5KHsgYXBwUGF0aCwgcGFja2FnZURldGFpbHMgfSkpLFxuICAgICAgICBwYXRjaEZpbGVuYW1lLFxuICAgICAgfSlcbiAgICAgIGlmICghaW5zdGFsbGVkUGFja2FnZVZlcnNpb24pIHtcbiAgICAgICAgLy8gaXQncyBvayB3ZSdyZSBpbiBwcm9kdWN0aW9uIG1vZGUgYW5kIHRoaXMgaXMgYSBkZXYgb25seSBwYWNrYWdlXG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIGBTa2lwcGluZyBkZXYtb25seSAke2NoYWxrLmJvbGQoXG4gICAgICAgICAgICBwYXRoU3BlY2lmaWVyLFxuICAgICAgICAgICl9QCR7dmVyc2lvbn0gJHtjaGFsay5ibHVlKFwi4pyUXCIpfWAsXG4gICAgICAgIClcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBhcHBseVBhdGNoKHtcbiAgICAgICAgICBwYXRjaEZpbGVQYXRoOiByZXNvbHZlKHBhdGNoZXNEaXJlY3RvcnksIGZpbGVuYW1lKSBhcyBzdHJpbmcsXG4gICAgICAgICAgcmV2ZXJzZSxcbiAgICAgICAgICBwYWNrYWdlRGV0YWlscyxcbiAgICAgICAgICBwYXRjaERpcixcbiAgICAgICAgfSlcbiAgICAgICkge1xuICAgICAgICAvLyB5YXkgcGF0Y2ggd2FzIGFwcGxpZWQgc3VjY2Vzc2Z1bGx5XG4gICAgICAgIC8vIHByaW50IHdhcm5pbmcgaWYgdmVyc2lvbiBtaXNtYXRjaFxuICAgICAgICBpZiAoaW5zdGFsbGVkUGFja2FnZVZlcnNpb24gIT09IHZlcnNpb24pIHtcbiAgICAgICAgICB3YXJuaW5ncy5wdXNoKFxuICAgICAgICAgICAgY3JlYXRlVmVyc2lvbk1pc21hdGNoV2FybmluZyh7XG4gICAgICAgICAgICAgIHBhY2thZ2VOYW1lOiBuYW1lLFxuICAgICAgICAgICAgICBhY3R1YWxWZXJzaW9uOiBpbnN0YWxsZWRQYWNrYWdlVmVyc2lvbixcbiAgICAgICAgICAgICAgb3JpZ2luYWxWZXJzaW9uOiB2ZXJzaW9uLFxuICAgICAgICAgICAgICBwYXRoU3BlY2lmaWVyLFxuICAgICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIGAke2NoYWxrLmJvbGQocGF0aFNwZWNpZmllcil9QCR7dmVyc2lvbn0gJHtjaGFsay5ncmVlbihcIuKclFwiKX1gLFxuICAgICAgICApXG4gICAgICB9IGVsc2UgaWYgKGluc3RhbGxlZFBhY2thZ2VWZXJzaW9uID09PSB2ZXJzaW9uKSB7XG4gICAgICAgIC8vIGNvbXBsZXRlbHkgZmFpbGVkIHRvIGFwcGx5IHBhdGNoXG4gICAgICAgIC8vIFRPRE86IHByb3BhZ2F0ZSB1c2VmdWwgZXJyb3IgbWVzc2FnZXMgZnJvbSBwYXRjaCBhcHBsaWNhdGlvblxuICAgICAgICBlcnJvcnMucHVzaChcbiAgICAgICAgICBjcmVhdGVCcm9rZW5QYXRjaEZpbGVFcnJvcih7XG4gICAgICAgICAgICBwYWNrYWdlTmFtZTogbmFtZSxcbiAgICAgICAgICAgIHBhdGNoRmlsZU5hbWU6IGZpbGVuYW1lLFxuICAgICAgICAgICAgcGF0aFNwZWNpZmllcixcbiAgICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgfSksXG4gICAgICAgIClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9ycy5wdXNoKFxuICAgICAgICAgIGNyZWF0ZVBhdGNoQXBwbGljdGlvbkZhaWx1cmVFcnJvcih7XG4gICAgICAgICAgICBwYWNrYWdlTmFtZTogbmFtZSxcbiAgICAgICAgICAgIGFjdHVhbFZlcnNpb246IGluc3RhbGxlZFBhY2thZ2VWZXJzaW9uLFxuICAgICAgICAgICAgb3JpZ2luYWxWZXJzaW9uOiB2ZXJzaW9uLFxuICAgICAgICAgICAgcGF0Y2hGaWxlTmFtZTogZmlsZW5hbWUsXG4gICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgcGF0aFNwZWNpZmllcixcbiAgICAgICAgICB9KSxcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBQYXRjaEFwcGxpY2F0aW9uRXJyb3IpIHtcbiAgICAgICAgZXJyb3JzLnB1c2goZXJyb3IubWVzc2FnZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9ycy5wdXNoKGNyZWF0ZVVuZXhwZWN0ZWRFcnJvcih7IGZpbGVuYW1lLCBlcnJvciB9KSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKGNvbnN0IHdhcm5pbmcgb2Ygd2FybmluZ3MpIHtcbiAgICBjb25zb2xlLndhcm4od2FybmluZylcbiAgfVxuICBmb3IgKGNvbnN0IGVycm9yIG9mIGVycm9ycykge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gIH1cblxuICBjb25zdCBwcm9ibGVtc1N1bW1hcnkgPSBbXVxuICBpZiAod2FybmluZ3MubGVuZ3RoKSB7XG4gICAgcHJvYmxlbXNTdW1tYXJ5LnB1c2goY2hhbGsueWVsbG93KGAke3dhcm5pbmdzLmxlbmd0aH0gd2FybmluZyhzKWApKVxuICB9XG4gIGlmIChlcnJvcnMubGVuZ3RoKSB7XG4gICAgcHJvYmxlbXNTdW1tYXJ5LnB1c2goY2hhbGsucmVkKGAke2Vycm9ycy5sZW5ndGh9IGVycm9yKHMpYCkpXG4gIH1cblxuICBpZiAocHJvYmxlbXNTdW1tYXJ5Lmxlbmd0aCkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCItLS1cIilcbiAgICBjb25zb2xlLmVycm9yKFxuICAgICAgXCJwYXRjaC1wYWNrYWdlIGZpbmlzaGVkIHdpdGhcIixcbiAgICAgIHByb2JsZW1zU3VtbWFyeS5qb2luKFwiLCBcIikgKyBcIi5cIixcbiAgICApXG4gIH1cblxuICBpZiAoZXJyb3JzLmxlbmd0aCkge1xuICAgIHByb2Nlc3MuZXhpdChzaG91bGRFeGl0V2l0aEVycm9yID8gMSA6IDApXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5UGF0Y2goe1xuICBwYXRjaEZpbGVQYXRoLFxuICByZXZlcnNlLFxuICBwYWNrYWdlRGV0YWlscyxcbiAgcGF0Y2hEaXIsXG59OiB7XG4gIHBhdGNoRmlsZVBhdGg6IHN0cmluZ1xuICByZXZlcnNlOiBib29sZWFuXG4gIHBhY2thZ2VEZXRhaWxzOiBQYWNrYWdlRGV0YWlsc1xuICBwYXRjaERpcjogc3RyaW5nXG59KTogYm9vbGVhbiB7XG4gIGNvbnN0IHBhdGNoID0gcmVhZFBhdGNoKHsgcGF0Y2hGaWxlUGF0aCwgcGFja2FnZURldGFpbHMsIHBhdGNoRGlyIH0pXG4gIHRyeSB7XG4gICAgZXhlY3V0ZUVmZmVjdHMocmV2ZXJzZSA/IHJldmVyc2VQYXRjaChwYXRjaCkgOiBwYXRjaCwgeyBkcnlSdW46IGZhbHNlIH0pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0cnkge1xuICAgICAgZXhlY3V0ZUVmZmVjdHMocmV2ZXJzZSA/IHBhdGNoIDogcmV2ZXJzZVBhdGNoKHBhdGNoKSwgeyBkcnlSdW46IHRydWUgfSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBjcmVhdGVWZXJzaW9uTWlzbWF0Y2hXYXJuaW5nKHtcbiAgcGFja2FnZU5hbWUsXG4gIGFjdHVhbFZlcnNpb24sXG4gIG9yaWdpbmFsVmVyc2lvbixcbiAgcGF0aFNwZWNpZmllcixcbiAgcGF0aCxcbn06IHtcbiAgcGFja2FnZU5hbWU6IHN0cmluZ1xuICBhY3R1YWxWZXJzaW9uOiBzdHJpbmdcbiAgb3JpZ2luYWxWZXJzaW9uOiBzdHJpbmdcbiAgcGF0aFNwZWNpZmllcjogc3RyaW5nXG4gIHBhdGg6IHN0cmluZ1xufSkge1xuICByZXR1cm4gYFxuJHtjaGFsay55ZWxsb3coXCJXYXJuaW5nOlwiKX0gcGF0Y2gtcGFja2FnZSBkZXRlY3RlZCBhIHBhdGNoIGZpbGUgdmVyc2lvbiBtaXNtYXRjaFxuXG4gIERvbid0IHdvcnJ5ISBUaGlzIGlzIHByb2JhYmx5IGZpbmUuIFRoZSBwYXRjaCB3YXMgc3RpbGwgYXBwbGllZFxuICBzdWNjZXNzZnVsbHkuIEhlcmUncyB0aGUgZGVldHM6XG5cbiAgUGF0Y2ggZmlsZSBjcmVhdGVkIGZvclxuXG4gICAgJHtwYWNrYWdlTmFtZX1AJHtjaGFsay5ib2xkKG9yaWdpbmFsVmVyc2lvbil9XG5cbiAgYXBwbGllZCB0b1xuXG4gICAgJHtwYWNrYWdlTmFtZX1AJHtjaGFsay5ib2xkKGFjdHVhbFZlcnNpb24pfVxuICBcbiAgQXQgcGF0aFxuICBcbiAgICAke3BhdGh9XG5cbiAgVGhpcyB3YXJuaW5nIGlzIGp1c3QgdG8gZ2l2ZSB5b3UgYSBoZWFkcy11cC4gVGhlcmUgaXMgYSBzbWFsbCBjaGFuY2Ugb2ZcbiAgYnJlYWthZ2UgZXZlbiB0aG91Z2ggdGhlIHBhdGNoIHdhcyBhcHBsaWVkIHN1Y2Nlc3NmdWxseS4gTWFrZSBzdXJlIHRoZSBwYWNrYWdlXG4gIHN0aWxsIGJlaGF2ZXMgbGlrZSB5b3UgZXhwZWN0ICh5b3Ugd3JvdGUgdGVzdHMsIHJpZ2h0PykgYW5kIHRoZW4gcnVuXG5cbiAgICAke2NoYWxrLmJvbGQoYHBhdGNoLXBhY2thZ2UgJHtwYXRoU3BlY2lmaWVyfWApfVxuXG4gIHRvIHVwZGF0ZSB0aGUgdmVyc2lvbiBpbiB0aGUgcGF0Y2ggZmlsZSBuYW1lIGFuZCBtYWtlIHRoaXMgd2FybmluZyBnbyBhd2F5LlxuYFxufVxuXG5mdW5jdGlvbiBjcmVhdGVCcm9rZW5QYXRjaEZpbGVFcnJvcih7XG4gIHBhY2thZ2VOYW1lLFxuICBwYXRjaEZpbGVOYW1lLFxuICBwYXRoLFxuICBwYXRoU3BlY2lmaWVyLFxufToge1xuICBwYWNrYWdlTmFtZTogc3RyaW5nXG4gIHBhdGNoRmlsZU5hbWU6IHN0cmluZ1xuICBwYXRoOiBzdHJpbmdcbiAgcGF0aFNwZWNpZmllcjogc3RyaW5nXG59KSB7XG4gIHJldHVybiBgXG4ke2NoYWxrLnJlZC5ib2xkKFwiKipFUlJPUioqXCIpfSAke2NoYWxrLnJlZChcbiAgICBgRmFpbGVkIHRvIGFwcGx5IHBhdGNoIGZvciBwYWNrYWdlICR7Y2hhbGsuYm9sZChwYWNrYWdlTmFtZSl9IGF0IHBhdGhgLFxuICApfVxuICBcbiAgICAke3BhdGh9XG5cbiAgVGhpcyBlcnJvciB3YXMgY2F1c2VkIGJlY2F1c2UgcGF0Y2gtcGFja2FnZSBjYW5ub3QgYXBwbHkgdGhlIGZvbGxvd2luZyBwYXRjaCBmaWxlOlxuXG4gICAgcGF0Y2hlcy8ke3BhdGNoRmlsZU5hbWV9XG5cbiAgVHJ5IHJlbW92aW5nIG5vZGVfbW9kdWxlcyBhbmQgdHJ5aW5nIGFnYWluLiBJZiB0aGF0IGRvZXNuJ3Qgd29yaywgbWF5YmUgdGhlcmUgd2FzXG4gIGFuIGFjY2lkZW50YWwgY2hhbmdlIG1hZGUgdG8gdGhlIHBhdGNoIGZpbGU/IFRyeSByZWNyZWF0aW5nIGl0IGJ5IG1hbnVhbGx5XG4gIGVkaXRpbmcgdGhlIGFwcHJvcHJpYXRlIGZpbGVzIGFuZCBydW5uaW5nOlxuICBcbiAgICBwYXRjaC1wYWNrYWdlICR7cGF0aFNwZWNpZmllcn1cbiAgXG4gIElmIHRoYXQgZG9lc24ndCB3b3JrLCB0aGVuIGl0J3MgYSBidWcgaW4gcGF0Y2gtcGFja2FnZSwgc28gcGxlYXNlIHN1Ym1pdCBhIGJ1Z1xuICByZXBvcnQuIFRoYW5rcyFcblxuICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9kczMwMC9wYXRjaC1wYWNrYWdlL2lzc3Vlc1xuICAgIFxuYFxufVxuXG5mdW5jdGlvbiBjcmVhdGVQYXRjaEFwcGxpY3Rpb25GYWlsdXJlRXJyb3Ioe1xuICBwYWNrYWdlTmFtZSxcbiAgYWN0dWFsVmVyc2lvbixcbiAgb3JpZ2luYWxWZXJzaW9uLFxuICBwYXRjaEZpbGVOYW1lLFxuICBwYXRoLFxuICBwYXRoU3BlY2lmaWVyLFxufToge1xuICBwYWNrYWdlTmFtZTogc3RyaW5nXG4gIGFjdHVhbFZlcnNpb246IHN0cmluZ1xuICBvcmlnaW5hbFZlcnNpb246IHN0cmluZ1xuICBwYXRjaEZpbGVOYW1lOiBzdHJpbmdcbiAgcGF0aDogc3RyaW5nXG4gIHBhdGhTcGVjaWZpZXI6IHN0cmluZ1xufSkge1xuICByZXR1cm4gYFxuJHtjaGFsay5yZWQuYm9sZChcIioqRVJST1IqKlwiKX0gJHtjaGFsay5yZWQoXG4gICAgYEZhaWxlZCB0byBhcHBseSBwYXRjaCBmb3IgcGFja2FnZSAke2NoYWxrLmJvbGQocGFja2FnZU5hbWUpfSBhdCBwYXRoYCxcbiAgKX1cbiAgXG4gICAgJHtwYXRofVxuXG4gIFRoaXMgZXJyb3Igd2FzIGNhdXNlZCBiZWNhdXNlICR7Y2hhbGsuYm9sZChwYWNrYWdlTmFtZSl9IGhhcyBjaGFuZ2VkIHNpbmNlIHlvdVxuICBtYWRlIHRoZSBwYXRjaCBmaWxlIGZvciBpdC4gVGhpcyBpbnRyb2R1Y2VkIGNvbmZsaWN0cyB3aXRoIHlvdXIgcGF0Y2gsXG4gIGp1c3QgbGlrZSBhIG1lcmdlIGNvbmZsaWN0IGluIEdpdCB3aGVuIHNlcGFyYXRlIGluY29tcGF0aWJsZSBjaGFuZ2VzIGFyZVxuICBtYWRlIHRvIHRoZSBzYW1lIHBpZWNlIG9mIGNvZGUuXG5cbiAgTWF5YmUgdGhpcyBtZWFucyB5b3VyIHBhdGNoIGZpbGUgaXMgbm8gbG9uZ2VyIG5lY2Vzc2FyeSwgaW4gd2hpY2ggY2FzZVxuICBob29yYXkhIEp1c3QgZGVsZXRlIGl0IVxuXG4gIE90aGVyd2lzZSwgeW91IG5lZWQgdG8gZ2VuZXJhdGUgYSBuZXcgcGF0Y2ggZmlsZS5cblxuICBUbyBnZW5lcmF0ZSBhIG5ldyBvbmUsIGp1c3QgcmVwZWF0IHRoZSBzdGVwcyB5b3UgbWFkZSB0byBnZW5lcmF0ZSB0aGUgZmlyc3RcbiAgb25lLlxuXG4gIGkuZS4gbWFudWFsbHkgbWFrZSB0aGUgYXBwcm9wcmlhdGUgZmlsZSBjaGFuZ2VzLCB0aGVuIHJ1biBcblxuICAgIHBhdGNoLXBhY2thZ2UgJHtwYXRoU3BlY2lmaWVyfVxuXG4gIEluZm86XG4gICAgUGF0Y2ggZmlsZTogcGF0Y2hlcy8ke3BhdGNoRmlsZU5hbWV9XG4gICAgUGF0Y2ggd2FzIG1hZGUgZm9yIHZlcnNpb246ICR7Y2hhbGsuZ3JlZW4uYm9sZChvcmlnaW5hbFZlcnNpb24pfVxuICAgIEluc3RhbGxlZCB2ZXJzaW9uOiAke2NoYWxrLnJlZC5ib2xkKGFjdHVhbFZlcnNpb24pfVxuYFxufVxuXG5mdW5jdGlvbiBjcmVhdGVVbmV4cGVjdGVkRXJyb3Ioe1xuICBmaWxlbmFtZSxcbiAgZXJyb3IsXG59OiB7XG4gIGZpbGVuYW1lOiBzdHJpbmdcbiAgZXJyb3I6IEVycm9yXG59KSB7XG4gIHJldHVybiBgXG4ke2NoYWxrLnJlZC5ib2xkKFwiKipFUlJPUioqXCIpfSAke2NoYWxrLnJlZChcbiAgICBgRmFpbGVkIHRvIGFwcGx5IHBhdGNoIGZpbGUgJHtjaGFsay5ib2xkKGZpbGVuYW1lKX1gLFxuICApfVxuICBcbiR7ZXJyb3Iuc3RhY2t9XG5cbiAgYFxufVxuIl19