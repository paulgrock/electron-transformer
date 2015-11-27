require('gulp-task-loader')('tasks');
var gulp = require('gulp');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

gulp.task('watch', function() {
	gulp.watch('sass/**/*.scss', ['sass']);
	gulp.start('watchify');
});


gulp.task('default', ['watch']);
