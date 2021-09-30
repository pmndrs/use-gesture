const utils = require("./index");
const util = require("util");

module.exports = {
    error: (val) => console.error(`[webpack-cli] ${utils.colors.red(util.format(val))}`),
    warn: (val) => console.warn(`[webpack-cli] ${utils.colors.yellow(val)}`),
    info: (val) => console.info(`[webpack-cli] ${utils.colors.cyan(val)}`),
    success: (val) => console.log(`[webpack-cli] ${utils.colors.green(val)}`),
    log: (val) => console.log(`[webpack-cli] ${val}`),
    raw: (val) => console.log(val),
};
