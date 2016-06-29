'use strict';

import config      from '../config';
import changed     from 'gulp-changed';
import gulp        from 'gulp';
import browserSync from 'browser-sync';

gulp.task('static', function() {

  return gulp.src(config.static.src)
    .pipe(changed(config.static.dest)) // Ignore unchanged files
    .pipe(gulp.dest(global.isProd ? config.static.prodDest : config.static.dest))
    .pipe(browserSync.stream({ once: true }));

});
