"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateKey = void 0;
const tslib_1 = require("tslib");
// import path from 'path';
const debug_1 = tslib_1.__importDefault(require("debug"));
const mkdirp_1 = require("mkdirp");
const fs_1 = require("fs");
const utils_1 = require("./utils");
const certificate_authority_1 = require("./certificate-authority");
const constants_1 = require("./constants");
const debug = debug_1.default('devcert:certificates');
/**
 * Generate a domain certificate signed by the devcert root CA. Domain
 * certificates are cached in their own directories under
 * CONFIG_ROOT/domains/<domain>, and reused on subsequent requests. Because the
 * individual domain certificates are signed by the devcert root CA (which was
 * added to the OS/browser trust stores), they are trusted.
 */
function generateDomainCertificate(domains) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const domainPath = constants_1.getStableDomainPath(domains);
        mkdirp_1.sync(constants_1.pathForDomain(domainPath));
        debug(`Generating private key for ${domains}`);
        let domainKeyPath = constants_1.pathForDomain(domainPath, 'private-key.key');
        generateKey(domainKeyPath);
        debug(`Generating certificate signing request for ${domains}`);
        let csrFile = constants_1.pathForDomain(domainPath, `certificate-signing-request.csr`);
        constants_1.withDomainSigningRequestConfig(domains, (configpath) => {
            utils_1.openssl(['req', '-new', '-config', configpath, '-key', domainKeyPath, '-out', csrFile]);
        });
        debug(`Generating certificate for ${domains} from signing request and signing with root CA`);
        let domainCertPath = constants_1.pathForDomain(domainPath, `certificate.crt`);
        yield certificate_authority_1.withCertificateAuthorityCredentials(({ caKeyPath, caCertPath }) => {
            constants_1.withDomainCertificateConfig(domains, (domainCertConfigPath) => {
                utils_1.openssl(['ca', '-config', domainCertConfigPath, '-in', csrFile, '-out', domainCertPath, '-keyfile', caKeyPath, '-cert', caCertPath, '-days', '825', '-batch']);
            });
        });
    });
}
exports.default = generateDomainCertificate;
// Generate a cryptographic key, used to sign certificates or certificate signing requests.
function generateKey(filename) {
    debug(`generateKey: ${filename}`);
    utils_1.openssl(['genrsa', '-out', filename, '2048']);
    fs_1.chmodSync(filename, 400);
}
exports.generateKey = generateKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VydGlmaWNhdGVzLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJjZXJ0aWZpY2F0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDJCQUEyQjtBQUMzQiwwREFBZ0M7QUFDaEMsbUNBQXdDO0FBQ3hDLDJCQUF3QztBQUN4QyxtQ0FBa0M7QUFDbEMsbUVBQThFO0FBQzlFLDJDQUE0SDtBQUU1SCxNQUFNLEtBQUssR0FBRyxlQUFXLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUVsRDs7Ozs7O0dBTUc7QUFDSCxTQUE4Qix5QkFBeUIsQ0FBQyxPQUFpQjs7UUFDdkUsTUFBTSxVQUFVLEdBQUcsK0JBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEQsYUFBTSxDQUFDLHlCQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUVsQyxLQUFLLENBQUMsOEJBQThCLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDL0MsSUFBSSxhQUFhLEdBQUcseUJBQWEsQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUNqRSxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFM0IsS0FBSyxDQUFDLDhDQUE4QyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELElBQUksT0FBTyxHQUFHLHlCQUFhLENBQUMsVUFBVSxFQUFFLGlDQUFpQyxDQUFDLENBQUM7UUFDM0UsMENBQThCLENBQUMsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDckQsZUFBTyxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDMUYsQ0FBQyxDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsOEJBQThCLE9BQU8sZ0RBQWdELENBQUMsQ0FBQztRQUM3RixJQUFJLGNBQWMsR0FBRyx5QkFBYSxDQUFDLFVBQVUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBRWxFLE1BQU0sMkRBQW1DLENBQUMsQ0FBQyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUMsRUFBRSxFQUFFO1lBQ3BFLHVDQUEyQixDQUFDLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixFQUFFLEVBQUU7Z0JBQzVELGVBQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUE7WUFDaEssQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FBQTtBQXRCRCw0Q0FzQkM7QUFFRCwyRkFBMkY7QUFDM0YsU0FBZ0IsV0FBVyxDQUFDLFFBQWdCO0lBQzFDLEtBQUssQ0FBQyxnQkFBaUIsUUFBUyxFQUFFLENBQUMsQ0FBQztJQUNwQyxlQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzlDLGNBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDdkIsQ0FBQztBQUpELGtDQUlDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgY3JlYXRlRGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IHsgc3luYyBhcyBta2RpcnAgfSBmcm9tICdta2RpcnAnO1xuaW1wb3J0IHsgY2htb2RTeW5jIGFzIGNobW9kIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgb3BlbnNzbCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgd2l0aENlcnRpZmljYXRlQXV0aG9yaXR5Q3JlZGVudGlhbHMgfSBmcm9tICcuL2NlcnRpZmljYXRlLWF1dGhvcml0eSc7XG5pbXBvcnQge3BhdGhGb3JEb21haW4sIGdldFN0YWJsZURvbWFpblBhdGgsIHdpdGhEb21haW5TaWduaW5nUmVxdWVzdENvbmZpZywgd2l0aERvbWFpbkNlcnRpZmljYXRlQ29uZmlnfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmNvbnN0IGRlYnVnID0gY3JlYXRlRGVidWcoJ2RldmNlcnQ6Y2VydGlmaWNhdGVzJyk7XG5cbi8qKlxuICogR2VuZXJhdGUgYSBkb21haW4gY2VydGlmaWNhdGUgc2lnbmVkIGJ5IHRoZSBkZXZjZXJ0IHJvb3QgQ0EuIERvbWFpblxuICogY2VydGlmaWNhdGVzIGFyZSBjYWNoZWQgaW4gdGhlaXIgb3duIGRpcmVjdG9yaWVzIHVuZGVyXG4gKiBDT05GSUdfUk9PVC9kb21haW5zLzxkb21haW4+LCBhbmQgcmV1c2VkIG9uIHN1YnNlcXVlbnQgcmVxdWVzdHMuIEJlY2F1c2UgdGhlXG4gKiBpbmRpdmlkdWFsIGRvbWFpbiBjZXJ0aWZpY2F0ZXMgYXJlIHNpZ25lZCBieSB0aGUgZGV2Y2VydCByb290IENBICh3aGljaCB3YXNcbiAqIGFkZGVkIHRvIHRoZSBPUy9icm93c2VyIHRydXN0IHN0b3JlcyksIHRoZXkgYXJlIHRydXN0ZWQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlRG9tYWluQ2VydGlmaWNhdGUoZG9tYWluczogc3RyaW5nW10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgZG9tYWluUGF0aCA9IGdldFN0YWJsZURvbWFpblBhdGgoZG9tYWlucyk7XG4gIG1rZGlycChwYXRoRm9yRG9tYWluKGRvbWFpblBhdGgpKTtcblxuICBkZWJ1ZyhgR2VuZXJhdGluZyBwcml2YXRlIGtleSBmb3IgJHtkb21haW5zfWApO1xuICBsZXQgZG9tYWluS2V5UGF0aCA9IHBhdGhGb3JEb21haW4oZG9tYWluUGF0aCwgJ3ByaXZhdGUta2V5LmtleScpO1xuICBnZW5lcmF0ZUtleShkb21haW5LZXlQYXRoKTtcblxuICBkZWJ1ZyhgR2VuZXJhdGluZyBjZXJ0aWZpY2F0ZSBzaWduaW5nIHJlcXVlc3QgZm9yICR7ZG9tYWluc31gKTtcbiAgbGV0IGNzckZpbGUgPSBwYXRoRm9yRG9tYWluKGRvbWFpblBhdGgsIGBjZXJ0aWZpY2F0ZS1zaWduaW5nLXJlcXVlc3QuY3NyYCk7XG4gIHdpdGhEb21haW5TaWduaW5nUmVxdWVzdENvbmZpZyhkb21haW5zLCAoY29uZmlncGF0aCkgPT4ge1xuICAgIG9wZW5zc2woWydyZXEnLCAnLW5ldycsICctY29uZmlnJywgY29uZmlncGF0aCwgJy1rZXknLCBkb21haW5LZXlQYXRoLCAnLW91dCcsIGNzckZpbGVdKTtcbiAgfSk7XG5cbiAgZGVidWcoYEdlbmVyYXRpbmcgY2VydGlmaWNhdGUgZm9yICR7ZG9tYWluc30gZnJvbSBzaWduaW5nIHJlcXVlc3QgYW5kIHNpZ25pbmcgd2l0aCByb290IENBYCk7XG4gIGxldCBkb21haW5DZXJ0UGF0aCA9IHBhdGhGb3JEb21haW4oZG9tYWluUGF0aCwgYGNlcnRpZmljYXRlLmNydGApO1xuXG4gIGF3YWl0IHdpdGhDZXJ0aWZpY2F0ZUF1dGhvcml0eUNyZWRlbnRpYWxzKCh7Y2FLZXlQYXRoLCBjYUNlcnRQYXRofSkgPT4ge1xuICAgIHdpdGhEb21haW5DZXJ0aWZpY2F0ZUNvbmZpZyhkb21haW5zLCAoZG9tYWluQ2VydENvbmZpZ1BhdGgpID0+IHtcbiAgICAgIG9wZW5zc2woWydjYScsICctY29uZmlnJywgZG9tYWluQ2VydENvbmZpZ1BhdGgsICctaW4nLCBjc3JGaWxlLCAnLW91dCcsIGRvbWFpbkNlcnRQYXRoLCAnLWtleWZpbGUnLCBjYUtleVBhdGgsICctY2VydCcsIGNhQ2VydFBhdGgsICctZGF5cycsICc4MjUnLCAnLWJhdGNoJ10pXG4gICAgfSk7XG4gIH0pO1xufVxuXG4vLyBHZW5lcmF0ZSBhIGNyeXB0b2dyYXBoaWMga2V5LCB1c2VkIHRvIHNpZ24gY2VydGlmaWNhdGVzIG9yIGNlcnRpZmljYXRlIHNpZ25pbmcgcmVxdWVzdHMuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVLZXkoZmlsZW5hbWU6IHN0cmluZyk6IHZvaWQge1xuICBkZWJ1ZyhgZ2VuZXJhdGVLZXk6ICR7IGZpbGVuYW1lIH1gKTtcbiAgb3BlbnNzbChbJ2dlbnJzYScsICctb3V0JywgZmlsZW5hbWUsICcyMDQ4J10pO1xuICBjaG1vZChmaWxlbmFtZSwgNDAwKTtcbn0iXX0=