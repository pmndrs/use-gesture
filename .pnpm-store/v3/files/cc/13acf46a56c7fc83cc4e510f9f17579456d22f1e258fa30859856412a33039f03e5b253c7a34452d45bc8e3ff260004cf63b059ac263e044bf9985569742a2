"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatchFiles = void 0;
const path_1 = require("./path");
const klaw_sync_1 = __importDefault(require("klaw-sync"));
const getPatchFiles = (patchesDir) => {
    try {
        return klaw_sync_1.default(patchesDir, { nodir: true })
            .map(({ path }) => path_1.relative(patchesDir, path))
            .filter(path => path.endsWith(".patch"));
    }
    catch (e) {
        return [];
    }
};
exports.getPatchFiles = getPatchFiles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0Y2hGcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wYXRjaEZzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlDQUFpQztBQUNqQywwREFBZ0M7QUFFekIsTUFBTSxhQUFhLEdBQUcsQ0FBQyxVQUFrQixFQUFFLEVBQUU7SUFDbEQsSUFBSTtRQUNGLE9BQU8sbUJBQVEsQ0FBQyxVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7YUFDekMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsZUFBUSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUM3QyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7S0FDM0M7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sRUFBRSxDQUFBO0tBQ1Y7QUFDSCxDQUFDLENBQUE7QUFSWSxRQUFBLGFBQWEsaUJBUXpCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVsYXRpdmUgfSBmcm9tIFwiLi9wYXRoXCJcbmltcG9ydCBrbGF3U3luYyBmcm9tIFwia2xhdy1zeW5jXCJcblxuZXhwb3J0IGNvbnN0IGdldFBhdGNoRmlsZXMgPSAocGF0Y2hlc0Rpcjogc3RyaW5nKSA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGtsYXdTeW5jKHBhdGNoZXNEaXIsIHsgbm9kaXI6IHRydWUgfSlcbiAgICAgIC5tYXAoKHsgcGF0aCB9KSA9PiByZWxhdGl2ZShwYXRjaGVzRGlyLCBwYXRoKSlcbiAgICAgIC5maWx0ZXIocGF0aCA9PiBwYXRoLmVuZHNXaXRoKFwiLnBhdGNoXCIpKVxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbn1cbiJdfQ==