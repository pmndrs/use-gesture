#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const meow = require("meow");
const formatter_1 = require("./lib/formatter");
const lib_1 = require("./lib");
const cli = meow(`
	Usage
	  $ tsd [path]

	Examples
	  $ tsd /path/to/project

	  $ tsd

	    index.test-d.ts
	    ✖  10:20  Argument of type string is not assignable to parameter of type number.
`);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = cli.input.length > 0 ? { cwd: cli.input[0] } : undefined;
        const diagnostics = yield lib_1.default(options);
        if (diagnostics.length > 0) {
            throw new Error(formatter_1.default(diagnostics));
        }
    }
    catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}))();
