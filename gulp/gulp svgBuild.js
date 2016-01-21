var
	browserSync	= require('browser-sync'),
	clean			= require('gulp-clean'),
	config		= require('./config'),
	gulp			= require('gulp'),
	reload		= browserSync.reload,
	runSequence	= require('run-sequence')
							.use(gulp);

gulp.task('svgBuild', function(cb) {
	switch(config.typeOf.svgSprite){

		case 'inline':
			runSequence(
				'html',
				'svgSprite',
				cb
			)
		break;

		case 'external':
			runSequence(
				'svgSprite',
				cb
			)
		break;
		
		case 'css':
			runSequence(
				'svgSpriteClean',
				'svgSprite',
				cb
			)
		break;
		
		default:
			console.log('ОШИБКА!!! Неверно выбран формат свг-спрайта!!!');
		break;
		
	}
});