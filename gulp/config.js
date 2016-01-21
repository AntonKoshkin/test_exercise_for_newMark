module.exports = {
	typeOf: {
		html:			'jade',	// {jade||html}
		css:			'stylus',// {stylus||sass||less||css}
		svgSprite:	'external',	// {inline||external||css}
		pngRet:		true,	// {true}	// еще не реализовано
	},

	projectPath: {
		src: {
			css:				'src/style/style.css',
			fonts:			'src/fonts/**/*.*',
			img:				'src/img/img/*.*',
			html:				'src/*.html',
			jade:				'src/*.jade',
			jsCustom:		'src/js/custom.js',
			jsVendor:		'src/js/vendor.js',
			less:				'src/style/style.less',
			png:				'src/img/png/*.png',
			pngRet:			'src/img/png/*@2x.png',
			sass:				'src/style/style.sass',
			stylus:			'src/style/style.styl',
			svg:				'src/img/svg/*.svg',
		},

		build: {
			css:			'build/css/',
			fonts:		'build/fonts/',
			html:			'build/',
			img:			'build/img/',
			js:			'build/js/',
			pngStyles:	function() {
								switch(module.exports.typeOf.css){
									case 'stylus':
										return 'png-sprite.styl';
									case 'sass':
										return 'png-sprite.sass';
									case 'less':
										return 'png-sprite.less';
									case 'css':
										return 'png-sprite.css';
									default:
										console.log('ОШИБКА!!!');
								}
							},
			svg:			'build/img/',
			svgFix:		'../img/svg-sprite.svg',
			svgStyle:	function() {
								switch(module.exports.typeOf.css){
									case 'stylus':
										return '../../src/style/sprites/svg-sprite.styl';
									case 'sass':
										return '../../src/style/sprites/svg-sprite.scss';
									case 'less':
										return '../../src/style/sprites/svg-sprite.less';
									case 'css':
										return '../../src/style/sprites/svg-sprite.css';
									default:
										console.log('ОШИБКА!!!');
								}
							},
		},

		watch: {
			fonts:		'src/fonts/**/*.*',
			html:			'src/**/*.+(jade|html)',
			img:			'src/img/**/*.*',
			jade:			'src/**/*.jade',
			js:			'src/js/**/*.js',
			png:			'src/img/png/*.png',
			sass:			'src/style/**/*.sass',
			style:		'src/style/**/*.*',
			stylus:		'src/style/**/*.styl',
			svg:			'src/img/svg/*.svg',
			template:	'src/*.+(html|jade)',
		},

		clean:	'build/*',
	},
};