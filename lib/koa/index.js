// springboard koa
// manage searchspring sites

// strictness!
"use strict";

// include packages
const fs = require('fs');
const path = require('path');
const koa = require('koa');
const jwt = require('koa-jwt');
const koaBody = require('koa-better-body');
const favicon = require('koa-favicon');
const logger = require('koa-logger');
const serve = require('koa-static');
const IO = require('koa-socket');

const logit = require('_/logit');

module.exports = function(project) {
	// start
	let options = project.getOptions();
	//console.log(options);

	let app = koa();
	let io = new IO();

	// handle things... sample middleware
	// app.use(function*(next) {
	//   try {
	//     // pass things downstream
	//     yield next;
	//   } catch(err) {
	//     // catch any errors thrown upstream
	//     this.status == err.status || 500
	//   }
	// });

	// optional middleware


	// middleware

		app.use(function *error404(next) {
		yield next;

		if (404 != this.status) return;

		// explicitly set 404 here
		this.status = 404;
		let filename = __dirname + '/public/404.html';
		let stats = fs.statSync(filename);
		this.set('Last-Modified', stats.mtime.toUTCString());
		this.set('Content-Length', stats.size);
		this.set('Cache-Control', 'max-age=0');
		this.type = path.extname(filename);
		this.body = fs.createReadStream(filename);
	});

	// static content
	app.use(favicon(__dirname + '/public/images/favicon.png'));
	app.use(serve(__dirname + '/public/'));

	// Middleware below this line is only reached if JWT token is valid
	app.use(jwt({ secret: 'shared-secret' }));

	// route middleware
	// ----------------
	let router = require('./router/router.js')(project);
	// router middleware
	app.use(router.routes());


	// log HTTP
	if (options.app_log_http) {
		app.use(logger());
	}

	// websockets
	// ----------------
	io.attach(app);
	project.io = app.io;	// is this legit?


	// start your engines
	app.listen(options.koa_port);
	project.debug('http server is listening on ' + options.koa_port);
}
