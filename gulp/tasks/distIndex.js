'use strict';

import config        from '../config';
import gulp          from 'gulp';
import replace       from 'gulp-replace';
import htmlreplace   from 'gulp-html-replace';
import inlineSource  from 'gulp-inline-source';
import browserSync   from 'browser-sync';

// Views task
gulp.task('distIndex', function() {

  return  gulp.src(config.sourceDir+'index.html')
          .pipe(gulp.dest(config.prodDir));
  });
