var
	browserSync	= require('browser-sync'),
	config		= require('./config'),
	gulp			= require('gulp');

var	serverConfig = {
			server: {
				baseDir: "./build/"
			},
			// tunnel: true,
			host: 'localhost',
			port: 9797,
			injectChanges: true,
			logPrefix: "Saimon says"
		};

// запуск сервера
gulp.task('server', ['watch'], function () {
	browserSync(serverConfig);
});