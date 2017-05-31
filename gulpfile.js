var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    rigger = require('gulp-rigger'),
    uglify = require('gulp-uglify');

gulp.task('browser-sync', ['html', 'styles', 'javascript', 'libs'], function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        notify: false
    });
});

// HTML
gulp.task('html', function () {
    gulp.src('src/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// SCSS
gulp.task('styles', function () {
    return gulp.src('src/stylesheets/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
/*
 gulp.task('styles', function () {
 return gulp.src('sass/*.sass')
 .pipe(sass({
 includePaths: require('node-bourbon').includePaths
 }).on('error', sass.logError))
 .pipe(rename({suffix: '.min', prefix : ''}))
 .pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
 .pipe(cleanCSS())
 .pipe(gulp.dest('app/css'))
 .pipe(browserSync.stream());
 });
 */

// LIBS
gulp.task('libs', function () {
    return gulp.src([
            './dist/libs/modernizr/modernizr.js',
            './dist/libs/jquery/jquery-1.11.2.min.js',
            './dist/libs/waypoints/waypoints.min.js',
            './dist/libs/animate/animate-css.js',
        ])
        .pipe(concat('libs.js'))
        //.pipe(uglify()) //Minify libs.js
        .pipe(gulp.dest('./dist/js/'));
});

// JAVASCRIPT
gulp.task('javascript', function () {
    gulp.src('src/javascript/**/*.js')
        //.pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
    /*.pipe(browserSync.reload({
     stream: true
     }));*/
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/stylesheets/**/*.scss', ['styles']);
    gulp.watch('dist/libs/**/*.js', ['libs']);
    gulp.watch('src/javascript/**/*.js', ['javascript']);
    gulp.watch('dist/js/*.js').on("change", browserSync.reload);
    //gulp.watch('dist/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);
