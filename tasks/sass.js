import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';

module.exports = () => {
	return gulp.src([
		'sass/**/*.scss',
		'!sass/**/_*.scss'
	])
	.pipe(sourcemaps.init())
	.pipe(sass({
		style: 'compressed',
		includePaths: [
			'./node_modules'
		]
	}))
	.pipe(sourcemaps.write('./maps'))
	.pipe(gulp.dest('./dist'));
};
