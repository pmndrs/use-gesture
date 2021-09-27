/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") + "\\n" %>' +
				'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
				' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n\n'
		},
		jshint: {
			files: ['Gruntfile.js', '<%= pkg.name %>.js'],
			options: {
				browser: true,
				devel: true
			}
		},
		uglify: {
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': [ '<%= pkg.name %>.js' ]
				}
			}
		},
		concat: {
			options: {
				banner: '<%= meta.banner %>'
			},
			lib: {
				src: ['<%= pkg.name %>.js'],
				dest: 'dist/<%= pkg.name %>.js'
			},
			minLib: {
				src: ['dist/<%= pkg.name %>.min.js'],
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		}
	});

	// Dependencies
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('build',[
		'jshint',
		'uglify',
		'concat'
	]);
	grunt.registerTask('default','build');
};
