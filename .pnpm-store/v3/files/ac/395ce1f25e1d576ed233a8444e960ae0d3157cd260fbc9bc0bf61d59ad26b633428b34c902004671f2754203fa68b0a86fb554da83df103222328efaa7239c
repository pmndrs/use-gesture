const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");
const Module = require("module");

const { program, Option } = require("commander");
const utils = require("./utils");

class WebpackCLI {
    constructor() {
        // Global
        this.webpack = require(process.env.WEBPACK_PACKAGE || "webpack");
        this.logger = utils.logger;
        this.utils = utils;

        // Initialize program
        this.program = program;
        this.program.name("webpack");
        this.program.configureOutput({
            writeErr: this.logger.error,
            outputError: (str, write) =>
                write(
                    `Error: ${this.utils.capitalizeFirstLetter(str.replace(/^error:/, "").trim())}`,
                ),
        });
    }

    async tryRequireThenImport(module, handleError = true) {
        let result;

        try {
            result = require(module);
        } catch (error) {
            let previousModuleCompile;

            // TODO Workaround https://github.com/zertosh/v8-compile-cache/issues/30
            if (this._originalModuleCompile) {
                previousModuleCompile = Module.prototype._compile;

                Module.prototype._compile = this._originalModuleCompile;
            }

            const dynamicImportLoader = this.utils.dynamicImportLoader();

            if (this._originalModuleCompile) {
                Module.prototype._compile = previousModuleCompile;
            }

            if (
                (error.code === "ERR_REQUIRE_ESM" ||
                    process.env.WEBPACK_CLI_FORCE_LOAD_ESM_CONFIG) &&
                pathToFileURL &&
                dynamicImportLoader
            ) {
                const urlForConfig = pathToFileURL(module);

                result = await dynamicImportLoader(urlForConfig);
                result = result.default;

                return result;
            }

            if (handleError) {
                this.logger.error(error);
                process.exit(2);
            } else {
                throw error;
            }
        }

        // For babel/typescript
        if (result.default) {
            result = result.default;
        }

        return result;
    }

    loadJSONFile(pathToFile) {
        let result;

        try {
            result = require(pathToFile);
        } catch (error) {
            this.logger.error(error);
            process.exit(2);
        }

        return result;
    }

    async makeCommand(commandOptions, options, action) {
        const alreadyLoaded = this.program.commands.find(
            (command) =>
                command.name() === commandOptions.name.split(" ")[0] ||
                command.aliases().includes(commandOptions.alias),
        );

        if (alreadyLoaded) {
            return;
        }

        const command = this.program.command(commandOptions.name, {
            noHelp: commandOptions.noHelp,
            hidden: commandOptions.hidden,
            isDefault: commandOptions.isDefault,
        });

        if (commandOptions.description) {
            command.description(commandOptions.description, commandOptions.argsDescription);
        }

        if (commandOptions.usage) {
            command.usage(commandOptions.usage);
        }

        if (Array.isArray(commandOptions.alias)) {
            command.aliases(commandOptions.alias);
        } else {
            command.alias(commandOptions.alias);
        }

        if (commandOptions.pkg) {
            command.pkg = commandOptions.pkg;
        } else {
            command.pkg = "webpack-cli";
        }

        const { forHelp } = this.program;

        let allDependenciesInstalled = true;

        if (commandOptions.dependencies && commandOptions.dependencies.length > 0) {
            for (const dependency of commandOptions.dependencies) {
                const { packageExists } = this.utils;
                const isPkgExist = packageExists(dependency);

                if (isPkgExist) {
                    continue;
                } else if (!isPkgExist && forHelp) {
                    allDependenciesInstalled = false;
                    continue;
                }

                const { promptInstallation, colors } = this.utils;

                await promptInstallation(dependency, () => {
                    this.logger.error(
                        `For using '${colors.green(
                            commandOptions.name.split(" ")[0],
                        )}' command you need to install: '${colors.green(dependency)}' package`,
                    );
                });
            }
        }

        if (options) {
            if (typeof options === "function") {
                if (forHelp && !allDependenciesInstalled) {
                    command.description(
                        `${
                            commandOptions.description
                        } To see all available options you need to install ${commandOptions.dependencies
                            .map((dependency) => `'${dependency}'`)
                            .join(",")}.`,
                    );
                    options = [];
                } else {
                    options = options();
                }
            }

            options.forEach((optionForCommand) => {
                this.makeOption(command, optionForCommand);
            });
        }

        command.action(action);

        return command;
    }

