require('gulp-task-loader')('tasks');
const gulp = require('gulp');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

gulp.task('watch', () => {
	gulp.watch('sass/*.scss', ['sass']);
	gulp.watch([
		'**/*.js',
		'**/*.jsx',
		'!node_modules/**',
		'!dist/**'
	], ['test']);
	gulp.start('watchify');
});

gulp.task('default', ['watch']);
