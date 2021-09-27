"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const fs_1 = require("fs");
const rimraf_1 = require("rimraf");
const shared_1 = require("./shared");
const utils_1 = require("../utils");
const user_interface_1 = tslib_1.__importDefault(require("../user-interface"));
const debug = debug_1.default('devcert:platforms:windows');
let encryptionKey;
class WindowsPlatform {
    constructor() {
        this.HOST_FILE_PATH = 'C:\\Windows\\System32\\Drivers\\etc\\hosts';
    }
    /**
     * Windows is at least simple. Like macOS, most applications will delegate to
     * the system trust store, which is updated with the confusingly named
     * `certutil` exe (not the same as the NSS/Mozilla certutil). Firefox does it's
     * own thing as usual, and getting a copy of NSS certutil onto the Windows
     * machine to try updating the Firefox store is basically a nightmare, so we
     * don't even try it - we just bail out to the GUI.
     */
    addToTrustStores(certificatePath, options = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // IE, Chrome, system utils
            debug('adding devcert root to Windows OS trust store');
            try {
                utils_1.run('certutil', ['-addstore', '-user', 'root', certificatePath]);
            }
            catch (e) {
                e.output.map((buffer) => {
                    if (buffer) {
                        console.log(buffer.toString());
                    }
                });
            }
            debug('adding devcert root to Firefox trust store');
            // Firefox (don't even try NSS certutil, no easy install for Windows)
            try {
                yield shared_1.openCertificateInFirefox('start firefox', certificatePath);
            }
            catch (_a) {
                debug('Error opening Firefox, most likely Firefox is not installed');
            }
        });
    }
    removeFromTrustStores(certificatePath) {
        debug('removing devcert root from Windows OS trust store');
        try {
            console.warn('Removing old certificates from trust stores. You may be prompted to grant permission for this. It\'s safe to delete old devcert certificates.');
            utils_1.run('certutil', ['-delstore', '-user', 'root', 'devcert']);
        }
        catch (e) {
            debug(`failed to remove ${certificatePath} from Windows OS trust store, continuing. ${e.toString()}`);
        }
    }
    addDomainToHostFileIfMissing(domain) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let hostsFileContents = fs_1.readFileSync(this.HOST_FILE_PATH, 'utf8');
            if (!hostsFileContents.includes(domain)) {
                yield utils_1.sudo(`echo 127.0.0.1  ${domain} >> ${this.HOST_FILE_PATH}`);
            }
        });
    }
    deleteProtectedFiles(filepath) {
        shared_1.assertNotTouchingFiles(filepath, 'delete');
        rimraf_1.sync(filepath);
    }
    readProtectedFile(filepath) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            shared_1.assertNotTouchingFiles(filepath, 'read');
            if (!encryptionKey) {
                encryptionKey = yield user_interface_1.default.getWindowsEncryptionPassword();
            }
            // Try to decrypt the file
            try {
                return this.decrypt(fs_1.readFileSync(filepath, 'utf8'), encryptionKey);
            }
            catch (e) {
                // If it's a bad password, clear the cached copy and retry
                if (e.message.indexOf('bad decrypt') >= -1) {
                    encryptionKey = null;
                    return yield this.readProtectedFile(filepath);
                }
                throw e;
            }
        });
    }
    writeProtectedFile(filepath, contents) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            shared_1.assertNotTouchingFiles(filepath, 'write');
            if (!encryptionKey) {
                encryptionKey = yield user_interface_1.default.getWindowsEncryptionPassword();
            }
            let encryptedContents = this.encrypt(contents, encryptionKey);
            fs_1.writeFileSync(filepath, encryptedContents);
        });
    }
    encrypt(text, key) {
        let cipher = crypto_1.default.createCipher('aes256', new Buffer(key));
        return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
    }
    decrypt(encrypted, key) {
        let decipher = crypto_1.default.createDecipher('aes256', new Buffer(key));
        return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
    }
}
exports.default = WindowsPlatform;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luMzIuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBsYXRmb3Jtcy93aW4zMi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBZ0M7QUFDaEMsNERBQTRCO0FBQzVCLDJCQUFrRTtBQUNsRSxtQ0FBd0M7QUFFeEMscUNBQTRFO0FBRTVFLG9DQUFxQztBQUNyQywrRUFBbUM7QUFFbkMsTUFBTSxLQUFLLEdBQUcsZUFBVyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFFdkQsSUFBSSxhQUFxQixDQUFDO0FBRTFCLE1BQXFCLGVBQWU7SUFBcEM7UUFFVSxtQkFBYyxHQUFHLDRDQUE0QyxDQUFDO0lBMEZ4RSxDQUFDO0lBeEZDOzs7Ozs7O09BT0c7SUFDRyxnQkFBZ0IsQ0FBQyxlQUF1QixFQUFFLFVBQW1CLEVBQUU7O1lBQ25FLDJCQUEyQjtZQUMzQixLQUFLLENBQUMsK0NBQStDLENBQUMsQ0FBQTtZQUN0RCxJQUFJO2dCQUNGLFdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDO2FBQ2xFO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFjLEVBQUUsRUFBRTtvQkFDOUIsSUFBSSxNQUFNLEVBQUU7d0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztxQkFDaEM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUNELEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFBO1lBQ25ELHFFQUFxRTtZQUNyRSxJQUFJO2dCQUNGLE1BQU0saUNBQXdCLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQyxDQUFDO2FBQ2xFO1lBQUMsV0FBTTtnQkFDTixLQUFLLENBQUMsNkRBQTZELENBQUMsQ0FBQzthQUN0RTtRQUNILENBQUM7S0FBQTtJQUVELHFCQUFxQixDQUFDLGVBQXVCO1FBQzNDLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO1FBQzNELElBQUk7WUFDRixPQUFPLENBQUMsSUFBSSxDQUFDLCtJQUErSSxDQUFDLENBQUM7WUFDOUosV0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7U0FDNUQ7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLEtBQUssQ0FBQyxvQkFBcUIsZUFBZ0IsNkNBQThDLENBQUMsQ0FBQyxRQUFRLEVBQUcsRUFBRSxDQUFDLENBQUE7U0FDMUc7SUFDSCxDQUFDO0lBRUssNEJBQTRCLENBQUMsTUFBYzs7WUFDL0MsSUFBSSxpQkFBaUIsR0FBRyxpQkFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDdkMsTUFBTSxZQUFJLENBQUMsbUJBQW9CLE1BQU8sT0FBUSxJQUFJLENBQUMsY0FBZSxFQUFFLENBQUMsQ0FBQzthQUN2RTtRQUNILENBQUM7S0FBQTtJQUVELG9CQUFvQixDQUFDLFFBQWdCO1FBQ25DLCtCQUFzQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMzQyxhQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVLLGlCQUFpQixDQUFDLFFBQWdCOztZQUN0QywrQkFBc0IsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDbEIsYUFBYSxHQUFHLE1BQU0sd0JBQUUsQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO2FBQ3pEO1lBQ0QsMEJBQTBCO1lBQzFCLElBQUk7Z0JBQ0YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO2FBQzVEO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsMERBQTBEO2dCQUMxRCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO29CQUMxQyxhQUFhLEdBQUcsSUFBSSxDQUFDO29CQUNyQixPQUFPLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUMvQztnQkFDRCxNQUFNLENBQUMsQ0FBQzthQUNUO1FBQ0gsQ0FBQztLQUFBO0lBRUssa0JBQWtCLENBQUMsUUFBZ0IsRUFBRSxRQUFnQjs7WUFDekQsK0JBQXNCLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ2xCLGFBQWEsR0FBRyxNQUFNLHdCQUFFLENBQUMsNEJBQTRCLEVBQUUsQ0FBQzthQUN6RDtZQUNELElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDOUQsa0JBQUssQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUNyQyxDQUFDO0tBQUE7SUFFTyxPQUFPLENBQUMsSUFBWSxFQUFFLEdBQVc7UUFDdkMsSUFBSSxNQUFNLEdBQUcsZ0JBQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDNUQsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRU8sT0FBTyxDQUFDLFNBQWlCLEVBQUUsR0FBVztRQUM1QyxJQUFJLFFBQVEsR0FBRyxnQkFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoRSxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVFLENBQUM7Q0FFRjtBQTVGRCxrQ0E0RkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3JlYXRlRGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IGNyeXB0byBmcm9tICdjcnlwdG8nO1xuaW1wb3J0IHsgd3JpdGVGaWxlU3luYyBhcyB3cml0ZSwgcmVhZEZpbGVTeW5jIGFzIHJlYWQgfSBmcm9tICdmcyc7XG5pbXBvcnQgeyBzeW5jIGFzIHJpbXJhZiB9IGZyb20gJ3JpbXJhZic7XG5pbXBvcnQgeyBPcHRpb25zIH0gZnJvbSAnLi4vaW5kZXgnO1xuaW1wb3J0IHsgYXNzZXJ0Tm90VG91Y2hpbmdGaWxlcywgb3BlbkNlcnRpZmljYXRlSW5GaXJlZm94IH0gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICcuJztcbmltcG9ydCB7IHJ1biwgc3VkbyB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCBVSSBmcm9tICcuLi91c2VyLWludGVyZmFjZSc7XG5cbmNvbnN0IGRlYnVnID0gY3JlYXRlRGVidWcoJ2RldmNlcnQ6cGxhdGZvcm1zOndpbmRvd3MnKTtcblxubGV0IGVuY3J5cHRpb25LZXk6IHN0cmluZztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2luZG93c1BsYXRmb3JtIGltcGxlbWVudHMgUGxhdGZvcm0ge1xuXG4gIHByaXZhdGUgSE9TVF9GSUxFX1BBVEggPSAnQzpcXFxcV2luZG93c1xcXFxTeXN0ZW0zMlxcXFxEcml2ZXJzXFxcXGV0Y1xcXFxob3N0cyc7XG5cbiAgLyoqXG4gICAqIFdpbmRvd3MgaXMgYXQgbGVhc3Qgc2ltcGxlLiBMaWtlIG1hY09TLCBtb3N0IGFwcGxpY2F0aW9ucyB3aWxsIGRlbGVnYXRlIHRvXG4gICAqIHRoZSBzeXN0ZW0gdHJ1c3Qgc3RvcmUsIHdoaWNoIGlzIHVwZGF0ZWQgd2l0aCB0aGUgY29uZnVzaW5nbHkgbmFtZWRcbiAgICogYGNlcnR1dGlsYCBleGUgKG5vdCB0aGUgc2FtZSBhcyB0aGUgTlNTL01vemlsbGEgY2VydHV0aWwpLiBGaXJlZm94IGRvZXMgaXQnc1xuICAgKiBvd24gdGhpbmcgYXMgdXN1YWwsIGFuZCBnZXR0aW5nIGEgY29weSBvZiBOU1MgY2VydHV0aWwgb250byB0aGUgV2luZG93c1xuICAgKiBtYWNoaW5lIHRvIHRyeSB1cGRhdGluZyB0aGUgRmlyZWZveCBzdG9yZSBpcyBiYXNpY2FsbHkgYSBuaWdodG1hcmUsIHNvIHdlXG4gICAqIGRvbid0IGV2ZW4gdHJ5IGl0IC0gd2UganVzdCBiYWlsIG91dCB0byB0aGUgR1VJLlxuICAgKi9cbiAgYXN5bmMgYWRkVG9UcnVzdFN0b3JlcyhjZXJ0aWZpY2F0ZVBhdGg6IHN0cmluZywgb3B0aW9uczogT3B0aW9ucyA9IHt9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gSUUsIENocm9tZSwgc3lzdGVtIHV0aWxzXG4gICAgZGVidWcoJ2FkZGluZyBkZXZjZXJ0IHJvb3QgdG8gV2luZG93cyBPUyB0cnVzdCBzdG9yZScpXG4gICAgdHJ5IHtcbiAgICAgIHJ1bignY2VydHV0aWwnLCBbJy1hZGRzdG9yZScsICctdXNlcicsICdyb290JywgY2VydGlmaWNhdGVQYXRoXSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZS5vdXRwdXQubWFwKChidWZmZXI6IEJ1ZmZlcikgPT4ge1xuICAgICAgICBpZiAoYnVmZmVyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coYnVmZmVyLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgZGVidWcoJ2FkZGluZyBkZXZjZXJ0IHJvb3QgdG8gRmlyZWZveCB0cnVzdCBzdG9yZScpXG4gICAgLy8gRmlyZWZveCAoZG9uJ3QgZXZlbiB0cnkgTlNTIGNlcnR1dGlsLCBubyBlYXN5IGluc3RhbGwgZm9yIFdpbmRvd3MpXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IG9wZW5DZXJ0aWZpY2F0ZUluRmlyZWZveCgnc3RhcnQgZmlyZWZveCcsIGNlcnRpZmljYXRlUGF0aCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICBkZWJ1ZygnRXJyb3Igb3BlbmluZyBGaXJlZm94LCBtb3N0IGxpa2VseSBGaXJlZm94IGlzIG5vdCBpbnN0YWxsZWQnKTtcbiAgICB9XG4gIH1cbiAgXG4gIHJlbW92ZUZyb21UcnVzdFN0b3JlcyhjZXJ0aWZpY2F0ZVBhdGg6IHN0cmluZykge1xuICAgIGRlYnVnKCdyZW1vdmluZyBkZXZjZXJ0IHJvb3QgZnJvbSBXaW5kb3dzIE9TIHRydXN0IHN0b3JlJyk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnNvbGUud2FybignUmVtb3Zpbmcgb2xkIGNlcnRpZmljYXRlcyBmcm9tIHRydXN0IHN0b3Jlcy4gWW91IG1heSBiZSBwcm9tcHRlZCB0byBncmFudCBwZXJtaXNzaW9uIGZvciB0aGlzLiBJdFxcJ3Mgc2FmZSB0byBkZWxldGUgb2xkIGRldmNlcnQgY2VydGlmaWNhdGVzLicpO1xuICAgICAgcnVuKCdjZXJ0dXRpbCcsIFsnLWRlbHN0b3JlJywgJy11c2VyJywgJ3Jvb3QnLCAnZGV2Y2VydCddKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBkZWJ1ZyhgZmFpbGVkIHRvIHJlbW92ZSAkeyBjZXJ0aWZpY2F0ZVBhdGggfSBmcm9tIFdpbmRvd3MgT1MgdHJ1c3Qgc3RvcmUsIGNvbnRpbnVpbmcuICR7IGUudG9TdHJpbmcoKSB9YClcbiAgICB9XG4gIH1cblxuICBhc3luYyBhZGREb21haW5Ub0hvc3RGaWxlSWZNaXNzaW5nKGRvbWFpbjogc3RyaW5nKSB7XG4gICAgbGV0IGhvc3RzRmlsZUNvbnRlbnRzID0gcmVhZCh0aGlzLkhPU1RfRklMRV9QQVRILCAndXRmOCcpO1xuICAgIGlmICghaG9zdHNGaWxlQ29udGVudHMuaW5jbHVkZXMoZG9tYWluKSkge1xuICAgICAgYXdhaXQgc3VkbyhgZWNobyAxMjcuMC4wLjEgICR7IGRvbWFpbiB9ID4+ICR7IHRoaXMuSE9TVF9GSUxFX1BBVEggfWApO1xuICAgIH1cbiAgfVxuICBcbiAgZGVsZXRlUHJvdGVjdGVkRmlsZXMoZmlsZXBhdGg6IHN0cmluZykge1xuICAgIGFzc2VydE5vdFRvdWNoaW5nRmlsZXMoZmlsZXBhdGgsICdkZWxldGUnKTtcbiAgICByaW1yYWYoZmlsZXBhdGgpO1xuICB9XG5cbiAgYXN5bmMgcmVhZFByb3RlY3RlZEZpbGUoZmlsZXBhdGg6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgYXNzZXJ0Tm90VG91Y2hpbmdGaWxlcyhmaWxlcGF0aCwgJ3JlYWQnKTtcbiAgICBpZiAoIWVuY3J5cHRpb25LZXkpIHtcbiAgICAgIGVuY3J5cHRpb25LZXkgPSBhd2FpdCBVSS5nZXRXaW5kb3dzRW5jcnlwdGlvblBhc3N3b3JkKCk7XG4gICAgfVxuICAgIC8vIFRyeSB0byBkZWNyeXB0IHRoZSBmaWxlXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB0aGlzLmRlY3J5cHQocmVhZChmaWxlcGF0aCwgJ3V0ZjgnKSwgZW5jcnlwdGlvbktleSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gSWYgaXQncyBhIGJhZCBwYXNzd29yZCwgY2xlYXIgdGhlIGNhY2hlZCBjb3B5IGFuZCByZXRyeVxuICAgICAgaWYgKGUubWVzc2FnZS5pbmRleE9mKCdiYWQgZGVjcnlwdCcpID49IC0xKSB7XG4gICAgICAgIGVuY3J5cHRpb25LZXkgPSBudWxsO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5yZWFkUHJvdGVjdGVkRmlsZShmaWxlcGF0aCk7XG4gICAgICB9XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHdyaXRlUHJvdGVjdGVkRmlsZShmaWxlcGF0aDogc3RyaW5nLCBjb250ZW50czogc3RyaW5nKSB7XG4gICAgYXNzZXJ0Tm90VG91Y2hpbmdGaWxlcyhmaWxlcGF0aCwgJ3dyaXRlJyk7XG4gICAgaWYgKCFlbmNyeXB0aW9uS2V5KSB7XG4gICAgICBlbmNyeXB0aW9uS2V5ID0gYXdhaXQgVUkuZ2V0V2luZG93c0VuY3J5cHRpb25QYXNzd29yZCgpO1xuICAgIH1cbiAgICBsZXQgZW5jcnlwdGVkQ29udGVudHMgPSB0aGlzLmVuY3J5cHQoY29udGVudHMsIGVuY3J5cHRpb25LZXkpO1xuICAgIHdyaXRlKGZpbGVwYXRoLCBlbmNyeXB0ZWRDb250ZW50cyk7XG4gIH1cblxuICBwcml2YXRlIGVuY3J5cHQodGV4dDogc3RyaW5nLCBrZXk6IHN0cmluZykge1xuICAgIGxldCBjaXBoZXIgPSBjcnlwdG8uY3JlYXRlQ2lwaGVyKCdhZXMyNTYnLCBuZXcgQnVmZmVyKGtleSkpO1xuICAgIHJldHVybiBjaXBoZXIudXBkYXRlKHRleHQsICd1dGY4JywgJ2hleCcpICsgY2lwaGVyLmZpbmFsKCdoZXgnKTtcbiAgfVxuXG4gIHByaXZhdGUgZGVjcnlwdChlbmNyeXB0ZWQ6IHN0cmluZywga2V5OiBzdHJpbmcpIHtcbiAgICBsZXQgZGVjaXBoZXIgPSBjcnlwdG8uY3JlYXRlRGVjaXBoZXIoJ2FlczI1NicsIG5ldyBCdWZmZXIoa2V5KSk7XG4gICAgcmV0dXJuIGRlY2lwaGVyLnVwZGF0ZShlbmNyeXB0ZWQsICdoZXgnLCAndXRmOCcpICsgZGVjaXBoZXIuZmluYWwoJ3V0ZjgnKTtcbiAgfVxuXG59Il19