    makeOption(command, option) {
        let mainOption;
        let negativeOption;

        if (option.configs) {
            let needNegativeOption = false;
            const mainOptionType = new Set();

            option.configs.forEach((config) => {
                // Possible value: "enum" | "string" | "path" | "number" | "boolean" | "RegExp" | "reset"
                switch (config.type) {
                    case "reset":
                        mainOptionType.add(Boolean);
                        break;
                    case "boolean":
                        if (!needNegativeOption) {
                            needNegativeOption = true;
                        }

                        mainOptionType.add(Boolean);
                        break;
                    case "number":
                        mainOptionType.add(Number);
                        break;
                    case "string":
                    case "path":
                    case "RegExp":
                        mainOptionType.add(String);
                        break;
                    case "enum": {
                        let hasFalseEnum = false;

                        const enumTypes = config.values.map((value) => {
                            switch (typeof value) {
                                case "string":
                                    mainOptionType.add(String);
                                    break;
                                case "number":
                                    mainOptionType.add(Number);
                                    break;
                                case "boolean":
                                    if (!hasFalseEnum && value === false) {
                                        hasFalseEnum = true;
                                        break;
                                    }

                                    mainOptionType.add(Boolean);
                                    break;
                            }
                        });

                        if (!needNegativeOption) {
                            needNegativeOption = hasFalseEnum;
                        }

                        return enumTypes;
                    }
                }
            });

            mainOption = {
                flags: option.alias ? `-${option.alias}, --${option.name}` : `--${option.name}`,
                description: option.description || "",
                type: mainOptionType,
                multiple: option.multiple,
                defaultValue: option.defaultValue,
            };

            if (needNegativeOption) {
                negativeOption = {
                    flags: `--no-${option.name}`,
                    description: option.negatedDescription
                        ? option.negatedDescription
                        : `Negative '${option.name}' option.`,
                };
            }
        } else {
            mainOption = {
                flags: option.alias ? `-${option.alias}, --${option.name}` : `--${option.name}`,
                // TODO `describe` used by `webpack-dev-server@3`
                description: option.description || option.describe || "",
                type: option.type
                    ? new Set(Array.isArray(option.type) ? option.type : [option.type])
                    : new Set([Boolean]),
                multiple: option.multiple,
                defaultValue: option.defaultValue,
            };

            if (option.negative) {
                negativeOption = {
                    flags: `--no-${option.name}`,
                    description: option.negatedDescription
                        ? option.negatedDescription
                        : `Negative '${option.name}' option.`,
                };
            }
        }

        if (mainOption.type.size > 1 && mainOption.type.has(Boolean)) {
            mainOption.flags = `${mainOption.flags} [value${mainOption.multiple ? "..." : ""}]`;
        } else if (mainOption.type.size > 0 && !mainOption.type.has(Boolean)) {
            mainOption.flags = `${mainOption.flags} <value${mainOption.multiple ? "..." : ""}>`;
        }

        if (mainOption.type.size === 1) {
            if (mainOption.type.has(Number)) {
                let skipDefault = true;

                const optionForCommand = new Option(mainOption.flags, mainOption.description)
                    .argParser((value, prev = []) => {
                        if (mainOption.defaultValue && mainOption.multiple && skipDefault) {
                            prev = [];
                            skipDefault = false;
                        }

                        return mainOption.multiple
                            ? [].concat(prev).concat(Number(value))
                            : Number(value);
                    })
                    .default(mainOption.defaultValue);

                optionForCommand.helpLevel = option.helpLevel;

                command.addOption(optionForCommand);
            } else if (mainOption.type.has(String)) {
                let skipDefault = true;

                const optionForCommand = new Option(mainOption.flags, mainOption.description)
                    .argParser((value, prev = []) => {
                        if (mainOption.defaultValue && mainOption.multiple && skipDefault) {
                            prev = [];
                            skipDefault = false;
                        }

                        return mainOption.multiple ? [].concat(prev).concat(value) : value;
                    })
                    .default(mainOption.defaultValue);

                optionForCommand.helpLevel = option.helpLevel;

                command.addOption(optionForCommand);
            } else if (mainOption.type.has(Boolean)) {
                const optionForCommand = new Option(
                    mainOption.flags,
                    mainOption.description,
                ).default(mainOption.defaultValue);

                optionForCommand.helpLevel = option.helpLevel;

                command.addOption(optionForCommand);
            } else {
                const optionForCommand = new Option(mainOption.flags, mainOption.description)
                    .argParser(Array.from(mainOption.type)[0])
                    .default(mainOption.defaultValue);

                optionForCommand.helpLevel = option.helpLevel;

                command.addOption(optionForCommand);
            }
        } else if (mainOption.type.size > 1) {
            let skipDefault = true;

            const optionForCommand = new Option(
                mainOption.flags,
                mainOption.description,
                mainOption.defaultValue,
            )
                .argParser((value, prev = []) => {
                    if (mainOption.defaultValue && mainOption.multiple && skipDefault) {
                        prev = [];
                        skipDefault = false;
                    }

                    if (mainOption.type.has(Number)) {
                        const numberValue = Number(value);

                        if (!isNaN(numberValue)) {
                            return mainOption.multiple
                                ? [].concat(prev).concat(numberValue)
                                : numberValue;
                        }
                    }

                    if (mainOption.type.has(String)) {
                        return mainOption.multiple ? [].concat(prev).concat(value) : value;
                    }

                    return value;
                })
                .default(mainOption.defaultValue);

            optionForCommand.helpLevel = option.helpLevel;

            command.addOption(optionForCommand);
        } else if (mainOption.type.size === 0 && negativeOption) {
            const optionForCommand = new Option(mainOption.flags, mainOption.description);

            // Hide stub option
            optionForCommand.hideHelp();
            optionForCommand.helpLevel = option.helpLevel;

            command.addOption(optionForCommand);
        }

        if (negativeOption) {
            const optionForCommand = new Option(negativeOption.flags, negativeOption.description);

            optionForCommand.helpLevel = option.helpLevel;

            command.addOption(optionForCommand);
        }
    }

    getBuiltInOptions() {
        if (this.builtInOptionsCache) {
            return this.builtInOptionsCache;
        }

        const minimumHelpFlags = [
            "config",
            "config-name",
            "merge",
            "env",
            "mode",
            "watch",
            "watch-options-stdin",
            "stats",
            "devtool",
            "entry",
            "target",
            "progress",
            "json",
            "name",
            "output-path",
            "node-env",
        ];

        const builtInFlags = [
            // For configs
            {
                name: "config",
                alias: "c",
                configs: [
                    {
                        type: "string",
                    },
                ],
                multiple: true,
                description:
                    "Provide path to a webpack configuration file e.g. ./webpack.config.js.",
            },
            {
                name: "config-name",
                configs: [
                    {
                        type: "string",
                    },
                ],
                multiple: true,
                description: "Name of the configuration to use.",
            },
            {
                name: "merge",
                alias: "m",
                configs: [
                    {
                        type: "enum",
                        values: [true],
                    },
                ],
                description: "Merge two or more configurations using 'webpack-merge'.",
            },
            // Complex configs
            {
                name: "env",
                type: (value, previous = {}) => {
                    // for https://github.com/webpack/webpack-cli/issues/2642
                    if (value.endsWith("=")) {
                        value.concat('""');
                    }

                    // This ensures we're only splitting by the first `=`
                    const [allKeys, val] = value.split(/=(.+)/, 2);
                    const splitKeys = allKeys.split(/\.(?!$)/);

                    let prevRef = previous;

                    splitKeys.forEach((someKey, index) => {
                        if (!prevRef[someKey]) {
                            prevRef[someKey] = {};
                        }

                        if (typeof prevRef[someKey] === "string") {
                            prevRef[someKey] = {};
                        }

                        if (index === splitKeys.length - 1) {
                            if (typeof val === "string") {
                                prevRef[someKey] = val;
                            } else {
                                prevRef[someKey] = true;
                            }
                        }

                        prevRef = prevRef[someKey];
                    });

                    return previous;
                },
                multiple: true,
                description: "Environment passed to the configuration when it is a function.",
            },
            {
                name: "node-env",
                configs: [
                    {
                        type: "string",
                    },
                ],
                multiple: false,
                description: "Sets process.env.NODE_ENV to the specified value.",
            },

            // Adding more plugins
            {
                name: "hot",
                alias: "h",
                configs: [
                    {
                        type: "string",
                    },
                    {
                        type: "boolean",
                    },
                ],
                negative: true,
                description: "Enables Hot Module Replacement",
                negatedDescription: "Disables Hot Module Replacement.",
            },
            {
                name: "analyze",
                configs: [
                    {
                        type: "enum",
                        values: [true],
                    },
                ],
                multiple: false,
                description: "It invokes webpack-bundle-analyzer plugin to get bundle information.",
            },
            {
                name: "progress",
                configs: [
                    {
                        type: "string",
                    },
                    {
                        type: "enum",
                        values: [true],
                    },
                ],
                description: "Print compilation progress during build.",
            },
            {
                name: "prefetch",
                configs: [
                    {
                        type: "string",
                    },
                ],
                description: "Prefetch this request.",
            },

            // Output options
            {
                name: "json",
                configs: [
                    {
                        type: "string",
                    },
                    {
                        type: "enum",
                        values: [true],
                    },
                ],
                alias: "j",
                description: "Prints result as JSON or store it in a file.",
            },

            // For webpack@4
            {
                name: "entry",
                configs: [
                    {
                        type: "string",
                    },
                ],
                multiple: true,
                description: "The entry point(s) of your application e.g. ./src/main.js.",
            },
            {
                name: "output-path",
                alias: "o",
                configs: [
                    {
                        type: "string",
                    },
                ],
                description: "Output location of the file generated by webpack e.g. ./dist/.",
            },
            {
                name: "target",
                alias: "t",
                configs: [
                    {
                        type: "string",
                    },
                ],
                multiple: this.webpack.cli !== undefined,
                description: "Sets the build target e.g. node.",
            },
            {
                name: "devtool",
                configs: [
                    {
                        type: "string",
                    },
                    {
                        type: "enum",
                        values: [false],
                    },
                ],
                negative: true,
                alias: "d",
                description: "Determine source maps to use.",
                negatedDescription: "Do not generate source maps.",
            },
            {
                name: "mode",
                configs: [
                    {
                        type: "string",
                    },
                ],
                description: "Defines the mode to pass to webpack.",
            },
            {
                name: "name",
                configs: [
                    {
                        type: "string",
                    },
                ],
                description:
                    "Name of the configuration. Used when loading multiple configurations.",
            },
            {
                name: "stats",
                configs: [
                    {
                        type: "string",
                    },
                    {
                        type: "boolean",
                    },
                ],
                negative: true,
                description: "It instructs webpack on how to treat the stats e.g. verbose.",
                negatedDescription: "Disable stats output.",
            },
            {
                name: "watch",
                configs: [
                    {
                        type: "boolean",
                    },
                ],
                negative: true,
                alias: "w",
                description: "Watch for files changes.",
                negatedDescription: "Do not watch for file changes.",
            },
            {
                name: "watch-options-stdin",
                configs: [
                    {
                        type: "boolean",
                    },
                ],
                negative: true,
                description: "Stop watching when stdin stream has ended.",
                negatedDescription: "Do not stop watching when stdin stream has ended.",
            },
        ];

        // Extract all the flags being exported from core.
        // A list of cli flags generated by core can be found here https://github.com/webpack/webpack/blob/master/test/__snapshots__/Cli.test.js.snap
        const coreFlags = this.webpack.cli
            ? Object.entries(this.webpack.cli.getArguments()).map(([flag, meta]) => {
                  const inBuiltIn = builtInFlags.find((builtInFlag) => builtInFlag.name === flag);

                  if (inBuiltIn) {
                      return {
                          ...meta,
                          name: flag,
                          group: "core",
                          ...inBuiltIn,
                          configs: meta.configs || [],
                      };
                  }

                  return { ...meta, name: flag, group: "core" };
              })
            : [];

        const options = []
            .concat(
                builtInFlags.filter(
                    (builtInFlag) =>
                        !coreFlags.find((coreFlag) => builtInFlag.name === coreFlag.name),
                ),
            )
            .concat(coreFlags)
            .map((option) => {
                option.helpLevel = minimumHelpFlags.includes(option.name) ? "minimum" : "verbose";

                return option;
            });

        this.builtInOptionsCache = options;

        return options;
    }

