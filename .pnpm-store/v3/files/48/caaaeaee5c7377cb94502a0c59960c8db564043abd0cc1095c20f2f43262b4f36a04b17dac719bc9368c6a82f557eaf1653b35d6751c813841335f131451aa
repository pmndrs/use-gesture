'use strict';

if (process.env.NODE_ENV === 'production') {
	const shim = new Proxy((() => {}), {
		get: () => shim,
		apply: () => shim
	});

	module.exports = shim;
} else {
	module.exports = require('./dist/source');
}
