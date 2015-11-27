var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var watchify = require('watchify');
var file = 'index.js';
var uglify = require('gulp-uglify')
var firstTime = true;


var handleErrors = function(err) {
	console.error(err);
};

var compile = function(watch) {
	console.time('Browserify Update');

  var bundler = browserify({
		entries: ['./client/' + file],
		debug: true,
		transform: [babelify]
	});

	if (watch) {
		bundler.plugin(watchify);
	}

	function rebundle() {
    var stream = bundler.bundle();
		return stream
			.on('end', function() {
				console.timeEnd('Browserify Update')
			})
			.on('error', handleErrors)
			.pipe(source('build.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({
				loadMaps: true
			}))
			.pipe(uglify())
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./dist/'));
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
		console.time('Browserify Update');
  });
	return rebundle();
};

module.exports = compile;
