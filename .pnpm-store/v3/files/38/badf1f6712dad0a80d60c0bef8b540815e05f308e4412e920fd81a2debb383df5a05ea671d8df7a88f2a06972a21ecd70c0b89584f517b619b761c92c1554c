"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packageIsDevDependency_1 = require("./packageIsDevDependency");
const path_1 = require("./path");
const path_2 = require("path");
const PackageDetails_1 = require("./PackageDetails");
const fs_1 = require("fs");
const appPath = path_2.normalize(path_1.join(__dirname, "../"));
describe(packageIsDevDependency_1.packageIsDevDependency, () => {
    it("returns true if package is a dev dependency", () => {
        expect(packageIsDevDependency_1.packageIsDevDependency({
            appPath,
            packageDetails: PackageDetails_1.getPackageDetailsFromPatchFilename("typescript+3.0.1.patch"),
        })).toBe(true);
    });
    it("returns false if package is not a dev dependency", () => {
        expect(packageIsDevDependency_1.packageIsDevDependency({
            appPath,
            packageDetails: PackageDetails_1.getPackageDetailsFromPatchFilename("chalk+3.0.1.patch"),
        })).toBe(false);
    });
    it("returns false if package is a transitive dependency of a dev dependency", () => {
        expect(fs_1.existsSync(path_1.join(appPath, "node_modules/cosmiconfig"))).toBe(true);
        expect(packageIsDevDependency_1.packageIsDevDependency({
            appPath,
            packageDetails: PackageDetails_1.getPackageDetailsFromPatchFilename(
            // cosmiconfig is a transitive dep of lint-staged
            "cosmiconfig+3.0.1.patch"),
        })).toBe(false);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZUlzRGV2RGVwZW5kZW5jeS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3BhY2thZ2VJc0RldkRlcGVuZGVuY3kudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFFQUFpRTtBQUNqRSxpQ0FBNkI7QUFDN0IsK0JBQWdDO0FBQ2hDLHFEQUFxRTtBQUNyRSwyQkFBK0I7QUFFL0IsTUFBTSxPQUFPLEdBQUcsZ0JBQVMsQ0FBQyxXQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFFakQsUUFBUSxDQUFDLCtDQUFzQixFQUFFLEdBQUcsRUFBRTtJQUNwQyxFQUFFLENBQUMsNkNBQTZDLEVBQUUsR0FBRyxFQUFFO1FBQ3JELE1BQU0sQ0FDSiwrQ0FBc0IsQ0FBQztZQUNyQixPQUFPO1lBQ1AsY0FBYyxFQUFFLG1EQUFrQyxDQUNoRCx3QkFBd0IsQ0FDeEI7U0FDSCxDQUFDLENBQ0gsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDZCxDQUFDLENBQUMsQ0FBQTtJQUNGLEVBQUUsQ0FBQyxrREFBa0QsRUFBRSxHQUFHLEVBQUU7UUFDMUQsTUFBTSxDQUNKLCtDQUFzQixDQUFDO1lBQ3JCLE9BQU87WUFDUCxjQUFjLEVBQUUsbURBQWtDLENBQ2hELG1CQUFtQixDQUNuQjtTQUNILENBQUMsQ0FDSCxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNmLENBQUMsQ0FBQyxDQUFBO0lBQ0YsRUFBRSxDQUFDLHlFQUF5RSxFQUFFLEdBQUcsRUFBRTtRQUNqRixNQUFNLENBQUMsZUFBVSxDQUFDLFdBQUksQ0FBQyxPQUFPLEVBQUUsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3hFLE1BQU0sQ0FDSiwrQ0FBc0IsQ0FBQztZQUNyQixPQUFPO1lBQ1AsY0FBYyxFQUFFLG1EQUFrQztZQUNoRCxpREFBaUQ7WUFDakQseUJBQXlCLENBQ3pCO1NBQ0gsQ0FBQyxDQUNILENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2YsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBhY2thZ2VJc0RldkRlcGVuZGVuY3kgfSBmcm9tIFwiLi9wYWNrYWdlSXNEZXZEZXBlbmRlbmN5XCJcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwiLi9wYXRoXCJcbmltcG9ydCB7IG5vcm1hbGl6ZSB9IGZyb20gXCJwYXRoXCJcbmltcG9ydCB7IGdldFBhY2thZ2VEZXRhaWxzRnJvbVBhdGNoRmlsZW5hbWUgfSBmcm9tIFwiLi9QYWNrYWdlRGV0YWlsc1wiXG5pbXBvcnQgeyBleGlzdHNTeW5jIH0gZnJvbSBcImZzXCJcblxuY29uc3QgYXBwUGF0aCA9IG5vcm1hbGl6ZShqb2luKF9fZGlybmFtZSwgXCIuLi9cIikpXG5cbmRlc2NyaWJlKHBhY2thZ2VJc0RldkRlcGVuZGVuY3ksICgpID0+IHtcbiAgaXQoXCJyZXR1cm5zIHRydWUgaWYgcGFja2FnZSBpcyBhIGRldiBkZXBlbmRlbmN5XCIsICgpID0+IHtcbiAgICBleHBlY3QoXG4gICAgICBwYWNrYWdlSXNEZXZEZXBlbmRlbmN5KHtcbiAgICAgICAgYXBwUGF0aCxcbiAgICAgICAgcGFja2FnZURldGFpbHM6IGdldFBhY2thZ2VEZXRhaWxzRnJvbVBhdGNoRmlsZW5hbWUoXG4gICAgICAgICAgXCJ0eXBlc2NyaXB0KzMuMC4xLnBhdGNoXCIsXG4gICAgICAgICkhLFxuICAgICAgfSksXG4gICAgKS50b0JlKHRydWUpXG4gIH0pXG4gIGl0KFwicmV0dXJucyBmYWxzZSBpZiBwYWNrYWdlIGlzIG5vdCBhIGRldiBkZXBlbmRlbmN5XCIsICgpID0+IHtcbiAgICBleHBlY3QoXG4gICAgICBwYWNrYWdlSXNEZXZEZXBlbmRlbmN5KHtcbiAgICAgICAgYXBwUGF0aCxcbiAgICAgICAgcGFja2FnZURldGFpbHM6IGdldFBhY2thZ2VEZXRhaWxzRnJvbVBhdGNoRmlsZW5hbWUoXG4gICAgICAgICAgXCJjaGFsayszLjAuMS5wYXRjaFwiLFxuICAgICAgICApISxcbiAgICAgIH0pLFxuICAgICkudG9CZShmYWxzZSlcbiAgfSlcbiAgaXQoXCJyZXR1cm5zIGZhbHNlIGlmIHBhY2thZ2UgaXMgYSB0cmFuc2l0aXZlIGRlcGVuZGVuY3kgb2YgYSBkZXYgZGVwZW5kZW5jeVwiLCAoKSA9PiB7XG4gICAgZXhwZWN0KGV4aXN0c1N5bmMoam9pbihhcHBQYXRoLCBcIm5vZGVfbW9kdWxlcy9jb3NtaWNvbmZpZ1wiKSkpLnRvQmUodHJ1ZSlcbiAgICBleHBlY3QoXG4gICAgICBwYWNrYWdlSXNEZXZEZXBlbmRlbmN5KHtcbiAgICAgICAgYXBwUGF0aCxcbiAgICAgICAgcGFja2FnZURldGFpbHM6IGdldFBhY2thZ2VEZXRhaWxzRnJvbVBhdGNoRmlsZW5hbWUoXG4gICAgICAgICAgLy8gY29zbWljb25maWcgaXMgYSB0cmFuc2l0aXZlIGRlcCBvZiBsaW50LXN0YWdlZFxuICAgICAgICAgIFwiY29zbWljb25maWcrMy4wLjEucGF0Y2hcIixcbiAgICAgICAgKSEsXG4gICAgICB9KSxcbiAgICApLnRvQmUoZmFsc2UpXG4gIH0pXG59KVxuIl19