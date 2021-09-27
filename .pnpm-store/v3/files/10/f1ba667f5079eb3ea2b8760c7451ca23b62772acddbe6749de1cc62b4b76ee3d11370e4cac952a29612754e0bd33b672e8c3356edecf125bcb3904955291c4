"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const envinfo_1 = __importDefault(require("envinfo"));
const DEFAULT_DETAILS = {
    Binaries: ["Node", "Yarn", "npm"],
    Browsers: [
        "Brave Browser",
        "Chrome",
        "Chrome Canary",
        "Edge",
        "Firefox",
        "Firefox Developer Edition",
        "Firefox Nightly",
        "Internet Explorer",
        "Safari",
        "Safari Technology Preview",
    ],
    Monorepos: ["Yarn Workspaces", "Lerna"],
    System: ["OS", "CPU", "Memory"],
    npmGlobalPackages: ["webpack", "webpack-cli"],
    npmPackages: "*webpack*",
};
class InfoCommand {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    async apply(cli) {
        const { logger } = cli;
        await cli.makeCommand({
            name: "info",
            alias: "i",
            description: "Outputs information about your system.",
            usage: "[options]",
            pkg: "@webpack-cli/info",
        }, [
            {
                name: "output",
                alias: "o",
                configs: [
                    {
                        type: "string",
                    },
                ],
                description: "To get the output in a specified format ( accept json or markdown )",
            },
        ], async (options) => {
            let { output } = options;
            const envinfoConfig = {};
            if (output) {
                // Remove quotes if exist
                output = output.replace(/['"]+/g, "");
                switch (output) {
                    case "markdown":
                        envinfoConfig["markdown"] = true;
                        break;
                    case "json":
                        envinfoConfig["json"] = true;
                        break;
                    default:
                        logger.error(`'${output}' is not a valid value for output`);
                        process.exit(2);
                }
            }
            let info = await envinfo_1.default.run(DEFAULT_DETAILS, envinfoConfig);
            info = info.replace(/npmPackages/g, "Packages");
            info = info.replace(/npmGlobalPackages/g, "Global Packages");
            logger.raw(info);
        });
    }
}
exports.default = InfoCommand;
