var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var linker = require('gulp-linker');
var rename = require('gulp-rename');
var browserify = require('browserify');
var ngAnnotate = require('browserify-ngannotate');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

// tasks
gulp.task('lint', function() {
	var stylish = require('jshint-stylish');

	gulp.src(['./app/**/*.js', '!./app/bundled.js', '!./app/assets/bower_components/**'])
		.pipe(jshint({ strict: false, node: false }))
		// .pipe(jshint.reporter('default'))
		.pipe(jshint.reporter(stylish))
		// .pipe(jshint.reporter('fail'));
});

gulp.task('browserify', ['cleanBoundle'], function() {
	var b = browserify({
		entries: './app/app.js',
		debug: true,
		transform: [ngAnnotate]
	});

	return b.bundle()
		.pipe(source('bundled.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(uglify())
			.on('error', gutil.log)
		.pipe(sourcemaps.write('./'))
		// .pipe(rename('bundled.js'))
		.pipe(gulp.dest('./app/'))
})

gulp.task('watch', function() {
	return gulp.watch([
		'./app/**/*.js',
		'./app/**/*.css',
		'./app/**/*html',
		'!./app/assets/bower_components/**'
	], ['build']);
});

gulp.task('cleanBoundle', function() {
	return gulp.src('./app/bundled.js')
		.pipe(clean({force: true}));
});

gulp.task('clean', function() {
	var stream = gulp.src(['./dist/*'])
		.pipe(clean({force: true}));
	return stream;
});

gulp.task('minify-css', function() {
  var opts = {
		comments:true,
		spare:true
	};

  gulp.src(['./app/**/*.css', '!./app/assets/bower_components/**'])
    .pipe(minifyCss(opts))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('minify-js', function() {
	gulp.src(['./app/**/*.js', '!./app/assets/bower_components/**'])
		.pipe(ngAnnotate())
		.pipe(uglify({
			// inSourceMap:
			outSourceMap: "app.js.map"
		}))
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('copy-bower-components', function() {
	gulp.src('./app/assets/bower_components/**')
		.pipe(gulp.dest('dist/assets/bower_components'));
});

gulp.task('copy-html-files', function() {
	gulp.src('./app/**/*html')	
		.pipe(gulp.dest('dist/'));
});

gulp.task('connect', function() {
	connect.server({
		root: 'app/',
		port: '9000'
	});
});

gulp.task('connectDist', function() {
	connect.server({
		root: 'dist/',
		port: '9001'
	});
});



gulp.task('default', 
	['lint',  'browserify', 'connect'], function() {
	// defaukt task
	console.log('Default task');
});

gulp.task('build',
	// hit clean task before build
	[ 'lint', 'minify-css', 'minify-js',
	'copy-html-files', 
	'copy-bower-components', 'connectDist']
);


