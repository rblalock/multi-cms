module.exports = function (grunt) {
	var webpack = require('webpack');
	var _ = require('lodash');
	var cmsConfig = grunt.option('cmsConfig') || './_config.js';

	if (!cmsConfig) {
		console.error('Must supply --cmsConfig to point to a configuration for the CMS');
	}

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*!\n' +
		'* <%= pkg.name %> - v<%= pkg.version %> - Auto-compiled on <%= grunt.template.today("yyyy-mm-dd") %> - Copyright <%= grunt.template.today("yyyy") %> \n' +
		'* @author <%= pkg.author %>\n' +
		'*/',
		pathDev: './src',
		pathBuild: './dist',
		pathAssets: 'assets',
		webpack: {
			build: require('./webpack.config')
		},
		watch: {
			styles: {
				files: ['<%= pathDev %>/assets/**/*.less'],
				tasks: ['less'],
				options: {
					nospawn: true
				}
			}
		},
		less: {
			dev_main: {
				options: {
					banner: '<%= banner %>'
				},
				files: {
					'<%= pathDev %>/<%= pathAssets %>/css/site.css': '<%= pathDev %>/<%= pathAssets %>/css/site.less'
				}
			},
			build: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2,
					banner: '<%= banner %>'
				},
				files: {
					'<%= pathBuild %>/assets/css/site.css': '<%= pathDev %>/<%= pathAssets %>/css/site.less'
				}
			}
		},
		clean: {
			build: {
				src: ['<%= pathBuild %>/<%= pathAssets %>']
			}
		},
		concat: {
			options: {
				separator: ';'
			},
			build: {
				src: [
					'node_modules/moment/min/moment.min.js',
					'<%= pathDev %>/<%= pathAssets %>/plugins/datepicker/bootstrap-datepicker.js',
					'<%= pathDev %>/<%= pathAssets %>/theme/js/app.js',
					'<%= pathDev %>/<%= pathAssets %>/js/global.js'
				],
				dest: '<%= pathBuild %>/<%= pathAssets %>/js/global.js'
			}
		},
		copy: {
			cmsConfig: {
				files: [
					{
						src: cmsConfig,
						dest: '<%= pathDev %>/config.js'
					}
				]
			},
			dev: {
				files: []
			},
			build: {
				files: [
					{
						expand: true,
						cwd: '<%= pathDev %>/assets/css/',
						src: '*.css',
						dest: '<%= pathBuild %>/<%= pathAssets %>/css/'
					},
					{
						expand: true,
						cwd: '<%= pathDev %>/assets/theme/css/',
						src: '**',
						dest: '<%= pathBuild %>/<%= pathAssets %>/theme/css/'
					},
					{
						expand: true,
						cwd: '<%= pathDev %>/<%= pathAssets %>/plugins/datepicker/',
						src: '*.css',
						dest: '<%= pathBuild %>/<%= pathAssets %>/plugins/datepicker/'
					}
				]
			}
		}
	});

	// Load tasks
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-webpack');

	// Register Tasks
	grunt.registerTask('default', ['copy:cmsConfig', 'clean', 'webpack', 'less', 'concat:build', 'copy:build']);
};
