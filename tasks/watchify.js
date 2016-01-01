import gulp from 'gulp';
import compile from '../libs/compile-js';

module.exports = () => {
	gulp.task('watchify', () => {
		compile(true);
	});
};
