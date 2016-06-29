'use strict';

export default {

  browserPort: 3030,
  UIPort: 3031,

  sourceDir: './app/',
  buildDir: './build/',
  prodDir: './dist/',

  styles: {
	src: 'app/styles/**/*.scss',
	dest: 'build/css',
	prodDest: 'dist/css',
	prodSourcemap: false,
	sassIncludePaths: []
  },
  components: {
	src: 'app/components/**/*.html'
  },
  scripts: {
		src: 'app/js/**/*.js',
		dest: 'build/js',
		prodDest: 'dist/js',
		vendor: {
			src: 'app/vendor/**/*.js',
			dest:	'build/vendor',
			prodDest: 'dist/vendor'
		}
  },

  images: {
	src: 'app/images/**/*',
	dest: 'build/images',
	prodDest: 'dist/images'
  },

  media: {
	src: 'app/media/**/*',
	dest: 'build/media',
	prodDest: 'dist/media'
  },

  icons: {
      src: ['app/icons/**/*']
  },

  fonts: {
      src: ['app/fonts/**/*'],
      dest: 'build/fonts',
      prodDest: 'dist/fonts'
  },


  static: {
	src: ['app/Static/**/*'],
	dest: 'build/Static',
	prodDest: 'dist/Static'
  },

  views: {
	index: 'app/**/*.html',
	src: 'app/views/**/*.html',
	dest: 'build/',
	prodDest: 'dist/'
  },

  init: function() {
	this.views.watch = [
	  this.views.index,
	  this.views.src
	];

	return this;
  }

}.init();
