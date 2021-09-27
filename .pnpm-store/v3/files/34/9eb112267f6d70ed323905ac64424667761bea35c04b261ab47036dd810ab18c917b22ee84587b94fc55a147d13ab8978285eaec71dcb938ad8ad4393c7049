'use strict';
const path = require('path');
const binBuild = require('bin-build');
const log = require('logalot');
const bin = require('.');

bin.run(['--version']).then(() => {
	log.success('pngquant pre-build test passed successfully');
}).catch(async error => {
	log.warn(error.message);
	log.warn('pngquant pre-build test failed');
	log.info('compiling from source');

	const libpng = process.platform === 'darwin' ? 'libpng' : 'libpng-dev';

	try {
		await binBuild.file(path.resolve(__dirname, '../vendor/source/pngquant.tar.gz'), [
			'rm ./INSTALL',
			`./configure --prefix="${bin.dest()}"`,
			`make install BINPREFIX="${bin.dest()}"`
		]);

		log.success('pngquant built successfully');
	} catch (error) {
		error.message = `pngquant failed to build, make sure that ${libpng} is installed`;
		log.error(error.stack);

		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1);
	}
});
