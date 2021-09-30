'use strict';
const irregularPlurals = require('./irregular-plurals.json');

// Ensure nobody can modify each others Map
Object.defineProperty(module, 'exports', {
	get() {
		return new Map(Object.entries(irregularPlurals));
	}
});
