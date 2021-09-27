/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const getGeneratedSourceInfo = require("./getGeneratedSourceInfo");

const MATCH_LINES_REGEX = /(?:[^\n]+\n?|\n)/g;

const streamChunksOfRawSource = (source, onChunk, onSource, onName) => {
	let line = 1;
	const matches = source.match(MATCH_LINES_REGEX);
	if (matches !== null) {
		let match;
		for (match of matches) {
			onChunk(match, line, 0, -1, -1, -1, -1);
			line++;
		}
		return match.endsWith("\n")
			? {
					generatedLine: matches.length + 1,
					generatedColumn: 0
			  }
			: {
					generatedLine: matches.length,
					generatedColumn: match.length
			  };
	}
	return {
		generatedLine: 1,
		generatedColumn: 0
	};
};

module.exports = (source, onChunk, onSource, onName, finalSource) => {
	return finalSource
		? getGeneratedSourceInfo(source)
		: streamChunksOfRawSource(source, onChunk, onSource, onName);
};
