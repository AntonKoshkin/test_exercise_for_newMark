var
	browserSync	= require('browser-sync'),
	concat		= require('gulp-concat'),
	config		= require('./config'),
	gulp			= require('gulp'),
	gutil			= require('gulp-util'),
	jade			= require('gulp-jade'),	
	jshint		= require('gulp-jshint'),
	plumber		= require('gulp-plumber'),
	reload		= browserSync.reload,
	rename		= require('gulp-rename'),
	rigger		= require('gulp-rigger'),
	size			= require('gulp-size'),
	sourcemaps	= require('gulp-sourcemaps'),
	streamqueue	= require('streamqueue'),
	stylish		= require('jshint-stylish'),
	uglify		= require('gulp-uglify');

gulp.task('js', function() {
	return streamqueue({
			objectMode: true
		},
		gulp
			.src(config.projectPath.src.jsVendor)
			.pipe(plumber(function(error) {
				gutil.log(gutil.colors.red(error.message));
				this.emit('end');
			}))
			.pipe(rigger())
			.pipe(size({
				title: 'vendor js'
			})),
		gulp
			.src(config.projectPath.src.jsCustom)
			.pipe(plumber())
			.pipe(rigger())
			.pipe(jshint())
			.pipe(jshint.reporter(stylish))
			.pipe(size({
				title: 'custom js'
			}))
		)
		.pipe(plumber(function(error) {
			gutil.log(gutil.colors.red(error.message));
			this.emit('end');
		}))
		.pipe(concat('main.js'))
		.pipe(sourcemaps.init())
		.pipe(gulp
			.dest(config.projectPath.build.js))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(size({
			title: 'js'
		}))
		.pipe(gulp
			.dest(config.projectPath.build.js))
		.pipe(reload({
			stream: true
		}));
});