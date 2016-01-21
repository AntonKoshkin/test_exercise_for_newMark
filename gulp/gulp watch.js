var
	config	= require('./config'),
	gulp		= require('gulp'),
	watch		= require('gulp-watch');

gulp.task('watch', function() {


	if (config.typeOf.svgSprite == 'inline') {
		watch(config.projectPath.watch.template, function(event, cb){
			gulp.start('svgBuild');
		});
		watch(config.projectPath.watch.style, function(event, cb){
			gulp.start('css');
		});
		watch(config.projectPath.watch.js, function(event, cb){
			gulp.start('js');
		});
		watch(config.projectPath.watch.img, function(event, cb){
			gulp.start('img');
		});
		watch(config.projectPath.watch.png, function(event, cb){
			gulp.start('pngSprite');
		});
		watch(config.projectPath.watch.svg, function(event, cb){
			gulp.start('svgBuild');
		});
		watch(config.projectPath.watch.fonts, function(event, cb){
			gulp.start('fonts');
		});
	} else {
		watch(config.projectPath.watch.svg, function(event, cb) {
			gulp.start('svgBuild');
		});
		watch(config.projectPath.watch.html, function(event, cb){
			gulp.start('html');
		});
		watch(config.projectPath.watch.style, function(event, cb){
			gulp.start('css');
		});
		watch(config.projectPath.watch.js, function(event, cb){
			gulp.start('js');
		});
		watch(config.projectPath.watch.img, function(event, cb){
			gulp.start('img');
		});
		watch(config.projectPath.watch.png, function(event, cb){
			gulp.start('pngSprite');
		});
		watch(config.projectPath.watch.svg, function(event, cb){
			gulp.start('svgBuild');
		});
		watch(config.projectPath.watch.fonts, function(event, cb){
			gulp.start('fonts');
		});
	};
});