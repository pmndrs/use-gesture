"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePatch = void 0;
const chalk_1 = __importDefault(require("chalk"));
const path_1 = require("./path");
const spawnSafe_1 = require("./spawnSafe");
const filterFiles_1 = require("./filterFiles");
const fs_extra_1 = require("fs-extra");
const rimraf_1 = require("rimraf");
const fs_extra_2 = require("fs-extra");
const tmp_1 = require("tmp");
const patchFs_1 = require("./patchFs");
const PackageDetails_1 = require("./PackageDetails");
const resolveRelativeFileDependencies_1 = require("./resolveRelativeFileDependencies");
const getPackageResolution_1 = require("./getPackageResolution");
const parse_1 = require("./patch/parse");
const zlib_1 = require("zlib");
const getPackageVersion_1 = require("./getPackageVersion");
const createIssue_1 = require("./createIssue");
function printNoPackageFoundError(packageName, packageJsonPath) {
    console.error(`No such package ${packageName}

  File not found: ${packageJsonPath}`);
}
function makePatch({ packagePathSpecifier, appPath, packageManager, includePaths, excludePaths, patchDir, createIssue, }) {
    const packageDetails = PackageDetails_1.getPatchDetailsFromCliString(packagePathSpecifier);
    if (!packageDetails) {
        console.error("No such package", packagePathSpecifier);
        return;
    }
    const appPackageJson = require(path_1.join(appPath, "package.json"));
    const packagePath = path_1.join(appPath, packageDetails.path);
    const packageJsonPath = path_1.join(packagePath, "package.json");
    if (!fs_extra_1.existsSync(packageJsonPath)) {
        printNoPackageFoundError(packagePathSpecifier, packageJsonPath);
        process.exit(1);
    }
    const tmpRepo = tmp_1.dirSync({ unsafeCleanup: true });
    const tmpRepoPackagePath = path_1.join(tmpRepo.name, packageDetails.path);
    const tmpRepoNpmRoot = tmpRepoPackagePath.slice(0, -`/node_modules/${packageDetails.name}`.length);
    const tmpRepoPackageJsonPath = path_1.join(tmpRepoNpmRoot, "package.json");
    try {
        const patchesDir = path_1.resolve(path_1.join(appPath, patchDir));
        console.info(chalk_1.default.grey("•"), "Creating temporary folder");
        // make a blank package.json
        fs_extra_1.mkdirpSync(tmpRepoNpmRoot);
        fs_extra_1.writeFileSync(tmpRepoPackageJsonPath, JSON.stringify({
            dependencies: {
                [packageDetails.name]: getPackageResolution_1.getPackageResolution({
                    packageDetails,
                    packageManager,
                    appPath,
                }),
            },
            resolutions: resolveRelativeFileDependencies_1.resolveRelativeFileDependencies(appPath, appPackageJson.resolutions || {}),
        }));
        const packageVersion = getPackageVersion_1.getPackageVersion(path_1.join(path_1.resolve(packageDetails.path), "package.json"));
        [".npmrc", ".yarnrc"].forEach((rcFile) => {
            const rcPath = path_1.join(appPath, rcFile);
            if (fs_extra_1.existsSync(rcPath)) {
                fs_extra_2.copySync(rcPath, path_1.join(tmpRepo.name, rcFile));
            }
        });
        if (packageManager === "yarn") {
            console.info(chalk_1.default.grey("•"), `Installing ${packageDetails.name}@${packageVersion} with yarn`);
            try {
                // try first without ignoring scripts in case they are required
                // this works in 99.99% of cases
                spawnSafe_1.spawnSafeSync(`yarn`, ["install", "--ignore-engines"], {
                    cwd: tmpRepoNpmRoot,
                    logStdErrOnError: false,
                });
            }
            catch (e) {
                // try again while ignoring scripts in case the script depends on
                // an implicit context which we havn't reproduced
                spawnSafe_1.spawnSafeSync(`yarn`, ["install", "--ignore-engines", "--ignore-scripts"], {
                    cwd: tmpRepoNpmRoot,
                });
            }
        }
        else {
            console.info(chalk_1.default.grey("•"), `Installing ${packageDetails.name}@${packageVersion} with npm`);
            try {
                // try first without ignoring scripts in case they are required
                // this works in 99.99% of cases
                spawnSafe_1.spawnSafeSync(`npm`, ["i", "--force"], {
                    cwd: tmpRepoNpmRoot,
                    logStdErrOnError: false,
                    stdio: "ignore",
                });
            }
            catch (e) {
                // try again while ignoring scripts in case the script depends on
                // an implicit context which we havn't reproduced
                spawnSafe_1.spawnSafeSync(`npm`, ["i", "--ignore-scripts", "--force"], {
                    cwd: tmpRepoNpmRoot,
                    stdio: "ignore",
                });
            }
        }
        const git = (...args) => spawnSafe_1.spawnSafeSync("git", args, {
            cwd: tmpRepo.name,
            env: Object.assign(Object.assign({}, process.env), { HOME: tmpRepo.name }),
            maxBuffer: 1024 * 1024 * 100,
        });
        // remove nested node_modules just to be safe
        rimraf_1.sync(path_1.join(tmpRepoPackagePath, "node_modules"));
        // remove .git just to be safe
        rimraf_1.sync(path_1.join(tmpRepoPackagePath, ".git"));
        // commit the package
        console.info(chalk_1.default.grey("•"), "Diffing your files with clean files");
        fs_extra_1.writeFileSync(path_1.join(tmpRepo.name, ".gitignore"), "!/node_modules\n\n");
        git("init");
        git("config", "--local", "user.name", "patch-package");
        git("config", "--local", "user.email", "patch@pack.age");
        // remove ignored files first
        filterFiles_1.removeIgnoredFiles(tmpRepoPackagePath, includePaths, excludePaths);
        git("add", "-f", packageDetails.path);
        git("commit", "--allow-empty", "-m", "init");
        // replace package with user's version
        rimraf_1.sync(tmpRepoPackagePath);
        // pnpm installs packages as symlinks, copySync would copy only the symlink
        fs_extra_2.copySync(fs_extra_1.realpathSync(packagePath), tmpRepoPackagePath);
        // remove nested node_modules just to be safe
        rimraf_1.sync(path_1.join(tmpRepoPackagePath, "node_modules"));
        // remove .git just to be safe
        rimraf_1.sync(path_1.join(tmpRepoPackagePath, ".git"));
        // also remove ignored files like before
        filterFiles_1.removeIgnoredFiles(tmpRepoPackagePath, includePaths, excludePaths);
        // stage all files
        git("add", "-f", packageDetails.path);
        // get diff of changes
        const diffResult = git("diff", "--cached", "--no-color", "--ignore-space-at-eol", "--no-ext-diff");
        if (diffResult.stdout.length === 0) {
            console.warn(`⁉️  Not creating patch file for package '${packagePathSpecifier}'`);
            console.warn(`⁉️  There don't appear to be any changes.`);
            process.exit(1);
            return;
        }
        try {
            parse_1.parsePatchFile(diffResult.stdout.toString());
        }
        catch (e) {
            if (e.message.includes("Unexpected file mode string: 120000")) {
                console.error(`
⛔️ ${chalk_1.default.red.bold("ERROR")}

  Your changes involve creating symlinks. patch-package does not yet support
  symlinks.
  
  ️Please use ${chalk_1.default.bold("--include")} and/or ${chalk_1.default.bold("--exclude")} to narrow the scope of your patch if
  this was unintentional.
`);
            }
            else {
                const outPath = "./patch-package-error.json.gz";
                fs_extra_1.writeFileSync(outPath, zlib_1.gzipSync(JSON.stringify({
                    error: { message: e.message, stack: e.stack },
                    patch: diffResult.stdout.toString(),
                })));
                console.error(`
⛔️ ${chalk_1.default.red.bold("ERROR")}
        
  patch-package was unable to read the patch-file made by git. This should not
  happen.
  
  A diagnostic file was written to
  
    ${outPath}
  
  Please attach it to a github issue
  
    https://github.com/ds300/patch-package/issues/new?title=New+patch+parse+failed&body=Please+attach+the+diagnostic+file+by+dragging+it+into+here+🙏
  
  Note that this diagnostic file will contain code from the package you were
  attempting to patch.

`);
            }
            process.exit(1);
            return;
        }
        // maybe delete existing
        patchFs_1.getPatchFiles(patchDir).forEach((filename) => {
            const deets = PackageDetails_1.getPackageDetailsFromPatchFilename(filename);
            if (deets && deets.path === packageDetails.path) {
                fs_extra_1.unlinkSync(path_1.join(patchDir, filename));
            }
        });
        const patchFileName = createPatchFileName({
            packageDetails,
            packageVersion,
        });
        const patchPath = path_1.join(patchesDir, patchFileName);
        if (!fs_extra_1.existsSync(path_1.dirname(patchPath))) {
            // scoped package
            fs_extra_1.mkdirSync(path_1.dirname(patchPath));
        }
        fs_extra_1.writeFileSync(patchPath, diffResult.stdout);
        console.log(`${chalk_1.default.green("✔")} Created file ${path_1.join(patchDir, patchFileName)}\n`);
        if (createIssue) {
            createIssue_1.openIssueCreationLink({
                packageDetails,
                patchFileContents: diffResult.stdout.toString(),
                packageVersion,
            });
        }
        else {
            createIssue_1.maybePrintIssueCreationPrompt(packageDetails, packageManager);
        }
    }
    catch (e) {
        console.error(e);
        throw e;
    }
    finally {
        tmpRepo.removeCallback();
    }
}
exports.makePatch = makePatch;
function createPatchFileName({ packageDetails, packageVersion, }) {
    const packageNames = packageDetails.packageNames
        .map((name) => name.replace(/\//g, "+"))
        .join("++");
    return `${packageNames}+${packageVersion}.patch`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFrZVBhdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21ha2VQYXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBeUI7QUFDekIsaUNBQStDO0FBQy9DLDJDQUEyQztBQUUzQywrQ0FBa0Q7QUFDbEQsdUNBT2lCO0FBQ2pCLG1DQUF1QztBQUN2Qyx1Q0FBbUM7QUFDbkMsNkJBQTZCO0FBQzdCLHVDQUF5QztBQUN6QyxxREFJeUI7QUFDekIsdUZBQW1GO0FBQ25GLGlFQUE2RDtBQUM3RCx5Q0FBOEM7QUFDOUMsK0JBQStCO0FBQy9CLDJEQUF1RDtBQUN2RCwrQ0FHc0I7QUFFdEIsU0FBUyx3QkFBd0IsQ0FDL0IsV0FBbUIsRUFDbkIsZUFBdUI7SUFFdkIsT0FBTyxDQUFDLEtBQUssQ0FDWCxtQkFBbUIsV0FBVzs7b0JBRWQsZUFBZSxFQUFFLENBQ2xDLENBQUE7QUFDSCxDQUFDO0FBRUQsU0FBZ0IsU0FBUyxDQUFDLEVBQ3hCLG9CQUFvQixFQUNwQixPQUFPLEVBQ1AsY0FBYyxFQUNkLFlBQVksRUFDWixZQUFZLEVBQ1osUUFBUSxFQUNSLFdBQVcsR0FTWjtJQUNDLE1BQU0sY0FBYyxHQUFHLDZDQUE0QixDQUFDLG9CQUFvQixDQUFDLENBQUE7SUFFekUsSUFBSSxDQUFDLGNBQWMsRUFBRTtRQUNuQixPQUFPLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLG9CQUFvQixDQUFDLENBQUE7UUFDdEQsT0FBTTtLQUNQO0lBQ0QsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLFdBQUksQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQTtJQUM3RCxNQUFNLFdBQVcsR0FBRyxXQUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN0RCxNQUFNLGVBQWUsR0FBRyxXQUFJLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFBO0lBRXpELElBQUksQ0FBQyxxQkFBVSxD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SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDaEIsTUFBTSxDQUFDLENBQUE7S0FDUjtZQUFTO1FBQ1IsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFBO0tBQ3pCO0FBQ0gsQ0FBQztBQWhSRCw4QkFnUkM7QUFFRCxTQUFTLG1CQUFtQixDQUFDLEVBQzNCLGNBQWMsRUFDZCxjQUFjLEdBSWY7SUFDQyxNQUFNLFlBQVksR0FBRyxjQUFjLENBQUMsWUFBWTtTQUM3QyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUViLE9BQU8sR0FBRyxZQUFZLElBQUksY0FBYyxRQUFRLENBQUE7QUFDbEQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFsayBmcm9tIFwiY2hhbGtcIlxuaW1wb3J0IHsgam9pbiwgZGlybmFtZSwgcmVzb2x2ZSB9IGZyb20gXCIuL3BhdGhcIlxuaW1wb3J0IHsgc3Bhd25TYWZlU3luYyB9IGZyb20gXCIuL3NwYXduU2FmZVwiXG5pbXBvcnQgeyBQYWNrYWdlTWFuYWdlciB9IGZyb20gXCIuL2RldGVjdFBhY2thZ2VNYW5hZ2VyXCJcbmltcG9ydCB7IHJlbW92ZUlnbm9yZWRGaWxlcyB9IGZyb20gXCIuL2ZpbHRlckZpbGVzXCJcbmltcG9ydCB7XG4gIHdyaXRlRmlsZVN5bmMsXG4gIGV4aXN0c1N5bmMsXG4gIG1rZGlyU3luYyxcbiAgdW5saW5rU3luYyxcbiAgbWtkaXJwU3luYyxcbiAgcmVhbHBhdGhTeW5jLFxufSBmcm9tIFwiZnMtZXh0cmFcIlxuaW1wb3J0IHsgc3luYyBhcyByaW1yYWYgfSBmcm9tIFwicmltcmFmXCJcbmltcG9ydCB7IGNvcHlTeW5jIH0gZnJvbSBcImZzLWV4dHJhXCJcbmltcG9ydCB7IGRpclN5bmMgfSBmcm9tIFwidG1wXCJcbmltcG9ydCB7IGdldFBhdGNoRmlsZXMgfSBmcm9tIFwiLi9wYXRjaEZzXCJcbmltcG9ydCB7XG4gIGdldFBhdGNoRGV0YWlsc0Zyb21DbGlTdHJpbmcsXG4gIGdldFBhY2thZ2VEZXRhaWxzRnJvbVBhdGNoRmlsZW5hbWUsXG4gIFBhY2thZ2VEZXRhaWxzLFxufSBmcm9tIFwiLi9QYWNrYWdlRGV0YWlsc1wiXG5pbXBvcnQgeyByZXNvbHZlUmVsYXRpdmVGaWxlRGVwZW5kZW5jaWVzIH0gZnJvbSBcIi4vcmVzb2x2ZVJlbGF0aXZlRmlsZURlcGVuZGVuY2llc1wiXG5pbXBvcnQgeyBnZXRQYWNrYWdlUmVzb2x1dGlvbiB9IGZyb20gXCIuL2dldFBhY2thZ2VSZXNvbHV0aW9uXCJcbmltcG9ydCB7IHBhcnNlUGF0Y2hGaWxlIH0gZnJvbSBcIi4vcGF0Y2gvcGFyc2VcIlxuaW1wb3J0IHsgZ3ppcFN5bmMgfSBmcm9tIFwiemxpYlwiXG5pbXBvcnQgeyBnZXRQYWNrYWdlVmVyc2lvbiB9IGZyb20gXCIuL2dldFBhY2thZ2VWZXJzaW9uXCJcbmltcG9ydCB7XG4gIG1heWJlUHJpbnRJc3N1ZUNyZWF0aW9uUHJvbXB0LFxuICBvcGVuSXNzdWVDcmVhdGlvbkxpbmssXG59IGZyb20gXCIuL2NyZWF0ZUlzc3VlXCJcblxuZnVuY3Rpb24gcHJpbnROb1BhY2thZ2VGb3VuZEVycm9yKFxuICBwYWNrYWdlTmFtZTogc3RyaW5nLFxuICBwYWNrYWdlSnNvblBhdGg6IHN0cmluZyxcbikge1xuICBjb25zb2xlLmVycm9yKFxuICAgIGBObyBzdWNoIHBhY2thZ2UgJHtwYWNrYWdlTmFtZX1cblxuICBGaWxlIG5vdCBmb3VuZDogJHtwYWNrYWdlSnNvblBhdGh9YCxcbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZVBhdGNoKHtcbiAgcGFja2FnZVBhdGhTcGVjaWZpZXIsXG4gIGFwcFBhdGgsXG4gIHBhY2thZ2VNYW5hZ2VyLFxuICBpbmNsdWRlUGF0aHMsXG4gIGV4Y2x1ZGVQYXRocyxcbiAgcGF0Y2hEaXIsXG4gIGNyZWF0ZUlzc3VlLFxufToge1xuICBwYWNrYWdlUGF0aFNwZWNpZmllcjogc3RyaW5nXG4gIGFwcFBhdGg6IHN0cmluZ1xuICBwYWNrYWdlTWFuYWdlcjogUGFja2FnZU1hbmFnZXJcbiAgaW5jbHVkZVBhdGhzOiBSZWdFeHBcbiAgZXhjbHVkZVBhdGhzOiBSZWdFeHBcbiAgcGF0Y2hEaXI6IHN0cmluZ1xuICBjcmVhdGVJc3N1ZTogYm9vbGVhblxufSkge1xuICBjb25zdCBwYWNrYWdlRGV0YWlscyA9IGdldFBhdGNoRGV0YWlsc0Zyb21DbGlTdHJpbmcocGFja2FnZVBhdGhTcGVjaWZpZXIpXG5cbiAgaWYgKCFwYWNrYWdlRGV0YWlscykge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJObyBzdWNoIHBhY2thZ2VcIiwgcGFja2FnZVBhdGhTcGVjaWZpZXIpXG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3QgYXBwUGFja2FnZUpzb24gPSByZXF1aXJlKGpvaW4oYXBwUGF0aCwgXCJwYWNrYWdlLmpzb25cIikpXG4gIGNvbnN0IHBhY2thZ2VQYXRoID0gam9pbihhcHBQYXRoLCBwYWNrYWdlRGV0YWlscy5wYXRoKVxuICBjb25zdCBwYWNrYWdlSnNvblBhdGggPSBqb2luKHBhY2thZ2VQYXRoLCBcInBhY2thZ2UuanNvblwiKVxuXG4gIGlmICghZXhpc3RzU3luYyhwYWNrYWdlSnNvblBhdGgpKSB7XG4gICAgcHJpbnROb1BhY2thZ2VGb3VuZEVycm9yKHBhY2thZ2VQYXRoU3BlY2lmaWVyLCBwYWNrYWdlSnNvblBhdGgpXG4gICAgcHJvY2Vzcy5leGl0KDEpXG4gIH1cblxuICBjb25zdCB0bXBSZXBvID0gZGlyU3luYyh7IHVuc2FmZUNsZWFudXA6IHRydWUgfSlcbiAgY29uc3QgdG1wUmVwb1BhY2thZ2VQYXRoID0gam9pbih0bXBSZXBvLm5hbWUsIHBhY2thZ2VEZXRhaWxzLnBhdGgpXG4gIGNvbnN0IHRtcFJlcG9OcG1Sb290ID0gdG1wUmVwb1BhY2thZ2VQYXRoLnNsaWNlKFxuICAgIDAsXG4gICAgLWAvbm9kZV9tb2R1bGVzLyR7cGFja2FnZURldGFpbHMubmFtZX1gLmxlbmd0aCxcbiAgKVxuXG4gIGNvbnN0IHRtcFJlcG9QYWNrYWdlSnNvblBhdGggPSBqb2luKHRtcFJlcG9OcG1Sb290LCBcInBhY2thZ2UuanNvblwiKVxuXG4gIHRyeSB7XG4gICAgY29uc3QgcGF0Y2hlc0RpciA9IHJlc29sdmUoam9pbihhcHBQYXRoLCBwYXRjaERpcikpXG5cbiAgICBjb25zb2xlLmluZm8oY2hhbGsuZ3JleShcIuKAolwiKSwgXCJDcmVhdGluZyB0ZW1wb3JhcnkgZm9sZGVyXCIpXG5cbiAgICAvLyBtYWtlIGEgYmxhbmsgcGFja2FnZS5qc29uXG4gICAgbWtkaXJwU3luYyh0bXBSZXBvTnBtUm9vdClcbiAgICB3cml0ZUZpbGVTeW5jKFxuICAgICAgdG1wUmVwb1BhY2thZ2VKc29uUGF0aCxcbiAgICAgIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgZGVwZW5kZW5jaWVzOiB7XG4gICAgICAgICAgW3BhY2thZ2VEZXRhaWxzLm5hbWVdOiBnZXRQYWNrYWdlUmVzb2x1dGlvbih7XG4gICAgICAgICAgICBwYWNrYWdlRGV0YWlscyxcbiAgICAgICAgICAgIHBhY2thZ2VNYW5hZ2VyLFxuICAgICAgICAgICAgYXBwUGF0aCxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSxcbiAgICAgICAgcmVzb2x1dGlvbnM6IHJlc29sdmVSZWxhdGl2ZUZpbGVEZXBlbmRlbmNpZXMoXG4gICAgICAgICAgYXBwUGF0aCxcbiAgICAgICAgICBhcHBQYWNrYWdlSnNvbi5yZXNvbHV0aW9ucyB8fCB7fSxcbiAgICAgICAgKSxcbiAgICAgIH0pLFxuICAgIClcblxuICAgIGNvbnN0IHBhY2thZ2VWZXJzaW9uID0gZ2V0UGFja2FnZVZlcnNpb24oXG4gICAgICBqb2luKHJlc29sdmUocGFja2FnZURldGFpbHMucGF0aCksIFwicGFja2FnZS5qc29uXCIpLFxuICAgIClcblxuICAgIC8vIGNvcHkgLm5wbXJjLy55YXJucmMgaW4gY2FzZSBwYWNrYWdlcyBhcmUgaG9zdGVkIGluIHByaXZhdGUgcmVnaXN0cnlcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6YWxpZ25cbiAgICA7W1wiLm5wbXJjXCIsIFwiLnlhcm5yY1wiXS5mb3JFYWNoKChyY0ZpbGUpID0+IHtcbiAgICAgIGNvbnN0IHJjUGF0aCA9IGpvaW4oYXBwUGF0aCwgcmNGaWxlKVxuICAgICAgaWYgKGV4aXN0c1N5bmMocmNQYXRoKSkge1xuICAgICAgICBjb3B5U3luYyhyY1BhdGgsIGpvaW4odG1wUmVwby5uYW1lLCByY0ZpbGUpKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBpZiAocGFja2FnZU1hbmFnZXIgPT09IFwieWFyblwiKSB7XG4gICAgICBjb25zb2xlLmluZm8oXG4gICAgICAgIGNoYWxrLmdyZXkoXCLigKJcIiksXG4gICAgICAgIGBJbnN0YWxsaW5nICR7cGFja2FnZURldGFpbHMubmFtZX1AJHtwYWNrYWdlVmVyc2lvbn0gd2l0aCB5YXJuYCxcbiAgICAgIClcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIHRyeSBmaXJzdCB3aXRob3V0IGlnbm9yaW5nIHNjcmlwdHMgaW4gY2FzZSB0aGV5IGFyZSByZXF1aXJlZFxuICAgICAgICAvLyB0aGlzIHdvcmtzIGluIDk5Ljk5JSBvZiBjYXNlc1xuICAgICAgICBzcGF3blNhZmVTeW5jKGB5YXJuYCwgW1wiaW5zdGFsbFwiLCBcIi0taWdub3JlLWVuZ2luZXNcIl0sIHtcbiAgICAgICAgICBjd2Q6IHRtcFJlcG9OcG1Sb290LFxuICAgICAgICAgIGxvZ1N0ZEVyck9uRXJyb3I6IGZhbHNlLFxuICAgICAgICB9KVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyB0cnkgYWdhaW4gd2hpbGUgaWdub3Jpbmcgc2NyaXB0cyBpbiBjYXNlIHRoZSBzY3JpcHQgZGVwZW5kcyBvblxuICAgICAgICAvLyBhbiBpbXBsaWNpdCBjb250ZXh0IHdoaWNoIHdlIGhhdm4ndCByZXByb2R1Y2VkXG4gICAgICAgIHNwYXduU2FmZVN5bmMoXG4gICAgICAgICAgYHlhcm5gLFxuICAgICAgICAgIFtcImluc3RhbGxcIiwgXCItLWlnbm9yZS1lbmdpbmVzXCIsIFwiLS1pZ25vcmUtc2NyaXB0c1wiXSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjd2Q6IHRtcFJlcG9OcG1Sb290LFxuICAgICAgICAgIH0sXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5pbmZvKFxuICAgICAgICBjaGFsay5ncmV5KFwi4oCiXCIpLFxuICAgICAgICBgSW5zdGFsbGluZyAke3BhY2thZ2VEZXRhaWxzLm5hbWV9QCR7cGFja2FnZVZlcnNpb259IHdpdGggbnBtYCxcbiAgICAgIClcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIHRyeSBmaXJzdCB3aXRob3V0IGlnbm9yaW5nIHNjcmlwdHMgaW4gY2FzZSB0aGV5IGFyZSByZXF1aXJlZFxuICAgICAgICAvLyB0aGlzIHdvcmtzIGluIDk5Ljk5JSBvZiBjYXNlc1xuICAgICAgICBzcGF3blNhZmVTeW5jKGBucG1gLCBbXCJpXCIsIFwiLS1mb3JjZVwiXSwge1xuICAgICAgICAgIGN3ZDogdG1wUmVwb05wbVJvb3QsXG4gICAgICAgICAgbG9nU3RkRXJyT25FcnJvcjogZmFsc2UsXG4gICAgICAgICAgc3RkaW86IFwiaWdub3JlXCIsXG4gICAgICAgIH0pXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIHRyeSBhZ2FpbiB3aGlsZSBpZ25vcmluZyBzY3JpcHRzIGluIGNhc2UgdGhlIHNjcmlwdCBkZXBlbmRzIG9uXG4gICAgICAgIC8vIGFuIGltcGxpY2l0IGNvbnRleHQgd2hpY2ggd2UgaGF2bid0IHJlcHJvZHVjZWRcbiAgICAgICAgc3Bhd25TYWZlU3luYyhgbnBtYCwgW1wiaVwiLCBcIi0taWdub3JlLXNjcmlwdHNcIiwgXCItLWZvcmNlXCJdLCB7XG4gICAgICAgICAgY3dkOiB0bXBSZXBvTnBtUm9vdCxcbiAgICAgICAgICBzdGRpbzogXCJpZ25vcmVcIixcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBnaXQgPSAoLi4uYXJnczogc3RyaW5nW10pID0+XG4gICAgICBzcGF3blNhZmVTeW5jKFwiZ2l0XCIsIGFyZ3MsIHtcbiAgICAgICAgY3dkOiB0bXBSZXBvLm5hbWUsXG4gICAgICAgIGVudjogeyAuLi5wcm9jZXNzLmVudiwgSE9NRTogdG1wUmVwby5uYW1lIH0sXG4gICAgICAgIG1heEJ1ZmZlcjogMTAyNCAqIDEwMjQgKiAxMDAsXG4gICAgICB9KVxuXG4gICAgLy8gcmVtb3ZlIG5lc3RlZCBub2RlX21vZHVsZXMganVzdCB0byBiZSBzYWZlXG4gICAgcmltcmFmKGpvaW4odG1wUmVwb1BhY2thZ2VQYXRoLCBcIm5vZGVfbW9kdWxlc1wiKSlcbiAgICAvLyByZW1vdmUgLmdpdCBqdXN0IHRvIGJlIHNhZmVcbiAgICByaW1yYWYoam9pbih0bXBSZXBvUGFja2FnZVBhdGgsIFwiLmdpdFwiKSlcblxuICAgIC8vIGNvbW1pdCB0aGUgcGFja2FnZVxuICAgIGNvbnNvbGUuaW5mbyhjaGFsay5ncmV5KFwi4oCiXCIpLCBcIkRpZmZpbmcgeW91ciBmaWxlcyB3aXRoIGNsZWFuIGZpbGVzXCIpXG4gICAgd3JpdGVGaWxlU3luYyhqb2luKHRtcFJlcG8ubmFtZSwgXCIuZ2l0aWdub3JlXCIpLCBcIiEvbm9kZV9tb2R1bGVzXFxuXFxuXCIpXG4gICAgZ2l0KFwiaW5pdFwiKVxuICAgIGdpdChcImNvbmZpZ1wiLCBcIi0tbG9jYWxcIiwgXCJ1c2VyLm5hbWVcIiwgXCJwYXRjaC1wYWNrYWdlXCIpXG4gICAgZ2l0KFwiY29uZmlnXCIsIFwiLS1sb2NhbFwiLCBcInVzZXIuZW1haWxcIiwgXCJwYXRjaEBwYWNrLmFnZVwiKVxuXG4gICAgLy8gcmVtb3ZlIGlnbm9yZWQgZmlsZXMgZmlyc3RcbiAgICByZW1vdmVJZ25vcmVkRmlsZXModG1wUmVwb1BhY2thZ2VQYXRoLCBpbmNsdWRlUGF0aHMsIGV4Y2x1ZGVQYXRocylcblxuICAgIGdpdChcImFkZFwiLCBcIi1mXCIsIHBhY2thZ2VEZXRhaWxzLnBhdGgpXG4gICAgZ2l0KFwiY29tbWl0XCIsIFwiLS1hbGxvdy1lbXB0eVwiLCBcIi1tXCIsIFwiaW5pdFwiKVxuXG4gICAgLy8gcmVwbGFjZSBwYWNrYWdlIHdpdGggdXNlcidzIHZlcnNpb25cbiAgICByaW1yYWYodG1wUmVwb1BhY2thZ2VQYXRoKVxuXG4gICAgLy8gcG5wbSBpbnN0YWxscyBwYWNrYWdlcyBhcyBzeW1saW5rcywgY29weVN5bmMgd291bGQgY29weSBvbmx5IHRoZSBzeW1saW5rXG4gICAgY29weVN5bmMocmVhbHBhdGhTeW5jKHBhY2thZ2VQYXRoKSwgdG1wUmVwb1BhY2thZ2VQYXRoKVxuXG4gICAgLy8gcmVtb3ZlIG5lc3RlZCBub2RlX21vZHVsZXMganVzdCB0byBiZSBzYWZlXG4gICAgcmltcmFmKGpvaW4odG1wUmVwb1BhY2thZ2VQYXRoLCBcIm5vZGVfbW9kdWxlc1wiKSlcbiAgICAvLyByZW1vdmUgLmdpdCBqdXN0IHRvIGJlIHNhZmVcbiAgICByaW1yYWYoam9pbih0bXBSZXBvUGFja2FnZVBhdGgsIFwiLmdpdFwiKSlcblxuICAgIC8vIGFsc28gcmVtb3ZlIGlnbm9yZWQgZmlsZXMgbGlrZSBiZWZvcmVcbiAgICByZW1vdmVJZ25vcmVkRmlsZXModG1wUmVwb1BhY2thZ2VQYXRoLCBpbmNsdWRlUGF0aHMsIGV4Y2x1ZGVQYXRocylcblxuICAgIC8vIHN0YWdlIGFsbCBmaWxlc1xuICAgIGdpdChcImFkZFwiLCBcIi1mXCIsIHBhY2thZ2VEZXRhaWxzLnBhdGgpXG5cbiAgICAvLyBnZXQgZGlmZiBvZiBjaGFuZ2VzXG4gICAgY29uc3QgZGlmZlJlc3VsdCA9IGdpdChcbiAgICAgIFwiZGlmZlwiLFxuICAgICAgXCItLWNhY2hlZFwiLFxuICAgICAgXCItLW5vLWNvbG9yXCIsXG4gICAgICBcIi0taWdub3JlLXNwYWNlLWF0LWVvbFwiLFxuICAgICAgXCItLW5vLWV4dC1kaWZmXCIsXG4gICAgKVxuXG4gICAgaWYgKGRpZmZSZXN1bHQuc3Rkb3V0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBg4oGJ77iPICBOb3QgY3JlYXRpbmcgcGF0Y2ggZmlsZSBmb3IgcGFja2FnZSAnJHtwYWNrYWdlUGF0aFNwZWNpZmllcn0nYCxcbiAgICAgIClcbiAgICAgIGNvbnNvbGUud2Fybihg4oGJ77iPICBUaGVyZSBkb24ndCBhcHBlYXIgdG8gYmUgYW55IGNoYW5nZXMuYClcbiAgICAgIHByb2Nlc3MuZXhpdCgxKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHBhcnNlUGF0Y2hGaWxlKGRpZmZSZXN1bHQuc3Rkb3V0LnRvU3RyaW5nKCkpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKFxuICAgICAgICAoZSBhcyBFcnJvcikubWVzc2FnZS5pbmNsdWRlcyhcIlVuZXhwZWN0ZWQgZmlsZSBtb2RlIHN0cmluZzogMTIwMDAwXCIpXG4gICAgICApIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgXG7im5TvuI8gJHtjaGFsay5yZWQuYm9sZChcIkVSUk9SXCIpfVxuXG4gIFlvdXIgY2hhbmdlcyBpbnZvbHZlIGNyZWF0aW5nIHN5bWxpbmtzLiBwYXRjaC1wYWNrYWdlIGRvZXMgbm90IHlldCBzdXBwb3J0XG4gIHN5bWxpbmtzLlxuICBcbiAg77iPUGxlYXNlIHVzZSAke2NoYWxrLmJvbGQoXCItLWluY2x1ZGVcIil9IGFuZC9vciAke2NoYWxrLmJvbGQoXG4gICAgICAgICAgXCItLWV4Y2x1ZGVcIixcbiAgICAgICAgKX0gdG8gbmFycm93IHRoZSBzY29wZSBvZiB5b3VyIHBhdGNoIGlmXG4gIHRoaXMgd2FzIHVuaW50ZW50aW9uYWwuXG5gKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgb3V0UGF0aCA9IFwiLi9wYXRjaC1wYWNrYWdlLWVycm9yLmpzb24uZ3pcIlxuICAgICAgICB3cml0ZUZpbGVTeW5jKFxuICAgICAgICAgIG91dFBhdGgsXG4gICAgICAgICAgZ3ppcFN5bmMoXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgIGVycm9yOiB7IG1lc3NhZ2U6IGUubWVzc2FnZSwgc3RhY2s6IGUuc3RhY2sgfSxcbiAgICAgICAgICAgICAgcGF0Y2g6IGRpZmZSZXN1bHQuc3Rkb3V0LnRvU3RyaW5nKCksXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICApLFxuICAgICAgICApXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFxu4puU77iPICR7Y2hhbGsucmVkLmJvbGQoXCJFUlJPUlwiKX1cbiAgICAgICAgXG4gIHBhdGNoLXBhY2thZ2Ugd2FzIHVuYWJsZSB0byByZWFkIHRoZSBwYXRjaC1maWxlIG1hZGUgYnkgZ2l0LiBUaGlzIHNob3VsZCBub3RcbiAgaGFwcGVuLlxuICBcbiAgQSBkaWFnbm9zdGljIGZpbGUgd2FzIHdyaXR0ZW4gdG9cbiAgXG4gICAgJHtvdXRQYXRofVxuICBcbiAgUGxlYXNlIGF0dGFjaCBpdCB0byBhIGdpdGh1YiBpc3N1ZVxuICBcbiAgICBodHRwczovL2dpdGh1Yi5jb20vZHMzMDAvcGF0Y2gtcGFja2FnZS9pc3N1ZXMvbmV3P3RpdGxlPU5ldytwYXRjaCtwYXJzZStmYWlsZWQmYm9keT1QbGVhc2UrYXR0YWNoK3RoZStkaWFnbm9zdGljK2ZpbGUrYnkrZHJhZ2dpbmcraXQraW50bytoZXJlK/CfmY9cbiAgXG4gIE5vdGUgdGhhdCB0aGlzIGRpYWdub3N0aWMgZmlsZSB3aWxsIGNvbnRhaW4gY29kZSBmcm9tIHRoZSBwYWNrYWdlIHlvdSB3ZXJlXG4gIGF0dGVtcHRpbmcgdG8gcGF0Y2guXG5cbmApXG4gICAgICB9XG4gICAgICBwcm9jZXNzLmV4aXQoMSlcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIG1heWJlIGRlbGV0ZSBleGlzdGluZ1xuICAgIGdldFBhdGNoRmlsZXMocGF0Y2hEaXIpLmZvckVhY2goKGZpbGVuYW1lKSA9PiB7XG4gICAgICBjb25zdCBkZWV0cyA9IGdldFBhY2thZ2VEZXRhaWxzRnJvbVBhdGNoRmlsZW5hbWUoZmlsZW5hbWUpXG4gICAgICBpZiAoZGVldHMgJiYgZGVldHMucGF0aCA9PT0gcGFja2FnZURldGFpbHMucGF0aCkge1xuICAgICAgICB1bmxpbmtTeW5jKGpvaW4ocGF0Y2hEaXIsIGZpbGVuYW1lKSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgcGF0Y2hGaWxlTmFtZSA9IGNyZWF0ZVBhdGNoRmlsZU5hbWUoe1xuICAgICAgcGFja2FnZURldGFpbHMsXG4gICAgICBwYWNrYWdlVmVyc2lvbixcbiAgICB9KVxuXG4gICAgY29uc3QgcGF0Y2hQYXRoID0gam9pbihwYXRjaGVzRGlyLCBwYXRjaEZpbGVOYW1lKVxuICAgIGlmICghZXhpc3RzU3luYyhkaXJuYW1lKHBhdGNoUGF0aCkpKSB7XG4gICAgICAvLyBzY29wZWQgcGFja2FnZVxuICAgICAgbWtkaXJTeW5jKGRpcm5hbWUocGF0Y2hQYXRoKSlcbiAgICB9XG4gICAgd3JpdGVGaWxlU3luYyhwYXRjaFBhdGgsIGRpZmZSZXN1bHQuc3Rkb3V0KVxuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYCR7Y2hhbGsuZ3JlZW4oXCLinJRcIil9IENyZWF0ZWQgZmlsZSAke2pvaW4ocGF0Y2hEaXIsIHBhdGNoRmlsZU5hbWUpfVxcbmAsXG4gICAgKVxuICAgIGlmIChjcmVhdGVJc3N1ZSkge1xuICAgICAgb3Blbklzc3VlQ3JlYXRpb25MaW5rKHtcbiAgICAgICAgcGFja2FnZURldGFpbHMsXG4gICAgICAgIHBhdGNoRmlsZUNvbnRlbnRzOiBkaWZmUmVzdWx0LnN0ZG91dC50b1N0cmluZygpLFxuICAgICAgICBwYWNrYWdlVmVyc2lvbixcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIG1heWJlUHJpbnRJc3N1ZUNyZWF0aW9uUHJvbXB0KHBhY2thZ2VEZXRhaWxzLCBwYWNrYWdlTWFuYWdlcilcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgdGhyb3cgZVxuICB9IGZpbmFsbHkge1xuICAgIHRtcFJlcG8ucmVtb3ZlQ2FsbGJhY2soKVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBhdGNoRmlsZU5hbWUoe1xuICBwYWNrYWdlRGV0YWlscyxcbiAgcGFja2FnZVZlcnNpb24sXG59OiB7XG4gIHBhY2thZ2VEZXRhaWxzOiBQYWNrYWdlRGV0YWlsc1xuICBwYWNrYWdlVmVyc2lvbjogc3RyaW5nXG59KSB7XG4gIGNvbnN0IHBhY2thZ2VOYW1lcyA9IHBhY2thZ2VEZXRhaWxzLnBhY2thZ2VOYW1lc1xuICAgIC5tYXAoKG5hbWUpID0+IG5hbWUucmVwbGFjZSgvXFwvL2csIFwiK1wiKSlcbiAgICAuam9pbihcIisrXCIpXG5cbiAgcmV0dXJuIGAke3BhY2thZ2VOYW1lc30rJHtwYWNrYWdlVmVyc2lvbn0ucGF0Y2hgXG59XG4iXX0=