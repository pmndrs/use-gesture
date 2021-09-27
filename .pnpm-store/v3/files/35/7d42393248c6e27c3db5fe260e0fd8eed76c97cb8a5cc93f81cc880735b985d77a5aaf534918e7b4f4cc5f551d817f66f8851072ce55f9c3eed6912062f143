import Node from '../../Node.js';
import CompileError from '../../../utils/CompileError.js';

export default class ModuleDeclaration extends Node {
	initialise(transforms) {
		if (transforms.moduleImport)
			throw new CompileError('Modules are not supported', this);
		super.initialise(transforms);
	}
}
