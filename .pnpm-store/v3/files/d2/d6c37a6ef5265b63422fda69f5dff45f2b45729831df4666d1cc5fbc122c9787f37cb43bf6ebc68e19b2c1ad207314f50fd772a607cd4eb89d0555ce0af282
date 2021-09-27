"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const globby = require("globby");
const utils_1 = require("../utils");
/**
 * Rule which enforces the typings file to be present in the `files` list in `package.json`.
 *
 * @param context - The context object.
 * @returns A list of custom diagnostics.
 */
exports.default = (context) => {
    const { pkg, typingsFile } = context;
    const packageFiles = pkg.files;
    if (!Array.isArray(packageFiles)) {
        return [];
    }
    const normalizedTypingsFile = path.normalize(typingsFile);
    const patternProcessedPackageFiles = processGitIgnoreStylePatterns(packageFiles);
    const normalizedFiles = globby.sync(patternProcessedPackageFiles, { cwd: context.cwd }).map(path.normalize);
    if (normalizedFiles.includes(normalizedTypingsFile)) {
        return [];
    }
    const packageJsonFullPath = path.join(context.cwd, 'package.json');
    const content = fs.readFileSync(packageJsonFullPath, 'utf8');
    return [
        Object.assign({ fileName: packageJsonFullPath, message: `TypeScript type definition \`${normalizedTypingsFile}\` is not part of the \`files\` list.`, severity: 'error' }, utils_1.getJSONPropertyPosition(content, 'files'))
    ];
};
function processGitIgnoreStylePatterns(patterns) {
    const processedPatterns = patterns
        .map(pattern => {
        const [negatePatternMatch] = pattern.match(/^!+/) || [];
        const negationMarkersCount = negatePatternMatch ? negatePatternMatch.length : 0;
        return [
            pattern
                .slice(negationMarkersCount)
                // Strip off `/` from the start of the pattern
                .replace(/^\/+/, ''),
            negationMarkersCount % 2 === 0
        ];
    })
        // Only include pattern if it has an even count of negation markers
        .filter(([, hasEvenCountOfNegationMarkers]) => hasEvenCountOfNegationMarkers)
        .map(([processedPattern]) => processedPattern);
    return [...new Set(processedPatterns)];
}
