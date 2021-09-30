"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numericHash = exports.sudo = exports.mktmp = exports.reportableError = exports.waitForUser = exports.sudoAppend = exports.run = exports.openssl = void 0;
const tslib_1 = require("tslib");
const child_process_1 = require("child_process");
const tmp_1 = tslib_1.__importDefault(require("tmp"));
const debug_1 = tslib_1.__importDefault(require("debug"));
const path_1 = tslib_1.__importDefault(require("path"));
const sudo_prompt_1 = tslib_1.__importDefault(require("sudo-prompt"));
const constants_1 = require("./constants");
const debug = debug_1.default('devcert:util');
function openssl(args) {
    return run('openssl', args, {
        stdio: 'pipe',
        env: Object.assign({
            RANDFILE: path_1.default.join(constants_1.configPath('.rnd'))
        }, process.env)
    });
}
exports.openssl = openssl;
function run(cmd, args, options = {}) {
    debug(`execFileSync: \`${cmd} ${args.join(' ')}\``);
    return child_process_1.execFileSync(cmd, args, options);
}
exports.run = run;
function sudoAppend(file, input) {
    run('sudo', ['tee', '-a', file], {
        input
    });
}
exports.sudoAppend = sudoAppend;
function waitForUser() {
    return new Promise((resolve) => {
        process.stdin.resume();
        process.stdin.on('data', resolve);
    });
}
exports.waitForUser = waitForUser;
function reportableError(message) {
    return new Error(`${message} | This is a bug in devcert, please report the issue at https://github.com/davewasmer/devcert/issues`);
}
exports.reportableError = reportableError;
function mktmp() {
    // discardDescriptor because windows complains the file is in use if we create a tmp file
    // and then shell out to a process that tries to use it
    return tmp_1.default.fileSync({ discardDescriptor: true }).name;
}
exports.mktmp = mktmp;
function sudo(cmd) {
    return new Promise((resolve, reject) => {
        sudo_prompt_1.default.exec(cmd, { name: 'devcert' }, (err, stdout, stderr) => {
            let error = err || (typeof stderr === 'string' && stderr.trim().length > 0 && new Error(stderr));
            error ? reject(error) : resolve(stdout);
        });
    });
}
exports.sudo = sudo;
const numericHash = (str) => {
    let hash = 5381;
    let i = str.length;
    while (i) {
        hash = hash * 33 ^ str.charCodeAt(--i);
    }
    return hash >>> 0;
};
exports.numericHash = numericHash;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxpREFBa0U7QUFDbEUsc0RBQXNCO0FBQ3RCLDBEQUFnQztBQUNoQyx3REFBd0I7QUFDeEIsc0VBQXFDO0FBRXJDLDJDQUF5QztBQUV6QyxNQUFNLEtBQUssR0FBRyxlQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFMUMsU0FBZ0IsT0FBTyxDQUFDLElBQWM7SUFDcEMsT0FBTyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRTtRQUMxQixLQUFLLEVBQUUsTUFBTTtRQUNiLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ2pCLFFBQVEsRUFBRSxjQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDeEMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDO0tBQ2hCLENBQUMsQ0FBQztBQUNMLENBQUM7QUFQRCwwQkFPQztBQUVELFNBQWdCLEdBQUcsQ0FBQyxHQUFXLEVBQUUsSUFBYyxFQUFFLFVBQStCLEVBQUU7SUFDaEYsS0FBSyxDQUFDLG1CQUFvQixHQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEQsT0FBTyw0QkFBWSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDMUMsQ0FBQztBQUhELGtCQUdDO0FBRUQsU0FBZ0IsVUFBVSxDQUFDLElBQVksRUFBRSxLQUFtQztJQUMxRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtRQUMvQixLQUFLO0tBQ04sQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUpELGdDQUlDO0FBRUQsU0FBZ0IsV0FBVztJQUN6QixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDN0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN2QixPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBTEQsa0NBS0M7QUFFRCxTQUFnQixlQUFlLENBQUMsT0FBZTtJQUM3QyxPQUFPLElBQUksS0FBSyxDQUFDLEdBQUcsT0FBTyxzR0FBc0csQ0FBQyxDQUFDO0FBQ3JJLENBQUM7QUFGRCwwQ0FFQztBQUVELFNBQWdCLEtBQUs7SUFDbkIseUZBQXlGO0lBQ3pGLHVEQUF1RDtJQUN2RCxPQUFPLGFBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUN4RCxDQUFDO0FBSkQsc0JBSUM7QUFFRCxTQUFnQixJQUFJLENBQUMsR0FBVztJQUM5QixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3JDLHFCQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLEdBQWlCLEVBQUUsTUFBcUIsRUFBRSxNQUFxQixFQUFFLEVBQUU7WUFDNUcsSUFBSSxLQUFLLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUU7WUFDbEcsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQVBELG9CQU9DO0FBRU0sTUFBTSxXQUFXLEdBQUcsQ0FBQyxHQUFXLEVBQVUsRUFBRTtJQUNqRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7SUFDaEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUVuQixPQUFPLENBQUMsRUFBRTtRQUNSLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUN4QztJQUVELE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQztBQUNwQixDQUFDLENBQUM7QUFUVyxRQUFBLFdBQVcsZUFTdEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleGVjRmlsZVN5bmMsIEV4ZWNGaWxlU3luY09wdGlvbnMgfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcbmltcG9ydCB0bXAgZnJvbSAndG1wJztcbmltcG9ydCBjcmVhdGVEZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBzdWRvUHJvbXB0IGZyb20gJ3N1ZG8tcHJvbXB0JztcblxuaW1wb3J0IHsgY29uZmlnUGF0aCB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuY29uc3QgZGVidWcgPSBjcmVhdGVEZWJ1ZygnZGV2Y2VydDp1dGlsJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBvcGVuc3NsKGFyZ3M6IHN0cmluZ1tdKSB7XG4gIHJldHVybiBydW4oJ29wZW5zc2wnLCBhcmdzLCB7XG4gICAgc3RkaW86ICdwaXBlJyxcbiAgICBlbnY6IE9iamVjdC5hc3NpZ24oe1xuICAgICAgUkFOREZJTEU6IHBhdGguam9pbihjb25maWdQYXRoKCcucm5kJykpXG4gICAgfSwgcHJvY2Vzcy5lbnYpXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuKGNtZDogc3RyaW5nLCBhcmdzOiBzdHJpbmdbXSwgb3B0aW9uczogRXhlY0ZpbGVTeW5jT3B0aW9ucyA9IHt9KSB7XG4gIGRlYnVnKGBleGVjRmlsZVN5bmM6IFxcYCR7IGNtZCB9ICR7YXJncy5qb2luKCcgJyl9XFxgYCk7XG4gIHJldHVybiBleGVjRmlsZVN5bmMoY21kLCBhcmdzLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1ZG9BcHBlbmQoZmlsZTogc3RyaW5nLCBpbnB1dDogRXhlY0ZpbGVTeW5jT3B0aW9uc1tcImlucHV0XCJdKSB7XG4gIHJ1bignc3VkbycsIFsndGVlJywgJy1hJywgZmlsZV0sIHtcbiAgICBpbnB1dFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdhaXRGb3JVc2VyKCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBwcm9jZXNzLnN0ZGluLnJlc3VtZSgpO1xuICAgIHByb2Nlc3Muc3RkaW4ub24oJ2RhdGEnLCByZXNvbHZlKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXBvcnRhYmxlRXJyb3IobWVzc2FnZTogc3RyaW5nKSB7XG4gIHJldHVybiBuZXcgRXJyb3IoYCR7bWVzc2FnZX0gfCBUaGlzIGlzIGEgYnVnIGluIGRldmNlcnQsIHBsZWFzZSByZXBvcnQgdGhlIGlzc3VlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXZld2FzbWVyL2RldmNlcnQvaXNzdWVzYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBta3RtcCgpIHtcbiAgLy8gZGlzY2FyZERlc2NyaXB0b3IgYmVjYXVzZSB3aW5kb3dzIGNvbXBsYWlucyB0aGUgZmlsZSBpcyBpbiB1c2UgaWYgd2UgY3JlYXRlIGEgdG1wIGZpbGVcbiAgLy8gYW5kIHRoZW4gc2hlbGwgb3V0IHRvIGEgcHJvY2VzcyB0aGF0IHRyaWVzIHRvIHVzZSBpdFxuICByZXR1cm4gdG1wLmZpbGVTeW5jKHsgZGlzY2FyZERlc2NyaXB0b3I6IHRydWUgfSkubmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1ZG8oY21kOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZyB8IG51bGw+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBzdWRvUHJvbXB0LmV4ZWMoY21kLCB7IG5hbWU6ICdkZXZjZXJ0JyB9LCAoZXJyOiBFcnJvciB8IG51bGwsIHN0ZG91dDogc3RyaW5nIHwgbnVsbCwgc3RkZXJyOiBzdHJpbmcgfCBudWxsKSA9PiB7XG4gICAgICBsZXQgZXJyb3IgPSBlcnIgfHwgKHR5cGVvZiBzdGRlcnIgPT09ICdzdHJpbmcnICYmIHN0ZGVyci50cmltKCkubGVuZ3RoID4gMCAmJiBuZXcgRXJyb3Ioc3RkZXJyKSkgO1xuICAgICAgZXJyb3IgPyByZWplY3QoZXJyb3IpIDogcmVzb2x2ZShzdGRvdXQpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IG51bWVyaWNIYXNoID0gKHN0cjogc3RyaW5nKTogbnVtYmVyID0+IHtcbiAgbGV0IGhhc2ggPSA1MzgxO1xuICBsZXQgaSA9IHN0ci5sZW5ndGg7XG5cbiAgd2hpbGUgKGkpIHtcbiAgICBoYXNoID0gaGFzaCAqIDMzIF4gc3RyLmNoYXJDb2RlQXQoLS1pKTtcbiAgfVxuXG4gIHJldHVybiBoYXNoID4+PiAwO1xufTsiXX0=