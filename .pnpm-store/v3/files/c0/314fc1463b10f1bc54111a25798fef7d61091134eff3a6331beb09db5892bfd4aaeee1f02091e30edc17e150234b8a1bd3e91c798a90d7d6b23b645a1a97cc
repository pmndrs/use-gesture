// import path from 'path';
import createDebug from 'debug';
import { sync as mkdirp } from 'mkdirp';
import { chmodSync as chmod } from 'fs';
import { openssl } from './utils';
import { withCertificateAuthorityCredentials } from './certificate-authority';
import {pathForDomain, getStableDomainPath, withDomainSigningRequestConfig, withDomainCertificateConfig} from './constants';

const debug = createDebug('devcert:certificates');

/**
 * Generate a domain certificate signed by the devcert root CA. Domain
 * certificates are cached in their own directories under
 * CONFIG_ROOT/domains/<domain>, and reused on subsequent requests. Because the
 * individual domain certificates are signed by the devcert root CA (which was
 * added to the OS/browser trust stores), they are trusted.
 */
export default async function generateDomainCertificate(domains: string[]): Promise<void> {
  const domainPath = getStableDomainPath(domains);
  mkdirp(pathForDomain(domainPath));

  debug(`Generating private key for ${domains}`);
  let domainKeyPath = pathForDomain(domainPath, 'private-key.key');
  generateKey(domainKeyPath);

  debug(`Generating certificate signing request for ${domains}`);
  let csrFile = pathForDomain(domainPath, `certificate-signing-request.csr`);
  withDomainSigningRequestConfig(domains, (configpath) => {
    openssl(['req', '-new', '-config', configpath, '-key', domainKeyPath, '-out', csrFile]);
  });

  debug(`Generating certificate for ${domains} from signing request and signing with root CA`);
  let domainCertPath = pathForDomain(domainPath, `certificate.crt`);

  await withCertificateAuthorityCredentials(({caKeyPath, caCertPath}) => {
    withDomainCertificateConfig(domains, (domainCertConfigPath) => {
      openssl(['ca', '-config', domainCertConfigPath, '-in', csrFile, '-out', domainCertPath, '-keyfile', caKeyPath, '-cert', caCertPath, '-days', '825', '-batch'])
    });
  });
}

// Generate a cryptographic key, used to sign certificates or certificate signing requests.
export function generateKey(filename: string): void {
  debug(`generateKey: ${ filename }`);
  openssl(['genrsa', '-out', filename, '2048']);
  chmod(filename, 400);
}