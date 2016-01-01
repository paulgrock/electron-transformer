import gulp from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import watchify from 'watchify';
const file = 'index.js';

const handleErrors = (err) => {
	console.error(err);
};

const compile = function (watch) {
	console.time('Browserify Update');

	const bundler = browserify({
		entries: [`./client/${file}`],
		debug: true,
		transform: [babelify]
	});

	if (watch) {
		bundler.plugin(watchify);
	}

	function rebundle() {
		const stream = bundler.bundle();
		return stream
			.on('end', () => {
				console.timeEnd('Browserify Update');
			})
			.on('error', handleErrors)
			.pipe(source('build.js'))
			.pipe(gulp.dest('./dist/'));
	}

	// listen for an update and run rebundle
	bundler.on('update', () => {
		rebundle();
		console.time('Browserify Update');
	});
	return rebundle();
};

module.exports = compile;
