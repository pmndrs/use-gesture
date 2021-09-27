"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reversePatch = void 0;
const parse_1 = require("./parse");
const assertNever_1 = require("../assertNever");
function reverseHunk(hunk) {
    const header = {
        original: hunk.header.patched,
        patched: hunk.header.original,
    };
    const parts = [];
    for (const part of hunk.parts) {
        switch (part.type) {
            case "context":
                parts.push(part);
                break;
            case "deletion":
                parts.push({
                    type: "insertion",
                    lines: part.lines,
                    noNewlineAtEndOfFile: part.noNewlineAtEndOfFile,
                });
                break;
            case "insertion":
                parts.push({
                    type: "deletion",
                    lines: part.lines,
                    noNewlineAtEndOfFile: part.noNewlineAtEndOfFile,
                });
                break;
            default:
                assertNever_1.assertNever(part.type);
        }
    }
    // swap insertions and deletions over so deletions always come first
    for (let i = 0; i < parts.length - 1; i++) {
        if (parts[i].type === "insertion" && parts[i + 1].type === "deletion") {
            const tmp = parts[i];
            parts[i] = parts[i + 1];
            parts[i + 1] = tmp;
            i += 1;
        }
    }
    const result = {
        header,
        parts,
    };
    parse_1.verifyHunkIntegrity(result);
    return result;
}
function reversePatchPart(part) {
    switch (part.type) {
        case "file creation":
            return {
                type: "file deletion",
                path: part.path,
                hash: part.hash,
                hunk: part.hunk && reverseHunk(part.hunk),
                mode: part.mode,
            };
        case "file deletion":
            return {
                type: "file creation",
                path: part.path,
                hunk: part.hunk && reverseHunk(part.hunk),
                mode: part.mode,
                hash: part.hash,
            };
        case "rename":
            return {
                type: "rename",
                fromPath: part.toPath,
                toPath: part.fromPath,
            };
        case "patch":
            return {
                type: "patch",
                path: part.path,
                hunks: part.hunks.map(reverseHunk),
                beforeHash: part.afterHash,
                afterHash: part.beforeHash,
            };
        case "mode change":
            return {
                type: "mode change",
                path: part.path,
                newMode: part.oldMode,
                oldMode: part.newMode,
            };
    }
}
const reversePatch = (patch) => {
    return patch.map(reversePatchPart).reverse();
};
exports.reversePatch = reversePatch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2ZXJzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXRjaC9yZXZlcnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQU1nQjtBQUNoQixnREFBNEM7QUFFNUMsU0FBUyxXQUFXLENBQUMsSUFBVTtJQUM3QixNQUFNLE1BQU0sR0FBZTtRQUN6QixRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPO1FBQzdCLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVE7S0FDOUIsQ0FBQTtJQUNELE1BQU0sS0FBSyxHQUFrQixFQUFFLENBQUE7SUFFL0IsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQzdCLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNqQixLQUFLLFNBQVM7Z0JBQ1osS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDaEIsTUFBSztZQUNQLEtBQUssVUFBVTtnQkFDYixLQUFLLENBQUMsSUFBSSxDQUFDO29CQUNULElBQUksRUFBRSxXQUFXO29CQUNqQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7b0JBQ2pCLG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0I7aUJBQ2hELENBQUMsQ0FBQTtnQkFDRixNQUFLO1lBQ1AsS0FBSyxXQUFXO2dCQUNkLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQ1QsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztvQkFDakIsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQjtpQkFDaEQsQ0FBQyxDQUFBO2dCQUNGLE1BQUs7WUFDUDtnQkFDRSx5QkFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUN6QjtLQUNGO0lBRUQsb0VBQW9FO0lBQ3BFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN6QyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssV0FBVyxJQUFJLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtZQUNyRSxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDcEIsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDdkIsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUE7WUFDbEIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUNQO0tBQ0Y7SUFFRCxNQUFNLE1BQU0sR0FBUztRQUNuQixNQUFNO1FBQ04sS0FBSztLQUNOLENBQUE7SUFFRCwyQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUUzQixPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUM7QUFFRCxTQUFTLGdCQUFnQixDQUFDLElBQW1CO0lBQzNDLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNqQixLQUFLLGVBQWU7WUFDbEIsT0FBTztnQkFDTCxJQUFJLEVBQUUsZUFBZTtnQkFDckIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDekMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2FBQ2hCLENBQUE7UUFDSCxLQUFLLGVBQWU7WUFDbEIsT0FBTztnQkFDTCxJQUFJLEVBQUUsZUFBZTtnQkFDckIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUN6QyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2FBQ2hCLENBQUE7UUFDSCxLQUFLLFFBQVE7WUFDWCxPQUFPO2dCQUNMLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDckIsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRO2FBQ3RCLENBQUE7UUFDSCxLQUFLLE9BQU87WUFDVixPQUFPO2dCQUNMLElBQUksRUFBRSxPQUFPO2dCQUNiLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO2dCQUNsQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVM7Z0JBQzFCLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVTthQUMzQixDQUFBO1FBQ0gsS0FBSyxhQUFhO1lBQ2hCLE9BQU87Z0JBQ0wsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ3JCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTzthQUN0QixDQUFBO0tBQ0o7QUFDSCxDQUFDO0FBRU0sTUFBTSxZQUFZLEdBQUcsQ0FBQyxLQUFzQixFQUFtQixFQUFFO0lBQ3RFLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO0FBQzlDLENBQUMsQ0FBQTtBQUZZLFFBQUEsWUFBWSxnQkFFeEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBQYXJzZWRQYXRjaEZpbGUsXG4gIFBhdGNoRmlsZVBhcnQsXG4gIEh1bmssXG4gIEh1bmtIZWFkZXIsXG4gIHZlcmlmeUh1bmtJbnRlZ3JpdHksXG59IGZyb20gXCIuL3BhcnNlXCJcbmltcG9ydCB7IGFzc2VydE5ldmVyIH0gZnJvbSBcIi4uL2Fzc2VydE5ldmVyXCJcblxuZnVuY3Rpb24gcmV2ZXJzZUh1bmsoaHVuazogSHVuayk6IEh1bmsge1xuICBjb25zdCBoZWFkZXI6IEh1bmtIZWFkZXIgPSB7XG4gICAgb3JpZ2luYWw6IGh1bmsuaGVhZGVyLnBhdGNoZWQsXG4gICAgcGF0Y2hlZDogaHVuay5oZWFkZXIub3JpZ2luYWwsXG4gIH1cbiAgY29uc3QgcGFydHM6IEh1bmtbXCJwYXJ0c1wiXSA9IFtdXG5cbiAgZm9yIChjb25zdCBwYXJ0IG9mIGh1bmsucGFydHMpIHtcbiAgICBzd2l0Y2ggKHBhcnQudHlwZSkge1xuICAgICAgY2FzZSBcImNvbnRleHRcIjpcbiAgICAgICAgcGFydHMucHVzaChwYXJ0KVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSBcImRlbGV0aW9uXCI6XG4gICAgICAgIHBhcnRzLnB1c2goe1xuICAgICAgICAgIHR5cGU6IFwiaW5zZXJ0aW9uXCIsXG4gICAgICAgICAgbGluZXM6IHBhcnQubGluZXMsXG4gICAgICAgICAgbm9OZXdsaW5lQXRFbmRPZkZpbGU6IHBhcnQubm9OZXdsaW5lQXRFbmRPZkZpbGUsXG4gICAgICAgIH0pXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIFwiaW5zZXJ0aW9uXCI6XG4gICAgICAgIHBhcnRzLnB1c2goe1xuICAgICAgICAgIHR5cGU6IFwiZGVsZXRpb25cIixcbiAgICAgICAgICBsaW5lczogcGFydC5saW5lcyxcbiAgICAgICAgICBub05ld2xpbmVBdEVuZE9mRmlsZTogcGFydC5ub05ld2xpbmVBdEVuZE9mRmlsZSxcbiAgICAgICAgfSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFzc2VydE5ldmVyKHBhcnQudHlwZSlcbiAgICB9XG4gIH1cblxuICAvLyBzd2FwIGluc2VydGlvbnMgYW5kIGRlbGV0aW9ucyBvdmVyIHNvIGRlbGV0aW9ucyBhbHdheXMgY29tZSBmaXJzdFxuICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgIGlmIChwYXJ0c1tpXS50eXBlID09PSBcImluc2VydGlvblwiICYmIHBhcnRzW2kgKyAxXS50eXBlID09PSBcImRlbGV0aW9uXCIpIHtcbiAgICAgIGNvbnN0IHRtcCA9IHBhcnRzW2ldXG4gICAgICBwYXJ0c1tpXSA9IHBhcnRzW2kgKyAxXVxuICAgICAgcGFydHNbaSArIDFdID0gdG1wXG4gICAgICBpICs9IDFcbiAgICB9XG4gIH1cblxuICBjb25zdCByZXN1bHQ6IEh1bmsgPSB7XG4gICAgaGVhZGVyLFxuICAgIHBhcnRzLFxuICB9XG5cbiAgdmVyaWZ5SHVua0ludGVncml0eShyZXN1bHQpXG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5mdW5jdGlvbiByZXZlcnNlUGF0Y2hQYXJ0KHBhcnQ6IFBhdGNoRmlsZVBhcnQpOiBQYXRjaEZpbGVQYXJ0IHtcbiAgc3dpdGNoIChwYXJ0LnR5cGUpIHtcbiAgICBjYXNlIFwiZmlsZSBjcmVhdGlvblwiOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJmaWxlIGRlbGV0aW9uXCIsXG4gICAgICAgIHBhdGg6IHBhcnQucGF0aCxcbiAgICAgICAgaGFzaDogcGFydC5oYXNoLFxuICAgICAgICBodW5rOiBwYXJ0Lmh1bmsgJiYgcmV2ZXJzZUh1bmsocGFydC5odW5rKSxcbiAgICAgICAgbW9kZTogcGFydC5tb2RlLFxuICAgICAgfVxuICAgIGNhc2UgXCJmaWxlIGRlbGV0aW9uXCI6XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcImZpbGUgY3JlYXRpb25cIixcbiAgICAgICAgcGF0aDogcGFydC5wYXRoLFxuICAgICAgICBodW5rOiBwYXJ0Lmh1bmsgJiYgcmV2ZXJzZUh1bmsocGFydC5odW5rKSxcbiAgICAgICAgbW9kZTogcGFydC5tb2RlLFxuICAgICAgICBoYXNoOiBwYXJ0Lmhhc2gsXG4gICAgICB9XG4gICAgY2FzZSBcInJlbmFtZVwiOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJyZW5hbWVcIixcbiAgICAgICAgZnJvbVBhdGg6IHBhcnQudG9QYXRoLFxuICAgICAgICB0b1BhdGg6IHBhcnQuZnJvbVBhdGgsXG4gICAgICB9XG4gICAgY2FzZSBcInBhdGNoXCI6XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcInBhdGNoXCIsXG4gICAgICAgIHBhdGg6IHBhcnQucGF0aCxcbiAgICAgICAgaHVua3M6IHBhcnQuaHVua3MubWFwKHJldmVyc2VIdW5rKSxcbiAgICAgICAgYmVmb3JlSGFzaDogcGFydC5hZnRlckhhc2gsXG4gICAgICAgIGFmdGVySGFzaDogcGFydC5iZWZvcmVIYXNoLFxuICAgICAgfVxuICAgIGNhc2UgXCJtb2RlIGNoYW5nZVwiOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJtb2RlIGNoYW5nZVwiLFxuICAgICAgICBwYXRoOiBwYXJ0LnBhdGgsXG4gICAgICAgIG5ld01vZGU6IHBhcnQub2xkTW9kZSxcbiAgICAgICAgb2xkTW9kZTogcGFydC5uZXdNb2RlLFxuICAgICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCByZXZlcnNlUGF0Y2ggPSAocGF0Y2g6IFBhcnNlZFBhdGNoRmlsZSk6IFBhcnNlZFBhdGNoRmlsZSA9PiB7XG4gIHJldHVybiBwYXRjaC5tYXAocmV2ZXJzZVBhdGNoUGFydCkucmV2ZXJzZSgpXG59XG4iXX0=