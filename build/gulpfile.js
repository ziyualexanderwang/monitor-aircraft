var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var minifycss = require('gulp-minify-css');
var browserSync = require('browser-sync');


gulp.task('images', function(){
  gulp.src('../app/assets/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('app/assets/img/'));
});

gulp.task('styles', function(){
  gulp.src(['../app/assets/css/app.css'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('app/assets/css/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('app/assets/css/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
  return gulp.src([
  	'../app/bower_components/angular/angular.js',
  	'../app/bower_components/angular-route/angular-route.js',
  	'../app/bower_components/angular-resource/angular-resource.js',
    '../app/bower_components/ng-websocket/ng-websocket.js',
    '../app/app.js',
  	'../app/app.config.js',
    '../app/services/**/*.js', 
  	'../app/dashboard/**/*.js'
  	])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('app/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('app/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('copy-html', function() {
    gulp.src(['../app/dashboard/**/*.html'],
    	{base: '.'})
    // Perform minification tasks, etc here
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['images', 'styles', 'scripts', 'copy-html']);
