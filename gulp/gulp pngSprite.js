var
	browserSync	= require('browser-sync'),
	buffer		= require('vinyl-buffer'),
	config		= require('./config'),
	gulp			= require('gulp'),
	gutil			= require('gulp-util'),
	imagemin		= require('gulp-imagemin'),
	plumber		= require('gulp-plumber'),
	pngquant		= require('imagemin-pngquant'),
	reload		= browserSync.reload,
	size			= require('gulp-size'),
	spritesmith	= require('gulp.spritesmith');

gulp.task('pngSprite', function () {
	var spriteData = gulp
		.src(config.projectPath.src.png)
		.pipe(plumber(function(error) {
			gutil.log(gutil.colors.red(error.message));
			this.emit('end');
		}))
		.pipe(spritesmith({
			algorithm: 'binary-tree',
			cssName: config.projectPath.build.pngStyles(),
				cssVarMap: function (sprite) {
				sprite.name = 'png_' + sprite.name;
			},
			
			imgName: 'png-sprite.png',
			imgPath: '../img/png-sprite.png',

			retinaImgName: 'png-sprite@2x.png',
			retinaImgPath: '../img/png-sprite@2x.png',
			
			retinaSrcFilter: config.projectPath.src.pngRet,
			
			padding: 1,
		}));

	spriteData.img
		.pipe(plumber(function(error) {
			gutil.log(gutil.colors.red(error.message));
			this.emit('end');
		}))
		.pipe(buffer())
		.pipe(imagemin({
			interlaced: true,
			optimizationLevel: 5,
			progressive: true,
			use: [pngquant()],
		}))
		.pipe(gulp
			.dest(config.projectPath.build.img))
		.pipe(reload({
			stream: true
		}));

	spriteData.css
		.pipe(plumber(function(error) {
			gutil.log(gutil.colors.red(error.message));
			this.emit('end');
		}))
		.pipe(gulp
			.dest('src/style/sprites/'))
		.pipe(reload({
			stream: true
		}));
});

// использование с ретиной retinaSprite($png_имяЗначка_group)
// использование без ретины sprite($png_имяЗначка)

// добавить включение/выключениеподготовки под ретину