var
		browserSync	= require('browser-sync'),
		config		= require('./config'),
		gulp 			= require('gulp'),
		gutil			= require('gulp-util'),
		plumber		= require('gulp-plumber'),
		reload		= browserSync.reload,
		size			= require('gulp-size');

gulp.task('fonts', function() {
	return gulp
		.src(config.projectPath.src.fonts)
		.pipe(plumber(function(error) {
			gutil.log(gutil.colors.red(error.message));
			this.emit('end');
		}))
		.pipe(size({
			title: 'fonts'
		}))
		.pipe(gulp
			.dest(config.projectPath.build.fonts))
		.pipe(reload({
			stream: true
		}));
});