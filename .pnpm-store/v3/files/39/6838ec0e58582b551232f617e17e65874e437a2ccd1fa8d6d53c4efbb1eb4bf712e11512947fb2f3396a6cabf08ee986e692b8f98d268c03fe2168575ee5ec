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
const chai_1 = require("chai");
const child_process_1 = require("child_process");
const path_1 = require("path");
const semver = require("semver");
const ts = require("typescript");
const proxyquire = require("proxyquire");
const fs_1 = require("fs");
const promisify = require("util.promisify");
const rimraf_1 = require("rimraf");
const createRequire = require('create-require');
const url_1 = require("url");
const stream_1 = require("stream");
const getStream = require("get-stream");
const execP = promisify(child_process_1.exec);
const TEST_DIR = path_1.join(__dirname, '../tests');
const PROJECT = path_1.join(TEST_DIR, 'tsconfig.json');
const BIN_PATH = path_1.join(TEST_DIR, 'node_modules/.bin/ts-node');
const BIN_SCRIPT_PATH = path_1.join(TEST_DIR, 'node_modules/.bin/ts-node-script');
const SOURCE_MAP_REGEXP = /\/\/# sourceMappingURL=data:application\/json;charset=utf\-8;base64,[\w\+]+=*$/;
// `createRequire` does not exist on older node versions
const testsDirRequire = createRequire(path_1.join(TEST_DIR, 'index.js')); // tslint:disable-line
// Set after ts-node is installed locally
let { register, create, VERSION, createRepl } = {};
// Pack and install ts-node locally, necessary to test package "exports"
before(function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.timeout(5 * 60e3);
        rimraf_1.sync(path_1.join(TEST_DIR, 'node_modules'));
        yield execP(`npm install`, { cwd: TEST_DIR });
        const packageLockPath = path_1.join(TEST_DIR, 'package-lock.json');
        fs_1.existsSync(packageLockPath) && fs_1.unlinkSync(packageLockPath);
        ({ register, create, VERSION, createRepl } = testsDirRequire('ts-node'));
    });
});
describe('ts-node', function () {
    const cmd = `"${BIN_PATH}" --project "${PROJECT}"`;
    const cmdNoProject = `"${BIN_PATH}"`;
    this.timeout(10000);
    it('should export the correct version', function () {
        chai_1.expect(VERSION).to.equal(require('../package.json').version);
    });
    it('should export all CJS entrypoints', function () {
        // Ensure our package.json "exports" declaration allows `require()`ing all our entrypoints
        // https://github.com/TypeStrong/ts-node/pull/1026
        testsDirRequire.resolve('ts-node');
        // only reliably way to ask node for the root path of a dependency is Path.resolve(require.resolve('ts-node/package'), '..')
        testsDirRequire.resolve('ts-node/package');
        testsDirRequire.resolve('ts-node/package.json');
        // All bin entrypoints for people who need to augment our CLI: `node -r otherstuff ./node_modules/ts-node/dist/bin`
        testsDirRequire.resolve('ts-node/dist/bin');
        testsDirRequire.resolve('ts-node/dist/bin.js');
        testsDirRequire.resolve('ts-node/dist/bin-transpile');
        testsDirRequire.resolve('ts-node/dist/bin-transpile.js');
        testsDirRequire.resolve('ts-node/dist/bin-script');
        testsDirRequire.resolve('ts-node/dist/bin-script.js');
        // Must be `require()`able obviously
        testsDirRequire.resolve('ts-node/register');
        testsDirRequire.resolve('ts-node/register/files');
        testsDirRequire.resolve('ts-node/register/transpile-only');
        testsDirRequire.resolve('ts-node/register/type-check');
        // `node --loader ts-node/esm`
        testsDirRequire.resolve('ts-node/esm');
        testsDirRequire.resolve('ts-node/esm.mjs');
        testsDirRequire.resolve('ts-node/esm/transpile-only');
        testsDirRequire.resolve('ts-node/esm/transpile-only.mjs');
    });
    describe('cli', function () {
        this.slow(1000);
        it('should execute cli', function (done) {
            child_process_1.exec(`${cmd} tests/hello-world`, function (err, stdout) {
                chai_1.expect(err).to.equal(null);
                chai_1.expect(stdout).to.equal('Hello, world!\n');
                return done();
            });
        });
        it('shows usage via --help', function (done) {
            child_process_1.exec(`${cmdNoProject} --help`, function (err, stdout) {
                chai_1.expect(err).to.equal(null);
                chai_1.expect(stdout).to.match(/Usage: ts-node /);
                return done();
            });
        });
        it('shows version via -v', function (done) {
            child_process_1.exec(`${cmdNoProject} -v`, function (err, stdout) {
                chai_1.expect(err).to.equal(null);
                chai_1.expect(stdout.trim()).to.equal('v' + testsDirRequire('ts-node/package').version);
                return done();
            });
        });
        it('shows version of compiler via -vv', function (done) {
            child_process_1.exec(`${cmdNoProject} -vv`, function (err, stdout) {
                chai_1.expect(err).to.equal(null);
                chai_1.expect(stdout.trim()).to.equal(`ts-node v${testsDirRequire('ts-node/package').version}\n` +
                    `node ${process.version}\n` +
                    `compiler v${testsDirRequire('typescript/package').version}`);
                return done();
            });
        });
        it('should register via cli', function (done) {
            child_process_1.exec(`node -r ts-node/register hello-world.ts`, {
                cwd: TEST_DIR
            }, function (err, stdout) {
                chai_1.expect(err).to.equal(null);
                chai_1.expect(stdout).to.equal('Hello, world!\n');
                return done();
            });
        });
        it('should execute cli with absolute path', function (done) {
            child_process_1.exec(`${cmd} "${path_1.join(TEST_DIR, 'hello-world')}"`, function (err, stdout) {
                chai_1.expect(err).to.equal(null);
                chai_1.expect(stdout).to.equal('Hello, world!\n');
                return done();
            });
        });
        it('should print scripts', function (done) {
            child_process_1.exec(`${cmd} -pe "import { example } from './tests/complex/index';example()"`, function (err, stdout) {
                chai_1.expect(err).to.equal(null);
                chai_1.expect(stdout).to.equal('example\n');
                return done();
            });
        });
        it('should provide registered information globally', function (done) {
            child_process_1.exec(`${cmd} tests/env`, function (err, stdout) {
                chai_1.expect(err).to.equal(null);
                chai_1.expect(stdout).to.equal('object\n');
                return done();
            });
        });
        it('should provide registered information on register', function (done) {
            child_process_1.exec(`node -r ts-node/register env.ts`, {
                cwd: TEST_DIR
            }, function (err, stdout) {
                chai_1.expect(err).to.equal(null);
                chai_1.expect(stdout).to.equal('object\n');
                return done();
            });
        });
        if (semver.gte(ts.version, '1.8.0')) {
            it('should allow js', function (done) {
                child_process_1.exec([
                    cmd,
                    '-O "{\\\"allowJs\\\":true}"',
                    '-pe "import { main } from \'./tests/allow-js/run\';main()"'
                ].join(' '), function (err, stdout) {
                    chai_1.expect(err).to.equal(null);
                    chai_1.expect(stdout).to.equal('hello world\n');
                    return done();
                });
            });
            it('should include jsx when `allow-js` true', function (done) {
                child_process_1.exec([
                    cmd,
                    '-O "{\\\"allowJs\\\":true}"',
                    '-pe "import { Foo2 } from \'./tests/allow-js/with-jsx\'; Foo2.sayHi()"'
                ].join(' '), function (err, stdout) {
                    chai_1.expect(err).to.equal(null);
                    chai_1.expect(stdout).to.equal('hello world\n');
                    return done();
                });
            });
        }
        it('should eval code', function (done) {
            child_process_1.exec(`${cmd} -e "import * as m from './tests/module';console.log(m.example('test'))"`, function (err, stdout) {
                chai_1.expect(err).to.equal(null);
                chai_1.expect(stdout).to.equal('TEST\n');
                return done();
            });
        });
        it('should import empty files', function (done) {
            child_process_1.exec(`${cmd} -e "import './tests/empty'"`, function (err, stdout) {
                chai_1.expect(err).to.equal(null);
                chai_1.expect(stdout).to.equal('');
                return done();
            });
        });
        it('should throw errors', function (done) {
            child_process_1.exec(`${cmd} -e "import * as m from './tests/module';console.log(m.example(123))"`, function (err) {
                if (err === null) {
                    return done('Command was expected to fail, but it succeeded.');
                }
                chai_1.expect(err.message).to.match(new RegExp('TS2345: Argument of type \'(?:number|123)\' ' +
                    'is not assignable to parameter of type \'string\'\\.'));
                return done();
            });
        });
        it('should be able to ignore diagnostic', function (done) {
            child_process_1.exec(`${cmd} --ignore-diagnostics 2345 -e "import * as m from './tests/module';console.log(m.example(123))"`, function (err) {
                if (err === null) {
                    return done('Command was expected to fail, but it succeeded.');
                }
                chai_1.expect(err.message).to.match(/TypeError: (?:(?:undefined|foo\.toUpperCase) is not a function|.*has no method \'toUpperCase\')/);
                return done();
            });
        });
        it('should work with source maps', function (done) {
            child_process_1.exec(`${cmd} tests/throw`, function (err) {
                if (err === null) {
                    return done('Command was expected to fail, but it succeeded.');
                }
                chai_1.expect(err.message).to.contain([
                    `${path_1.join(__dirname, '../tests/throw.ts')}:100`,
                    '  bar () { throw new Error(\'this is a demo\') }',
                    '                 ^',
                    'Error: this is a demo'
                ].join('\n'));
                return done();
            });
        });
        it('eval should work with source maps', function (done) {
            child_process_1.exec(`${cmd} -pe "import './tests/throw'"`, function (err) {
                if (err === null) {
                    return done('Command was expected to fail, but it succeeded.');
                }
                chai_1.expect(err.message).to.contain([
                    `${path_1.join(__dirname, '../tests/throw.ts')}:100`,
                    '  bar () { throw new Error(\'this is a demo\') }',
                    '                 ^'
                ].join('\n'));
                return done();
            });
        });
        it('should support transpile only mode', function (done) {
            child_process_1.exec(`${cmd} --transpile-only -pe "x"`, function (err) {
                if (err === null) {
                    return done('Command was expected to fail, but it succeeded.');
                }
                chai_1.expect(err.message).to.contain('ReferenceError: x is not defined');
                return done();
            });
        });
        it('should throw error even in transpileOnly mode', function (done) {
            child_process_1.exec(`${cmd} --transpile-only -pe "console."`, function (err) {
                if (err === null) {
                    return done('Command was expected to fail, but it succeeded.');
                }
                chai_1.expect(err.message).to.contain('error TS1003: Identifier expected');
                return done();
            });
        });
        it('should pipe into `ts-node` and evaluate', function (done) {
            const cp = child_process_1.exec(cmd, function (err, stdout) {
                chai_1.expect(err).to.equal(null);
                chai_1.expect(stdout).to.equal('hello\n');
                return done();
            });
            cp.stdin.end("console.log('hello')");
        });
        it('should pipe into `ts-node`', function (done) {
            const cp = child_process_1.exec(`${cmd} -p`, function (err, stdout) {
                chai_1.expect(err).to.equal(null);
                chai_1.expect(stdout).to.equal('true\n');
                return done();
            });
            cp.stdin.end('true');
        });
        it('should pipe into an eval script', function (done) {
            const cp = child_process_1.exec(`${cmd} --transpile-only -pe "process.stdin.isTTY"`, function (err, stdout) {
                chai_1.expect(err).to.equal(null);
                chai_1.expect(stdout).to.equal('undefined\n');
                return done();
            });
            cp.stdin.end('true');
        });
        it('should run REPL when --interactive passed and stdin is not a TTY', function (done) {
            const cp = child_process_1.exec(`${cmd} --interactive`, function (err, stdout) {
                chai_1.expect(err).to.equal(null);
                chai_1.expect(stdout).to.equal('> 123\n' +
                    'undefined\n' +
                    '> ');
                return done();
            });
            cp.stdin.end('console.log("123")\n');
        });
        it('REPL has command to get type information', function (done) {
            const cp = child_process_1.exec(`${cmd} --interactive`, function (err, stdout) {
                chai_1.expect(err).to.equal(null);
                chai_1.expect(stdout).to.equal('> undefined\n' +
                    '> undefined\n' +
                    '> const a: 123\n' +
                    '> ');
                return done();
            });
            cp.stdin.end('\nconst a = 123\n.type a');
        });
        it('REPL can be created via API', () => __awaiter(this, void 0, void 0, function* () {
            const stdin = new stream_1.PassThrough();
            const stdout = new stream_1.PassThrough();
            const stderr = new stream_1.PassThrough();
            const replService = createRepl({
                stdin,
                stdout,
                stderr
            });
            const service = create(replService.evalAwarePartialHost);
            replService.setService(service);
            replService.start();
            stdin.write('\nconst a = 123\n.type a\n');
            stdin.end();
            yield promisify(setTimeout)(1e3);
            stdout.end();
            stderr.end();
            chai_1.expect(yield getStream(stderr)).to.equal('');
            chai_1.expect(yield getStream(stdout)).to.equal('> \'use strict\'\n' +
                '> undefined\n' +
                '> const a: 123\n' +
                '> ');
        }));
        it('should support require flags', function (done) {
            child_process_1.exec(`${cmd} -r ./tests/hello-world -pe "console.log('success')"`, function (err, stdout) {
                chai_1.expect(err).to.equal(null);
                chai_1.expect(stdout).to.equal('Hello, world!\nsuccess\nundefined\n');
                return done();
            });
        });
        it('should support require from node modules', function (done) {
            child_process_1.exec(`${cmd} -r typescript -e "console.log('success')"`, function (err, stdout) {
                chai_1.expect(err).to.equal(null);
                chai_1.expect(stdout).to.equal('success\n');
                return done();
            });
        });
        it('should use source maps with react tsx', function (done) {
            child_process_1.exec(`${cmd} tests/throw-react-tsx.tsx`, function (err, stdout) {
                chai_1.expect(err).not.to.equal(null);
                chai_1.expect(err.message).to.contain([
                    `${path_1.join(__dirname, '../tests/throw-react-tsx.tsx')}:100`,
                    '  bar () { throw new Error(\'this is a demo\') }',
                    '                 ^',
                    'Error: this is a demo'
                ].join('\n'));
                return done();
            });
        });
        it('should allow custom typings', function (done) {
            child_process_1.exec(`${cmd} tests/custom-types`, function (err, stdout) {
                chai_1.expect(err).to.match(/Error: Cannot find module 'does-not-exist'/);
                return done();
            });
        });
        it('should preserve `ts-node` context with child process', function (done) {
            child_process_1.exec(`${cmd} tests/child-process`, function (err, stdout) {
                chai_1.expect(err).to.equal(null);
                chai_1.expect(stdout).to.equal('Hello, world!\n');
                return done();
            });
        });
        it('should import js before ts by default', function (done) {
            child_process_1.exec(`${cmd} tests/import-order/compiled`, function (err, stdout) {
                chai_1.expect(err).to.equal(null);
                chai_1.expect(stdout).to.equal('Hello, JavaScript!\n');
                return done();
            });
        });
        it('should import ts before js when --prefer-ts-exts flag is present', function (done) {
            child_process_1.exec(`${cmd} --prefer-ts-exts tests/import-order/compiled`, function (err, stdout) {
                chai_1.expect(err).to.equal(null);
                chai_1.expect(stdout).to.equal('Hello, TypeScript!\n');
                return done();
            });
        });
        it('should import ts before js when TS_NODE_PREFER_TS_EXTS env is present', function (done) {
            child_process_1.exec(`${cmd} tests/import-order/compiled`, { env: Object.assign(Object.assign({}, process.env), { TS_NODE_PREFER_TS_EXTS: 'true' }) }, function (err, stdout) {
                chai_1.expect(err).to.equal(null);
                chai_1.expect(stdout).to.equal('Hello, TypeScript!\n');
                return done();
            });
        });
        it('should ignore .d.ts files', function (done) {
            child_process_1.exec(`${cmd} tests/import-order/importer`, function (err, stdout) {
                chai_1.expect(err).to.equal(null);
                chai_1.expect(stdout).to.equal('Hello, World!\n');
                return done();
            });
        });
        describe('issue #884', function () {
            it('should compile', function (done) {
                // TODO disabled because it consistently fails on Windows on TS 2.7
                if (process.platform === 'win32' && semver.satisfies(ts.version, '2.7')) {
                    this.skip();
                }
                else {
                    child_process_1.exec(`"${BIN_PATH}" --project tests/issue-884/tsconfig.json tests/issue-884`, function (err, stdout) {
                        chai_1.expect(err).to.equal(null);
                        chai_1.expect(stdout).to.equal('');
                        return done();
                    });
                }
            });
        });
        describe('issue #986', function () {
            it('should not compile', function (done) {
                child_process_1.exec(`"${BIN_PATH}" --project tests/issue-986/tsconfig.json tests/issue-986`, function (err, stdout, stderr) {
                    chai_1.expect(err).not.to.equal(null);
                    chai_1.expect(stderr).to.contain('Cannot find name \'TEST\''); // TypeScript error.
                    chai_1.expect(stdout).to.equal('');
                    return done();
                });
            });
            it('should compile with `--files`', function (done) {
                child_process_1.exec(`"${BIN_PATH}" --files --project tests/issue-986/tsconfig.json tests/issue-986`, function (err, stdout, stderr) {
                    chai_1.expect(err).not.to.equal(null);
                    chai_1.expect(stderr).to.contain('ReferenceError: TEST is not defined'); // Runtime error.
                    chai_1.expect(stdout).to.equal('');
                    return done();
                });
            });
        });
        if (semver.gte(ts.version, '2.7.0')) {
            it('should support script mode', function (done) {
                child_process_1.exec(`${BIN_SCRIPT_PATH} tests/scope/a/log`, function (err, stdout) {
                    chai_1.expect(err).to.equal(null);
                    chai_1.expect(stdout).to.equal('.ts\n');
                    return done();
                });
            });
            it('should read tsconfig relative to realpath, not symlink, in scriptMode', function (done) {
                if (fs_1.lstatSync(path_1.join(TEST_DIR, 'main-realpath/symlink/symlink.tsx')).isSymbolicLink()) {
                    child_process_1.exec(`${BIN_SCRIPT_PATH} tests/main-realpath/symlink/symlink.tsx`, function (err, stdout) {
                        chai_1.expect(err).to.equal(null);
                        chai_1.expect(stdout).to.equal('');
                        return done();
                    });
                }
                else {
                    this.skip();
                }
            });
        }
        describe('should read ts-node options from tsconfig.json', function () {
            const BIN_EXEC = `"${BIN_PATH}" --project tests/tsconfig-options/tsconfig.json`;
            it('should override compiler options from env', function (done) {
                child_process_1.exec(`${BIN_EXEC} tests/tsconfig-options/log-options1.js`, {
                    env: Object.assign(Object.assign({}, process.env), { TS_NODE_COMPILER_OPTIONS: '{"typeRoots": ["env-typeroots"]}' })
                }, function (err, stdout) {
                    chai_1.expect(err).to.equal(null);
                    const { config } = JSON.parse(stdout);
                    chai_1.expect(config.options.typeRoots).to.deep.equal([path_1.join(__dirname, '../tests/tsconfig-options/env-typeroots').replace(/\\/g, '/')]);
                    return done();
                });
            });
            it('should use options from `tsconfig.json`', function (done) {
                child_process_1.exec(`${BIN_EXEC} tests/tsconfig-options/log-options1.js`, function (err, stdout) {
                    chai_1.expect(err).to.equal(null);
                    const { options, config } = JSON.parse(stdout);
                    chai_1.expect(config.options.typeRoots).to.deep.equal([path_1.join(__dirname, '../tests/tsconfig-options/tsconfig-typeroots').replace(/\\/g, '/')]);
                    chai_1.expect(config.options.types).to.deep.equal(['tsconfig-tsnode-types']);
                    chai_1.expect(options.pretty).to.equal(undefined);
                    chai_1.expect(options.skipIgnore).to.equal(false);
                    chai_1.expect(options.transpileOnly).to.equal(true);
                    chai_1.expect(options.require).to.deep.equal([path_1.join(__dirname, '../tests/tsconfig-options/required1.js')]);
                    return done();
                });
            });
            it('should have flags override / merge with `tsconfig.json`', function (done) {
                child_process_1.exec(`${BIN_EXEC} --skip-ignore --compiler-options "{\\"types\\":[\\"flags-types\\"]}" --require ./tests/tsconfig-options/required2.js tests/tsconfig-options/log-options2.js`, function (err, stdout) {
                    chai_1.expect(err).to.equal(null);
                    const { options, config } = JSON.parse(stdout);
                    chai_1.expect(config.options.typeRoots).to.deep.equal([path_1.join(__dirname, '../tests/tsconfig-options/tsconfig-typeroots').replace(/\\/g, '/')]);
                    chai_1.expect(config.options.types).to.deep.equal(['flags-types']);
                    chai_1.expect(options.pretty).to.equal(undefined);
                    chai_1.expect(options.skipIgnore).to.equal(true);
                    chai_1.expect(options.transpileOnly).to.equal(true);
                    chai_1.expect(options.require).to.deep.equal([
                        path_1.join(__dirname, '../tests/tsconfig-options/required1.js'),
                        './tests/tsconfig-options/required2.js'
                    ]);
                    return done();
                });
            });
            it('should have `tsconfig.json` override environment', function (done) {
                child_process_1.exec(`${BIN_EXEC} tests/tsconfig-options/log-options1.js`, {
                    env: Object.assign(Object.assign({}, process.env), { TS_NODE_PRETTY: 'true', TS_NODE_SKIP_IGNORE: 'true' })
                }, function (err, stdout) {
                    chai_1.expect(err).to.equal(null);
                    const { options, config } = JSON.parse(stdout);
                    chai_1.expect(config.options.typeRoots).to.deep.equal([path_1.join(__dirname, '../tests/tsconfig-options/tsconfig-typeroots').replace(/\\/g, '/')]);
                    chai_1.expect(config.options.types).to.deep.equal(['tsconfig-tsnode-types']);
                    chai_1.expect(options.pretty).to.equal(true);
                    chai_1.expect(options.skipIgnore).to.equal(false);
                    chai_1.expect(options.transpileOnly).to.equal(true);
                    chai_1.expect(options.require).to.deep.equal([path_1.join(__dirname, '../tests/tsconfig-options/required1.js')]);
                    return done();
                });
            });
        });
        describe('compiler host', function () {
            it('should execute cli', function (done) {
                child_process_1.exec(`${cmd} --compiler-host tests/hello-world`, function (err, stdout) {
                    chai_1.expect(err).to.equal(null);
                    chai_1.expect(stdout).to.equal('Hello, world!\n');
                    return done();
                });
            });
        });
        it('should transpile files inside a node_modules directory when not ignored', function (done) {
            child_process_1.exec(`${cmdNoProject} --script-mode tests/from-node-modules/from-node-modules`, function (err, stdout, stderr) {
                if (err)
                    return done(`Unexpected error: ${err}\nstdout:\n${stdout}\nstderr:\n${stderr}`);
                chai_1.expect(JSON.parse(stdout)).to.deep.equal({
                    external: {
                        tsmri: { name: 'typescript-module-required-internally' },
                        jsmri: { name: 'javascript-module-required-internally' },
                        tsmii: { name: 'typescript-module-imported-internally' },
                        jsmii: { name: 'javascript-module-imported-internally' }
                    },
                    tsmie: { name: 'typescript-module-imported-externally' },
                    jsmie: { name: 'javascript-module-imported-externally' },
                    tsmre: { name: 'typescript-module-required-externally' },
                    jsmre: { name: 'javascript-module-required-externally' }
                });
                done();
            });
        });
        describe('should respect maxNodeModulesJsDepth', function () {
            it('for unscoped modules', function (done) {
                child_process_1.exec(`${cmdNoProject} --script-mode tests/maxnodemodulesjsdepth`, function (err, stdout, stderr) {
                    chai_1.expect(err).to.not.equal(null);
                    chai_1.expect(stderr.replace(/\r\n/g, '\n')).to.contain('TSError: ⨯ Unable to compile TypeScript:\n' +
                        "other.ts(4,7): error TS2322: Type 'string' is not assignable to type 'boolean'.\n" +
                        '\n');
                    done();
                });
            });
            it('for @scoped modules', function (done) {
                child_process_1.exec(`${cmdNoProject} --script-mode tests/maxnodemodulesjsdepth-scoped`, function (err, stdout, stderr) {
                    chai_1.expect(err).to.not.equal(null);
                    chai_1.expect(stderr.replace(/\r\n/g, '\n')).to.contain('TSError: ⨯ Unable to compile TypeScript:\n' +
                        "other.ts(7,7): error TS2322: Type 'string' is not assignable to type 'boolean'.\n" +
                        '\n');
                    done();
                });
            });
        });
    });
    describe('register', function () {
        let registered;
        let moduleTestPath;
        before(() => {
            registered = register({
                project: PROJECT,
                compilerOptions: {
                    jsx: 'preserve'
                }
            });
            moduleTestPath = require.resolve('../tests/module');
        });
        afterEach(() => {
            // Re-enable project after every test.
            registered.enabled(true);
        });
        it('should be able to require typescript', function () {
            const m = require(moduleTestPath);
            chai_1.expect(m.example('foo')).to.equal('FOO');
        });
        it('should support dynamically disabling', function () {
            delete require.cache[moduleTestPath];
            chai_1.expect(registered.enabled(false)).to.equal(false);
            chai_1.expect(() => require(moduleTestPath)).to.throw(/Unexpected token/);
            delete require.cache[moduleTestPath];
            chai_1.expect(registered.enabled()).to.equal(false);
            chai_1.expect(() => require(moduleTestPath)).to.throw(/Unexpected token/);
            delete require.cache[moduleTestPath];
            chai_1.expect(registered.enabled(true)).to.equal(true);
            chai_1.expect(() => require(moduleTestPath)).to.not.throw();
            delete require.cache[moduleTestPath];
            chai_1.expect(registered.enabled()).to.equal(true);
            chai_1.expect(() => require(moduleTestPath)).to.not.throw();
        });
        if (semver.gte(ts.version, '2.7.0')) {
            it('should support compiler scopes', function () {
                const calls = [];
                registered.enabled(false);
                const compilers = [
                    register({ dir: path_1.join(TEST_DIR, 'scope/a'), scope: true }),
                    register({ dir: path_1.join(TEST_DIR, 'scope/b'), scope: true })
                ];
                compilers.forEach(c => {
                    const old = c.compile;
                    c.compile = (code, fileName, lineOffset) => {
                        calls.push(fileName);
                        return old(code, fileName, lineOffset);
                    };
                });
                try {
                    chai_1.expect(require('../tests/scope/a').ext).to.equal('.ts');
                    chai_1.expect(require('../tests/scope/b').ext).to.equal('.ts');
                }
                finally {
                    compilers.forEach(c => c.enabled(false));
                }
                chai_1.expect(calls).to.deep.equal([
                    path_1.join(TEST_DIR, 'scope/a/index.ts'),
                    path_1.join(TEST_DIR, 'scope/b/index.ts')
                ]);
                delete require.cache[moduleTestPath];
                chai_1.expect(() => require(moduleTestPath)).to.throw();
            });
        }
        it('should compile through js and ts', function () {
            const m = require('../tests/complex');
            chai_1.expect(m.example()).to.equal('example');
        });
        it('should work with proxyquire', function () {
            const m = proxyquire('../tests/complex', {
                './example': 'hello'
            });
            chai_1.expect(m.example()).to.equal('hello');
        });
        it('should work with `require.cache`', function () {
            const { example1, example2 } = require('../tests/require-cache');
            chai_1.expect(example1).to.not.equal(example2);
        });
        it('should use source maps', function (done) {
            try {
                require('../tests/throw');
            }
            catch (error) {
                chai_1.expect(error.stack).to.contain([
                    'Error: this is a demo',
                    `    at Foo.bar (${path_1.join(__dirname, '../tests/throw.ts')}:100:18)`
                ].join('\n'));
                done();
            }
        });
        describe('JSX preserve', () => {
            let old;
            let compiled;
            before(function () {
                old = require.extensions['.tsx']; // tslint:disable-line
                require.extensions['.tsx'] = (m, fileName) => {
                    const _compile = m._compile;
                    m._compile = (code, fileName) => {
                        compiled = code;
                        return _compile.call(this, code, fileName);
                    };
                    return old(m, fileName);
                };
            });
            after(function () {
                require.extensions['.tsx'] = old; // tslint:disable-line
            });
            it('should use source maps', function (done) {
                try {
                    require('../tests/with-jsx.tsx');
                }
                catch (error) {
                    chai_1.expect(error.stack).to.contain('SyntaxError: Unexpected token');
                }
                chai_1.expect(compiled).to.match(SOURCE_MAP_REGEXP);
                done();
            });
        });
    });
    describe('create', () => {
        let service;
        before(() => {
            service = create({ compilerOptions: { target: 'es5' }, skipProject: true });
        });
        it('should create generic compiler instances', () => {
            const output = service.compile('const x = 10', 'test.ts');
            chai_1.expect(output).to.contain('var x = 10;');
        });
        describe('should get type information', () => {
            it('given position of identifier', () => {
                chai_1.expect(service.getTypeInfo('/**jsdoc here*/const x = 10', 'test.ts', 21)).to.deep.equal({
                    comment: 'jsdoc here',
                    name: 'const x: 10'
                });
            });
            it('given position that does not point to an identifier', () => {
                chai_1.expect(service.getTypeInfo('/**jsdoc here*/const x = 10', 'test.ts', 0)).to.deep.equal({
                    comment: '',
                    name: ''
                });
            });
        });
    });
    describe('issue #1098', () => {
        function testIgnored(ignored, allowed, disallowed) {
            for (const ext of allowed) {
                chai_1.expect(ignored(path_1.join(__dirname, `index${ext}`))).equal(false, `should accept ${ext} files`);
            }
            for (const ext of disallowed) {
                chai_1.expect(ignored(path_1.join(__dirname, `index${ext}`))).equal(true, `should ignore ${ext} files`);
            }
        }
        it('correctly filters file extensions from the compiler when allowJs=false and jsx=false', () => {
            const { ignored } = create({ compilerOptions: {}, skipProject: true });
            testIgnored(ignored, ['.ts', '.d.ts'], ['.js', '.tsx', '.jsx', '.mjs', '.cjs', '.xyz', '']);
        });
        it('correctly filters file extensions from the compiler when allowJs=true and jsx=false', () => {
            const { ignored } = create({ compilerOptions: { allowJs: true }, skipProject: true });
            testIgnored(ignored, ['.ts', '.js', '.d.ts'], ['.tsx', '.jsx', '.mjs', '.cjs', '.xyz', '']);
        });
        it('correctly filters file extensions from the compiler when allowJs=false and jsx=true', () => {
            const { ignored } = create({ compilerOptions: { allowJs: false, jsx: 'preserve' }, skipProject: true });
            testIgnored(ignored, ['.ts', '.tsx', '.d.ts'], ['.js', '.jsx', '.mjs', '.cjs', '.xyz', '']);
        });
        it('correctly filters file extensions from the compiler when allowJs=true and jsx=true', () => {
            const { ignored } = create({ compilerOptions: { allowJs: true, jsx: 'preserve' }, skipProject: true });
            testIgnored(ignored, ['.ts', '.tsx', '.js', '.jsx', '.d.ts'], ['.mjs', '.cjs', '.xyz', '']);
        });
    });
    describe('esm', () => {
        this.slow(1000);
        const cmd = `node --loader ts-node/esm`;
        if (semver.gte(process.version, '13.0.0')) {
            it('should compile and execute as ESM', (done) => {
                child_process_1.exec(`${cmd} index.ts`, { cwd: path_1.join(__dirname, '../tests/esm') }, function (err, stdout) {
                    chai_1.expect(err).to.equal(null);
                    chai_1.expect(stdout).to.equal('foo bar baz biff libfoo\n');
                    return done();
                });
            });
            it('should use source maps', function (done) {
                child_process_1.exec(`${cmd} throw.ts`, { cwd: path_1.join(__dirname, '../tests/esm') }, function (err, stdout) {
                    chai_1.expect(err).not.to.equal(null);
                    chai_1.expect(err.message).to.contain([
                        `${url_1.pathToFileURL(path_1.join(__dirname, '../tests/esm/throw.ts'))}:100`,
                        '  bar () { throw new Error(\'this is a demo\') }',
                        '                 ^',
                        'Error: this is a demo'
                    ].join('\n'));
                    return done();
                });
            });
            describe('supports experimental-specifier-resolution=node', () => {
                it('via --experimental-specifier-resolution', (done) => {
                    child_process_1.exec(`${cmd} --experimental-specifier-resolution=node index.ts`, { cwd: path_1.join(__dirname, '../tests/esm-node-resolver') }, function (err, stdout) {
                        chai_1.expect(err).to.equal(null);
                        chai_1.expect(stdout).to.equal('foo bar baz biff libfoo\n');
                        return done();
                    });
                });
                it('via --es-module-specifier-resolution alias', (done) => {
                    child_process_1.exec(`${cmd} --experimental-modules --es-module-specifier-resolution=node index.ts`, { cwd: path_1.join(__dirname, '../tests/esm-node-resolver') }, function (err, stdout) {
                        chai_1.expect(err).to.equal(null);
                        chai_1.expect(stdout).to.equal('foo bar baz biff libfoo\n');
                        return done();
                    });
                });
                it('via NODE_OPTIONS', (done) => {
                    child_process_1.exec(`${cmd} index.ts`, {
                        cwd: path_1.join(__dirname, '../tests/esm-node-resolver'),
                        env: Object.assign(Object.assign({}, process.env), { NODE_OPTIONS: '--experimental-specifier-resolution=node' })
                    }, function (err, stdout) {
                        chai_1.expect(err).to.equal(null);
                        chai_1.expect(stdout).to.equal('foo bar baz biff libfoo\n');
                        return done();
                    });
                });
            });
            it('throws ERR_REQUIRE_ESM when attempting to require() an ESM script while ESM loader is enabled', function (done) {
                child_process_1.exec(`${cmd} ./index.js`, { cwd: path_1.join(__dirname, '../tests/esm-err-require-esm') }, function (err, stdout, stderr) {
                    chai_1.expect(err).to.not.equal(null);
                    chai_1.expect(stderr).to.contain('Error [ERR_REQUIRE_ESM]: Must use import to load ES Module:');
                    return done();
                });
            });
            it('defers to fallback loaders when URL should not be handled by ts-node', function (done) {
                child_process_1.exec(`${cmd} index.mjs`, {
                    cwd: path_1.join(__dirname, '../tests/esm-import-http-url')
                }, function (err, stdout, stderr) {
                    chai_1.expect(err).to.not.equal(null);
                    // expect error from node's default resolver
                    chai_1.expect(stderr).to.match(/Error \[ERR_UNSUPPORTED_ESM_URL_SCHEME\]:.*(?:\n.*){0,1}\n *at defaultResolve/);
                    return done();
                });
            });
            it('should bypass import cache when changing search params', (done) => {
                child_process_1.exec(`${cmd} index.ts`, { cwd: path_1.join(__dirname, '../tests/esm-import-cache') }, function (err, stdout) {
                    chai_1.expect(err).to.equal(null);
                    chai_1.expect(stdout).to.equal('log1\nlog2\nlog2\n');
                    return done();
                });
            });
            it('should support transpile only mode via dedicated loader entrypoint', (done) => {
                child_process_1.exec(`${cmd}/transpile-only index.ts`, { cwd: path_1.join(__dirname, '../tests/esm-transpile-only') }, function (err, stdout) {
                    chai_1.expect(err).to.equal(null);
                    chai_1.expect(stdout).to.equal('');
                    return done();
                });
            });
            it('should throw type errors without transpile-only enabled', (done) => {
                child_process_1.exec(`${cmd} index.ts`, { cwd: path_1.join(__dirname, '../tests/esm-transpile-only') }, function (err, stdout) {
                    if (err === null) {
                        return done('Command was expected to fail, but it succeeded.');
                    }
                    chai_1.expect(err.message).to.contain('Unable to compile TypeScript');
                    chai_1.expect(err.message).to.match(new RegExp('TS2345: Argument of type \'(?:number|1101)\' is not assignable to parameter of type \'string\'\\.'));
                    chai_1.expect(err.message).to.match(new RegExp('TS2322: Type \'(?:"hello world"|string)\' is not assignable to type \'number\'\\.'));
                    chai_1.expect(stdout).to.equal('');
                    return done();
                });
            });
        }
        it('executes ESM as CJS, ignoring package.json "types" field (for backwards compatibility; should be changed in next major release to throw ERR_REQUIRE_ESM)', function (done) {
            child_process_1.exec(`${BIN_PATH} ./tests/esm-err-require-esm/index.js`, function (err, stdout) {
                chai_1.expect(err).to.equal(null);
                chai_1.expect(stdout).to.equal('CommonJS\n');
                return done();
            });
        });
    });
});
//# sourceMappingURL=index.spec.js.map