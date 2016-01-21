var
	config		= require('./config'),
	gulp 			= require('gulp'),
	runSequence	= require('run-sequence')
							.use(gulp);

gulp.task('build', function(cb) {
	if (config.typeOf.svgSprite == 'inline') {
		runSequence(
			'clean',
			'svgBuild',
			'css',
			'js',
			'pngSprite',
			'fonts',
			'img',
			cb
		)
	} else {
		runSequence(
			'clean',
			'svgBuild',
			'html',
			'css',
			'js',
			'pngSprite',
			'fonts',
			'img',
			cb
		)
	}
});