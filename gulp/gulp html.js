var
	browserSync	= require('browser-sync'),
	config		= require('./config'),
	gulp			= require('gulp'),
	gutil			= require('gulp-util'),
	jade			= require('gulp-jade'),
	plumber		= require('gulp-plumber'),
	reload		= browserSync.reload,
	rigger		= require('gulp-rigger'),
	size			= require('gulp-size');

gulp.task('html', function() {
	switch(config.typeOf.html){

		case 'jade':
			return gulp
				.src(config.projectPath.src.jade)
				.pipe(plumber(function(error) {
					gutil.log(gutil.colors.red(error.message));
					this.emit('end');
				}))
				.pipe(jade({
					pretty: true
				}))
				.pipe(size({
					title: 'jade'
				}))
				.pipe(gulp
					.dest(config.projectPath.build.html)
				)
				.pipe(reload({
					stream: true
				}));

		case 'html':
			return gulp
				.src(config.projectPath.src.html)
				.pipe(plumber(function(error) {
					gutil.log(gutil.colors.red(error.message));
					this.emit('end');
				}))
				.pipe(rigger())
				.pipe(size({
					title: 'html'
				}))
				.pipe(gulp
					.dest(config.projectPath.build.html)
				)
				.pipe(reload({
					stream: true
				}));

		default:
			console.log('ОШИБКА!!! Неверно выбран режим для компиляции html!!!');
			break;
	}
});