var
	browserSync	= require('browser-sync'),
	cheerio		= require('gulp-cheerio'),
	config		= require('./config'),
	gulp			= require('gulp'),
	gutil			= require('gulp-util'),
	inject		= require('gulp-inject'),
	plumber		= require('gulp-plumber'),
	reload		= browserSync.reload,
	rename		= require('gulp-rename'),
	replace		= require('gulp-replace'),
	size			= require('gulp-size'),
	svg2png		= require('gulp-svg2png'),
	svgmin		= require('gulp-svgmin'),
	svgsprite	= require('gulp-svg-sprite'),
	svgstore		= require('gulp-svgstore');

// файл .styl из папки templates положить в папку плагина
// очень лень редактировать шаблоны не стайлусовские


switch(config.typeOf.css) {
	case 'stylus':
		var svgParams = {
			log: 'info',
			mode: {
				css: {
					layout: 'packed',
					render: {styl: {dest: config.projectPath.build.svgStyle()},},
					sprite: config.projectPath.build.svgFix
				},
			}
		};
	break;
	case 'sass':
		var svgParams = {
			log: 'info',
			mode: {
				css: {
					render: {scss: {dest: config.projectPath.build.svgStyle()},},
					sprite: config.projectPath.build.svgFix,
					layout: 'packed'
				}
			}
		};
	break;
	case 'less':
		var svgParams = {
			log: 'info',
			mode: {
				css: {
					render: {less: {dest: config.projectPath.build.svgStyle()},},
					sprite: config.projectPath.build.svgFix,
					layout: 'packed'
				}
			}
		};
	break;
	case 'css':
		var svgParams = {
			log: 'info',
			mode: {
				css: {
					render: {css: {dest: config.projectPath.build.svgStyle()},},
					sprite: config.projectPath.build.svgFix,
					layout: 'packed'
				}
			}
		};
	break;
	default:
		console.log('ОШИБКА!!!');
};


gulp.task('svgSprite', function() {
	switch(config.typeOf.svgSprite){

		case 'inline':
			function fileContents (filePath, file) {
				return file.contents.toString('utf8')
			}

			var svgs = gulp
				.src(config.projectPath.src.svg)
				.pipe(plumber(function(error) {
					gutil.log(gutil.colors.red(error.message));
					this.emit('end');
				}))
				.pipe(rename({
					prefix: 'svg_'
				}))
				.pipe(svgstore({
					inlineSvg: true
				}))
				.pipe(cheerio({
					run: function($) {
						$('[fill]').removeAttr('fill');
						$('[style]').removeAttr('style');
						$('style').remove();
					},
					parserOptions: {
						xmlMode: true
					}
				}))
				.pipe(size({
					title: 'svg sprite'
				}));
				
			return gulp
				.src(config.projectPath.build.html+'*.html')
				.pipe(plumber(function(error) {
					gutil.log(gutil.colors.red(error.message));
					this.emit('end');
				}))
				.pipe(inject(svgs, {
					transform: fileContents
				}))
				.pipe(replace('<!-- inject:svg -->', ''))
				.pipe(replace('<!-- endinject -->', ''))
				.pipe(gulp
					.dest(config.projectPath.build.html))
				.pipe(reload({
						stream: true
				}));

		case 'external':
			return gulp
				.src(config.projectPath.src.svg)
				.pipe(plumber(function(error) {
					gutil.log(gutil.colors.red(error.message));
					this.emit('end');
				}))
				.pipe(cheerio({
					run: function($) {
						$('[fill]').removeAttr('fill');
						$('[style]').removeAttr('style');
						$('style').remove();

					},
					parserOptions: {
						xmlMode: true
					}
				}))
				.pipe(rename({
					prefix: 'svg_'
				}))
				.pipe(svgmin(function (file) {
					return {
						plugins: [{
							cleanupIDs: {
								minify: true
							}
						}]
					}
				}))
				.pipe(svgstore())
				.pipe(gulp
					.dest(config.projectPath.build.svg));

		case 'css':
			return gulp
				.src(config.projectPath.src.svg)
				.pipe(plumber(function(error) {
					gutil.log(gutil.colors.red(error.message));
					this.emit('end');
				}))
				.pipe(svgsprite(svgParams))
				.pipe(gulp.dest('build/'))
				.pipe(reload({
					stream: true
				}));
		default:
			console.log('ОШИБКА!!! Неверно выбран формат свг-спрайта!!!');
	}
});