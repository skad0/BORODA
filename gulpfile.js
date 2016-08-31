'use strict';

const gulp     = require('gulp');
const babel    = require('gulp-babel');
const uglify   = require('gulp-uglify');
const concat   = require('gulp-concat');
const stylus   = require('gulp-stylus');
const csso     = require('gulp-csso');
const imagemin = require('gulp-imagemin');

gulp.task('watch', () => {
    // TODO: define this glob better
    gulp.watch('app/assets/js/*.js', ['js']);    
    gulp.watch('app/assets/styles/*.styl', ['css']);    
});

gulp.task('images', () => {
    return gulp.src('app/assets/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/view/dist/images'));
});

gulp.task('js', () => {
    return gulp.src('app/assets/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(concat('index.min.js'))
        .pipe(gulp.dest('app/view/dist'));
});

gulp.task('css', () => {
    return gulp.src('app/assets/styles/*.styl')
        .pipe(stylus())
        .pipe(csso())
        .pipe(concat('index.min.css'))
        .pipe(gulp.dest('app/view/dist'));
});

gulp.task('default', ['js', 'css']);