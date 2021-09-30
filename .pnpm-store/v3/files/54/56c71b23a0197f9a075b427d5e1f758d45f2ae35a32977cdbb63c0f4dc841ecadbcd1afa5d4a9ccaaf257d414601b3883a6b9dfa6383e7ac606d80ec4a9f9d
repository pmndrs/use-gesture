"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PackageDetails_1 = require("./PackageDetails");
describe("getPackageDetailsFromPatchFilename", () => {
    it("parses old-style patch filenames", () => {
        expect(PackageDetails_1.getPackageDetailsFromPatchFilename("@types/banana:3.4.2-beta.2.patch")).toMatchInlineSnapshot(`
Object {
  "humanReadablePathSpecifier": "@types/banana",
  "isDevOnly": false,
  "isNested": false,
  "name": "@types/banana",
  "packageNames": Array [
    "@types/banana",
  ],
  "patchFilename": "@types/banana:3.4.2-beta.2.patch",
  "path": "node_modules/@types/banana",
  "pathSpecifier": "@types/banana",
  "version": "3.4.2-beta.2",
}
`);
        expect(PackageDetails_1.getPackageDetailsFromPatchFilename("banana:0.4.2.patch"))
            .toMatchInlineSnapshot(`
Object {
  "humanReadablePathSpecifier": "banana",
  "isDevOnly": false,
  "isNested": false,
  "name": "banana",
  "packageNames": Array [
    "banana",
  ],
  "patchFilename": "banana:0.4.2.patch",
  "path": "node_modules/banana",
  "pathSpecifier": "banana",
  "version": "0.4.2",
}
`);
        expect(PackageDetails_1.getPackageDetailsFromPatchFilename("banana+0.4.2.patch"))
            .toMatchInlineSnapshot(`
Object {
  "humanReadablePathSpecifier": "banana",
  "isDevOnly": false,
  "isNested": false,
  "name": "banana",
  "packageNames": Array [
    "banana",
  ],
  "patchFilename": "banana+0.4.2.patch",
  "path": "node_modules/banana",
  "pathSpecifier": "banana",
  "version": "0.4.2",
}
`);
        expect(PackageDetails_1.getPackageDetailsFromPatchFilename("banana-0.4.2.patch")).toBe(null);
        expect(PackageDetails_1.getPackageDetailsFromPatchFilename("@types+banana-0.4.2.patch")).toBe(null);
        expect(PackageDetails_1.getPackageDetailsFromPatchFilename("banana+0.4.2.dev.patch"))
            .toMatchInlineSnapshot(`
Object {
  "humanReadablePathSpecifier": "banana",
  "isDevOnly": true,
  "isNested": false,
  "name": "banana",
  "packageNames": Array [
    "banana",
  ],
  "patchFilename": "banana+0.4.2.dev.patch",
  "path": "node_modules/banana",
  "pathSpecifier": "banana",
  "version": "0.4.2",
}
`);
    });
    it("parses new-style patch filenames", () => {
        expect(PackageDetails_1.getPackageDetailsFromPatchFilename("banana++apple+0.4.2.patch"))
            .toMatchInlineSnapshot(`
Object {
  "humanReadablePathSpecifier": "banana => apple",
  "isDevOnly": false,
  "isNested": true,
  "name": "apple",
  "packageNames": Array [
    "banana",
    "apple",
  ],
  "patchFilename": "banana++apple+0.4.2.patch",
  "path": "node_modules/banana/node_modules/apple",
  "pathSpecifier": "banana/apple",
  "version": "0.4.2",
}
`);
        expect(PackageDetails_1.getPackageDetailsFromPatchFilename("@types+banana++@types+apple++@mollusc+man+0.4.2-banana-tree.patch")).toMatchInlineSnapshot(`
Object {
  "humanReadablePathSpecifier": "@types/banana => @types/apple => @mollusc/man",
  "isDevOnly": false,
  "isNested": true,
  "name": "@mollusc/man",
  "packageNames": Array [
    "@types/banana",
    "@types/apple",
    "@mollusc/man",
  ],
  "patchFilename": "@types+banana++@types+apple++@mollusc+man+0.4.2-banana-tree.patch",
  "path": "node_modules/@types/banana/node_modules/@types/apple/node_modules/@mollusc/man",
  "pathSpecifier": "@types/banana/@types/apple/@mollusc/man",
  "version": "0.4.2-banana-tree",
}
`);
        expect(PackageDetails_1.getPackageDetailsFromPatchFilename("@types+banana.patch++hello+0.4.2-banana-tree.patch")).toMatchInlineSnapshot(`
Object {
  "humanReadablePathSpecifier": "@types/banana.patch => hello",
  "isDevOnly": false,
  "isNested": true,
  "name": "hello",
  "packageNames": Array [
    "@types/banana.patch",
    "hello",
  ],
  "patchFilename": "@types+banana.patch++hello+0.4.2-banana-tree.patch",
  "path": "node_modules/@types/banana.patch/node_modules/hello",
  "pathSpecifier": "@types/banana.patch/hello",
  "version": "0.4.2-banana-tree",
}
`);
        expect(PackageDetails_1.getPackageDetailsFromPatchFilename("@types+banana.patch++hello+0.4.2-banana-tree.dev.patch")).toMatchInlineSnapshot(`
Object {
  "humanReadablePathSpecifier": "@types/banana.patch => hello",
  "isDevOnly": true,
  "isNested": true,
  "name": "hello",
  "packageNames": Array [
    "@types/banana.patch",
    "hello",
  ],
  "patchFilename": "@types+banana.patch++hello+0.4.2-banana-tree.dev.patch",
  "path": "node_modules/@types/banana.patch/node_modules/hello",
  "pathSpecifier": "@types/banana.patch/hello",
  "version": "0.4.2-banana-tree",
}
`);
    });
});
describe("getPatchDetailsFromCliString", () => {
    it("handles a minimal package name", () => {
        expect(PackageDetails_1.getPatchDetailsFromCliString("patch-package")).toMatchInlineSnapshot(`
Object {
  "humanReadablePathSpecifier": "patch-package",
  "isNested": false,
  "name": "patch-package",
  "packageNames": Array [
    "patch-package",
  ],
  "path": "node_modules/patch-package",
  "pathSpecifier": "patch-package",
}
`);
    });
    it("handles a scoped package name", () => {
        expect(PackageDetails_1.getPatchDetailsFromCliString("@david/patch-package")).toMatchInlineSnapshot(`
Object {
  "humanReadablePathSpecifier": "@david/patch-package",
  "isNested": false,
  "name": "@david/patch-package",
  "packageNames": Array [
    "@david/patch-package",
  ],
  "path": "node_modules/@david/patch-package",
  "pathSpecifier": "@david/patch-package",
}
`);
    });
    it("handles a nested package name", () => {
        expect(PackageDetails_1.getPatchDetailsFromCliString("david/patch-package")).toMatchInlineSnapshot(`
Object {
  "humanReadablePathSpecifier": "david => patch-package",
  "isNested": true,
  "name": "patch-package",
  "packageNames": Array [
    "david",
    "patch-package",
  ],
  "path": "node_modules/david/node_modules/patch-package",
  "pathSpecifier": "david/patch-package",
}
`);
    });
    it("handles a nested package name with scopes", () => {
        expect(PackageDetails_1.getPatchDetailsFromCliString("@david/patch-package/banana")).toMatchInlineSnapshot(`
Object {
  "humanReadablePathSpecifier": "@david/patch-package => banana",
  "isNested": true,
  "name": "banana",
  "packageNames": Array [
    "@david/patch-package",
    "banana",
  ],
  "path": "node_modules/@david/patch-package/node_modules/banana",
  "pathSpecifier": "@david/patch-package/banana",
}
`);
        expect(PackageDetails_1.getPatchDetailsFromCliString("@david/patch-package/@david/banana")).toMatchInlineSnapshot(`
Object {
  "humanReadablePathSpecifier": "@david/patch-package => @david/banana",
  "isNested": true,
  "name": "@david/banana",
  "packageNames": Array [
    "@david/patch-package",
    "@david/banana",
  ],
  "path": "node_modules/@david/patch-package/node_modules/@david/banana",
  "pathSpecifier": "@david/patch-package/@david/banana",
}
`);
        expect(PackageDetails_1.getPatchDetailsFromCliString("david/patch-package/@david/banana")).toMatchInlineSnapshot(`
Object {
  "humanReadablePathSpecifier": "david => patch-package => @david/banana",
  "isNested": true,
  "name": "@david/banana",
  "packageNames": Array [
    "david",
    "patch-package",
    "@david/banana",
  ],
  "path": "node_modules/david/node_modules/patch-package/node_modules/@david/banana",
  "pathSpecifier": "david/patch-package/@david/banana",
}
`);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFja2FnZURldGFpbHMudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9QYWNrYWdlRGV0YWlscy50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBR3lCO0FBRXpCLFFBQVEsQ0FBQyxvQ0FBb0MsRUFBRSxHQUFHLEVBQUU7SUFDbEQsRUFBRSxDQUFDLGtDQUFrQyxFQUFFLEdBQUcsRUFBRTtRQUMxQyxNQUFNLENBQ0osbURBQWtDLENBQUMsa0NBQWtDLENBQUMsQ0FDdkUsQ0FBQyxxQkFBcUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Q0FjM0IsQ0FBQyxDQUFBO1FBRUUsTUFBTSxDQUFDLG1EQUFrQyxDQUFDLG9CQUFvQixDQUFDLENBQUM7YUFDN0QscUJBQXFCLENBQUM7Ozs7Ozs7Ozs7Ozs7O0NBYzVCLENBQUMsQ0FBQTtRQUVFLE1BQU0sQ0FBQyxtREFBa0MsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2FBQzdELHFCQUFxQixDQUFDOzs7Ozs7Ozs7Ozs7OztDQWM1QixDQUFDLENBQUE7UUFFRSxNQUFNLENBQUMsbURBQWtDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUUzRSxNQUFNLENBQ0osbURBQWtDLENBQUMsMkJBQTJCLENBQUMsQ0FDaEUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFFWixNQUFNLENBQUMsbURBQWtDLENBQUMsd0JBQXdCLENBQUMsQ0FBQzthQUNqRSxxQkFBcUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Q0FjNUIsQ0FBQyxDQUFBO0lBQ0EsQ0FBQyxDQUFDLENBQUE7SUFFRixFQUFFLENBQUMsa0NBQWtDLEVBQUUsR0FBRyxFQUFFO1FBQzFDLE1BQU0sQ0FBQyxtREFBa0MsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2FBQ3BFLHFCQUFxQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Q0FlNUIsQ0FBQyxDQUFBO1FBRUUsTUFBTSxDQUNKLG1EQUFrQyxDQUNoQyxtRUFBbUUsQ0FDcEUsQ0FDRixDQUFDLHFCQUFxQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0NBZ0IzQixDQUFDLENBQUE7UUFFRSxNQUFNLENBQ0osbURBQWtDLENBQ2hDLG9EQUFvRCxDQUNyRCxDQUNGLENBQUMscUJBQXFCLENBQUM7Ozs7Ozs7Ozs7Ozs7OztDQWUzQixDQUFDLENBQUE7UUFFRSxNQUFNLENBQ0osbURBQWtDLENBQ2hDLHdEQUF3RCxDQUN6RCxDQUNGLENBQUMscUJBQXFCLENBQUM7Ozs7Ozs7Ozs7Ozs7OztDQWUzQixDQUFDLENBQUE7SUFDQSxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBO0FBRUYsUUFBUSxDQUFDLDhCQUE4QixFQUFFLEdBQUcsRUFBRTtJQUM1QyxFQUFFLENBQUMsZ0NBQWdDLEVBQUUsR0FBRyxFQUFFO1FBQ3hDLE1BQU0sQ0FBQyw2Q0FBNEIsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUN6RTs7Ozs7Ozs7Ozs7Q0FXTCxDQUNJLENBQUE7SUFDSCxDQUFDLENBQUMsQ0FBQTtJQUVGLEVBQUUsQ0FBQywrQkFBK0IsRUFBRSxHQUFHLEVBQUU7UUFDdkMsTUFBTSxDQUNKLDZDQUE0QixDQUFDLHNCQUFzQixDQUFDLENBQ3JELENBQUMscUJBQXFCLENBQ3JCOzs7Ozs7Ozs7OztDQVdMLENBQ0ksQ0FBQTtJQUNILENBQUMsQ0FBQyxDQUFBO0lBRUYsRUFBRSxDQUFDLCtCQUErQixFQUFFLEdBQUcsRUFBRTtRQUN2QyxNQUFNLENBQ0osNkNBQTRCLENBQUMscUJBQXFCLENBQUMsQ0FDcEQsQ0FBQyxxQkFBcUIsQ0FDckI7Ozs7Ozs7Ozs7OztDQVlMLENBQ0ksQ0FBQTtJQUNILENBQUMsQ0FBQyxDQUFBO0lBRUYsRUFBRSxDQUFDLDJDQUEyQyxFQUFFLEdBQUcsRUFBRTtRQUNuRCxNQUFNLENBQ0osNkNBQTRCLENBQUMsNkJBQTZCLENBQUMsQ0FDNUQsQ0FBQyxxQkFBcUIsQ0FDckI7Ozs7Ozs7Ozs7OztDQVlMLENBQ0ksQ0FBQTtRQUVELE1BQU0sQ0FDSiw2Q0FBNEIsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUNuRSxDQUFDLHFCQUFxQixDQUNyQjs7Ozs7Ozs7Ozs7O0NBWUwsQ0FDSSxDQUFBO1FBRUQsTUFBTSxDQUNKLDZDQUE0QixDQUFDLG1DQUFtQyxDQUFDLENBQ2xFLENBQUMscUJBQXFCLENBQ3JCOzs7Ozs7Ozs7Ozs7O0NBYUwsQ0FDSSxDQUFBO0lBQ0gsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGdldFBhY2thZ2VEZXRhaWxzRnJvbVBhdGNoRmlsZW5hbWUsXG4gIGdldFBhdGNoRGV0YWlsc0Zyb21DbGlTdHJpbmcsXG59IGZyb20gXCIuL1BhY2thZ2VEZXRhaWxzXCJcblxuZGVzY3JpYmUoXCJnZXRQYWNrYWdlRGV0YWlsc0Zyb21QYXRjaEZpbGVuYW1lXCIsICgpID0+IHtcbiAgaXQoXCJwYXJzZXMgb2xkLXN0eWxlIHBhdGNoIGZpbGVuYW1lc1wiLCAoKSA9PiB7XG4gICAgZXhwZWN0KFxuICAgICAgZ2V0UGFja2FnZURldGFpbHNGcm9tUGF0Y2hGaWxlbmFtZShcIkB0eXBlcy9iYW5hbmE6My40LjItYmV0YS4yLnBhdGNoXCIpLFxuICAgICkudG9NYXRjaElubGluZVNuYXBzaG90KGBcbk9iamVjdCB7XG4gIFwiaHVtYW5SZWFkYWJsZVBhdGhTcGVjaWZpZXJcIjogXCJAdHlwZXMvYmFuYW5hXCIsXG4gIFwiaXNEZXZPbmx5XCI6IGZhbHNlLFxuICBcImlzTmVzdGVkXCI6IGZhbHNlLFxuICBcIm5hbWVcIjogXCJAdHlwZXMvYmFuYW5hXCIsXG4gIFwicGFja2FnZU5hbWVzXCI6IEFycmF5IFtcbiAgICBcIkB0eXBlcy9iYW5hbmFcIixcbiAgXSxcbiAgXCJwYXRjaEZpbGVuYW1lXCI6IFwiQHR5cGVzL2JhbmFuYTozLjQuMi1iZXRhLjIucGF0Y2hcIixcbiAgXCJwYXRoXCI6IFwibm9kZV9tb2R1bGVzL0B0eXBlcy9iYW5hbmFcIixcbiAgXCJwYXRoU3BlY2lmaWVyXCI6IFwiQHR5cGVzL2JhbmFuYVwiLFxuICBcInZlcnNpb25cIjogXCIzLjQuMi1iZXRhLjJcIixcbn1cbmApXG5cbiAgICBleHBlY3QoZ2V0UGFja2FnZURldGFpbHNGcm9tUGF0Y2hGaWxlbmFtZShcImJhbmFuYTowLjQuMi5wYXRjaFwiKSlcbiAgICAgIC50b01hdGNoSW5saW5lU25hcHNob3QoYFxuT2JqZWN0IHtcbiAgXCJodW1hblJlYWRhYmxlUGF0aFNwZWNpZmllclwiOiBcImJhbmFuYVwiLFxuICBcImlzRGV2T25seVwiOiBmYWxzZSxcbiAgXCJpc05lc3RlZFwiOiBmYWxzZSxcbiAgXCJuYW1lXCI6IFwiYmFuYW5hXCIsXG4gIFwicGFja2FnZU5hbWVzXCI6IEFycmF5IFtcbiAgICBcImJhbmFuYVwiLFxuICBdLFxuICBcInBhdGNoRmlsZW5hbWVcIjogXCJiYW5hbmE6MC40LjIucGF0Y2hcIixcbiAgXCJwYXRoXCI6IFwibm9kZV9tb2R1bGVzL2JhbmFuYVwiLFxuICBcInBhdGhTcGVjaWZpZXJcIjogXCJiYW5hbmFcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC40LjJcIixcbn1cbmApXG5cbiAgICBleHBlY3QoZ2V0UGFja2FnZURldGFpbHNGcm9tUGF0Y2hGaWxlbmFtZShcImJhbmFuYSswLjQuMi5wYXRjaFwiKSlcbiAgICAgIC50b01hdGNoSW5saW5lU25hcHNob3QoYFxuT2JqZWN0IHtcbiAgXCJodW1hblJlYWRhYmxlUGF0aFNwZWNpZmllclwiOiBcImJhbmFuYVwiLFxuICBcImlzRGV2T25seVwiOiBmYWxzZSxcbiAgXCJpc05lc3RlZFwiOiBmYWxzZSxcbiAgXCJuYW1lXCI6IFwiYmFuYW5hXCIsXG4gIFwicGFja2FnZU5hbWVzXCI6IEFycmF5IFtcbiAgICBcImJhbmFuYVwiLFxuICBdLFxuICBcInBhdGNoRmlsZW5hbWVcIjogXCJiYW5hbmErMC40LjIucGF0Y2hcIixcbiAgXCJwYXRoXCI6IFwibm9kZV9tb2R1bGVzL2JhbmFuYVwiLFxuICBcInBhdGhTcGVjaWZpZXJcIjogXCJiYW5hbmFcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC40LjJcIixcbn1cbmApXG5cbiAgICBleHBlY3QoZ2V0UGFja2FnZURldGFpbHNGcm9tUGF0Y2hGaWxlbmFtZShcImJhbmFuYS0wLjQuMi5wYXRjaFwiKSkudG9CZShudWxsKVxuXG4gICAgZXhwZWN0KFxuICAgICAgZ2V0UGFja2FnZURldGFpbHNGcm9tUGF0Y2hGaWxlbmFtZShcIkB0eXBlcytiYW5hbmEtMC40LjIucGF0Y2hcIiksXG4gICAgKS50b0JlKG51bGwpXG5cbiAgICBleHBlY3QoZ2V0UGFja2FnZURldGFpbHNGcm9tUGF0Y2hGaWxlbmFtZShcImJhbmFuYSswLjQuMi5kZXYucGF0Y2hcIikpXG4gICAgICAudG9NYXRjaElubGluZVNuYXBzaG90KGBcbk9iamVjdCB7XG4gIFwiaHVtYW5SZWFkYWJsZVBhdGhTcGVjaWZpZXJcIjogXCJiYW5hbmFcIixcbiAgXCJpc0Rldk9ubHlcIjogdHJ1ZSxcbiAgXCJpc05lc3RlZFwiOiBmYWxzZSxcbiAgXCJuYW1lXCI6IFwiYmFuYW5hXCIsXG4gIFwicGFja2FnZU5hbWVzXCI6IEFycmF5IFtcbiAgICBcImJhbmFuYVwiLFxuICBdLFxuICBcInBhdGNoRmlsZW5hbWVcIjogXCJiYW5hbmErMC40LjIuZGV2LnBhdGNoXCIsXG4gIFwicGF0aFwiOiBcIm5vZGVfbW9kdWxlcy9iYW5hbmFcIixcbiAgXCJwYXRoU3BlY2lmaWVyXCI6IFwiYmFuYW5hXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuNC4yXCIsXG59XG5gKVxuICB9KVxuXG4gIGl0KFwicGFyc2VzIG5ldy1zdHlsZSBwYXRjaCBmaWxlbmFtZXNcIiwgKCkgPT4ge1xuICAgIGV4cGVjdChnZXRQYWNrYWdlRGV0YWlsc0Zyb21QYXRjaEZpbGVuYW1lKFwiYmFuYW5hKythcHBsZSswLjQuMi5wYXRjaFwiKSlcbiAgICAgIC50b01hdGNoSW5saW5lU25hcHNob3QoYFxuT2JqZWN0IHtcbiAgXCJodW1hblJlYWRhYmxlUGF0aFNwZWNpZmllclwiOiBcImJhbmFuYSA9PiBhcHBsZVwiLFxuICBcImlzRGV2T25seVwiOiBmYWxzZSxcbiAgXCJpc05lc3RlZFwiOiB0cnVlLFxuICBcIm5hbWVcIjogXCJhcHBsZVwiLFxuICBcInBhY2thZ2VOYW1lc1wiOiBBcnJheSBbXG4gICAgXCJiYW5hbmFcIixcbiAgICBcImFwcGxlXCIsXG4gIF0sXG4gIFwicGF0Y2hGaWxlbmFtZVwiOiBcImJhbmFuYSsrYXBwbGUrMC40LjIucGF0Y2hcIixcbiAgXCJwYXRoXCI6IFwibm9kZV9tb2R1bGVzL2JhbmFuYS9ub2RlX21vZHVsZXMvYXBwbGVcIixcbiAgXCJwYXRoU3BlY2lmaWVyXCI6IFwiYmFuYW5hL2FwcGxlXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuNC4yXCIsXG59XG5gKVxuXG4gICAgZXhwZWN0KFxuICAgICAgZ2V0UGFja2FnZURldGFpbHNGcm9tUGF0Y2hGaWxlbmFtZShcbiAgICAgICAgXCJAdHlwZXMrYmFuYW5hKytAdHlwZXMrYXBwbGUrK0Btb2xsdXNjK21hbiswLjQuMi1iYW5hbmEtdHJlZS5wYXRjaFwiLFxuICAgICAgKSxcbiAgICApLnRvTWF0Y2hJbmxpbmVTbmFwc2hvdChgXG5PYmplY3Qge1xuICBcImh1bWFuUmVhZGFibGVQYXRoU3BlY2lmaWVyXCI6IFwiQHR5cGVzL2JhbmFuYSA9PiBAdHlwZXMvYXBwbGUgPT4gQG1vbGx1c2MvbWFuXCIsXG4gIFwiaXNEZXZPbmx5XCI6IGZhbHNlLFxuICBcImlzTmVzdGVkXCI6IHRydWUsXG4gIFwibmFtZVwiOiBcIkBtb2xsdXNjL21hblwiLFxuICBcInBhY2thZ2VOYW1lc1wiOiBBcnJheSBbXG4gICAgXCJAdHlwZXMvYmFuYW5hXCIsXG4gICAgXCJAdHlwZXMvYXBwbGVcIixcbiAgICBcIkBtb2xsdXNjL21hblwiLFxuICBdLFxuICBcInBhdGNoRmlsZW5hbWVcIjogXCJAdHlwZXMrYmFuYW5hKytAdHlwZXMrYXBwbGUrK0Btb2xsdXNjK21hbiswLjQuMi1iYW5hbmEtdHJlZS5wYXRjaFwiLFxuICBcInBhdGhcIjogXCJub2RlX21vZHVsZXMvQHR5cGVzL2JhbmFuYS9ub2RlX21vZHVsZXMvQHR5cGVzL2FwcGxlL25vZGVfbW9kdWxlcy9AbW9sbHVzYy9tYW5cIixcbiAgXCJwYXRoU3BlY2lmaWVyXCI6IFwiQHR5cGVzL2JhbmFuYS9AdHlwZXMvYXBwbGUvQG1vbGx1c2MvbWFuXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuNC4yLWJhbmFuYS10cmVlXCIsXG59XG5gKVxuXG4gICAgZXhwZWN0KFxuICAgICAgZ2V0UGFja2FnZURldGFpbHNGcm9tUGF0Y2hGaWxlbmFtZShcbiAgICAgICAgXCJAdHlwZXMrYmFuYW5hLnBhdGNoKytoZWxsbyswLjQuMi1iYW5hbmEtdHJlZS5wYXRjaFwiLFxuICAgICAgKSxcbiAgICApLnRvTWF0Y2hJbmxpbmVTbmFwc2hvdChgXG5PYmplY3Qge1xuICBcImh1bWFuUmVhZGFibGVQYXRoU3BlY2lmaWVyXCI6IFwiQHR5cGVzL2JhbmFuYS5wYXRjaCA9PiBoZWxsb1wiLFxuICBcImlzRGV2T25seVwiOiBmYWxzZSxcbiAgXCJpc05lc3RlZFwiOiB0cnVlLFxuICBcIm5hbWVcIjogXCJoZWxsb1wiLFxuICBcInBhY2thZ2VOYW1lc1wiOiBBcnJheSBbXG4gICAgXCJAdHlwZXMvYmFuYW5hLnBhdGNoXCIsXG4gICAgXCJoZWxsb1wiLFxuICBdLFxuICBcInBhdGNoRmlsZW5hbWVcIjogXCJAdHlwZXMrYmFuYW5hLnBhdGNoKytoZWxsbyswLjQuMi1iYW5hbmEtdHJlZS5wYXRjaFwiLFxuICBcInBhdGhcIjogXCJub2RlX21vZHVsZXMvQHR5cGVzL2JhbmFuYS5wYXRjaC9ub2RlX21vZHVsZXMvaGVsbG9cIixcbiAgXCJwYXRoU3BlY2lmaWVyXCI6IFwiQHR5cGVzL2JhbmFuYS5wYXRjaC9oZWxsb1wiLFxuICBcInZlcnNpb25cIjogXCIwLjQuMi1iYW5hbmEtdHJlZVwiLFxufVxuYClcblxuICAgIGV4cGVjdChcbiAgICAgIGdldFBhY2thZ2VEZXRhaWxzRnJvbVBhdGNoRmlsZW5hbWUoXG4gICAgICAgIFwiQHR5cGVzK2JhbmFuYS5wYXRjaCsraGVsbG8rMC40LjItYmFuYW5hLXRyZWUuZGV2LnBhdGNoXCIsXG4gICAgICApLFxuICAgICkudG9NYXRjaElubGluZVNuYXBzaG90KGBcbk9iamVjdCB7XG4gIFwiaHVtYW5SZWFkYWJsZVBhdGhTcGVjaWZpZXJcIjogXCJAdHlwZXMvYmFuYW5hLnBhdGNoID0+IGhlbGxvXCIsXG4gIFwiaXNEZXZPbmx5XCI6IHRydWUsXG4gIFwiaXNOZXN0ZWRcIjogdHJ1ZSxcbiAgXCJuYW1lXCI6IFwiaGVsbG9cIixcbiAgXCJwYWNrYWdlTmFtZXNcIjogQXJyYXkgW1xuICAgIFwiQHR5cGVzL2JhbmFuYS5wYXRjaFwiLFxuICAgIFwiaGVsbG9cIixcbiAgXSxcbiAgXCJwYXRjaEZpbGVuYW1lXCI6IFwiQHR5cGVzK2JhbmFuYS5wYXRjaCsraGVsbG8rMC40LjItYmFuYW5hLXRyZWUuZGV2LnBhdGNoXCIsXG4gIFwicGF0aFwiOiBcIm5vZGVfbW9kdWxlcy9AdHlwZXMvYmFuYW5hLnBhdGNoL25vZGVfbW9kdWxlcy9oZWxsb1wiLFxuICBcInBhdGhTcGVjaWZpZXJcIjogXCJAdHlwZXMvYmFuYW5hLnBhdGNoL2hlbGxvXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuNC4yLWJhbmFuYS10cmVlXCIsXG59XG5gKVxuICB9KVxufSlcblxuZGVzY3JpYmUoXCJnZXRQYXRjaERldGFpbHNGcm9tQ2xpU3RyaW5nXCIsICgpID0+IHtcbiAgaXQoXCJoYW5kbGVzIGEgbWluaW1hbCBwYWNrYWdlIG5hbWVcIiwgKCkgPT4ge1xuICAgIGV4cGVjdChnZXRQYXRjaERldGFpbHNGcm9tQ2xpU3RyaW5nKFwicGF0Y2gtcGFja2FnZVwiKSkudG9NYXRjaElubGluZVNuYXBzaG90KFxuICAgICAgYFxuT2JqZWN0IHtcbiAgXCJodW1hblJlYWRhYmxlUGF0aFNwZWNpZmllclwiOiBcInBhdGNoLXBhY2thZ2VcIixcbiAgXCJpc05lc3RlZFwiOiBmYWxzZSxcbiAgXCJuYW1lXCI6IFwicGF0Y2gtcGFja2FnZVwiLFxuICBcInBhY2thZ2VOYW1lc1wiOiBBcnJheSBbXG4gICAgXCJwYXRjaC1wYWNrYWdlXCIsXG4gIF0sXG4gIFwicGF0aFwiOiBcIm5vZGVfbW9kdWxlcy9wYXRjaC1wYWNrYWdlXCIsXG4gIFwicGF0aFNwZWNpZmllclwiOiBcInBhdGNoLXBhY2thZ2VcIixcbn1cbmAsXG4gICAgKVxuICB9KVxuXG4gIGl0KFwiaGFuZGxlcyBhIHNjb3BlZCBwYWNrYWdlIG5hbWVcIiwgKCkgPT4ge1xuICAgIGV4cGVjdChcbiAgICAgIGdldFBhdGNoRGV0YWlsc0Zyb21DbGlTdHJpbmcoXCJAZGF2aWQvcGF0Y2gtcGFja2FnZVwiKSxcbiAgICApLnRvTWF0Y2hJbmxpbmVTbmFwc2hvdChcbiAgICAgIGBcbk9iamVjdCB7XG4gIFwiaHVtYW5SZWFkYWJsZVBhdGhTcGVjaWZpZXJcIjogXCJAZGF2aWQvcGF0Y2gtcGFja2FnZVwiLFxuICBcImlzTmVzdGVkXCI6IGZhbHNlLFxuICBcIm5hbWVcIjogXCJAZGF2aWQvcGF0Y2gtcGFja2FnZVwiLFxuICBcInBhY2thZ2VOYW1lc1wiOiBBcnJheSBbXG4gICAgXCJAZGF2aWQvcGF0Y2gtcGFja2FnZVwiLFxuICBdLFxuICBcInBhdGhcIjogXCJub2RlX21vZHVsZXMvQGRhdmlkL3BhdGNoLXBhY2thZ2VcIixcbiAgXCJwYXRoU3BlY2lmaWVyXCI6IFwiQGRhdmlkL3BhdGNoLXBhY2thZ2VcIixcbn1cbmAsXG4gICAgKVxuICB9KVxuXG4gIGl0KFwiaGFuZGxlcyBhIG5lc3RlZCBwYWNrYWdlIG5hbWVcIiwgKCkgPT4ge1xuICAgIGV4cGVjdChcbiAgICAgIGdldFBhdGNoRGV0YWlsc0Zyb21DbGlTdHJpbmcoXCJkYXZpZC9wYXRjaC1wYWNrYWdlXCIpLFxuICAgICkudG9NYXRjaElubGluZVNuYXBzaG90KFxuICAgICAgYFxuT2JqZWN0IHtcbiAgXCJodW1hblJlYWRhYmxlUGF0aFNwZWNpZmllclwiOiBcImRhdmlkID0+IHBhdGNoLXBhY2thZ2VcIixcbiAgXCJpc05lc3RlZFwiOiB0cnVlLFxuICBcIm5hbWVcIjogXCJwYXRjaC1wYWNrYWdlXCIsXG4gIFwicGFja2FnZU5hbWVzXCI6IEFycmF5IFtcbiAgICBcImRhdmlkXCIsXG4gICAgXCJwYXRjaC1wYWNrYWdlXCIsXG4gIF0sXG4gIFwicGF0aFwiOiBcIm5vZGVfbW9kdWxlcy9kYXZpZC9ub2RlX21vZHVsZXMvcGF0Y2gtcGFja2FnZVwiLFxuICBcInBhdGhTcGVjaWZpZXJcIjogXCJkYXZpZC9wYXRjaC1wYWNrYWdlXCIsXG59XG5gLFxuICAgIClcbiAgfSlcblxuICBpdChcImhhbmRsZXMgYSBuZXN0ZWQgcGFja2FnZSBuYW1lIHdpdGggc2NvcGVzXCIsICgpID0+IHtcbiAgICBleHBlY3QoXG4gICAgICBnZXRQYXRjaERldGFpbHNGcm9tQ2xpU3RyaW5nKFwiQGRhdmlkL3BhdGNoLXBhY2thZ2UvYmFuYW5hXCIpLFxuICAgICkudG9NYXRjaElubGluZVNuYXBzaG90KFxuICAgICAgYFxuT2JqZWN0IHtcbiAgXCJodW1hblJlYWRhYmxlUGF0aFNwZWNpZmllclwiOiBcIkBkYXZpZC9wYXRjaC1wYWNrYWdlID0+IGJhbmFuYVwiLFxuICBcImlzTmVzdGVkXCI6IHRydWUsXG4gIFwibmFtZVwiOiBcImJhbmFuYVwiLFxuICBcInBhY2thZ2VOYW1lc1wiOiBBcnJheSBbXG4gICAgXCJAZGF2aWQvcGF0Y2gtcGFja2FnZVwiLFxuICAgIFwiYmFuYW5hXCIsXG4gIF0sXG4gIFwicGF0aFwiOiBcIm5vZGVfbW9kdWxlcy9AZGF2aWQvcGF0Y2gtcGFja2FnZS9ub2RlX21vZHVsZXMvYmFuYW5hXCIsXG4gIFwicGF0aFNwZWNpZmllclwiOiBcIkBkYXZpZC9wYXRjaC1wYWNrYWdlL2JhbmFuYVwiLFxufVxuYCxcbiAgICApXG5cbiAgICBleHBlY3QoXG4gICAgICBnZXRQYXRjaERldGFpbHNGcm9tQ2xpU3RyaW5nKFwiQGRhdmlkL3BhdGNoLXBhY2thZ2UvQGRhdmlkL2JhbmFuYVwiKSxcbiAgICApLnRvTWF0Y2hJbmxpbmVTbmFwc2hvdChcbiAgICAgIGBcbk9iamVjdCB7XG4gIFwiaHVtYW5SZWFkYWJsZVBhdGhTcGVjaWZpZXJcIjogXCJAZGF2aWQvcGF0Y2gtcGFja2FnZSA9PiBAZGF2aWQvYmFuYW5hXCIsXG4gIFwiaXNOZXN0ZWRcIjogdHJ1ZSxcbiAgXCJuYW1lXCI6IFwiQGRhdmlkL2JhbmFuYVwiLFxuICBcInBhY2thZ2VOYW1lc1wiOiBBcnJheSBbXG4gICAgXCJAZGF2aWQvcGF0Y2gtcGFja2FnZVwiLFxuICAgIFwiQGRhdmlkL2JhbmFuYVwiLFxuICBdLFxuICBcInBhdGhcIjogXCJub2RlX21vZHVsZXMvQGRhdmlkL3BhdGNoLXBhY2thZ2Uvbm9kZV9tb2R1bGVzL0BkYXZpZC9iYW5hbmFcIixcbiAgXCJwYXRoU3BlY2lmaWVyXCI6IFwiQGRhdmlkL3BhdGNoLXBhY2thZ2UvQGRhdmlkL2JhbmFuYVwiLFxufVxuYCxcbiAgICApXG5cbiAgICBleHBlY3QoXG4gICAgICBnZXRQYXRjaERldGFpbHNGcm9tQ2xpU3RyaW5nKFwiZGF2aWQvcGF0Y2gtcGFja2FnZS9AZGF2aWQvYmFuYW5hXCIpLFxuICAgICkudG9NYXRjaElubGluZVNuYXBzaG90KFxuICAgICAgYFxuT2JqZWN0IHtcbiAgXCJodW1hblJlYWRhYmxlUGF0aFNwZWNpZmllclwiOiBcImRhdmlkID0+IHBhdGNoLXBhY2thZ2UgPT4gQGRhdmlkL2JhbmFuYVwiLFxuICBcImlzTmVzdGVkXCI6IHRydWUsXG4gIFwibmFtZVwiOiBcIkBkYXZpZC9iYW5hbmFcIixcbiAgXCJwYWNrYWdlTmFtZXNcIjogQXJyYXkgW1xuICAgIFwiZGF2aWRcIixcbiAgICBcInBhdGNoLXBhY2thZ2VcIixcbiAgICBcIkBkYXZpZC9iYW5hbmFcIixcbiAgXSxcbiAgXCJwYXRoXCI6IFwibm9kZV9tb2R1bGVzL2RhdmlkL25vZGVfbW9kdWxlcy9wYXRjaC1wYWNrYWdlL25vZGVfbW9kdWxlcy9AZGF2aWQvYmFuYW5hXCIsXG4gIFwicGF0aFNwZWNpZmllclwiOiBcImRhdmlkL3BhdGNoLXBhY2thZ2UvQGRhdmlkL2JhbmFuYVwiLFxufVxuYCxcbiAgICApXG4gIH0pXG59KVxuIl19