    applyNodeEnv(options) {
        if (typeof options.nodeEnv === "string") {
            process.env.NODE_ENV = options.nodeEnv;
        }
    }

    async run(args, parseOptions) {
        // Built-in internal commands
        const buildCommandOptions = {
            name: "build [entries...]",
            alias: ["bundle", "b"],
            description: "Run webpack (default command, can be omitted).",
            usage: "[entries...] [options]",
        };
        const watchCommandOptions = {
            name: "watch [entries...]",
            alias: "w",
            description: "Run webpack and watch for files changes.",
            usage: "[entries...] [options]",
        };
        const versionCommandOptions = {
            name: "version [commands...]",
            alias: "v",
            description:
                "Output the version number of 'webpack', 'webpack-cli' and 'webpack-dev-server' and commands.",
        };
        const helpCommandOptions = {
            name: "help [command] [option]",
            alias: "h",
            description: "Display help for commands and options.",
        };
        // Built-in external commands
        const externalBuiltInCommandsInfo = [
            {
                name: "serve [entries...]",
                alias: ["server", "s"],
                pkg: "@webpack-cli/serve",
            },
            {
                name: "info",
                alias: "i",
                pkg: "@webpack-cli/info",
            },
            {
                name: "init",
                alias: ["create", "new", "c", "n"],
                pkg: "@webpack-cli/generators",
            },
            {
                name: "loader",
                alias: "l",
                pkg: "@webpack-cli/generators",
            },
            {
                name: "plugin",
                alias: "p",
                pkg: "@webpack-cli/generators",
            },
            {
                name: "migrate",
                alias: "m",
                pkg: "@webpack-cli/migrate",
            },
            {
                name: "configtest [config-path]",
                alias: "t",
                pkg: "@webpack-cli/configtest",
            },
        ];

        const knownCommands = [
            buildCommandOptions,
            watchCommandOptions,
            versionCommandOptions,
            helpCommandOptions,
            ...externalBuiltInCommandsInfo,
        ];
        const getCommandName = (name) => name.split(" ")[0];
        const isKnownCommand = (name) =>
            knownCommands.find(
                (command) =>
                    getCommandName(command.name) === name ||
                    (Array.isArray(command.alias)
                        ? command.alias.includes(name)
                        : command.alias === name),
            );
        const isCommand = (input, commandOptions) => {
            const longName = getCommandName(commandOptions.name);

            if (input === longName) {
                return true;
            }

            if (commandOptions.alias) {
                if (Array.isArray(commandOptions.alias)) {
                    return commandOptions.alias.includes(input);
                } else {
                    return commandOptions.alias === input;
                }
            }

            return false;
        };
        const findCommandByName = (name) =>
            this.program.commands.find(
                (command) => name === command.name() || command.aliases().includes(name),
            );
        const isOption = (value) => value.startsWith("-");
        const isGlobalOption = (value) =>
            value === "--color" ||
            value === "--no-color" ||
            value === "-v" ||
            value === "--version" ||
            value === "-h" ||
            value === "--help";

        const loadCommandByName = async (commandName, allowToInstall = false) => {
            const isBuildCommandUsed = isCommand(commandName, buildCommandOptions);
            const isWatchCommandUsed = isCommand(commandName, watchCommandOptions);

            if (isBuildCommandUsed || isWatchCommandUsed) {
                const options = this.getBuiltInOptions();

                await this.makeCommand(
                    isBuildCommandUsed ? buildCommandOptions : watchCommandOptions,
                    isWatchCommandUsed
                        ? options.filter((option) => option.name !== "watch")
                        : options,
                    async (entries, options) => {
                        if (entries.length > 0) {
                            options.entry = [...entries, ...(options.entry || [])];
                        }

                        await this.runWebpack(options, isWatchCommandUsed);
                    },
                );
            } else if (isCommand(commandName, helpCommandOptions)) {
                // Stub for the `help` command
                this.makeCommand(helpCommandOptions, [], () => {});
            } else if (isCommand(commandName, versionCommandOptions)) {
                // Stub for the `help` command
                this.makeCommand(versionCommandOptions, [], () => {});
            } else {
                const builtInExternalCommandInfo = externalBuiltInCommandsInfo.find(
                    (externalBuiltInCommandInfo) =>
                        getCommandName(externalBuiltInCommandInfo.name) === commandName ||
                        (Array.isArray(externalBuiltInCommandInfo.alias)
                            ? externalBuiltInCommandInfo.alias.includes(commandName)
                            : externalBuiltInCommandInfo.alias === commandName),
                );

                let pkg;

                if (builtInExternalCommandInfo) {
                    ({ pkg } = builtInExternalCommandInfo);
                } else {
                    pkg = commandName;
                }

                if (pkg !== "webpack-cli" && !this.utils.packageExists(pkg)) {
                    if (!allowToInstall) {
                        return;
                    }

                    const { promptInstallation, colors } = this.utils;

                    pkg = await promptInstallation(pkg, () => {
                        this.logger.error(
                            `For using this command you need to install: '${colors.green(
                                pkg,
                            )}' package`,
                        );
                    });
                }

                let loadedCommand;

                try {
                    loadedCommand = await this.tryRequireThenImport(pkg, false);
                } catch (error) {
                    // Ignore, command is not installed

                    return;
                }

                let command;

                try {
                    command = new loadedCommand();

                    await command.apply(this);
                } catch (error) {
                    this.logger.error(`Unable to load '${pkg}' command`);
                    this.logger.error(error);
                    process.exit(2);
                }
            }
        };

        // Register own exit
        this.program.exitOverride(async (error) => {
            if (error.exitCode === 0) {
                process.exit(0);
            }

            if (error.code === "executeSubCommandAsync") {
                process.exit(2);
            }

            if (error.code === "commander.help") {
                process.exit(0);
            }

            if (error.code === "commander.unknownOption") {
                let name = error.message.match(/'(.+)'/);

                if (name) {
                    name = name[1].substr(2);

                    if (name.includes("=")) {
                        name = name.split("=")[0];
                    }

                    const { operands } = this.program.parseOptions(this.program.args);
                    const operand =
                        typeof operands[0] !== "undefined"
                            ? operands[0]
                            : getCommandName(buildCommandOptions.name);

                    if (operand) {
                        const command = findCommandByName(operand);

                        if (!command) {
                            this.logger.error(`Can't find and load command '${operand}'`);
                            this.logger.error(
                                "Run 'webpack --help' to see available commands and options",
                            );
                            process.exit(2);
                        }

                        command.options.forEach((option) => {
                            if (
                                !option.hidden &&
                                this.utils.levenshtein.distance(name, option.long.slice(2)) < 3
                            ) {
                                this.logger.error(`Did you mean '--${option.name()}'?`);
                            }
                        });
                    }
                }
            }

            // Codes:
            // - commander.unknownCommand
            // - commander.missingArgument
            // - commander.missingMandatoryOptionValue
            // - commander.optionMissingArgument

            this.logger.error("Run 'webpack --help' to see available commands and options");
            process.exit(2);
        });

        // Default `--color` and `--no-color` options
        const cli = this;
        this.program.option("--color", "Enable colors on console.");
        this.program.on("option:color", function () {
            const { color } = this.opts();

            cli.utils.colors.options.changed = true;
            cli.utils.colors.options.enabled = color;
        });
        this.program.option("--no-color", "Disable colors on console.");
        this.program.on("option:no-color", function () {
            const { color } = this.opts();

            cli.utils.colors.options.changed = true;
            cli.utils.colors.options.enabled = color;
        });

        // Make `-v, --version` options
        // Make `version|v [commands...]` command
        const outputVersion = async (options) => {
            // Filter `bundle`, `watch`, `version` and `help` commands
            const possibleCommandNames = options.filter(
                (option) =>
                    !isCommand(option, buildCommandOptions) &&
                    !isCommand(option, watchCommandOptions) &&
                    !isCommand(option, versionCommandOptions) &&
                    !isCommand(option, helpCommandOptions),
            );

            possibleCommandNames.forEach((possibleCommandName) => {
                if (!isOption(possibleCommandName)) {
                    return;
                }

                this.logger.error(`Unknown option '${possibleCommandName}'`);
                this.logger.error("Run 'webpack --help' to see available commands and options");
                process.exit(2);
            });

            if (possibleCommandNames.length > 0) {
                await Promise.all(
                    possibleCommandNames.map((possibleCommand) =>
                        loadCommandByName(possibleCommand),
                    ),
                );

                for (const possibleCommandName of possibleCommandNames) {
                    const foundCommand = findCommandByName(possibleCommandName);

                    if (!foundCommand) {
                        this.logger.error(`Unknown command '${possibleCommandName}'`);
                        this.logger.error(
                            "Run 'webpack --help' to see available commands and options",
                        );
                        process.exit(2);
                    }

                    try {
                        const { name, version } = this.loadJSONFile(
                            `${foundCommand.pkg}/package.json`,
                        );

                        this.logger.raw(`${name} ${version}`);
                    } catch (e) {
                        this.logger.error(
                            `Error: External package '${foundCommand.pkg}' not found`,
                        );
                        process.exit(2);
                    }
                }
            }

            const pkgJSON = this.loadJSONFile("../package.json");

            this.logger.raw(`webpack ${this.webpack.version}`);
            this.logger.raw(`webpack-cli ${pkgJSON.version}`);

            if (this.utils.packageExists("webpack-dev-server")) {
                const { version } = this.loadJSONFile("webpack-dev-server/package.json");

                this.logger.raw(`webpack-dev-server ${version}`);
            }

            process.exit(0);
        };
        this.program.option(
            "-v, --version",
            "Output the version number of 'webpack', 'webpack-cli' and 'webpack-dev-server' and commands.",
        );

        const outputHelp = async (options, isVerbose, isHelpCommandSyntax, program) => {
            const { bold } = this.utils.colors;

            const outputIncorrectUsageOfHelp = () => {
                this.logger.error("Incorrect use of help");
                this.logger.error(
                    "Please use: 'webpack help [command] [option]' | 'webpack [command] --help'",
                );
                this.logger.error("Run 'webpack --help' to see available commands and options");
                process.exit(2);
            };

            const isGlobalHelp = options.length === 0;
            const isCommandHelp = options.length === 1 && !isOption(options[0]);

            if (isGlobalHelp || isCommandHelp) {
                program.configureHelp({
                    sortSubcommands: true,
                    // Support multiple aliases
                    commandUsage: (command) => {
                        let parentCmdNames = "";

                        for (
                            let parentCmd = command.parent;
                            parentCmd;
                            parentCmd = parentCmd.parent
                        ) {
                            parentCmdNames = `${parentCmd.name()} ${parentCmdNames}`;
                        }

                        if (isGlobalHelp) {
                            return `${parentCmdNames}${command.usage()}\n${this.utils.colors.bold(
                                "Alternative usage to run commands:",
                            )} ${parentCmdNames}[command] [options]`;
                        }

                        return `${parentCmdNames}${command.name()}|${command
                            .aliases()
                            .join("|")} ${command.usage()}`;
                    },
                    // Support multiple aliases
                    subcommandTerm: (command) => {
                        const humanReadableArgumentName = (argument) => {
                            const nameOutput =
                                argument.name + (argument.variadic === true ? "..." : "");

                            return argument.required
                                ? "<" + nameOutput + ">"
                                : "[" + nameOutput + "]";
                        };
                        const args = command._args
                            .map((arg) => humanReadableArgumentName(arg))
                            .join(" ");

                        return `${command.name()}|${command.aliases().join("|")}${
                            args ? ` ${args}` : ""
                        }${command.options.length > 0 ? " [options]" : ""}`;
                    },
                    visibleOptions: function visibleOptions(command) {
                        return command.options.filter((option) => {
                            if (option.hidden) {
                                return false;
                            }

                            switch (option.helpLevel) {
                                case "verbose":
                                    return isVerbose;
                                case "minimum":
                                default:
                                    return true;
                            }
                        });
                    },
                    padWidth(command, helper) {
                        return Math.max(
                            helper.longestArgumentTermLength(command, helper),
                            helper.longestOptionTermLength(command, helper),
                            // For global options
                            helper.longestOptionTermLength(program, helper),
                            helper.longestSubcommandTermLength(
                                isGlobalHelp ? program : command,
                                helper,
                            ),
                        );
                    },
                    formatHelp: (command, helper) => {
                        const termWidth = helper.padWidth(command, helper);
                        const helpWidth =
                            helper.helpWidth || process.env.WEBPACK_CLI_HELP_WIDTH || 80;
                        const itemIndentWidth = 2;
                        const itemSeparatorWidth = 2; // between term and description

                        const formatItem = (term, description) => {
                            if (description) {
                                const fullText = `${term.padEnd(
                                    termWidth + itemSeparatorWidth,
                                )}${description}`;

                                return helper.wrap(
                                    fullText,
                                    helpWidth - itemIndentWidth,
                                    termWidth + itemSeparatorWidth,
                                );
                            }

                            return term;
                        };

                        const formatList = (textArray) =>
                            textArray.join("\n").replace(/^/gm, " ".repeat(itemIndentWidth));

                        // Usage
                        let output = [`${bold("Usage:")} ${helper.commandUsage(command)}`, ""];

                        // Description
                        const commandDescription = isGlobalHelp
                            ? "The build tool for modern web applications."
                            : helper.commandDescription(command);

                        if (commandDescription.length > 0) {
                            output = output.concat([commandDescription, ""]);
                        }

                        // Arguments
                        const argumentList = helper
                            .visibleArguments(command)
                            .map((argument) => formatItem(argument.term, argument.description));

                        if (argumentList.length > 0) {
                            output = output.concat([
                                bold("Arguments:"),
                                formatList(argumentList),
                                "",
                            ]);
                        }

                        // Options
                        const optionList = helper
                            .visibleOptions(command)
                            .map((option) =>
                                formatItem(
                                    helper.optionTerm(option),
                                    helper.optionDescription(option),
                                ),
                            );

                        if (optionList.length > 0) {
                            output = output.concat([bold("Options:"), formatList(optionList), ""]);
                        }

                        // Global options
                        const globalOptionList = program.options.map((option) =>
                            formatItem(helper.optionTerm(option), helper.optionDescription(option)),
                        );

                        if (globalOptionList.length > 0) {
                            output = output.concat([
                                bold("Global options:"),
                                formatList(globalOptionList),
                                "",
                            ]);
                        }

                        // Commands
                        const commandList = helper
                            .visibleCommands(isGlobalHelp ? program : command)
                            .map((command) =>
                                formatItem(
                                    helper.subcommandTerm(command),
                                    helper.subcommandDescription(command),
                                ),
                            );

                        if (commandList.length > 0) {
                            output = output.concat([
                                bold("Commands:"),
                                formatList(commandList),
                                "",
                            ]);
                        }

                        return output.join("\n");
                    },
                });

                if (isGlobalHelp) {
                    await Promise.all(
                        knownCommands.map((knownCommand) => {
                            return loadCommandByName(getCommandName(knownCommand.name));
                        }),
                    );

                    const buildCommand = findCommandByName(
                        getCommandName(buildCommandOptions.name),
                    );

                    this.logger.raw(buildCommand.helpInformation());
                } else {
                    const name = options[0];

                    await loadCommandByName(name);

                    const command = findCommandByName(name);

                    if (!command) {
                        const builtInCommandUsed = externalBuiltInCommandsInfo.find(
                            (command) => command.name.includes(name) || name === command.alias,
                        );
                        if (typeof builtInCommandUsed !== "undefined") {
                            this.logger.error(
                                `For using '${name}' command you need to install '${builtInCommandUsed.pkg}' package`,
                            );
                        } else {
                            this.logger.error(`Can't find and load command '${name}'`);
                            this.logger.error(
                                "Run 'webpack --help' to see available commands and options",
                            );
                        }
                        process.exit(2);
                    }

                    this.logger.raw(command.helpInformation());
                }
            } else if (isHelpCommandSyntax) {
                let isCommandSpecified = false;
                let commandName = getCommandName(buildCommandOptions.name);
                let optionName;

                if (options.length === 1) {
                    optionName = options[0];
                } else if (options.length === 2) {
                    isCommandSpecified = true;
                    commandName = options[0];
                    optionName = options[1];

                    if (isOption(commandName)) {
                        outputIncorrectUsageOfHelp();
                    }
                } else {
                    outputIncorrectUsageOfHelp();
                }

                await loadCommandByName(commandName);

                const command = isGlobalOption(optionName)
                    ? program
                    : findCommandByName(commandName);

                if (!command) {
                    this.logger.error(`Can't find and load command '${commandName}'`);
                    this.logger.error("Run 'webpack --help' to see available commands and options");
                    process.exit(2);
                }

                const option = command.options.find(
                    (option) => option.short === optionName || option.long === optionName,
                );

                if (!option) {
                    this.logger.error(`Unknown option '${optionName}'`);
                    this.logger.error("Run 'webpack --help' to see available commands and options");
                    process.exit(2);
                }

                const nameOutput =
                    option.flags.replace(/^.+[[<]/, "").replace(/(\.\.\.)?[\]>].*$/, "") +
                    (option.variadic === true ? "..." : "");
                const value = option.required
                    ? "<" + nameOutput + ">"
                    : option.optional
                    ? "[" + nameOutput + "]"
                    : "";

                this.logger.raw(
                    `${bold("Usage")}: webpack${isCommandSpecified ? ` ${commandName}` : ""} ${
                        option.long
                    }${value ? ` ${value}` : ""}`,
                );

                if (option.short) {
                    this.logger.raw(
                        `${bold("Short:")} webpack${isCommandSpecified ? ` ${commandName}` : ""} ${
                            option.short
                        }${value ? ` ${value}` : ""}`,
                    );
                }

                if (option.description) {
                    this.logger.raw(`${bold("Description:")} ${option.description}`);
                }

                if (!option.negate && option.defaultValue) {
                    this.logger.raw(
                        `${bold("Default value:")} ${JSON.stringify(option.defaultValue)}`,
                    );
                }

                const flag = this.getBuiltInOptions().find(
                    (flag) => option.long === `--${flag.name}`,
                );

                if (flag && flag.configs) {
                    const possibleValues = flag.configs.reduce((accumulator, currentValue) => {
                        if (currentValue.values) {
                            return accumulator.concat(currentValue.values);
                        } else {
                            return accumulator;
                        }
                    }, []);

                    if (possibleValues.length > 0) {
                        this.logger.raw(
                            `${bold("Possible values:")} ${JSON.stringify(
                                possibleValues.join(" | "),
                            )}`,
                        );
                    }
                }

                this.logger.raw("");

                // TODO implement this after refactor cli arguments
                // logger.raw('Documentation: https://webpack.js.org/option/name/');
            } else {
                outputIncorrectUsageOfHelp();
            }

            this.logger.raw(
                "To see list of all supported commands and options run 'webpack --help=verbose'.\n",
            );
            this.logger.raw(`${bold("Webpack documentation:")} https://webpack.js.org/.`);
            this.logger.raw(`${bold("CLI documentation:")} https://webpack.js.org/api/cli/.`);
            this.logger.raw(`${bold("Made with ♥ by the webpack team")}.`);
            process.exit(0);
        };
        this.program.helpOption(false);
        this.program.addHelpCommand(false);
        this.program.option("-h, --help [verbose]", "Display help for commands and options.");

        let isInternalActionCalled = false;

        // Default action
        this.program.usage("[options]");
        this.program.allowUnknownOption(true);
        this.program.action(async (options, program) => {
            if (!isInternalActionCalled) {
                isInternalActionCalled = true;
            } else {
                this.logger.error("No commands found to run");
                process.exit(2);
            }

            // Command and options
            const { operands, unknown } = this.program.parseOptions(program.args);
            const defaultCommandToRun = getCommandName(buildCommandOptions.name);
            const hasOperand = typeof operands[0] !== "undefined";
            const operand = hasOperand ? operands[0] : defaultCommandToRun;
            const isHelpOption = typeof options.help !== "undefined";
            const isHelpCommandSyntax = isCommand(operand, helpCommandOptions);

            if (isHelpOption || isHelpCommandSyntax) {
                let isVerbose = false;

                if (isHelpOption) {
                    if (typeof options.help === "string") {
                        if (options.help !== "verbose") {
                            this.logger.error(
                                "Unknown value for '--help' option, please use '--help=verbose'",
                            );
                            process.exit(2);
                        }

                        isVerbose = true;
                    }
                }

                this.program.forHelp = true;

                const optionsForHelp = []
                    .concat(isHelpOption && hasOperand ? [operand] : [])
                    // Syntax `webpack help [command]`
                    .concat(operands.slice(1))
                    // Syntax `webpack help [option]`
                    .concat(unknown)
                    .concat(
                        isHelpCommandSyntax && typeof options.color !== "undefined"
                            ? [options.color ? "--color" : "--no-color"]
                            : [],
                    )
                    .concat(
                        isHelpCommandSyntax && typeof options.version !== "undefined"
                            ? ["--version"]
                            : [],
                    );

                await outputHelp(optionsForHelp, isVerbose, isHelpCommandSyntax, program);
            }

            const isVersionOption = typeof options.version !== "undefined";
            const isVersionCommandSyntax = isCommand(operand, versionCommandOptions);

            if (isVersionOption || isVersionCommandSyntax) {
                const optionsForVersion = []
                    .concat(isVersionOption ? [operand] : [])
                    .concat(operands.slice(1))
                    .concat(unknown);

                await outputVersion(optionsForVersion, program);
            }

            let commandToRun = operand;
            let commandOperands = operands.slice(1);

            if (isKnownCommand(commandToRun)) {
                await loadCommandByName(commandToRun, true);
            } else {
                const isEntrySyntax = fs.existsSync(operand);

                if (isEntrySyntax) {
                    commandToRun = defaultCommandToRun;
                    commandOperands = operands;

                    await loadCommandByName(commandToRun);
                } else {
                    this.logger.error(`Unknown command or entry '${operand}'`);

                    const found = knownCommands.find(
                        (commandOptions) =>
                            this.utils.levenshtein.distance(
                                operand,
                                getCommandName(commandOptions.name),
                            ) < 3,
                    );

                    if (found) {
                        this.logger.error(
                            `Did you mean '${getCommandName(found.name)}' (alias '${
                                Array.isArray(found.alias) ? found.alias.join(", ") : found.alias
                            }')?`,
                        );
                    }

                    this.logger.error("Run 'webpack --help' to see available commands and options");
                    process.exit(2);
                }
            }

            await this.program.parseAsync([commandToRun, ...commandOperands, ...unknown], {
                from: "user",
            });
        });

        await this.program.parseAsync(args, parseOptions);
    }

