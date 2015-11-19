require('gulp-task-loader')('tasks');
var gulp = require('gulp');
var babelWatch = require('./tasks/babel')

gulp.task('watch', function() {
	gulp.watch('sass/**/*.scss', ['sass']);
	babelWatch(true);
})


gulp.task('default', ['watch']);
