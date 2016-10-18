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
        return browserify({
            entries: ['src/js/main.js', 
                    'src/js/spaceship.js', 
                    'src/js/util.js', 
                    'src/js/commander.js',
                    'src/js/log.js',
                    'src/js/BUS.js'],
            debug: true
        })
        .transform('babelify', {presets: ['es2015']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('default', function() {
    gulp.start('lint', 'less', 'scripts', 'watch');
});

gulp.task('watch', function() {
    gulp.watch('./src/js/*.js', ['lint', 'scripts']);
    gulp.watch('./src/less/*.less', ['less']);
});