    async loadConfig(configPath, argv = {}) {
        const { interpret } = this.utils;
        const ext = path.extname(configPath);
        const interpreted = Object.keys(interpret.jsVariants).find((variant) => variant === ext);

        if (interpreted) {
            const { rechoir } = this.utils;

            try {
                rechoir.prepare(interpret.extensions, configPath);
            } catch (error) {
                if (error.failures) {
                    this.logger.error(`Unable load '${configPath}'`);
                    this.logger.error(error.message);

                    error.failures.forEach((failure) => {
                        this.logger.error(failure.error.message);
                    });
                    this.logger.error("Please install one of them");
                    process.exit(2);
                }

                this.logger.error(error);
                process.exit(2);
            }
        }

        let options;

        try {
            options = await this.tryRequireThenImport(configPath, false);
        } catch (error) {
            this.logger.error(`Failed to load '${configPath}' config`);

            if (this.isValidationError(error)) {
                this.logger.error(error.message);
            } else {
                this.logger.error(error);
            }

            process.exit(2);
        }

        if (Array.isArray(options)) {
            await Promise.all(
                options.map(async (_, i) => {
                    if (typeof options[i].then === "function") {
                        options[i] = await options[i];
                    }

                    // `Promise` may return `Function`
                    if (typeof options[i] === "function") {
                        // when config is a function, pass the env from args to the config function
                        options[i] = await options[i](argv.env, argv);
                    }
                }),
            );
        } else {
            if (typeof options.then === "function") {
                options = await options;
            }

            // `Promise` may return `Function`
            if (typeof options === "function") {
                // when config is a function, pass the env from args to the config function
                options = await options(argv.env, argv);
            }
        }

        const isObject = (value) => typeof value === "object" && value !== null;

        if (!isObject(options) && !Array.isArray(options)) {
            this.logger.error(`Invalid configuration in '${configPath}'`);

            process.exit(2);
        }

        return { options, path: configPath };
    }

