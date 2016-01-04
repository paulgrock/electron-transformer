import gulp from 'gulp';
import eslint from 'gulp-eslint';

module.exports = () => {
	return gulp.src([
		'**/*.js',
		'**/*.jsx',
		'!node_modules/**',
		'!dist/**'
	])
	.pipe(eslint())
	.pipe(eslint.format());
};
