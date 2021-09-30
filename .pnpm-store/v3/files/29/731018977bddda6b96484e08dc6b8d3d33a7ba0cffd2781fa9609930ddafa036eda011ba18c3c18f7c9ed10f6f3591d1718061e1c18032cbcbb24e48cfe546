"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = require("fs");
const debug_1 = tslib_1.__importDefault(require("debug"));
const command_exists_1 = require("command-exists");
const shared_1 = require("./shared");
const utils_1 = require("../utils");
const user_interface_1 = tslib_1.__importDefault(require("../user-interface"));
const debug = debug_1.default('devcert:platforms:linux');
class LinuxPlatform {
    constructor() {
        this.FIREFOX_NSS_DIR = path_1.default.join(process.env.HOME, '.mozilla/firefox/*');
        this.CHROME_NSS_DIR = path_1.default.join(process.env.HOME, '.pki/nssdb');
        this.FIREFOX_BIN_PATH = '/usr/bin/firefox';
        this.CHROME_BIN_PATH = '/usr/bin/google-chrome';
        this.HOST_FILE_PATH = '/etc/hosts';
    }
    /**
     * Linux is surprisingly difficult. There seems to be multiple system-wide
     * repositories for certs, so we copy ours to each. However, Firefox does it's
     * usual separate trust store. Plus Chrome relies on the NSS tooling (like
     * Firefox), but uses the user's NSS database, unlike Firefox (which uses a
     * separate Mozilla one). And since Chrome doesn't prompt the user with a GUI
     * flow when opening certs, if we can't use certutil to install our certificate
     * into the user's NSS database, we're out of luck.
     */
    addToTrustStores(certificatePath, options = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            debug('Adding devcert root CA to Linux system-wide trust stores');
            // run(`sudo cp ${ certificatePath } /etc/ssl/certs/devcert.crt`);
            utils_1.run('sudo', ['cp', certificatePath, '/usr/local/share/ca-certificates/devcert.crt']);
            // run(`sudo bash -c "cat ${ certificatePath } >> /etc/ssl/certs/ca-certificates.crt"`);
            utils_1.run('sudo', ['update-ca-certificates']);
            if (this.isFirefoxInstalled()) {
                // Firefox
                debug('Firefox install detected: adding devcert root CA to Firefox-specific trust stores ...');
                if (!command_exists_1.sync('certutil')) {
                    if (options.skipCertutilInstall) {
                        debug('NSS tooling is not already installed, and `skipCertutil` is true, so falling back to manual certificate install for Firefox');
                        shared_1.openCertificateInFirefox(this.FIREFOX_BIN_PATH, certificatePath);
                    }
                    else {
                        debug('NSS tooling is not already installed. Trying to install NSS tooling now with `apt install`');
                        utils_1.run('sudo', ['apt', 'install', 'libnss3-tools']);
                        debug('Installing certificate into Firefox trust stores using NSS tooling');
                        yield shared_1.closeFirefox();
                        yield shared_1.addCertificateToNSSCertDB(this.FIREFOX_NSS_DIR, certificatePath, 'certutil');
                    }
                }
            }
            else {
                debug('Firefox does not appear to be installed, skipping Firefox-specific steps...');
            }
            if (this.isChromeInstalled()) {
                debug('Chrome install detected: adding devcert root CA to Chrome trust store ...');
                if (!command_exists_1.sync('certutil')) {
                    user_interface_1.default.warnChromeOnLinuxWithoutCertutil();
                }
                else {
                    yield shared_1.closeFirefox();
                    yield shared_1.addCertificateToNSSCertDB(this.CHROME_NSS_DIR, certificatePath, 'certutil');
                }
            }
            else {
                debug('Chrome does not appear to be installed, skipping Chrome-specific steps...');
            }
        });
    }
    removeFromTrustStores(certificatePath) {
        try {
            utils_1.run('sudo', ['rm', '/usr/local/share/ca-certificates/devcert.crt']);
            utils_1.run('sudo', ['update-ca-certificates']);
        }
        catch (e) {
            debug(`failed to remove ${certificatePath} from /usr/local/share/ca-certificates, continuing. ${e.toString()}`);
        }
        if (command_exists_1.sync('certutil')) {
            if (this.isFirefoxInstalled()) {
                shared_1.removeCertificateFromNSSCertDB(this.FIREFOX_NSS_DIR, certificatePath, 'certutil');
            }
            if (this.isChromeInstalled()) {
                shared_1.removeCertificateFromNSSCertDB(this.CHROME_NSS_DIR, certificatePath, 'certutil');
            }
        }
    }
    addDomainToHostFileIfMissing(domain) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const trimDomain = domain.trim().replace(/[\s;]/g, '');
            let hostsFileContents = fs_1.readFileSync(this.HOST_FILE_PATH, 'utf8');
            if (!hostsFileContents.includes(trimDomain)) {
                utils_1.sudoAppend(this.HOST_FILE_PATH, `127.0.0.1 ${trimDomain}\n`);
            }
        });
    }
    deleteProtectedFiles(filepath) {
        shared_1.assertNotTouchingFiles(filepath, 'delete');
        utils_1.run('sudo', ['rm', '-rf', filepath]);
    }
    readProtectedFile(filepath) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            shared_1.assertNotTouchingFiles(filepath, 'read');
            return (yield utils_1.run('sudo', ['cat', filepath])).toString().trim();
        });
    }
    writeProtectedFile(filepath, contents) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            shared_1.assertNotTouchingFiles(filepath, 'write');
            if (fs_1.existsSync(filepath)) {
                yield utils_1.run('sudo', ['rm', filepath]);
            }
            fs_1.writeFileSync(filepath, contents);
            yield utils_1.run('sudo', ['chown', '0', filepath]);
            yield utils_1.run('sudo', ['chmod', '600', filepath]);
        });
    }
    isFirefoxInstalled() {
        return fs_1.existsSync(this.FIREFOX_BIN_PATH);
    }
    isChromeInstalled() {
        return fs_1.existsSync(this.CHROME_BIN_PATH);
    }
}
exports.default = LinuxPlatform;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGludXguanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBsYXRmb3Jtcy9saW51eC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3REFBd0I7QUFDeEIsMkJBQTRGO0FBQzVGLDBEQUFnQztBQUNoQyxtREFBdUQ7QUFDdkQscUNBQXFKO0FBQ3JKLG9DQUEyQztBQUUzQywrRUFBbUM7QUFHbkMsTUFBTSxLQUFLLEdBQUcsZUFBVyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFFckQsTUFBcUIsYUFBYTtJQUFsQztRQUVVLG9CQUFlLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3BFLG1CQUFjLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUMzRCxxQkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQztRQUN0QyxvQkFBZSxHQUFHLHdCQUF3QixDQUFDO1FBRTNDLG1CQUFjLEdBQUcsWUFBWSxDQUFDO0lBd0d4QyxDQUFDO0lBdEdDOzs7Ozs7OztPQVFHO0lBQ0csZ0JBQWdCLENBQUMsZUFBdUIsRUFBRSxVQUFtQixFQUFFOztZQUVuRSxLQUFLLENBQUMsMERBQTBELENBQUMsQ0FBQztZQUNsRSxrRUFBa0U7WUFDbEUsV0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUUsOENBQThDLENBQUMsQ0FBQyxDQUFDO1lBQ3JGLHdGQUF3RjtZQUN4RixXQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDO1lBRXhDLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUU7Z0JBQzdCLFVBQVU7Z0JBQ1YsS0FBSyxDQUFDLHVGQUF1RixDQUFDLENBQUM7Z0JBQy9GLElBQUksQ0FBQyxxQkFBYSxDQUFDLFVBQVUsQ0FBQyxFQUFF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QUFDLENBQUM7WUFDekMsT0FBTyxDQUFDLE1BQU0sV0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbEUsQ0FBQztLQUFBO0lBRUssa0JBQWtCLENBQUMsUUFBZ0IsRUFBRSxRQUFnQjs7WUFDekQsK0JBQXNCLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzFDLElBQUksZUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNwQixNQUFNLFdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUNyQztZQUNELGtCQUFTLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sV0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUM1QyxNQUFNLFdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDaEQsQ0FBQztLQUFBO0lBRU8sa0JBQWtCO1FBQ3hCLE9BQU8sZUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFTyxpQkFBaUI7UUFDdkIsT0FBTyxlQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Q0FFRjtBQS9HRCxnQ0ErR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IGV4aXN0c1N5bmMgYXMgZXhpc3RzLCByZWFkRmlsZVN5bmMgYXMgcmVhZCwgd3JpdGVGaWxlU3luYyBhcyB3cml0ZUZpbGUgfSBmcm9tICdmcyc7XG5pbXBvcnQgY3JlYXRlRGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IHsgc3luYyBhcyBjb21tYW5kRXhpc3RzIH0gZnJvbSAnY29tbWFuZC1leGlzdHMnO1xuaW1wb3J0IHsgYWRkQ2VydGlmaWNhdGVUb05TU0NlcnREQiwgYXNzZXJ0Tm90VG91Y2hpbmdGaWxlcywgb3BlbkNlcnRpZmljYXRlSW5GaXJlZm94LCBjbG9zZUZpcmVmb3gsIHJlbW92ZUNlcnRpZmljYXRlRnJvbU5TU0NlcnREQiB9IGZyb20gJy4vc2hhcmVkJztcbmltcG9ydCB7IHJ1biwgc3Vkb0FwcGVuZCB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IE9wdGlvbnMgfSBmcm9tICcuLi9pbmRleCc7XG5pbXBvcnQgVUkgZnJvbSAnLi4vdXNlci1pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICcuJztcblxuY29uc3QgZGVidWcgPSBjcmVhdGVEZWJ1ZygnZGV2Y2VydDpwbGF0Zm9ybXM6bGludXgnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGludXhQbGF0Zm9ybSBpbXBsZW1lbnRzIFBsYXRmb3JtIHtcblxuICBwcml2YXRlIEZJUkVGT1hfTlNTX0RJUiA9IHBhdGguam9pbihwcm9jZXNzLmVudi5IT01FLCAnLm1vemlsbGEvZmlyZWZveC8qJyk7XG4gIHByaXZhdGUgQ0hST01FX05TU19ESVIgPSBwYXRoLmpvaW4ocHJvY2Vzcy5lbnYuSE9NRSwgJy5wa2kvbnNzZGInKTtcbiAgcHJpdmF0ZSBGSVJFRk9YX0JJTl9QQVRIID0gJy91c3IvYmluL2ZpcmVmb3gnO1xuICBwcml2YXRlIENIUk9NRV9CSU5fUEFUSCA9ICcvdXNyL2Jpbi9nb29nbGUtY2hyb21lJztcblxuICBwcml2YXRlIEhPU1RfRklMRV9QQVRIID0gJy9ldGMvaG9zdHMnO1xuXG4gIC8qKlxuICAgKiBMaW51eCBpcyBzdXJwcmlzaW5nbHkgZGlmZmljdWx0LiBUaGVyZSBzZWVtcyB0byBiZSBtdWx0aXBsZSBzeXN0ZW0td2lkZVxuICAgKiByZXBvc2l0b3JpZXMgZm9yIGNlcnRzLCBzbyB3ZSBjb3B5IG91cnMgdG8gZWFjaC4gSG93ZXZlciwgRmlyZWZveCBkb2VzIGl0J3NcbiAgICogdXN1YWwgc2VwYXJhdGUgdHJ1c3Qgc3RvcmUuIFBsdXMgQ2hyb21lIHJlbGllcyBvbiB0aGUgTlNTIHRvb2xpbmcgKGxpa2VcbiAgICogRmlyZWZveCksIGJ1dCB1c2VzIHRoZSB1c2VyJ3MgTlNTIGRhdGFiYXNlLCB1bmxpa2UgRmlyZWZveCAod2hpY2ggdXNlcyBhXG4gICAqIHNlcGFyYXRlIE1vemlsbGEgb25lKS4gQW5kIHNpbmNlIENocm9tZSBkb2Vzbid0IHByb21wdCB0aGUgdXNlciB3aXRoIGEgR1VJXG4gICAqIGZsb3cgd2hlbiBvcGVuaW5nIGNlcnRzLCBpZiB3ZSBjYW4ndCB1c2UgY2VydHV0aWwgdG8gaW5zdGFsbCBvdXIgY2VydGlmaWNhdGVcbiAgICogaW50byB0aGUgdXNlcidzIE5TUyBkYXRhYmFzZSwgd2UncmUgb3V0IG9mIGx1Y2suXG4gICAqL1xuICBhc3luYyBhZGRUb1RydXN0U3RvcmVzKGNlcnRpZmljYXRlUGF0aDogc3RyaW5nLCBvcHRpb25zOiBPcHRpb25zID0ge30pOiBQcm9taXNlPHZvaWQ+IHtcblxuICAgIGRlYnVnKCdBZGRpbmcgZGV2Y2VydCByb290IENBIHRvIExpbnV4IHN5c3RlbS13aWRlIHRydXN0IHN0b3JlcycpO1xuICAgIC8vIHJ1bihgc3VkbyBjcCAkeyBjZXJ0aWZpY2F0ZVBhdGggfSAvZXRjL3NzbC9jZXJ0cy9kZXZjZXJ0LmNydGApO1xuICAgIHJ1bignc3VkbycsIFsnY3AnLCBjZXJ0aWZpY2F0ZVBhdGgsICcvdXNyL2xvY2FsL3NoYXJlL2NhLWNlcnRpZmljYXRlcy9kZXZjZXJ0LmNydCddKTtcbiAgICAvLyBydW4oYHN1ZG8gYmFzaCAtYyBcImNhdCAkeyBjZXJ0aWZpY2F0ZVBhdGggfSA+PiAvZXRjL3NzbC9jZXJ0cy9jYS1jZXJ0aWZpY2F0ZXMuY3J0XCJgKTtcbiAgICBydW4oJ3N1ZG8nLCBbJ3VwZGF0ZS1jYS1jZXJ0aWZpY2F0ZXMnXSk7XG5cbiAgICBpZiAodGhpcy5pc0ZpcmVmb3hJbnN0YWxsZWQoKSkge1xuICAgICAgLy8gRmlyZWZveFxuICAgICAgZGVidWcoJ0ZpcmVmb3ggaW5zdGFsbCBkZXRlY3RlZDogYWRkaW5nIGRldmNlcnQgcm9vdCBDQSB0byBGaXJlZm94LXNwZWNpZmljIHRydXN0IHN0b3JlcyAuLi4nKTtcbiAgICAgIGlmICghY29tbWFuZEV4aXN0cygnY2VydHV0aWwnKSkge1xuICAgICAgICBpZiAob3B0aW9ucy5za2lwQ2VydHV0aWxJbnN0YWxsKSB7XG4gICAgICAgICAgZGVidWcoJ05TUyB0b29saW5nIGlzIG5vdCBhbHJlYWR5IGluc3RhbGxlZCwgYW5kIGBza2lwQ2VydHV0aWxgIGlzIHRydWUsIHNvIGZhbGxpbmcgYmFjayB0byBtYW51YWwgY2VydGlmaWNhdGUgaW5zdGFsbCBmb3IgRmlyZWZveCcpO1xuICAgICAgICAgIG9wZW5DZXJ0aWZpY2F0ZUluRmlyZWZveCh0aGlzLkZJUkVGT1hfQklOX1BBVEgsIGNlcnRpZmljYXRlUGF0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVidWcoJ05TUyB0b29saW5nIGlzIG5vdCBhbHJlYWR5IGluc3RhbGxlZC4gVHJ5aW5nIHRvIGluc3RhbGwgTlNTIHRvb2xpbmcgbm93IHdpdGggYGFwdCBpbnN0YWxsYCcpO1xuICAgICAgICAgIHJ1bignc3VkbycsICBbJ2FwdCcsICdpbnN0YWxsJywgJ2xpYm5zczMtdG9vbHMnXSk7XG4gICAgICAgICAgZGVidWcoJ0luc3RhbGxpbmcgY2VydGlmaWNhdGUgaW50byBGaXJlZm94IHRydXN0IHN0b3JlcyB1c2luZyBOU1MgdG9vbGluZycpO1xuICAgICAgICAgIGF3YWl0IGNsb3NlRmlyZWZveCgpO1xuICAgICAgICAgIGF3YWl0IGFkZENlcnRpZmljYXRlVG9OU1NDZXJ0REIodGhpcy5GSVJFRk9YX05TU19ESVIsIGNlcnRpZmljYXRlUGF0aCwgJ2NlcnR1dGlsJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGVidWcoJ0ZpcmVmb3ggZG9lcyBub3QgYXBwZWFyIHRvIGJlIGluc3RhbGxlZCwgc2tpcHBpbmcgRmlyZWZveC1zcGVjaWZpYyBzdGVwcy4uLicpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzQ2hyb21lSW5zdGFsbGVkKCkpIHtcbiAgICAgIGRlYnVnKCdDaHJvbWUgaW5zdGFsbCBkZXRlY3RlZDogYWRkaW5nIGRldmNlcnQgcm9vdCBDQSB0byBDaHJvbWUgdHJ1c3Qgc3RvcmUgLi4uJyk7XG4gICAgICBpZiAoIWNvbW1hbmRFeGlzdHMoJ2NlcnR1dGlsJykpIHtcbiAgICAgICAgVUkud2FybkNocm9tZU9uTGludXhXaXRob3V0Q2VydHV0aWwoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IGNsb3NlRmlyZWZveCgpO1xuICAgICAgICBhd2FpdCBhZGRDZXJ0aWZpY2F0ZVRvTlNTQ2VydERCKHRoaXMuQ0hST01FX05TU19ESVIsIGNlcnRpZmljYXRlUGF0aCwgJ2NlcnR1dGlsJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnKCdDaHJvbWUgZG9lcyBub3QgYXBwZWFyIHRvIGJlIGluc3RhbGxlZCwgc2tpcHBpbmcgQ2hyb21lLXNwZWNpZmljIHN0ZXBzLi4uJyk7XG4gICAgfVxuICB9XG4gIFxuICByZW1vdmVGcm9tVHJ1c3RTdG9yZXMoY2VydGlmaWNhdGVQYXRoOiBzdHJpbmcpIHtcbiAgICB0cnkge1xuICAgICAgcnVuKCdzdWRvJywgWydybScsICcvdXNyL2xvY2FsL3NoYXJlL2NhLWNlcnRpZmljYXRlcy9kZXZjZXJ0LmNydCddKTtcbiAgICAgIHJ1bignc3VkbycsIFsndXBkYXRlLWNhLWNlcnRpZmljYXRlcyddKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBkZWJ1ZyhgZmFpbGVkIHRvIHJlbW92ZSAkeyBjZXJ0aWZpY2F0ZVBhdGggfSBmcm9tIC91c3IvbG9jYWwvc2hhcmUvY2EtY2VydGlmaWNhdGVzLCBjb250aW51aW5nLiAkeyBlLnRvU3RyaW5nKCkgfWApO1xuICAgIH1cbiAgICBpZiAoY29tbWFuZEV4aXN0cygnY2VydHV0aWwnKSkge1xuICAgICAgaWYgKHRoaXMuaXNGaXJlZm94SW5zdGFsbGVkKCkpIHtcbiAgICAgICAgcmVtb3ZlQ2VydGlmaWNhdGVGcm9tTlNTQ2VydERCKHRoaXMuRklSRUZPWF9OU1NfRElSLCBjZXJ0aWZpY2F0ZVBhdGgsICdjZXJ0dXRpbCcpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuaXNDaHJvbWVJbnN0YWxsZWQoKSkge1xuICAgICAgICByZW1vdmVDZXJ0aWZpY2F0ZUZyb21OU1NDZXJ0REIodGhpcy5DSFJPTUVfTlNTX0RJUiwgY2VydGlmaWNhdGVQYXRoLCAnY2VydHV0aWwnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBhZGREb21haW5Ub0hvc3RGaWxlSWZNaXNzaW5nKGRvbWFpbjogc3RyaW5nKSB7XG4gICAgY29uc3QgdHJpbURvbWFpbiA9IGRvbWFpbi50cmltKCkucmVwbGFjZSgvW1xccztdL2csJycpXG4gICAgbGV0IGhvc3RzRmlsZUNvbnRlbnRzID0gcmVhZCh0aGlzLkhPU1RfRklMRV9QQVRILCAndXRmOCcpO1xuICAgIGlmICghaG9zdHNGaWxlQ29udGVudHMuaW5jbHVkZXModHJpbURvbWFpbikpIHtcbiAgICAgIHN1ZG9BcHBlbmQodGhpcy5IT1NUX0ZJTEVfUEFUSCwgYDEyNy4wLjAuMSAke3RyaW1Eb21haW59XFxuYCk7XG4gICAgfVxuICB9XG5cbiAgZGVsZXRlUHJvdGVjdGVkRmlsZXMoZmlsZXBhdGg6IHN0cmluZykge1xuICAgIGFzc2VydE5vdFRvdWNoaW5nRmlsZXMoZmlsZXBhdGgsICdkZWxldGUnKTtcbiAgICBydW4oJ3N1ZG8nLCBbJ3JtJywgJy1yZicsIGZpbGVwYXRoXSk7XG4gIH1cblxuICBhc3luYyByZWFkUHJvdGVjdGVkRmlsZShmaWxlcGF0aDogc3RyaW5nKSB7XG4gICAgYXNzZXJ0Tm90VG91Y2hpbmdGaWxlcyhmaWxlcGF0aCwgJ3JlYWQnKTtcbiAgICByZXR1cm4gKGF3YWl0IHJ1bignc3VkbycsIFsnY2F0JywgZmlsZXBhdGhdKSkudG9TdHJpbmcoKS50cmltKCk7XG4gIH1cblxuICBhc3luYyB3cml0ZVByb3RlY3RlZEZpbGUoZmlsZXBhdGg6IHN0cmluZywgY29udGVudHM6IHN0cmluZykge1xuICAgIGFzc2VydE5vdFRvdWNoaW5nRmlsZXMoZmlsZXBhdGgsICd3cml0ZScpO1xuICAgIGlmIChleGlzdHMoZmlsZXBhdGgpKSB7XG4gICAgICBhd2FpdCBydW4oJ3N1ZG8nLCBbJ3JtJywgZmlsZXBhdGhdKTtcbiAgICB9XG4gICAgd3JpdGVGaWxlKGZpbGVwYXRoLCBjb250ZW50cyk7XG4gICAgYXdhaXQgcnVuKCdzdWRvJywgWydjaG93bicsICcwJywgZmlsZXBhdGhdKTtcbiAgICBhd2FpdCBydW4oJ3N1ZG8nLCBbJ2NobW9kJywgJzYwMCcsIGZpbGVwYXRoXSk7XG4gIH1cblxuICBwcml2YXRlIGlzRmlyZWZveEluc3RhbGxlZCgpIHtcbiAgICByZXR1cm4gZXhpc3RzKHRoaXMuRklSRUZPWF9CSU5fUEFUSCk7XG4gIH1cblxuICBwcml2YXRlIGlzQ2hyb21lSW5zdGFsbGVkKCkge1xuICAgIHJldHVybiBleGlzdHModGhpcy5DSFJPTUVfQklOX1BBVEgpO1xuICB9XG5cbn0iXX0=