    async resolveConfig(options) {
        const config = { options: {}, path: new WeakMap() };

        if (options.config && options.config.length > 0) {
            const loadedConfigs = await Promise.all(
                options.config.map((configPath) =>
                    this.loadConfig(path.resolve(configPath), options.argv),
                ),
            );

            config.options = [];

            loadedConfigs.forEach((loadedConfig) => {
                const isArray = Array.isArray(loadedConfig.options);

                // TODO we should run webpack multiple times when the `--config` options have multiple values with `--merge`, need to solve for the next major release
                if (config.options.length === 0) {
                    config.options = loadedConfig.options;
                } else {
                    if (!Array.isArray(config.options)) {
                        config.options = [config.options];
                    }

                    if (isArray) {
                        loadedConfig.options.forEach((item) => {
                            config.options.push(item);
                        });
                    } else {
                        config.options.push(loadedConfig.options);
                    }
                }

                if (isArray) {
                    loadedConfig.options.forEach((options) => {
                        config.path.set(options, loadedConfig.path);
                    });
                } else {
                    config.path.set(loadedConfig.options, loadedConfig.path);
                }
            });

            config.options = config.options.length === 1 ? config.options[0] : config.options;
        } else {
            const { interpret } = this.utils;

            // Order defines the priority, in decreasing order
            const defaultConfigFiles = [
                "webpack.config",
                ".webpack/webpack.config",
                ".webpack/webpackfile",
            ]
                .map((filename) =>
                    // Since .cjs is not available on interpret side add it manually to default config extension list
                    [...Object.keys(interpret.extensions), ".cjs"].map((ext) => ({
                        path: path.resolve(filename + ext),
                        ext: ext,
                        module: interpret.extensions[ext],
                    })),
                )
                .reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);

            let foundDefaultConfigFile;

            for (const defaultConfigFile of defaultConfigFiles) {
                if (!fs.existsSync(defaultConfigFile.path)) {
                    continue;
                }

                foundDefaultConfigFile = defaultConfigFile;
                break;
            }

            if (foundDefaultConfigFile) {
                const loadedConfig = await this.loadConfig(
                    foundDefaultConfigFile.path,
                    options.argv,
                );

                config.options = loadedConfig.options;

                if (Array.isArray(config.options)) {
                    config.options.forEach((item) => {
                        config.path.set(item, loadedConfig.path);
                    });
                } else {
                    config.path.set(loadedConfig.options, loadedConfig.path);
                }
            }
        }

