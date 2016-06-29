'use strict';

import config      from '../config';
import gulp        from 'gulp';
import iconfont    from 'gulp-iconfont';
import iconfontCss from 'gulp-iconfont-css';
import browserSync from 'browser-sync';

var fontName = 'Icons';

gulp.task('iconfont', function(){
  gulp.src(config.icons.src,{base: 'app'})
    .pipe(iconfontCss({
      fontName: fontName,
      path: 'app/styles/templates/_icons.scss',
      targetPath: '../../app/styles/_icons.scss',
      fontPath: '../fonts/'
    }))
    .pipe(iconfont({
      fontName: fontName,
      normalize: true,
      fontHeight: 1001
     }))
    .pipe(gulp.dest(global.isProd ? config.fonts.prodDest : config.fonts.dest))
    .pipe(browserSync.stream({ once: true }));
});
