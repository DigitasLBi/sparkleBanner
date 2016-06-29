'use strict';

import config        from '../config';
import gulp          from 'gulp';
import babel         from 'gulp-babel';
import gulpif		 from 'gulp-if';
import uglify	     from 'gulp-uglify';
import concat	     from 'gulp-concat';
import sourcemaps	 from 'gulp-sourcemaps';
import browserSync   from 'browser-sync';

// Views task
gulp.task('scripts', function() {

  return gulp.src(config.scripts.src)
         // .pipe(babel({
         //     presets: ['babel-preset-es2015']
         // }))
         .pipe(sourcemaps.init())
         .pipe(concat('app.js'))
		 .pipe(gulpif(global.isProd,uglify()))
         .pipe(sourcemaps.write('.'))
         .pipe(gulp.dest(global.isProd ? config.scripts.prodDest : config.scripts.dest))
         .pipe(browserSync.stream({ once: true }));
});
