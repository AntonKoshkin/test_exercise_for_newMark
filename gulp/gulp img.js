var
	browserSync	= require('browser-sync'),
	cache			= require('gulp-cache'),
	config		= require('./config'),
	gulp			= require('gulp'),
	gutil			= require('gulp-util'),
	imagemin		= require('gulp-imagemin'),
	newer			= require('gulp-newer'),
	plumber		= require('gulp-plumber'),
	pngquant		= require('imagemin-pngquant'),
	reload		= browserSync.reload,
	size			= require('gulp-size');

gulp.task('img', function() {
	return gulp
		.src(config.projectPath.src.img)
		.pipe(newer(config.projectPath.build.img))
		.pipe(plumber(function(error) {
			gutil.log(gutil.colors.red(error.message));
			this.emit('end');
		}))
		.pipe(cache(
			imagemin({
				progressive: true,
				svgoPlugins: [{
					removeViewBox: false
				}],
				optimizationLevel: 5,
				use: [pngquant()],
				interlaced: true
			})
		))
		.pipe(size({
			title: 'images'
		}))
		.pipe(gulp
			.dest(config.projectPath.build.img))
		.pipe(reload({
			stream: true
		}));
});

// найти плагин, создающий тег пикчер