"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNotTouchingFiles = exports.openCertificateInFirefox = exports.closeFirefox = exports.removeCertificateFromNSSCertDB = exports.addCertificateToNSSCertDB = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const url_1 = tslib_1.__importDefault(require("url"));
const debug_1 = tslib_1.__importDefault(require("debug"));
const assert_1 = tslib_1.__importDefault(require("assert"));
const get_port_1 = tslib_1.__importDefault(require("get-port"));
const http_1 = tslib_1.__importDefault(require("http"));
const glob_1 = require("glob");
const fs_1 = require("fs");
const utils_1 = require("../utils");
const constants_1 = require("../constants");
const user_interface_1 = tslib_1.__importDefault(require("../user-interface"));
const child_process_1 = require("child_process");
const debug = debug_1.default('devcert:platforms:shared');
/**
 *  Given a directory or glob pattern of directories, run a callback for each db
 *  directory, with a version argument.
 */
function doForNSSCertDB(nssDirGlob, callback) {
    glob_1.sync(nssDirGlob).forEach((potentialNSSDBDir) => {
        debug(`checking to see if ${potentialNSSDBDir} is a valid NSS database directory`);
        if (fs_1.existsSync(path_1.default.join(potentialNSSDBDir, 'cert8.db'))) {
            debug(`Found legacy NSS database in ${potentialNSSDBDir}, running callback...`);
            callback(potentialNSSDBDir, 'legacy');
        }
        if (fs_1.existsSync(path_1.default.join(potentialNSSDBDir, 'cert9.db'))) {
            debug(`Found modern NSS database in ${potentialNSSDBDir}, running callback...`);
            callback(potentialNSSDBDir, 'modern');
        }
    });
}
/**
 *  Given a directory or glob pattern of directories, attempt to install the
 *  CA certificate to each directory containing an NSS database.
 */
function addCertificateToNSSCertDB(nssDirGlob, certPath, certutilPath) {
    debug(`trying to install certificate into NSS databases in ${nssDirGlob}`);
    doForNSSCertDB(nssDirGlob, (dir, version) => {
        const dirArg = version === 'modern' ? `sql:${dir}` : dir;
        utils_1.run(certutilPath, ['-A', '-d', dirArg, '-t', 'C,,', '-i', certPath, '-n', 'devcert']);
    });
    debug(`finished scanning & installing certificate in NSS databases in ${nssDirGlob}`);
}
exports.addCertificateToNSSCertDB = addCertificateToNSSCertDB;
function removeCertificateFromNSSCertDB(nssDirGlob, certPath, certutilPath) {
    debug(`trying to remove certificates from NSS databases in ${nssDirGlob}`);
    doForNSSCertDB(nssDirGlob, (dir, version) => {
        const dirArg = version === 'modern' ? `sql:${dir}` : dir;
        try {
            utils_1.run(certutilPath, ['-A', '-d', dirArg, '-t', 'C,,', '-i', certPath, '-n', 'devcert']);
        }
        catch (e) {
            debug(`failed to remove ${certPath} from ${dir}, continuing. ${e.toString()}`);
        }
    });
    debug(`finished scanning & installing certificate in NSS databases in ${nssDirGlob}`);
}
exports.removeCertificateFromNSSCertDB = removeCertificateFromNSSCertDB;
/**
 *  Check to see if Firefox is still running, and if so, ask the user to close
 *  it. Poll until it's closed, then return.
 *
 * This is needed because Firefox appears to load the NSS database in-memory on
 * startup, and overwrite on exit. So we have to ask the user to quite Firefox
 * first so our changes don't get overwritten.
 */
function closeFirefox() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (isFirefoxOpen()) {
            yield user_interface_1.default.closeFirefoxBeforeContinuing();
            while (isFirefoxOpen()) {
                yield sleep(50);
            }
        }
    });
}
exports.closeFirefox = closeFirefox;
/**
 * Check if Firefox is currently open
 */
