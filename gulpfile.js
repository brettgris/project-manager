// Include gulp
var gulp = require('gulp'); 

var jade = require('gulp-jade'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	plumber = require('gulp-plumber'),
	compass =  require('gulp-compass'),
	browserify = require('gulp-browserify'); 

gulp.task('jade', function() {
	return gulp.src('Development/jade/compile/**/*.jade')
		.pipe(plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
		}}))
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest("Production/"));
});

gulp.task('sass', function() {
	return gulp.src('Development/scss/compile/*.scss')
		.pipe(plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
		}}))
		.pipe(compass({
			'sass': 'Development/scss/compile',
			'css': 'Production/css',
			'images': 'Production/images',
			'style': 'nested'
		}))
		.on('error', function(err) {})
		.pipe(gulp.dest('Production/css'));
});

gulp.task('react', function () {
    return gulp.src('Development/react/**/*.jsx')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
        }}))
        .pipe(babel({
            presets: ['react']
        }))
        .pipe(gulp.dest('Development/scripts'));
});

gulp.task('scripts', ['react'], function(){
    return gulp.src('Development/scripts/app.js')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
        }}))
        .pipe(browserify())
        .pipe(concat('app.min.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('Production/js'))
});

// Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch('Development/jade/**/*', ['jade']);
	gulp.watch('Development/scss/**/*', ['sass']);
	gulp.watch('Development/react/**/*', ['scripts']);
});

// Default Task
gulp.task('default', ['jade','sass','scripts','watch']);