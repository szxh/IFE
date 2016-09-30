var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
    livereload = require('livereload');

gulp.task('lint', function() {
	return gulp.src('src/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('less', function() {
    return gulp.src('./src/less/*.less')
        .pipe(less())
        .pipe(concat('main.css'))
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function() {
    return gulp.src('./src/js/*.js')
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('default', function() {
    gulp.start('lint', 'less', 'scripts', 'watch');
});

gulp.task('watch', function() {
    gulp.watch('./src/js/*.js', ['lint', 'scripts']);
    gulp.watch('./src/less/*.less', ['less']);
});