        if (options.configName) {
            const notFoundConfigNames = [];

            config.options = options.configName.map((configName) => {
                let found;

                if (Array.isArray(config.options)) {
                    found = config.options.find((options) => options.name === configName);
                } else {
                    found = config.options.name === configName ? config.options : undefined;
                }

                if (!found) {
                    notFoundConfigNames.push(configName);
                }

                return found;
            });

            if (notFoundConfigNames.length > 0) {
                this.logger.error(
                    notFoundConfigNames
                        .map(
                            (configName) =>
                                `Configuration with the name "${configName}" was not found.`,
                        )
                        .join(" "),
                );
                process.exit(2);
            }
        }

        if (options.merge) {
            const merge = await this.tryRequireThenImport("webpack-merge");

            // we can only merge when there are multiple configurations
            // either by passing multiple configs by flags or passing a
            // single config exporting an array
            if (!Array.isArray(config.options) || config.options.length <= 1) {
                this.logger.error("At least two configurations are required for merge.");
                process.exit(2);
            }

            const mergedConfigPaths = [];

            config.options = config.options.reduce((accumulator, options) => {
                const configPath = config.path.get(options);
                const mergedOptions = merge(accumulator, options);

                mergedConfigPaths.push(configPath);

                return mergedOptions;
            }, {});
            config.path.set(config.options, mergedConfigPaths);
        }

