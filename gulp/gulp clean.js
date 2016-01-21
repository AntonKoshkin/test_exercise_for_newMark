var
	clean		= require('gulp-clean'),
	config	= require('./config'),
	gulp		= require('gulp'),
	plumber	= require('gulp-plumber');

gulp.task('clean', function(cb) {
	return gulp
		.src(config.projectPath.clean, {
			read: false
		})
		.pipe(plumber(function(error) {
			gutil.log(gutil.colors.red(error.message));
			this.emit('end');
		}))
		.pipe(clean(), cb);
});