// springboard koa
// manage searchspring sites

// strictness!
"use strict";

// include packages
const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const jwt = require('koa-jwt');
const koaBody = require('koa-better-body');
const favicon = require('koa-favicon');
const logger = require('koa-logger');
const serve = require('koa-static');
const websockify = require('koa-websocket');

const logit = require('_/logit');

module.exports = function(project) {
	// start
	let options = project.getOptions();
	//console.log(options);

	const app = websockify(new Koa());
	

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


	// 404 middleware
	app.use(async(ctx, next) => {
		try {
			await next();

			if (404 == ctx.status) {
				ctx.throw(404)
			}
		} catch(err) {
			// explicitly set 404 here
			ctx.status = 404;
			let filename = __dirname + '/public/404.html';
			let stats = fs.statSync(filename);
			ctx.set('Last-Modified', stats.mtime.toUTCString());
			ctx.set('Content-Length', stats.size);
			ctx.set('Cache-Control', 'max-age=0');
			ctx.type = path.extname(filename);
			ctx.body = fs.createReadStream(filename);
		}
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

	// start your engines
	app.listen(options.koa_port);
	project.debug('http server is listening on ' + options.koa_port);
}
