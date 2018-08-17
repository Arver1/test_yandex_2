'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const browserSync = require('browser-sync').create();
//const concat = require('gulp-concat'); // common css
const sourcemaps = require('gulp-sourcemaps');
const debug = require('gulp-debug');
const gulpIf = require('gulp-if'); // alternative to ugliness let pipeline = gulp.src('...'); if(isDevelopment) pipeline = pipeline.pipe(sourcemaps.init());
const del = require('del');
const gulpNewer = require('gulp-newer'); //for optimize the first run build
const autoprefixer = require('gulp-autoprefixer');
//const remember = require('gulp-remember'); //supplements the stream, files from caсhe
const notify = require('gulp-notify'); // notify from errors
const plumber = require('gulp-plumber');
//const plugins = require('gulp-load-plugins'); // cool plugin but work slowly 7*n
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV.trim() === 'development';
//const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const cleanCSS = require('gulp-clean-css');
gulp.task('less', () =>
  gulp.src('less/style.less')
    .pipe(debug({title: 'src'}))
    .pipe(plumber({ // allow handles errors in chain
      errorHandler: notify.onError() // notify by default
    }))
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(less())
    .pipe(debug({title: 'less'}))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'] // with cascade look better
    }))
    .pipe(debug({title: 'autoprefixer'}))
    .pipe(cleanCSS())
    .pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(rename({
      basename: 'style'
    }))
    .pipe(gulp.dest('css'))
);

gulp.task('serv', () => {
  browserSync.init({
    server: './',
    index: 'index.html'
  });
  browserSync.watch('css/*.css').on('change', browserSync.reload);
  browserSync.watch('*.html').on('change', browserSync.reload);
  browserSync.watch('img/*.*').on('all', browserSync.reload);
  browserSync.watch('js/index.js').on('change', gulp.series('webpack', 'reload'));
  browserSync.watch('js/popup.js').on('change', gulp.series('webpack', 'reload'));
  browserSync.watch('js/slider.js').on('change', gulp.series('webpack', 'reload'));
  browserSync.watch('js/util.js').on('change', gulp.series('webpack', 'reload'));
});

gulp.task('watch', () => {
  gulp.watch('less/**/*.less', gulp.series('less'));
});

gulp.task('reload', function(){
  browserSync.reload();
});

gulp.task('clean', () =>
  del('public') // return promise
);

gulp.task('img', () =>
  gulp.src('img/*.*', {since: gulp.lastRun('img')})
    .pipe(gulpNewer('public/img')) //if file has already in folder public with >=date modification => dosn't miss
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('public/img'))
);

gulp.task('html', () =>
  gulp.src('*.html', {since: gulp.lastRun('html')})
    .pipe(gulpNewer('public'))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('public'))
);

gulp.task('css', () =>
  gulp.src('css/*.css', {since: gulp.lastRun('css')})
    .pipe(gulpNewer('public/css'))
    .pipe(gulp.dest('public/css'))
);

gulp.task('js', () =>
  gulp.src('js/main.js', {since: gulp.lastRun('js')})
    .pipe(gulpNewer('public/js'))
    .pipe(gulp.dest('public/js'))
);

gulp.task('mincss', () =>
  gulp.src('css/style.css', {since: gulp.lastRun('css')})
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('css'))
);

gulp.task('webpack', function(callback) {
  // run webpack
  webpack((require('./webpack.config.js')), function(err) {
    if(err) console.log(err.message);
    callback();
  });
});

gulp.task('build', gulp.series('clean', gulp.parallel('img','html'),'less', 'mincss', 'css', 'webpack', 'js'));

gulp.task('dev', gulp.series('less', gulp.parallel('serv','watch')));
