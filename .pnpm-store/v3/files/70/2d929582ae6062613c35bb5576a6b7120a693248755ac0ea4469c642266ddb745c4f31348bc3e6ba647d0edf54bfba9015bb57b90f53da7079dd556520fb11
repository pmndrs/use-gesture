const fs = require("fs");
const path = require("path");

function packageExists(packageName) {
    if (process.versions.pnp) {
        return true;
    }

    let dir = __dirname;

    do {
        try {
            if (fs.statSync(path.join(dir, "node_modules", packageName)).isDirectory()) {
                return true;
            }
        } catch (_error) {
            // Nothing
        }
    } while (dir !== (dir = path.dirname(dir)));

    return false;
}

module.exports = packageExists;
