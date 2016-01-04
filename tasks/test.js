import gulp from 'gulp';
import mocha from 'gulp-mocha';

module.exports = () => {
	return gulp.src(['test/**/*.test.js'], {
		read: false
	})
	.pipe(mocha());
};
