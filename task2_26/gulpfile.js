var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    livereload = require('livereload'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    glob = require('node-glob'),
    buffer = require('vinyl-buffer');

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
     return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('browser', function() {
    var b = browserify({
            entries: ['dist/js/main.js'],
            debug: true
        });

    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('default', function() {
    gulp.start('lint', 'less', 'scripts', 'browser', 'watch');
});

gulp.task('watch', function() {
    gulp.watch('./src/js/*.js', ['lint', 'scripts']);
    gulp.watch('./src/less/*.less', ['less']);
});