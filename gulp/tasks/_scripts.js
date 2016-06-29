'use strict';

import config       from '../config';
import gulp         from 'gulp';
import sourcemaps   from 'gulp-sourcemaps';
import gulpif		    from 'gulp-if';
import uglify	      from 'gulp-uglify';
import concat	      from 'gulp-concat';
import merge        from 'merge-stream';

import browserSync  from 'browser-sync';

// Views task
gulp.task('scripts', function() {

  const createSourcemap = !global.isProd || config.styles.prodSourcemap;

  // merge different streams to concat both vendor.js and app.js at the same time
  return merge (
  // vendor.js
  gulp.src(config.scripts.vendor.src)
    .pipe(gulpif(createSourcemap, sourcemaps.init()))
    // .pipe(concat('vendor.js'))
    .pipe(gulpif(global.isProd,uglify()))
    .pipe(gulpif(
      createSourcemap,
      sourcemaps.write( global.isProd ? './' : null ))
    )
    .pipe(gulp.dest(global.isProd ? config.scripts.vendor.prodDest : config.scripts.vendor.dest)),

  // app.JS
  gulp.src(config.scripts.src)
    .pipe(gulpif(createSourcemap, sourcemaps.init()))
    .pipe(concat('app.js'))
    .pipe(gulpif(global.isProd,uglify()))
    .pipe(gulpif(
      createSourcemap,
      sourcemaps.write( global.isProd ? './' : null ))
    )
    .pipe(gulp.dest(global.isProd ? config.scripts.prodDest : config.scripts.dest))

  ).on('end', browserSync.reload);
  //
  // return gulp.src(config.scripts.src)
	// 	 .pipe(gulpif(global.isProd,uglify()))
  //        .pipe(concat('app.js'))
  //        .pipe(gulp.dest(global.isProd ? config.scripts.prodDest : config.scripts.dest))
  //        .pipe(browserSync.stream({ once: true }));
  //
  // return gulp.src(config.scripts.vendor.src)
  // 	 .pipe(gulpif(global.isProd,uglify()))
  //       .pipe(concat('vendor.js'))
  //       .pipe(gulp.dest(global.isProd ? config.scripts.vendor.prodDest : config.scripts.vendor.dest))
  //       .pipe(browserSync.stream({ once: true }));
});
