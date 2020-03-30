"use strict";

let conf = require('./lib/config')(__dirname);
let core = require('./lib/core');

(async () => {
	try {
		await core.init(conf)
		let app = require('./lib/koa')(core);
	} catch(err) {
		console.log('failed to initialize!');
		console.log(err);
		process.exit(1);
	}	
})();
