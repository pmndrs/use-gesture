import Node from '../Node.js';
import CompileError from '../../utils/CompileError.js';

export default class ExportDefaultDeclaration extends Node {
	initialise(transforms) {
		if (transforms.moduleExport)
			throw new CompileError('export is not supported', this);
		super.initialise(transforms);
	}
}
