var	gulp			= require('gulp'),
		runSequence	= require('run-sequence')
							.use(gulp);

gulp.task('default', function() {
	runSequence(
		'build',
		'server'
	);
});