function isFirefoxOpen() {
    // NOTE: We use some Windows-unfriendly methods here (ps) because Windows
    // never needs to check this, because it doesn't update the NSS DB
    // automaticaly.
    assert_1.default(constants_1.isMac || constants_1.isLinux, 'checkForOpenFirefox was invoked on a platform other than Mac or Linux');
    return child_process_1.execSync('ps aux').indexOf('firefox') > -1;
}
function sleep(ms) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => setTimeout(resolve, ms));
    });
}
/**
 * Firefox manages it's own trust store for SSL certificates, which can be
 * managed via the certutil command (supplied by NSS tooling packages). In the
 * event that certutil is not already installed, and either can't be installed
 * (Windows) or the user doesn't want to install it (skipCertutilInstall:
 * true), it means that we can't programmatically tell Firefox to trust our
 * root CA certificate.
 *
 * There is a recourse though. When a Firefox tab is directed to a URL that
 * responds with a certificate, it will automatically prompt the user if they
 * want to add it to their trusted certificates. So if we can't automatically
 * install the certificate via certutil, we instead start a quick web server
 * and host our certificate file. Then we open the hosted cert URL in Firefox
 * to kick off the GUI flow.
 *
 * This method does all this, along with providing user prompts in the terminal
 * to walk them through this process.
 */