        return config;
    }

    runFunctionOnOptions(options, fn) {
        if (Array.isArray(options)) {
            for (let item of options) {
                item = fn(item);
            }
        } else {
            options = fn(options);
        }

        return options;
    }

    // TODO refactor
    async applyOptions(config, options) {
        if (options.analyze) {
            if (!this.utils.packageExists("webpack-bundle-analyzer")) {
                const { promptInstallation, colors } = this.utils;

                await promptInstallation("webpack-bundle-analyzer", () => {
                    this.logger.error(
                        `It looks like ${colors.yellow(
                            "webpack-bundle-analyzer",
                        )} is not installed.`,
                    );
                });

                this.logger.success(
                    `${colors.yellow("webpack-bundle-analyzer")} was installed successfully.`,
                );
            }
        }

        if (typeof options.progress === "string" && options.progress !== "profile") {
            this.logger.error(
                `'${options.progress}' is an invalid value for the --progress option. Only 'profile' is allowed.`,
            );
            process.exit(2);
        }

        if (typeof options.hot === "string" && options.hot !== "only") {
            this.logger.error(
                `'${options.hot}' is an invalid value for the --hot option. Use 'only' instead.`,
            );
            process.exit(2);
        }

        const outputHints = (configOptions) => {
            if (
                configOptions.watch &&
                options.argv &&
                options.argv.env &&
                (options.argv.env["WEBPACK_WATCH"] || options.argv.env["WEBPACK_SERVE"])
            ) {
                this.logger.warn(
                    `No need to use the '${
                        options.argv.env["WEBPACK_WATCH"] ? "watch" : "serve"
                    }' command together with '{ watch: true }' configuration, it does not make sense.`,
                );

                if (options.argv.env["WEBPACK_SERVE"]) {
                    configOptions.watch = false;
                }
            }

            return configOptions;
        };

        this.runFunctionOnOptions(config.options, outputHints);

        if (this.webpack.cli) {
            const processArguments = (configOptions) => {
                const args = this.getBuiltInOptions()
                    .filter((flag) => flag.group === "core")
                    .reduce((accumulator, flag) => {
                        accumulator[flag.name] = flag;

                        return accumulator;
                    }, {});

                const values = Object.keys(options).reduce((accumulator, name) => {
                    if (name === "argv") {
                        return accumulator;
                    }

                    const kebabName = this.utils.toKebabCase(name);

                    if (args[kebabName]) {
                        accumulator[kebabName] = options[name];
                    }

                    return accumulator;
                }, {});

                const problems = this.webpack.cli.processArguments(args, configOptions, values);

                if (problems) {
                    const groupBy = (xs, key) => {
                        return xs.reduce((rv, x) => {
                            (rv[x[key]] = rv[x[key]] || []).push(x);

                            return rv;
                        }, {});
                    };
                    const problemsByPath = groupBy(problems, "path");

                    for (const path in problemsByPath) {
                        const problems = problemsByPath[path];

                        problems.forEach((problem) => {
                            this.logger.error(
                                `${this.utils.capitalizeFirstLetter(
                                    problem.type.replace(/-/g, " "),
                                )}${problem.value ? ` '${problem.value}'` : ""} for the '--${
                                    problem.argument
                                }' option${problem.index ? ` by index '${problem.index}'` : ""}`,
                            );

                            if (problem.expected) {
                                this.logger.error(`Expected: '${problem.expected}'`);
                            }
                        });
                    }

                    process.exit(2);
                }

                return configOptions;
            };

            this.runFunctionOnOptions(config.options, processArguments);

            const setupDefaultOptions = (configOptions) => {
                // No need to run for webpack@4
                if (configOptions.cache && configOptions.cache.type === "filesystem") {
                    const configPath = config.path.get(configOptions);

                    if (configPath) {
                        if (!configOptions.cache.buildDependencies) {
                            configOptions.cache.buildDependencies = {};
                        }

                        if (!configOptions.cache.buildDependencies.defaultConfig) {
                            configOptions.cache.buildDependencies.defaultConfig = [];
                        }

                        if (Array.isArray(configPath)) {
                            configPath.forEach((item) => {
                                configOptions.cache.buildDependencies.defaultConfig.push(item);
                            });
                        } else {
                            configOptions.cache.buildDependencies.defaultConfig.push(configPath);
                        }
                    }
                }

                return configOptions;
            };

            this.runFunctionOnOptions(config.options, setupDefaultOptions);
        }

        // Logic for webpack@4
        // TODO remove after drop webpack@4
        const processLegacyArguments = (configOptions) => {
            if (options.entry) {
                configOptions.entry = options.entry;
            }

            if (options.outputPath) {
                configOptions.output = {
                    ...configOptions.output,
                    ...{ path: path.resolve(options.outputPath) },
                };
            }

            if (options.target) {
                configOptions.target = options.target;
            }

            if (typeof options.devtool !== "undefined") {
                configOptions.devtool = options.devtool;
            }

            if (options.mode) {
                configOptions.mode = options.mode;
            } else if (
                !configOptions.mode &&
                process.env &&
                process.env.NODE_ENV &&
                (process.env.NODE_ENV === "development" ||
                    process.env.NODE_ENV === "production" ||
                    process.env.NODE_ENV === "none")
            ) {
                configOptions.mode = process.env.NODE_ENV;
            }

            if (options.name) {
                configOptions.name = options.name;
            }

            if (typeof options.stats !== "undefined") {
                configOptions.stats = options.stats;
            }

            if (typeof options.watch !== "undefined") {
                configOptions.watch = options.watch;
            }

            if (typeof options.watchOptionsStdin !== "undefined") {
                configOptions.watchOptions = {
                    ...configOptions.watchOptions,
                    ...{ stdin: options.watchOptionsStdin },
                };
            }

            return configOptions;
        };

        this.runFunctionOnOptions(config.options, processLegacyArguments);

        // Apply `stats` and `stats.colors` options
        const applyStatsOption = (configOptions) => {
            // TODO remove after drop webpack@4
            const statsForWebpack4 = this.webpack.Stats && this.webpack.Stats.presetToOptions;

            if (statsForWebpack4) {
                if (typeof configOptions.stats === "undefined") {
                    configOptions.stats = {};
                } else if (
                    typeof configOptions.stats === "boolean" ||
                    typeof configOptions.stats === "string"
                ) {
                    if (
                        typeof configOptions.stats === "string" &&
                        configOptions.stats !== "none" &&
                        configOptions.stats !== "verbose" &&
                        configOptions.stats !== "detailed" &&
                        configOptions.stats !== "minimal" &&
                        configOptions.stats !== "errors-only" &&
                        configOptions.stats !== "errors-warnings"
                    ) {
                        return configOptions;
                    }

                    configOptions.stats = this.webpack.Stats.presetToOptions(configOptions.stats);
                }
            } else {
                if (typeof configOptions.stats === "undefined") {
                    configOptions.stats = { preset: "normal" };
                } else if (typeof configOptions.stats === "boolean") {
                    configOptions.stats = configOptions.stats
                        ? { preset: "normal" }
                        : { preset: "none" };
                } else if (typeof configOptions.stats === "string") {
                    configOptions.stats = { preset: configOptions.stats };
                }
            }

            let colors;

            // From arguments
            if (typeof this.utils.colors.options.changed !== "undefined") {
                colors = Boolean(this.utils.colors.options.enabled);
            }
            // From stats
            else if (typeof configOptions.stats.colors !== "undefined") {
                colors = configOptions.stats.colors;
            }
            // Default
            else {
                colors = Boolean(this.utils.colors.options.enabled);
            }

            configOptions.stats.colors = colors;

            return configOptions;
        };

        this.runFunctionOnOptions(config.options, applyStatsOption);

        return config;
    }

    async applyCLIPlugin(config, cliOptions) {
        const CLIPlugin = await this.tryRequireThenImport("./plugins/CLIPlugin");

        const addCLIPlugin = (options) => {
            if (!options.plugins) {
                options.plugins = [];
            }

            options.plugins.unshift(
                new CLIPlugin({
                    configPath: config.path.get(options),
                    helpfulOutput: !cliOptions.json,
                    hot: cliOptions.hot,
                    progress: cliOptions.progress,
                    prefetch: cliOptions.prefetch,
                    analyze: cliOptions.analyze,
                }),
            );

            return options;
        };

        this.runFunctionOnOptions(config.options, addCLIPlugin);

        return config;
    }

    needWatchStdin(compiler) {
        if (compiler.compilers) {
            return compiler.compilers.some(
                (compiler) => compiler.options.watchOptions && compiler.options.watchOptions.stdin,
            );
        }

        return compiler.options.watchOptions && compiler.options.watchOptions.stdin;
    }

    isValidationError(error) {
        // https://github.com/webpack/webpack/blob/master/lib/index.js#L267
        // https://github.com/webpack/webpack/blob/v4.44.2/lib/webpack.js#L90
        const ValidationError =
            this.webpack.ValidationError || this.webpack.WebpackOptionsValidationError;

        return error instanceof ValidationError || error.name === "ValidationError";
    }

    async createCompiler(options, callback) {
        this.applyNodeEnv(options);

        let config = await this.resolveConfig(options);

        config = await this.applyOptions(config, options);
        config = await this.applyCLIPlugin(config, options);

        let compiler;

        try {
            compiler = this.webpack(
                config.options,
                callback
                    ? (error, stats) => {
                          if (error && this.isValidationError(error)) {
                              this.logger.error(error.message);
                              process.exit(2);
                          }

                          callback(error, stats);
                      }
                    : callback,
            );
        } catch (error) {
            if (this.isValidationError(error)) {
                this.logger.error(error.message);
            } else {
                this.logger.error(error);
            }

            process.exit(2);
        }

        // TODO webpack@4 return Watching and MultiWatching instead Compiler and MultiCompiler, remove this after drop webpack@4
        if (compiler && compiler.compiler) {
            compiler = compiler.compiler;
        }

        return compiler;
    }

    async runWebpack(options, isWatchCommand) {
        // eslint-disable-next-line prefer-const
        let compiler;
        let createJsonStringifyStream;

        if (options.json) {
            const jsonExt = await this.tryRequireThenImport("@discoveryjs/json-ext");

            createJsonStringifyStream = jsonExt.stringifyStream;
        }

        const callback = (error, stats) => {
            if (error) {
                this.logger.error(error);
                process.exit(2);
            }

            if (stats.hasErrors()) {
                process.exitCode = 1;
            }

            if (!compiler) {
                return;
            }

            const statsOptions = compiler.compilers
                ? {
                      children: compiler.compilers.map((compiler) =>
                          compiler.options ? compiler.options.stats : undefined,
                      ),
                  }
                : compiler.options
                ? compiler.options.stats
                : undefined;

            // TODO webpack@4 doesn't support `{ children: [{ colors: true }, { colors: true }] }` for stats
            const statsForWebpack4 = this.webpack.Stats && this.webpack.Stats.presetToOptions;

            if (compiler.compilers && statsForWebpack4) {
                statsOptions.colors = statsOptions.children.some((child) => child.colors);
            }

            if (options.json && createJsonStringifyStream) {
                const handleWriteError = (error) => {
                    this.logger.error(error);
                    process.exit(2);
                };

                if (options.json === true) {
                    createJsonStringifyStream(stats.toJson(statsOptions))
                        .on("error", handleWriteError)
                        .pipe(process.stdout)
                        .on("error", handleWriteError)
                        .on("close", () => process.stdout.write("\n"));
                } else {
                    createJsonStringifyStream(stats.toJson(statsOptions))
                        .on("error", handleWriteError)
                        .pipe(fs.createWriteStream(options.json))
                        .on("error", handleWriteError)
                        // Use stderr to logging
                        .on("close", () =>
                            process.stderr.write(
                                `[webpack-cli] ${this.utils.colors.green(
                                    `stats are successfully stored as json to ${options.json}`,
                                )}\n`,
                            ),
                        );
                }
            } else {
                const printedStats = stats.toString(statsOptions);

                // Avoid extra empty line when `stats: 'none'`
                if (printedStats) {
                    this.logger.raw(printedStats);
                }
            }
        };

        const env =
            isWatchCommand || options.watch
                ? { WEBPACK_WATCH: true, ...options.env }
                : { WEBPACK_BUNDLE: true, WEBPACK_BUILD: true, ...options.env };

        options.argv = { ...options, env };

        if (isWatchCommand) {
            options.watch = true;
        }

        compiler = await this.createCompiler(options, callback);

        if (!compiler) {
            return;
        }

        const isWatch = (compiler) =>
            compiler.compilers
                ? compiler.compilers.some((compiler) => compiler.options.watch)
                : compiler.options.watch;

        if (isWatch(compiler) && this.needWatchStdin(compiler)) {
            process.stdin.on("end", () => {
                process.exit(0);
            });
            process.stdin.resume();
        }
    }
}

module.exports = WebpackCLI;
