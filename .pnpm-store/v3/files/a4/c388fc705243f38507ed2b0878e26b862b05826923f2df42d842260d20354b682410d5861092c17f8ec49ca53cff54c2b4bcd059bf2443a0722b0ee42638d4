const path = require('path')
const libraryName = "iq";

module.exports = {
	entry  : `${__dirname}/${libraryName}.ts`,
	output : {
		filename       : `${__dirname}/../dist/${libraryName}.js`,
		//path: `${__dirname}`,
		library        : libraryName,
		libraryTarget  : 'umd',
		umdNamedDefine : true
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool : "source-map",

	resolve : {
		extensions : ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
	},

	ts : {
		compilerOptions : {
			noEmit : false
		}
	},

	module : {
		loaders : [
			// All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
			{test : /\.tsx?$/, loader : "ts-loader"}
		],

		preLoaders : [
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{test : /\.js$/, loader : "source-map-loader"}
		]
	}
};
