const execa = require("execa");
const utils = require("./index");

async function runCommand(command, args = []) {
    try {
        await execa(command, args, { stdio: "inherit", shell: true });
    } catch (error) {
        utils.logger.error(error.message);
        process.exit(2);
    }
}

module.exports = runCommand;
