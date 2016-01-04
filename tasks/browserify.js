import gulp from 'gulp';
import compile from './helpers/compile-js';

module.exports = () => {
	gulp.task('browserify', () => {
		compile();
	});
};
