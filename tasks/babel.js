var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var file = 'index.js';

var handleErrors = function(err) {
	console.log(err);
};

var compile = function(watch) {
  var bundler = browserify({
		entries: ['./client/' + file],
		debug: true,
		transform: [babelify]
	});

	if (watch) {
		bundler = watchify(bundler);
	}

	function rebundle() {
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source('build.js'))
      .pipe(gulp.dest('./dist/'));
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    // gutil.log('Rebundle...');
  });
	return rebundle();
};

module.exports = compile;
