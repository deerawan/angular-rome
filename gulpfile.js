'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var uglify = require('gulp-uglifyjs');
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var Server = require('karma').Server;

gulp.task('lint', function () {
  return gulp.src(['src/**/*.js'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError());
});

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('watch', function() {
  watch('src/*.js', batch(function(events, done) {
      gulp.start('build', done);
    }));
});

gulp.task('browserify', function() {
  return browserify('./src/angular-rome.js')
      .bundle()
      .pipe(source('angular-rome.js'))
      .pipe(gulp.dest('.'));
});

gulp.task('uglify', function() {
  return gulp.src('angular-rome.js')
    .pipe(uglify('angular-rome.min.js', {
      outSourceMap: true
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('build', ['lint', 'browserify', 'uglify']);

gulp.task('default', ['build']);