var
	clean		= require('gulp-clean'),
	gulp		= require('gulp'),
	gutil		= require('gulp-util'),
	plumber	= require('gulp-plumber');

// так как плагин в имя спрайта (если собирать для вставки бэкграундом)
// добавляет кеш (или типа того, короче кучку символов, зависящих от
// размера и содержимого), необходимо перед билдом удалять предыдущий
// (чтоб не переполнять папку билда)

gulp.task('svgSpriteClean', function(cb) {
	return gulp
		.src('build/img/svg-sprite-*.svg', {
			read: false
		})
		.pipe(plumber(function(error) {
			gutil.log(gutil.colors.red(error.message));
			this.emit('end');
		}))
		.pipe(clean(), cb);
});