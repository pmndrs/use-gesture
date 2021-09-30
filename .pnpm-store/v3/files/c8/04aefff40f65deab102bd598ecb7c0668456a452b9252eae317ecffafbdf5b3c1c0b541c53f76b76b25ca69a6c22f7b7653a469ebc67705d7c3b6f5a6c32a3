"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const password_prompt_1 = tslib_1.__importDefault(require("password-prompt"));
const utils_1 = require("./utils");
const DefaultUI = {
    getWindowsEncryptionPassword() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield password_prompt_1.default('devcert password (http://bit.ly/devcert-what-password?):');
        });
    },
    warnChromeOnLinuxWithoutCertutil() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.warn(`
      WARNING: It looks like you have Chrome installed, but you specified
      'skipCertutilInstall: true'. Unfortunately, without installing
      certutil, it's impossible get Chrome to trust devcert's certificates
      The certificates will work, but Chrome will continue to warn you that
      they are untrusted.
    `);
        });
    },
    closeFirefoxBeforeContinuing() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('Please close Firefox before continuing');
        });
    },
    startFirefoxWizard(certificateHost) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(`
      devcert was unable to automatically configure Firefox. You'll need to
      complete this process manually. Don't worry though - Firefox will walk
      you through it.

      When you're ready, hit any key to continue. Firefox will launch and
      display a wizard to walk you through how to trust the devcert
      certificate. When you are finished, come back here and we'll finish up.

      (If Firefox doesn't start, go ahead and start it and navigate to
      ${certificateHost} in a new tab.)

      If you are curious about why all this is necessary, check out
      https://github.com/davewasmer/devcert#how-it-works

      <Press any key to launch Firefox wizard>
    `);
            yield utils_1.waitForUser();
        });
    },
    firefoxWizardPromptPage(certificateURL) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return `
      <html>
        <head>
          <meta http-equiv="refresh" content="0; url=${certificateURL}" />
        </head>
      </html>
    `;
        });
    },
    waitForFirefoxWizard() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(`
      Launching Firefox ...

      Great! Once you've finished the Firefox wizard for adding the devcert
      certificate, just hit any key here again and we'll wrap up.

      <Press any key to continue>
    `);
            yield utils_1.waitForUser();
        });
    }
};
exports.default = DefaultUI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInVzZXItaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhFQUE2QztBQUM3QyxtQ0FBc0M7QUFXdEMsTUFBTSxTQUFTLEdBQWtCO0lBQ3pCLDRCQUE0Qjs7WUFDaEMsT0FBTyxNQUFNLHlCQUFjLENBQUMsMERBQTBELENBQUMsQ0FBQztRQUMxRixDQUFDO0tBQUE7SUFDSyxnQ0FBZ0M7O1lBQ3BDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Ozs7OztLQU1aLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUNLLDRCQUE0Qjs7WUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1FBQ3hELENBQUM7S0FBQTtJQUNLLGtCQUFrQixDQUFDLGVBQWU7O1lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUM7Ozs7Ozs7Ozs7UUFVUCxlQUFnQjs7Ozs7O0tBTXBCLENBQUMsQ0FBQztZQUNILE1BQU0sbUJBQVcsRUFBRSxDQUFDO1FBQ3RCLENBQUM7S0FBQTtJQUNLLHVCQUF1QixDQUFDLGNBQXNCOztZQUNsRCxPQUFPOzs7dURBRzRDLGNBQWM7OztLQUdoRSxDQUFDO1FBQ0osQ0FBQztLQUFBO0lBQ0ssb0JBQW9COztZQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDOzs7Ozs7O0tBT1gsQ0FBQyxDQUFBO1lBQ0YsTUFBTSxtQkFBVyxFQUFFLENBQUM7UUFDdEIsQ0FBQztLQUFBO0NBQ0YsQ0FBQTtBQUVELGtCQUFlLFNBQVMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXNzd29yZFByb21wdCBmcm9tICdwYXNzd29yZC1wcm9tcHQnO1xuaW1wb3J0IHsgd2FpdEZvclVzZXIgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGludGVyZmFjZSBVc2VySW50ZXJmYWNlIHtcbiAgZ2V0V2luZG93c0VuY3J5cHRpb25QYXNzd29yZCgpOiBQcm9taXNlPHN0cmluZz47XG4gIHdhcm5DaHJvbWVPbkxpbnV4V2l0aG91dENlcnR1dGlsKCk6IFByb21pc2U8dm9pZD47XG4gIGNsb3NlRmlyZWZveEJlZm9yZUNvbnRpbnVpbmcoKTogUHJvbWlzZTx2b2lkPjtcbiAgc3RhcnRGaXJlZm94V2l6YXJkKGNlcnRpZmljYXRlSG9zdDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPjtcbiAgZmlyZWZveFdpemFyZFByb21wdFBhZ2UoY2VydGlmaWNhdGVVUkw6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPjtcbiAgd2FpdEZvckZpcmVmb3hXaXphcmQoKTogUHJvbWlzZTx2b2lkPjtcbn1cblxuY29uc3QgRGVmYXVsdFVJOiBVc2VySW50ZXJmYWNlID0ge1xuICBhc3luYyBnZXRXaW5kb3dzRW5jcnlwdGlvblBhc3N3b3JkKCkge1xuICAgIHJldHVybiBhd2FpdCBwYXNzd29yZFByb21wdCgnZGV2Y2VydCBwYXNzd29yZCAoaHR0cDovL2JpdC5seS9kZXZjZXJ0LXdoYXQtcGFzc3dvcmQ/KTonKTtcbiAgfSxcbiAgYXN5bmMgd2FybkNocm9tZU9uTGludXhXaXRob3V0Q2VydHV0aWwoKSB7XG4gICAgY29uc29sZS53YXJuKGBcbiAgICAgIFdBUk5JTkc6IEl0IGxvb2tzIGxpa2UgeW91IGhhdmUgQ2hyb21lIGluc3RhbGxlZCwgYnV0IHlvdSBzcGVjaWZpZWRcbiAgICAgICdza2lwQ2VydHV0aWxJbnN0YWxsOiB0cnVlJy4gVW5mb3J0dW5hdGVseSwgd2l0aG91dCBpbnN0YWxsaW5nXG4gICAgICBjZXJ0dXRpbCwgaXQncyBpbXBvc3NpYmxlIGdldCBDaHJvbWUgdG8gdHJ1c3QgZGV2Y2VydCdzIGNlcnRpZmljYXRlc1xuICAgICAgVGhlIGNlcnRpZmljYXRlcyB3aWxsIHdvcmssIGJ1dCBDaHJvbWUgd2lsbCBjb250aW51ZSB0byB3YXJuIHlvdSB0aGF0XG4gICAgICB0aGV5IGFyZSB1bnRydXN0ZWQuXG4gICAgYCk7XG4gIH0sXG4gIGFzeW5jIGNsb3NlRmlyZWZveEJlZm9yZUNvbnRpbnVpbmcoKSB7XG4gICAgY29uc29sZS5sb2coJ1BsZWFzZSBjbG9zZSBGaXJlZm94IGJlZm9yZSBjb250aW51aW5nJyk7XG4gIH0sXG4gIGFzeW5jIHN0YXJ0RmlyZWZveFdpemFyZChjZXJ0aWZpY2F0ZUhvc3QpIHtcbiAgICBjb25zb2xlLmxvZyhgXG4gICAgICBkZXZjZXJ0IHdhcyB1bmFibGUgdG8gYXV0b21hdGljYWxseSBjb25maWd1cmUgRmlyZWZveC4gWW91J2xsIG5lZWQgdG9cbiAgICAgIGNvbXBsZXRlIHRoaXMgcHJvY2VzcyBtYW51YWxseS4gRG9uJ3Qgd29ycnkgdGhvdWdoIC0gRmlyZWZveCB3aWxsIHdhbGtcbiAgICAgIHlvdSB0aHJvdWdoIGl0LlxuXG4gICAgICBXaGVuIHlvdSdyZSByZWFkeSwgaGl0IGFueSBrZXkgdG8gY29udGludWUuIEZpcmVmb3ggd2lsbCBsYXVuY2ggYW5kXG4gICAgICBkaXNwbGF5IGEgd2l6YXJkIHRvIHdhbGsgeW91IHRocm91Z2ggaG93IHRvIHRydXN0IHRoZSBkZXZjZXJ0XG4gICAgICBjZXJ0aWZpY2F0ZS4gV2hlbiB5b3UgYXJlIGZpbmlzaGVkLCBjb21lIGJhY2sgaGVyZSBhbmQgd2UnbGwgZmluaXNoIHVwLlxuXG4gICAgICAoSWYgRmlyZWZveCBkb2Vzbid0IHN0YXJ0LCBnbyBhaGVhZCBhbmQgc3RhcnQgaXQgYW5kIG5hdmlnYXRlIHRvXG4gICAgICAkeyBjZXJ0aWZpY2F0ZUhvc3QgfSBpbiBhIG5ldyB0YWIuKVxuXG4gICAgICBJZiB5b3UgYXJlIGN1cmlvdXMgYWJvdXQgd2h5IGFsbCB0aGlzIGlzIG5lY2Vzc2FyeSwgY2hlY2sgb3V0XG4gICAgICBodHRwczovL2dpdGh1Yi5jb20vZGF2ZXdhc21lci9kZXZjZXJ0I2hvdy1pdC13b3Jrc1xuXG4gICAgICA8UHJlc3MgYW55IGtleSB0byBsYXVuY2ggRmlyZWZveCB3aXphcmQ+XG4gICAgYCk7XG4gICAgYXdhaXQgd2FpdEZvclVzZXIoKTtcbiAgfSxcbiAgYXN5bmMgZmlyZWZveFdpemFyZFByb21wdFBhZ2UoY2VydGlmaWNhdGVVUkw6IHN0cmluZykge1xuICAgIHJldHVybiBgXG4gICAgICA8aHRtbD5cbiAgICAgICAgPGhlYWQ+XG4gICAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj1cInJlZnJlc2hcIiBjb250ZW50PVwiMDsgdXJsPSR7Y2VydGlmaWNhdGVVUkx9XCIgLz5cbiAgICAgICAgPC9oZWFkPlxuICAgICAgPC9odG1sPlxuICAgIGA7XG4gIH0sXG4gIGFzeW5jIHdhaXRGb3JGaXJlZm94V2l6YXJkKCkge1xuICAgIGNvbnNvbGUubG9nKGBcbiAgICAgIExhdW5jaGluZyBGaXJlZm94IC4uLlxuXG4gICAgICBHcmVhdCEgT25jZSB5b3UndmUgZmluaXNoZWQgdGhlIEZpcmVmb3ggd2l6YXJkIGZvciBhZGRpbmcgdGhlIGRldmNlcnRcbiAgICAgIGNlcnRpZmljYXRlLCBqdXN0IGhpdCBhbnkga2V5IGhlcmUgYWdhaW4gYW5kIHdlJ2xsIHdyYXAgdXAuXG5cbiAgICAgIDxQcmVzcyBhbnkga2V5IHRvIGNvbnRpbnVlPlxuICAgIGApXG4gICAgYXdhaXQgd2FpdEZvclVzZXIoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0VUk7Il19