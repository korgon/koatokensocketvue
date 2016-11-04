var router = require('koa-router')();
var koaBody = require('koa-better-body');

module.exports = function(project) {
	// begin route definitions

	// api routes
	var api = require('./api.js')(project);

	// examples of post/get routes
	// router.post('/post/route/path', koaBody(), api.dealPost);
	// router.get('/get/route/path', api.dealGet);

	// end route definitions
	return router;
}
