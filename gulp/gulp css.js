var
	autoprefixer	= require('gulp-autoprefixer'),
	browserSync		= require('browser-sync'),
	config			= require('./config'),
	csscomb			= require('gulp-csscomb'),
	gulp				= require('gulp'),
	gutil				= require('gulp-util'),
	less				= require('gulp-less'),
	minicss			= require('gulp-minify-css'),
	plumber			= require('gulp-plumber'),
	reload			= browserSync.reload,
	rename			= require('gulp-rename'),
	rigger			= require('gulp-rigger'),
	sass				= require('gulp-sass'),
	size				= require('gulp-size'),
	sourcemaps		= require('gulp-sourcemaps'),
	stylus			= require('gulp-stylus');

gulp.task('css', function() {
	switch(config.typeOf.css){
		
		case 'stylus':
			return gulp
				.src(config.projectPath.src.stylus)
				.pipe(plumber(function(error) {
					gutil.log(gutil.colors.red(error.message));
					this.emit('end');
				}))
				.pipe(sourcemaps.init())
				.pipe(stylus({
					'include css': true
				}))
				.pipe(autoprefixer({browsers: [
					'> 1%',
					'ie >= 9',
					'last 2 versions'
				]}))
				.pipe(csscomb())
				.pipe(gulp
					.dest(config.projectPath.build.css)
				)
				.pipe(rename({
					suffix: '.min'
				}))
				.pipe(minicss())
				.pipe(sourcemaps.write('.'))
				.pipe(size({
					title: 'stylus'
				}))
				.pipe(gulp
					.dest(config.projectPath.build.css)
				)
				.pipe(reload({
					stream: true
				}));

		case 'sass':
			return gulp
				.src(config.projectPath.src.sass)
				.pipe(plumber(function(error) {
					gutil.log(gutil.colors.red(error.message));
					this.emit('end');
				}))
				.pipe(sourcemaps.init())
				.pipe(sass()
					.on('error', sass.logError)
				)
				.pipe(autoprefixer({browsers: [
					'> 1%',
					'ie >= 9',
					'last 2 versions'
				]}))
				.pipe(csscomb())
				.pipe(gulp
					.dest(config.projectPath.build.css)
				)
				.pipe(rename({
					suffix: '.min'
				}))
				.pipe(minicss())
				.pipe(sourcemaps.write('.'))
				.pipe(size({
					title: 'sass'
				}))
				.pipe(gulp
					.dest(config.projectPath.build.css)
				)
				.pipe(reload({
					stream: true
				}));

		case 'less':
			return gulp
				.src(config.projectPath.src.less)
				.pipe(plumber(function(error) {
					gutil.log(gutil.colors.red(error.message));
					this.emit('end');
				}))
				.pipe(sourcemaps.init())
				.pipe(less())
				.pipe(autoprefixer({browsers: [
					'> 1%',
					'ie >= 9',
					'last 2 versions'
				]}))
				.pipe(csscomb())
				.pipe(gulp
					.dest(config.projectPath.build.css)
				)
				.pipe(rename({
					suffix: '.min'
				}))
				.pipe(minicss())
				.pipe(sourcemaps.write('.'))
				.pipe(size({
					title: 'less'
				}))
				.pipe(gulp
					.dest(config.projectPath.build.css)
				)
				.pipe(reload({
					stream: true
				}));

		case 'css':
			return gulp
				.src(config.projectPath.src.css)
				.pipe(plumber())
				.pipe(rigger())
				.pipe(sourcemaps.init())
				.pipe(autoprefixer({browsers: [
					'> 1%',
					'ie >= 9',
					'last 2 versions'
				]}))
				.pipe(csscomb())
				.pipe(gulp
					.dest(config.projectPath.build.css)
				)
				.pipe(rename({
					suffix: '.min'
				}))
				.pipe(minicss())
				.pipe(sourcemaps.write('.'))
				.pipe(size({
					title: 'css'
				}))
				.pipe(gulp
					.dest(config.projectPath.build.css)
				)
				.pipe(reload({
					stream: true
				}));

		default:
			console.log('ОШИБКА!!! Неверно выбран режим компиляции css!!!');
	}
});