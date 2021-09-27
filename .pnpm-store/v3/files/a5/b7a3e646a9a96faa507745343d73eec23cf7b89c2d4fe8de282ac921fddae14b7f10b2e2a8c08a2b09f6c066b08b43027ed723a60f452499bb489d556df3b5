import Node from '../Node.js';
import removeTrailingComma from '../../utils/removeTrailingComma.js';

export default class ArrowFunctionExpression extends Node {
	initialise(transforms) {
		this.body.createScope();
		super.initialise(transforms);
	}

	transpile(code, transforms) {
		const naked = this.params.length === 1 && this.start === this.params[0].start;

		if (transforms.arrow || this.needsArguments(transforms)) {
			// remove arrow
			let charIndex = this.body.start;
			while (code.original[charIndex] !== '=') {
				charIndex -= 1;
			}
			code.remove(charIndex, this.body.start);

			super.transpile(code, transforms);

			// wrap naked parameter
			if (naked) {
				code.prependRight(this.params[0].start, '(');
				code.appendLeft(this.params[0].end, ')');
			}

			// add function
			if (this.parent && this.parent.type === 'ExpressionStatement') {
				// standalone expression statement
				code.prependRight(this.start, '!function');
			} else {
				code.prependRight(this.start, 'function ');
			}
		} else {
			super.transpile(code, transforms);
		}

		if (transforms.trailingFunctionCommas && this.params.length && !naked) {
			removeTrailingComma(code, this.params[this.params.length - 1].end);
		}
	}

	// Returns whether any transforms that will happen use `arguments`
	needsArguments(transforms) {
		return (
			transforms.spreadRest &&
			this.params.filter(param => param.type === 'RestElement').length > 0
		);
	}
}
