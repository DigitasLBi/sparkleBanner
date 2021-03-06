'use strict';

import gulp        from 'gulp';
import runSequence from 'run-sequence';

gulp.task('prod', ['cleanProd'], function(cb) {

  global.isProd = true;

  runSequence(['iconfont','styles', 'images', 'fonts', 'views', 'scripts', 'media'], 'watch', cb);

});
