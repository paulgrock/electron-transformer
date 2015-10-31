var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

module.exports = function() {
	return gulp.src([
		'sass/**/*.scss',
		'!sass/**/_*.scss'
	])
	.pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: 'extended'
	}))
	.pipe(sourcemaps.write('./maps'))
	.pipe(gulp.dest('./dist'))
}