function openCertificateInFirefox(firefoxPath, certPath) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        debug('Adding devert to Firefox trust stores manually. Launching a webserver to host our certificate temporarily ...');
        let port = yield get_port_1.default();
        let server = http_1.default.createServer((req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let { pathname } = url_1.default.parse(req.url);
            if (pathname === '/certificate') {
                res.writeHead(200, { 'Content-type': 'application/x-x509-ca-cert' });
                res.write(fs_1.readFileSync(certPath));
                res.end();
            }
            else {
                res.writeHead(200);
                res.write(yield user_interface_1.default.firefoxWizardPromptPage(`http://localhost:${port}/certificate`));
                res.end();
            }
        })).listen(port);
        debug('Certificate server is up. Printing instructions for user and launching Firefox with hosted certificate URL');
        yield user_interface_1.default.startFirefoxWizard(`http://localhost:${port}`);
        utils_1.run(firefoxPath, [`http://localhost:${port}`]);
        yield user_interface_1.default.waitForFirefoxWizard();
        server.close();
    });
}
exports.openCertificateInFirefox = openCertificateInFirefox;
function assertNotTouchingFiles(filepath, operation) {
    if (!filepath.startsWith(constants_1.configDir) && !filepath.startsWith(constants_1.getLegacyConfigDir())) {
        throw new Error(`Devcert cannot ${operation} ${filepath}; it is outside known devcert config directories!`);
    }
}
exports.assertNotTouchingFiles = assertNotTouchingFiles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwbGF0Zm9ybXMvc2hhcmVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSx3REFBd0I7QUFDeEIsc0RBQXNCO0FBQ3RCLDBEQUFnQztBQUNoQyw0REFBNEI7QUFDNUIsZ0VBQStCO0FBQy9CLHdEQUF3QjtBQUN4QiwrQkFBb0M7QUFDcEMsMkJBQW9FO0FBQ3BFLG9DQUErQjtBQUMvQiw0Q0FBOEU7QUFDOUUsK0VBQW1DO0FBQ25DLGlEQUFpRDtBQUVqRCxNQUFNLEtBQUssR0FBRyxlQUFXLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUV0RDs7O0dBR0c7QUFDSCxTQUFTLGNBQWMsQ0FBQyxVQUFrQixFQUFFLFFBQTZEO0lBQ3ZHLFdBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO1FBQzdDLEtBQUssQ0FBQyxzQkFBdUIsaUJBQWtCLG9DQUFvQyxDQUFDLENBQUM7UUFDckYsSUFBSSxlQUFNLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxVQUFVLENBQUMsQ0FBQyxFQUFFO1lBQ3BELEtBQUssQ0FBQyxnQ0FBaUMsaUJBQWtCLHVCQUF1QixDQUFDLENBQUE7WUFDakYsUUFBUSxDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZDO1FBQ0QsSUFBSSxlQUFNLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxVQUFVLENBQUMsQ0FBQyxFQUFFO1lBQ3BELEtBQUssQ0FBQyxnQ0FBaUMsaUJBQWtCLHVCQUF1QixDQUFDLENBQUE7WUFDakYsUUFBUSxDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBZ0IseUJBQXlCLENBQUMsVUFBa0IsRUFBRSxRQUFnQixFQUFFLFlB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Q2pIO0FBQ0wsQ0FBQztBQUpELHdEQUlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgdXJsIGZyb20gJ3VybCc7XG5pbXBvcnQgY3JlYXRlRGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IGdldFBvcnQgZnJvbSAnZ2V0LXBvcnQnO1xuaW1wb3J0IGh0dHAgZnJvbSAnaHR0cCc7XG5pbXBvcnQgeyBzeW5jIGFzIGdsb2IgfSBmcm9tICdnbG9iJztcbmltcG9ydCB7IHJlYWRGaWxlU3luYyBhcyByZWFkRmlsZSwgZXhpc3RzU3luYyBhcyBleGlzdHMgfSBmcm9tICdmcyc7XG5pbXBvcnQgeyBydW4gfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBpc01hYywgaXNMaW51eCAsIGNvbmZpZ0RpciwgZ2V0TGVnYWN5Q29uZmlnRGlyIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCBVSSBmcm9tICcuLi91c2VyLWludGVyZmFjZSc7XG5pbXBvcnQgeyBleGVjU3luYyBhcyBleGVjIH0gZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XG5cbmNvbnN0IGRlYnVnID0gY3JlYXRlRGVidWcoJ2RldmNlcnQ6cGxhdGZvcm1zOnNoYXJlZCcpO1xuXG4vKipcbiAqICBHaXZlbiBhIGRpcmVjdG9yeSBvciBnbG9iIHBhdHRlcm4gb2YgZGlyZWN0b3JpZXMsIHJ1biBhIGNhbGxiYWNrIGZvciBlYWNoIGRiXG4gKiAgZGlyZWN0b3J5LCB3aXRoIGEgdmVyc2lvbiBhcmd1bWVudC5cbiAqL1xuZnVuY3Rpb24gZG9Gb3JOU1NDZXJ0REIobnNzRGlyR2xvYjogc3RyaW5nLCBjYWxsYmFjazogKGRpcjogc3RyaW5nLCB2ZXJzaW9uOiBcImxlZ2FjeVwiIHwgXCJtb2Rlcm5cIikgPT4gdm9pZCk6IHZvaWQge1xuICBnbG9iKG5zc0Rpckdsb2IpLmZvckVhY2goKHBvdGVudGlhbE5TU0RCRGlyKSA9PiB7XG4gICAgZGVidWcoYGNoZWNraW5nIHRvIHNlZSBpZiAkeyBwb3RlbnRpYWxOU1NEQkRpciB9IGlzIGEgdmFsaWQgTlNTIGRhdGFiYXNlIGRpcmVjdG9yeWApO1xuICAgIGlmIChleGlzdHMocGF0aC5qb2luKHBvdGVudGlhbE5TU0RCRGlyLCAnY2VydDguZGInKSkpIHtcbiAgICAgIGRlYnVnKGBGb3VuZCBsZWdhY3kgTlNTIGRhdGFiYXNlIGluICR7IHBvdGVudGlhbE5TU0RCRGlyIH0sIHJ1bm5pbmcgY2FsbGJhY2suLi5gKVxuICAgICAgY2FsbGJhY2socG90ZW50aWFsTlNTREJEaXIsICdsZWdhY3knKTtcbiAgICB9XG4gICAgaWYgKGV4aXN0cyhwYXRoLmpvaW4ocG90ZW50aWFsTlNTREJEaXIsICdjZXJ0OS5kYicpKSkge1xuICAgICAgZGVidWcoYEZvdW5kIG1vZGVybiBOU1MgZGF0YWJhc2UgaW4gJHsgcG90ZW50aWFsTlNTREJEaXIgfSwgcnVubmluZyBjYWxsYmFjay4uLmApXG4gICAgICBjYWxsYmFjayhwb3RlbnRpYWxOU1NEQkRpciwgJ21vZGVybicpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogIEdpdmVuIGEgZGlyZWN0b3J5IG9yIGdsb2IgcGF0dGVybiBvZiBkaXJlY3RvcmllcywgYXR0ZW1wdCB0byBpbnN0YWxsIHRoZVxuICogIENBIGNlcnRpZmljYXRlIHRvIGVhY2ggZGlyZWN0b3J5IGNvbnRhaW5pbmcgYW4gTlNTIGRhdGFiYXNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkQ2VydGlmaWNhdGVUb05TU0NlcnREQihuc3NEaXJHbG9iOiBzdHJpbmcsIGNlcnRQYXRoOiBzdHJpbmcsIGNlcnR1dGlsUGF0aDogc3RyaW5nKTogdm9pZCB7XG4gIGRlYnVnKGB0cnlpbmcgdG8gaW5zdGFsbCBjZXJ0aWZpY2F0ZSBpbnRvIE5TUyBkYXRhYmFzZXMgaW4gJHsgbnNzRGlyR2xvYiB9YCk7XG4gIGRvRm9yTlNTQ2VydERCKG5zc0Rpckdsb2IsIChkaXIsIHZlcnNpb24pID0+IHtcbiAgICBjb25zdCBkaXJBcmcgPSB2ZXJzaW9uID09PSAnbW9kZXJuJyA/IGBzcWw6JHsgZGlyIH1gIDogZGlyO1xuICAgICAgcnVuKGNlcnR1dGlsUGF0aCwgWyctQScsICctZCcsIGRpckFyZywgJy10JywgJ0MsLCcsICctaScsIGNlcnRQYXRoLCAnLW4nLCAnZGV2Y2VydCddKTtcbiAgfSk7XG4gIGRlYnVnKGBmaW5pc2hlZCBzY2FubmluZyAmIGluc3RhbGxpbmcgY2VydGlmaWNhdGUgaW4gTlNTIGRhdGFiYXNlcyBpbiAkeyBuc3NEaXJHbG9iIH1gKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNlcnRpZmljYXRlRnJvbU5TU0NlcnREQihuc3NEaXJHbG9iOiBzdHJpbmcsIGNlcnRQYXRoOiBzdHJpbmcsIGNlcnR1dGlsUGF0aDogc3RyaW5nKTogdm9pZCB7XG4gIGRlYnVnKGB0cnlpbmcgdG8gcmVtb3ZlIGNlcnRpZmljYXRlcyBmcm9tIE5TUyBkYXRhYmFzZXMgaW4gJHsgbnNzRGlyR2xvYiB9YCk7XG4gIGRvRm9yTlNTQ2VydERCKG5zc0Rpckdsb2IsIChkaXIsIHZlcnNpb24pID0+IHtcbiAgICBjb25zdCBkaXJBcmcgPSB2ZXJzaW9uID09PSAnbW9kZXJuJyA/IGBzcWw6JHsgZGlyIH1gIDogZGlyO1xuICAgIHRyeSB7XG4gICAgICBydW4oY2VydHV0aWxQYXRoLCBbJy1BJywgJy1kJywgZGlyQXJnLCAnLXQnLCAnQywsJywgJy1pJywgY2VydFBhdGgsICctbicsICdkZXZjZXJ0J10pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGRlYnVnKGBmYWlsZWQgdG8gcmVtb3ZlICR7IGNlcnRQYXRoIH0gZnJvbSAkeyBkaXIgfSwgY29udGludWluZy4gJHsgZS50b1N0cmluZygpIH1gKVxuICAgIH1cbiAgfSk7XG4gIGRlYnVnKGBmaW5pc2hlZCBzY2FubmluZyAmIGluc3RhbGxpbmcgY2VydGlmaWNhdGUgaW4gTlNTIGRhdGFiYXNlcyBpbiAkeyBuc3NEaXJHbG9iIH1gKTtcbn1cblxuLyoqXG4gKiAgQ2hlY2sgdG8gc2VlIGlmIEZpcmVmb3ggaXMgc3RpbGwgcnVubmluZywgYW5kIGlmIHNvLCBhc2sgdGhlIHVzZXIgdG8gY2xvc2VcbiAqICBpdC4gUG9sbCB1bnRpbCBpdCdzIGNsb3NlZCwgdGhlbiByZXR1cm4uXG4gKlxuICogVGhpcyBpcyBuZWVkZWQgYmVjYXVzZSBGaXJlZm94IGFwcGVhcnMgdG8gbG9hZCB0aGUgTlNTIGRhdGFiYXNlIGluLW1lbW9yeSBvblxuICogc3RhcnR1cCwgYW5kIG92ZXJ3cml0ZSBvbiBleGl0LiBTbyB3ZSBoYXZlIHRvIGFzayB0aGUgdXNlciB0byBxdWl0ZSBGaXJlZm94XG4gKiBmaXJzdCBzbyBvdXIgY2hhbmdlcyBkb24ndCBnZXQgb3ZlcndyaXR0ZW4uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjbG9zZUZpcmVmb3goKTogUHJvbWlzZTx2b2lkPiB7XG4gIGlmIChpc0ZpcmVmb3hPcGVuKCkpIHtcbiAgICBhd2FpdCBVSS5jbG9zZUZpcmVmb3hCZWZvcmVDb250aW51aW5nKCk7XG4gICAgd2hpbGUoaXNGaXJlZm94T3BlbigpKSB7XG4gICAgICBhd2FpdCBzbGVlcCg1MCk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgRmlyZWZveCBpcyBjdXJyZW50bHkgb3BlblxuICovXG5mdW5jdGlvbiBpc0ZpcmVmb3hPcGVuKCkge1xuICAvLyBOT1RFOiBXZSB1c2Ugc29tZSBXaW5kb3dzLXVuZnJpZW5kbHkgbWV0aG9kcyBoZXJlIChwcykgYmVjYXVzZSBXaW5kb3dzXG4gIC8vIG5ldmVyIG5lZWRzIHRvIGNoZWNrIHRoaXMsIGJlY2F1c2UgaXQgZG9lc24ndCB1cGRhdGUgdGhlIE5TUyBEQlxuICAvLyBhdXRvbWF0aWNhbHkuXG4gIGFzc2VydChpc01hYyB8fCBpc0xpbnV4LCAnY2hlY2tGb3JPcGVuRmlyZWZveCB3YXMgaW52b2tlZCBvbiBhIHBsYXRmb3JtIG90aGVyIHRoYW4gTWFjIG9yIExpbnV4Jyk7XG4gIHJldHVybiBleGVjKCdwcyBhdXgnKS5pbmRleE9mKCdmaXJlZm94JykgPiAtMTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2xlZXAobXM6IG51bWJlcikge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcbn1cblxuLyoqXG4gKiBGaXJlZm94IG1hbmFnZXMgaXQncyBvd24gdHJ1c3Qgc3RvcmUgZm9yIFNTTCBjZXJ0aWZpY2F0ZXMsIHdoaWNoIGNhbiBiZVxuICogbWFuYWdlZCB2aWEgdGhlIGNlcnR1dGlsIGNvbW1hbmQgKHN1cHBsaWVkIGJ5IE5TUyB0b29saW5nIHBhY2thZ2VzKS4gSW4gdGhlXG4gKiBldmVudCB0aGF0IGNlcnR1dGlsIGlzIG5vdCBhbHJlYWR5IGluc3RhbGxlZCwgYW5kIGVpdGhlciBjYW4ndCBiZSBpbnN0YWxsZWRcbiAqIChXaW5kb3dzKSBvciB0aGUgdXNlciBkb2Vzbid0IHdhbnQgdG8gaW5zdGFsbCBpdCAoc2tpcENlcnR1dGlsSW5zdGFsbDpcbiAqIHRydWUpLCBpdCBtZWFucyB0aGF0IHdlIGNhbid0IHByb2dyYW1tYXRpY2FsbHkgdGVsbCBGaXJlZm94IHRvIHRydXN0IG91clxuICogcm9vdCBDQSBjZXJ0aWZpY2F0ZS5cbiAqXG4gKiBUaGVyZSBpcyBhIHJlY291cnNlIHRob3VnaC4gV2hlbiBhIEZpcmVmb3ggdGFiIGlzIGRpcmVjdGVkIHRvIGEgVVJMIHRoYXRcbiAqIHJlc3BvbmRzIHdpdGggYSBjZXJ0aWZpY2F0ZSwgaXQgd2lsbCBhdXRvbWF0aWNhbGx5IHByb21wdCB0aGUgdXNlciBpZiB0aGV5XG4gKiB3YW50IHRvIGFkZCBpdCB0byB0aGVpciB0cnVzdGVkIGNlcnRpZmljYXRlcy4gU28gaWYgd2UgY2FuJ3QgYXV0b21hdGljYWxseVxuICogaW5zdGFsbCB0aGUgY2VydGlmaWNhdGUgdmlhIGNlcnR1dGlsLCB3ZSBpbnN0ZWFkIHN0YXJ0IGEgcXVpY2sgd2ViIHNlcnZlclxuICogYW5kIGhvc3Qgb3VyIGNlcnRpZmljYXRlIGZpbGUuIFRoZW4gd2Ugb3BlbiB0aGUgaG9zdGVkIGNlcnQgVVJMIGluIEZpcmVmb3hcbiAqIHRvIGtpY2sgb2ZmIHRoZSBHVUkgZmxvdy5cbiAqXG4gKiBUaGlzIG1ldGhvZCBkb2VzIGFsbCB0aGlzLCBhbG9uZyB3aXRoIHByb3ZpZGluZyB1c2VyIHByb21wdHMgaW4gdGhlIHRlcm1pbmFsXG4gKiB0byB3YWxrIHRoZW0gdGhyb3VnaCB0aGlzIHByb2Nlc3MuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBvcGVuQ2VydGlmaWNhdGVJbkZpcmVmb3goZmlyZWZveFBhdGg6IHN0cmluZywgY2VydFBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICBkZWJ1ZygnQWRkaW5nIGRldmVydCB0byBGaXJlZm94IHRydXN0IHN0b3JlcyBtYW51YWxseS4gTGF1bmNoaW5nIGEgd2Vic2VydmVyIHRvIGhvc3Qgb3VyIGNlcnRpZmljYXRlIHRlbXBvcmFyaWx5IC4uLicpO1xuICBsZXQgcG9ydCA9IGF3YWl0IGdldFBvcnQoKTtcbiAgbGV0IHNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAgIGxldCB7IHBhdGhuYW1lIH0gPSB1cmwucGFyc2UocmVxLnVybCk7XG4gICAgaWYgKHBhdGhuYW1lID09PSAnL2NlcnRpZmljYXRlJykge1xuICAgICAgcmVzLndyaXRlSGVhZCgyMDAsIHsgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXg1MDktY2EtY2VydCcgfSk7XG4gICAgICByZXMud3JpdGUocmVhZEZpbGUoY2VydFBhdGgpKTtcbiAgICAgIHJlcy5lbmQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzLndyaXRlSGVhZCgyMDApO1xuICAgICAgcmVzLndyaXRlKGF3YWl0IFVJLmZpcmVmb3hXaXphcmRQcm9tcHRQYWdlKGBodHRwOi8vbG9jYWxob3N0OiR7IHBvcnQgfS9jZXJ0aWZpY2F0ZWApKTtcbiAgICAgIHJlcy5lbmQoKTtcbiAgICB9XG4gIH0pLmxpc3Rlbihwb3J0KTtcbiAgZGVidWcoJ0NlcnRpZmljYXRlIHNlcnZlciBpcyB1cC4gUHJpbnRpbmcgaW5zdHJ1Y3Rpb25zIGZvciB1c2VyIGFuZCBsYXVuY2hpbmcgRmlyZWZveCB3aXRoIGhvc3RlZCBjZXJ0aWZpY2F0ZSBVUkwnKTtcbiAgYXdhaXQgVUkuc3RhcnRGaXJlZm94V2l6YXJkKGBodHRwOi8vbG9jYWxob3N0OiR7IHBvcnQgfWApO1xuICBydW4oZmlyZWZveFBhdGgsIFtgaHR0cDovL2xvY2FsaG9zdDokeyBwb3J0IH1gXSk7XG4gIGF3YWl0IFVJLndhaXRGb3JGaXJlZm94V2l6YXJkKCk7XG4gIHNlcnZlci5jbG9zZSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0Tm90VG91Y2hpbmdGaWxlcyhmaWxlcGF0aDogc3RyaW5nLCBvcGVyYXRpb246IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICghZmlsZXBhdGguc3RhcnRzV2l0aChjb25maWdEaXIpICYmICFmaWxlcGF0aC5zdGFydHNXaXRoKGdldExlZ2FjeUNvbmZpZ0RpcigpKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBEZXZjZXJ0IGNhbm5vdCAkeyBvcGVyYXRpb24gfSAkeyBmaWxlcGF0aCB9OyBpdCBpcyBvdXRzaWRlIGtub3duIGRldmNlcnQgY29uZmlnIGRpcmVjdG9yaWVzIWApO1xuICAgIH1cbn0iXX0=