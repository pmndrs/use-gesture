"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageResolution = void 0;
const path_1 = require("./path");
const PackageDetails_1 = require("./PackageDetails");
const detectPackageManager_1 = require("./detectPackageManager");
const fs_extra_1 = require("fs-extra");
const lockfile_1 = require("@yarnpkg/lockfile");
const find_yarn_workspace_root_1 = __importDefault(require("find-yarn-workspace-root"));
const getPackageVersion_1 = require("./getPackageVersion");
function getPackageResolution({ packageDetails, packageManager, appPath, }) {
    if (packageManager === "yarn") {
        let lockFilePath = "yarn.lock";
        if (!fs_extra_1.existsSync(lockFilePath)) {
            const workspaceRoot = find_yarn_workspace_root_1.default();
            if (!workspaceRoot) {
                throw new Error("Can't find yarn.lock file");
            }
            lockFilePath = path_1.join(workspaceRoot, "yarn.lock");
        }
        if (!fs_extra_1.existsSync(lockFilePath)) {
            throw new Error("Can't find yarn.lock file");
        }
        const appLockFile = lockfile_1.parse(fs_extra_1.readFileSync(lockFilePath).toString());
        if (appLockFile.type !== "success") {
            throw new Error("Can't parse lock file");
        }
        const installedVersion = getPackageVersion_1.getPackageVersion(path_1.join(path_1.resolve(appPath, packageDetails.path), "package.json"));
        const entries = Object.entries(appLockFile.object).filter(([k, v]) => k.startsWith(packageDetails.name + "@") &&
            v.version === installedVersion);
        const resolutions = entries.map(([_, v]) => {
            return v.resolved;
        });
        if (resolutions.length === 0) {
            throw new Error(`Can't find lockfile entry for ${packageDetails.pathSpecifier}`);
        }
        if (new Set(resolutions).size !== 1) {
            console.warn(`Ambigious lockfile entries for ${packageDetails.pathSpecifier}. Using version ${installedVersion}`);
            return installedVersion;
        }
        if (resolutions[0]) {
            return resolutions[0];
        }
        const resolution = entries[0][0].slice(packageDetails.name.length + 1);
        // resolve relative file path
        if (resolution.startsWith("file:.")) {
            return `file:${path_1.resolve(appPath, resolution.slice("file:".length))}`;
        }
        return resolution;
    }
    else {
        const lockfile = require(path_1.join(appPath, packageManager === "npm-shrinkwrap"
            ? "npm-shrinkwrap.json"
            : "package-lock.json"));
        const lockFileStack = [lockfile];
        for (const name of packageDetails.packageNames.slice(0, -1)) {
            const child = lockFileStack[0].dependencies;
            if (child && name in child) {
                lockFileStack.push(child[name]);
            }
        }
        lockFileStack.reverse();
        const relevantStackEntry = lockFileStack.find((entry) => entry.dependencies && packageDetails.name in entry.dependencies);
        const pkg = relevantStackEntry.dependencies[packageDetails.name];
        return pkg.resolved || pkg.from || pkg.version;
    }
}
exports.getPackageResolution = getPackageResolution;
if (require.main === module) {
    const packageDetails = PackageDetails_1.getPatchDetailsFromCliString(process.argv[2]);
    if (!packageDetails) {
        console.error(`Can't find package ${process.argv[2]}`);
        process.exit(1);
        throw new Error();
    }
    console.log(getPackageResolution({
        appPath: process.cwd(),
        packageDetails,
        packageManager: detectPackageManager_1.detectPackageManager(process.cwd(), null),
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UGFja2FnZVJlc29sdXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZ2V0UGFja2FnZVJlc29sdXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUNBQXNDO0FBQ3RDLHFEQUErRTtBQUMvRSxpRUFBNkU7QUFDN0UsdUNBQW1EO0FBQ25ELGdEQUE4RDtBQUM5RCx3RkFBd0Q7QUFDeEQsMkRBQXVEO0FBRXZELFNBQWdCLG9CQUFvQixDQUFDLEVBQ25DLGNBQWMsRUFDZCxjQUFjLEVBQ2QsT0FBTyxHQUtSO0lBQ0MsSUFBSSxjQUFjLEtBQUssTUFBTSxFQUFFO1FBQzdCLElBQUksWUFBWSxHQUFHLFdBQVcsQ0FBQTtRQUM5QixJQUFJLENBQUMscUJBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUM3QixNQUFNLGFBQWEsR0FBRyxrQ0FBaUIsRUFBRSxDQUFBO1lBQ3pDLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQTthQUM3QztZQUNELFlBQVksR0FBRyxXQUFJLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFBO1NBQ2hEO1FBQ0QsSUFBSSxDQUFDLHFCQUFVLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO1NBQzdDO1FBQ0QsTUFBTSxXQUFXLEdBQUcsZ0JBQWlCLENBQUMsdUJBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBQzVFLElBQUksV0FBVyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO1NBQ3pDO1FBRUQsTUFBTSxnQkFBZ0IsR0FBRyxxQ0FBaUIsQ0FDeEMsV0FBSSxDQUFDLGNBQU8sQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLElBQUksQ0FB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QyxJQUFJLEtBQUssTUFBTSxFQUFFO0lBQzNCLE1BQU0sY0FBYyxHQUFHLDZDQUE0QixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNwRSxJQUFJLENBQUMsY0FBYyxFQUFFO1FBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3RELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDZixNQUFNLElBQUksS0FBSyxFQUFFLENBQUE7S0FDbEI7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUNULG9CQUFvQixDQUFDO1FBQ25CLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFO1FBQ3RCLGNBQWM7UUFDZCxjQUFjLEVBQUUsMkNBQW9CLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQztLQUMxRCxDQUFDLENBQ0gsQ0FBQTtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgam9pbiwgcmVzb2x2ZSB9IGZyb20gXCIuL3BhdGhcIlxuaW1wb3J0IHsgUGFja2FnZURldGFpbHMsIGdldFBhdGNoRGV0YWlsc0Zyb21DbGlTdHJpbmcgfSBmcm9tIFwiLi9QYWNrYWdlRGV0YWlsc1wiXG5pbXBvcnQgeyBQYWNrYWdlTWFuYWdlciwgZGV0ZWN0UGFja2FnZU1hbmFnZXIgfSBmcm9tIFwiLi9kZXRlY3RQYWNrYWdlTWFuYWdlclwiXG5pbXBvcnQgeyByZWFkRmlsZVN5bmMsIGV4aXN0c1N5bmMgfSBmcm9tIFwiZnMtZXh0cmFcIlxuaW1wb3J0IHsgcGFyc2UgYXMgcGFyc2VZYXJuTG9ja0ZpbGUgfSBmcm9tIFwiQHlhcm5wa2cvbG9ja2ZpbGVcIlxuaW1wb3J0IGZpbmRXb3Jrc3BhY2VSb290IGZyb20gXCJmaW5kLXlhcm4td29ya3NwYWNlLXJvb3RcIlxuaW1wb3J0IHsgZ2V0UGFja2FnZVZlcnNpb24gfSBmcm9tIFwiLi9nZXRQYWNrYWdlVmVyc2lvblwiXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYWNrYWdlUmVzb2x1dGlvbih7XG4gIHBhY2thZ2VEZXRhaWxzLFxuICBwYWNrYWdlTWFuYWdlcixcbiAgYXBwUGF0aCxcbn06IHtcbiAgcGFja2FnZURldGFpbHM6IFBhY2thZ2VEZXRhaWxzXG4gIHBhY2thZ2VNYW5hZ2VyOiBQYWNrYWdlTWFuYWdlclxuICBhcHBQYXRoOiBzdHJpbmdcbn0pIHtcbiAgaWYgKHBhY2thZ2VNYW5hZ2VyID09PSBcInlhcm5cIikge1xuICAgIGxldCBsb2NrRmlsZVBhdGggPSBcInlhcm4ubG9ja1wiXG4gICAgaWYgKCFleGlzdHNTeW5jKGxvY2tGaWxlUGF0aCkpIHtcbiAgICAgIGNvbnN0IHdvcmtzcGFjZVJvb3QgPSBmaW5kV29ya3NwYWNlUm9vdCgpXG4gICAgICBpZiAoIXdvcmtzcGFjZVJvb3QpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgZmluZCB5YXJuLmxvY2sgZmlsZVwiKVxuICAgICAgfVxuICAgICAgbG9ja0ZpbGVQYXRoID0gam9pbih3b3Jrc3BhY2VSb290LCBcInlhcm4ubG9ja1wiKVxuICAgIH1cbiAgICBpZiAoIWV4aXN0c1N5bmMobG9ja0ZpbGVQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgZmluZCB5YXJuLmxvY2sgZmlsZVwiKVxuICAgIH1cbiAgICBjb25zdCBhcHBMb2NrRmlsZSA9IHBhcnNlWWFybkxvY2tGaWxlKHJlYWRGaWxlU3luYyhsb2NrRmlsZVBhdGgpLnRvU3RyaW5nKCkpXG4gICAgaWYgKGFwcExvY2tGaWxlLnR5cGUgIT09IFwic3VjY2Vzc1wiKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBwYXJzZSBsb2NrIGZpbGVcIilcbiAgICB9XG5cbiAgICBjb25zdCBpbnN0YWxsZWRWZXJzaW9uID0gZ2V0UGFja2FnZVZlcnNpb24oXG4gICAgICBqb2luKHJlc29sdmUoYXBwUGF0aCwgcGFja2FnZURldGFpbHMucGF0aCksIFwicGFja2FnZS5qc29uXCIpLFxuICAgIClcblxuICAgIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhhcHBMb2NrRmlsZS5vYmplY3QpLmZpbHRlcihcbiAgICAgIChbaywgdl0pID0+XG4gICAgICAgIGsuc3RhcnRzV2l0aChwYWNrYWdlRGV0YWlscy5uYW1lICsgXCJAXCIpICYmXG4gICAgICAgIHYudmVyc2lvbiA9PT0gaW5zdGFsbGVkVmVyc2lvbixcbiAgICApXG5cbiAgICBjb25zdCByZXNvbHV0aW9ucyA9IGVudHJpZXMubWFwKChbXywgdl0pID0+IHtcbiAgICAgIHJldHVybiB2LnJlc29sdmVkXG4gICAgfSlcblxuICAgIGlmIChyZXNvbHV0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYENhbid0IGZpbmQgbG9ja2ZpbGUgZW50cnkgZm9yICR7cGFja2FnZURldGFpbHMucGF0aFNwZWNpZmllcn1gLFxuICAgICAgKVxuICAgIH1cblxuICAgIGlmIChuZXcgU2V0KHJlc29sdXRpb25zKS5zaXplICE9PSAxKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBBbWJpZ2lvdXMgbG9ja2ZpbGUgZW50cmllcyBmb3IgJHtwYWNrYWdlRGV0YWlscy5wYXRoU3BlY2lmaWVyfS4gVXNpbmcgdmVyc2lvbiAke2luc3RhbGxlZFZlcnNpb259YCxcbiAgICAgIClcbiAgICAgIHJldHVybiBpbnN0YWxsZWRWZXJzaW9uXG4gICAgfVxuXG4gICAgaWYgKHJlc29sdXRpb25zWzBdKSB7XG4gICAgICByZXR1cm4gcmVzb2x1dGlvbnNbMF1cbiAgICB9XG5cbiAgICBjb25zdCByZXNvbHV0aW9uID0gZW50cmllc1swXVswXS5zbGljZShwYWNrYWdlRGV0YWlscy5uYW1lLmxlbmd0aCArIDEpXG5cbiAgICAvLyByZXNvbHZlIHJlbGF0aXZlIGZpbGUgcGF0aFxuICAgIGlmIChyZXNvbHV0aW9uLnN0YXJ0c1dpdGgoXCJmaWxlOi5cIikpIHtcbiAgICAgIHJldHVybiBgZmlsZToke3Jlc29sdmUoYXBwUGF0aCwgcmVzb2x1dGlvbi5zbGljZShcImZpbGU6XCIubGVuZ3RoKSl9YFxuICAgIH1cblxuICAgIHJldHVybiByZXNvbHV0aW9uXG4gIH0gZWxzZSB7XG4gICAgY29uc3QgbG9ja2ZpbGUgPSByZXF1aXJlKGpvaW4oXG4gICAgICBhcHBQYXRoLFxuICAgICAgcGFja2FnZU1hbmFnZXIgPT09IFwibnBtLXNocmlua3dyYXBcIlxuICAgICAgICA/IFwibnBtLXNocmlua3dyYXAuanNvblwiXG4gICAgICAgIDogXCJwYWNrYWdlLWxvY2suanNvblwiLFxuICAgICkpXG4gICAgY29uc3QgbG9ja0ZpbGVTdGFjayA9IFtsb2NrZmlsZV1cbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgcGFja2FnZURldGFpbHMucGFja2FnZU5hbWVzLnNsaWNlKDAsIC0xKSkge1xuICAgICAgY29uc3QgY2hpbGQgPSBsb2NrRmlsZVN0YWNrWzBdLmRlcGVuZGVuY2llc1xuICAgICAgaWYgKGNoaWxkICYmIG5hbWUgaW4gY2hpbGQpIHtcbiAgICAgICAgbG9ja0ZpbGVTdGFjay5wdXNoKGNoaWxkW25hbWVdKVxuICAgICAgfVxuICAgIH1cbiAgICBsb2NrRmlsZVN0YWNrLnJldmVyc2UoKVxuICAgIGNvbnN0IHJlbGV2YW50U3RhY2tFbnRyeSA9IGxvY2tGaWxlU3RhY2suZmluZChcbiAgICAgIChlbnRyeSkgPT5cbiAgICAgICAgZW50cnkuZGVwZW5kZW5jaWVzICYmIHBhY2thZ2VEZXRhaWxzLm5hbWUgaW4gZW50cnkuZGVwZW5kZW5jaWVzLFxuICAgIClcbiAgICBjb25zdCBwa2cgPSByZWxldmFudFN0YWNrRW50cnkuZGVwZW5kZW5jaWVzW3BhY2thZ2VEZXRhaWxzLm5hbWVdXG4gICAgcmV0dXJuIHBrZy5yZXNvbHZlZCB8fCBwa2cuZnJvbSB8fCBwa2cudmVyc2lvblxuICB9XG59XG5cbmlmIChyZXF1aXJlLm1haW4gPT09IG1vZHVsZSkge1xuICBjb25zdCBwYWNrYWdlRGV0YWlscyA9IGdldFBhdGNoRGV0YWlsc0Zyb21DbGlTdHJpbmcocHJvY2Vzcy5hcmd2WzJdKVxuICBpZiAoIXBhY2thZ2VEZXRhaWxzKSB7XG4gICAgY29uc29sZS5lcnJvcihgQ2FuJ3QgZmluZCBwYWNrYWdlICR7cHJvY2Vzcy5hcmd2WzJdfWApXG4gICAgcHJvY2Vzcy5leGl0KDEpXG4gICAgdGhyb3cgbmV3IEVycm9yKClcbiAgfVxuICBjb25zb2xlLmxvZyhcbiAgICBnZXRQYWNrYWdlUmVzb2x1dGlvbih7XG4gICAgICBhcHBQYXRoOiBwcm9jZXNzLmN3ZCgpLFxuICAgICAgcGFja2FnZURldGFpbHMsXG4gICAgICBwYWNrYWdlTWFuYWdlcjogZGV0ZWN0UGFja2FnZU1hbmFnZXIocHJvY2Vzcy5jd2QoKSwgbnVsbCksXG4gICAgfSksXG4gIClcbn1cbiJdfQ==