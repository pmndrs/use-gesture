'use strict';
const os = require('os');
const path = require('path');
const binBuild = require('bin-build');
const log = require('logalot');
const bin = require('.');

const cpuNumber = Math.max(os.cpus().length, 1);

bin.run(['-version']).then(() => {
	log.success('mozjpeg pre-build test passed successfully');
}).catch(async error => {
	log.warn(error.message);
	log.warn('mozjpeg pre-build test failed');
	log.info('compiling from source');

	let cfgExtras = '';
	if (process.platform === 'darwin') {
		cfgExtras = 'libpng_LIBS=\'/usr/local/lib/libpng16.a -lz\' --enable-static';
	}

	const cfg = [
		`./configure --enable-static --disable-shared --disable-dependency-tracking --with-jpeg8 ${cfgExtras}`,
		`--prefix="${bin.dest()}" --bindir="${bin.dest()}" --libdir="${bin.dest()}"`
	].join(' ');

	try {
		await binBuild.file(path.resolve(__dirname, '../vendor/source/mozjpeg.tar.gz'), [
			'autoreconf -fiv',
			cfg,
			`make -j${cpuNumber}`,
			`make install -j${cpuNumber}`
		]);

		log.success('mozjpeg built successfully');
	} catch (error) {
		log.error(error.stack);

		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1);
	}
});
