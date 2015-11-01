require('gulp-task-loader')('tasks');
var gulp = require('gulp');

gulp.task('watch', function() {
	gulp.watch('sass/**/*.scss', ['sass']);
	gulp.watch([
		'client/**/*.js',
		'client/**/*.jsx'
	], ['babel']);
})
