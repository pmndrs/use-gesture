const WebpackCLI = require("./webpack-cli");
const utils = require("./utils");

const runCLI = async (args, originalModuleCompile) => {
    try {
        // Create a new instance of the CLI object
        const cli = new WebpackCLI();

        cli._originalModuleCompile = originalModuleCompile;

        await cli.run(args);
    } catch (error) {
        utils.logger.error(error);
        process.exit(2);
    }
};

module.exports = runCLI;
