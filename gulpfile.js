var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var linker = require('gulp-linker');

// tasks
gulp.task('lint', function() {
	var stylish = require('jshint-stylish');

	gulp.src(['./app/**/*.js', '!./app/assets/bower_components/**'])
		.pipe(jshint({ strict: false, node: false }))
		// .pipe(jshint.reporter('default'))
		.pipe(jshint.reporter(stylish))
		// .pipe(jshint.reporter('fail'));
});

gulp.task('clean', function() {
	gulp.src('./dist/*')
		.pipe(clean({force: true}));
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

gulp.task('linker', function() {
	gulp.src(['./app/index.html'])
		.pipe(linker({
			scripts: ['./app/**/*.js', '!./app/assets/bower_components/**'],
			startTag: '<!--SCRIPTS-->',
			endTag: '<!--SCRIPTS END-->',
			appRoot: './app/'
		}))
		.pipe(gulp.dest('./app/'))
});

gulp.task('linkerDist', function() {
	gulp.src(['./app/index.html'])
		.pipe(linker({
			scripts: ['./dist/app.min.js'],
			startTag: '<!--SCRIPTS-->',
			endTag: '<!--SCRIPTS END-->',
			appRoot: './dist/'
		}))
		.pipe(gulp.dest('./dist/'))
});

gulp.task('copy-bower-components', function() {
	gulp.src('./app/assets/bower_components/**')
		.pipe(gulp.dest('dist/assets/bower_components'));
});

gulp.task('copy-html-files', function() {
	gulp.src(['./app/**/*html', '!./app/index.html'])	// linker takes care about index.html
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
	['linker', 'lint', 'connect'], function() {
	// defaukt task
	console.log('Default task');
});

gulp.task('build',
	// hit clean task before build
	[ 'lint', 'minify-css', 'minify-js', 
	'copy-html-files', 
	'copy-bower-components',  'linkerDist', 'connectDist']
);


