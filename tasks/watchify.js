var gulp = require('gulp');
var compile = require('../libs/compile-js');

module.exports = function() {
	gulp.task('watchify', function() {
		compile(true);
	});
}