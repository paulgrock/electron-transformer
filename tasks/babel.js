var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var file = 'index.js';
var firstTime = true;

var handleErrors = function(err) {
	console.error(err);
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
			.on('end', function() {
				if (!firstTime) {
					console.timeEnd('Browserify Update')
				}
			})
      .pipe(source('build.js'))
      .pipe(gulp.dest('./dist/'));
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
		firstTime = false;
		console.time('Browserify Update');
  });
	return rebundle();
};

module.exports = compile;
